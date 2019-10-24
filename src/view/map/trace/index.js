/*
 * @Descripttion: 
 * @version: 
 * @Author: xieruizhi
 * @Date: 2019-09-19 11:49:16
 * @LastEditors: xieruizhi
 * @LastEditTime: 2019-10-22 14:15:05
 */
import React, {Component} from 'react';
import {View,TouchableOpacity,Image,Text,PanResponder,Modal} from 'react-native';
import PropTypes from 'prop-types';
import {httpApp} from '../../../http/basic';
import api from '../../../api/index';
import gps from '../../../libs/coversionPoint';
import Share from '../share/Share';
import {isIphoneX,iphoneXHeight} from '../../../libs/utils';
import PositionUtils from '../position/index';
import Styles from '../style/base';
import MapStyles from '../style/trace';
import {Toast} from 'teaset';

export default class TraceUtils extends PositionUtils { 
    static propTypes = {
        ...PositionUtils.propTypes,
        polylineOptions:PropTypes.object,
        checkedTitle:PropTypes.string,
        routerName:PropTypes.string,
        shareUrl:PropTypes.string,
        shareTitle:PropTypes.string,
        shareText:PropTypes.string,
        token:PropTypes.string,
        onFile:PropTypes.func,
        onDeviceChange:PropTypes.func,
        onMyChange:PropTypes.func,//我的位置改变监听事件
        ChangePositionBtn:PropTypes.object,
    };

    static defaultProps = {
        ...PositionUtils.defaultProps,
        markerInfoWindow:{
            isCustom:false,
            visible:false
        },
        checkedTitle:'《使用协议和隐私政策》',
        routerName:'PrivacyAgreement',
        shareUrl:api.shareUrl,
        shareTitle:'我的实时位置',
        shareText:'点击查看我现在在哪里吧！',
        ChangePositionBtn:{}
    };


    constructor(props) {
        super(props);
        this.state={
            visualRange:null,//可视区域
            deviceMarker:null,
            myMarker:null,
            deviceInfo:{},//设备信息
            pullUpHeight:isIphoneX()?iphoneXHeight(80):80,//上拉框高度
            touchStart:null,
            pullState:0,//0为默认高度，1为上拉
            positionBtnHeight:10,//定位高度
            distance:0,//两点间的距离
        };
    }

    componentWillMount() {
        this.onTouch();
    }


    pullUpBox = ()=>{ 
        let pullUpDownImg = this.state.pullState === 0 ?require('../../../assets/trace/track_operating_expand.png'):require('../../../assets/trace/track_operating_contract.png');
        let deviceInfo = this.state.deviceInfo;
        return (
            <View  activeOpacity={1} style={[MapStyles.box,{height:this.state.pullUpHeight}]}>
                <TouchableOpacity  style={MapStyles.navigation}  onPress={()=>{
                    this.navigation();
                }}>
                    <Image source={require('../../../assets/trace/track_navigation.png')}></Image>
                </TouchableOpacity>    
                <View style={{alignItems:'center'}}>
                    <TouchableOpacity style={MapStyles.pullUp} onPress={()=>{
                        this.pullUpDown();
                    }}>
                        <Image source={pullUpDownImg}></Image>
                    </TouchableOpacity>
                </View>    
                <View style={MapStyles.information}  {...this._panResponder.panHandlers}>
                    <View style={MapStyles.item}>
                        <Text style={MapStyles.title}>{deviceInfo.deviceName?deviceInfo.deviceName:null}</Text>
                    </View> 
                    <View style={[MapStyles.item,MapStyles.state]}>
                        <Text style={[MapStyles.text,{color:this.deviceState(deviceInfo.deviceStatus).color,paddingTop:1}]}>{deviceInfo.deviceStatus?this.deviceState(deviceInfo.deviceStatus).text:'离线'}</Text>
                        <Text style={MapStyles.line}>|</Text>
                        <Text style={MapStyles.text}>距离{this.state.distance?this.state.distance:0}m</Text>
                        <Text style={MapStyles.line}>|</Text>
                        <Text style={MapStyles.text}>{deviceInfo.posType?this.posType(deviceInfo.posType):'无'}</Text>
                        <Text style={MapStyles.line}>|</Text>
                        <Text style={MapStyles.text}>{deviceInfo.gpsSpeed?deviceInfo.gpsSpeed:0}km/h</Text>
                    </View>
                    {
                        this.state.pullState ?
                            <View>
                                <View style={MapStyles.item}>
                                    <Text style={MapStyles.text}>定位时间：{deviceInfo.gpsTime?deviceInfo.gpsTime:'无'}</Text>
                                </View> 
                                <View style={MapStyles.item}>
                                    <Text style={MapStyles.text}>通讯时间：{deviceInfo.time?deviceInfo.time:'无'}</Text>
                                </View> 
                                <View style={MapStyles.item}>
                                    <Text style={MapStyles.text}>{deviceInfo.address?deviceInfo.address:null}</Text>
                                </View> 
                            </View>:null
                    }
                </View>                        
            </View>
        );
    }

    /**
     * 路况按钮
     */
    shareBtn = ()=> {
        return <TouchableOpacity style={[Styles.btn,Styles.shareBtn,this.props.shareBtnStyle]}  activeOpacity={0.5} onPress={()=>{
            this.share.show();
        }}>
            <Image style={Styles.btnImg} source={require('../../../assets/trace/track_map_share.png')} />
        </TouchableOpacity>;
    }

    /**
     * 分享
     */
    drawerShare = ()=> {
        return <Share 
            checkedTitle ={this.props.checkedTitle}
            routerName ={this.props.routerName}
            shareUrl ={this.props.shareUrl}
            shareTitle ={this.props.shareTitle}
            shareText ={this.props.shareText}
            token={this.props.token ? this.props.token : ''} 
            onFile={()=>{
                this.props.onFile &&  this.props.onFile();
            }}
            ref={ref=>this.share=ref}
        ></Share>;
    }

    /**
     * 将地图顶置上去
     */
    whitespace =()=>{
        return <View style={[MapStyles.whitespace,{height:isIphoneX()?iphoneXHeight(90):90}]}></View>;
    }


    /**
     * 监听手势滑动
     */
    onTouch =()=>{
        //监听手势滑动
        this._panResponder = PanResponder.create({
            onStartShouldSetPanResponder: (evt) => true,
            onStartShouldSetPanResponderCapture: (evt) => true,
            onMoveShouldSetPanResponder: (evt) => true,
            onMoveShouldSetPanResponderCapture: (evt) => true,
            onPanResponderGrant: (evt) => {
                this.setState({
                    touchStart:evt.nativeEvent.pageY
                });
            },
            onPanResponderMove: (evt, gestureState) => {
                let start = this.state.touchStart;
                if(start){
                    let move = evt.nativeEvent.pageY;
                    //上滑
                    if(start-move>10){
                        this.pullUp();
                    }
                    //下滑
                    if(start-move<-10){
                        this.pulldown();
                    }
                }
            },
            onResponderTerminationRequest: (evt, gestureState) => true,
        });        
    }

    pullUp = ()=>{
        this.setState({
            pullUpHeight:isIphoneX()?iphoneXHeight(160):160,
            pullState:1,
            positionBtnHeight:90
        });
    }

    pulldown = ()=>{
        this.setState({
            pullUpHeight:isIphoneX()?iphoneXHeight(80):80,
            pullState:0,
            positionBtnHeight:10
        });  
    }

    /**
     * 点击上下拉事件
     */
    pullUpDown = ()=>{
        if(this.state.pullState){
            this.pulldown();
        }else{
            this.pullUp();
        }
    }
    
    /**
     * 监听设备位置
     */
    onDeviceChange = (data)=> {
        console.log(data,'是否有数据');
        this.setState({
            deviceInfo:data
        },()=>{
            this.update(data,'deviceMarker');
            this.props.onDeviceChange &&  this.props.onDeviceChange(data);
        });
    }
    
    /**
     * 监听我的位置
     */
    onMyChange = (data)=> {
        this.update(data,'myMarker');
        this.props.onMyChange &&  this.props.onMyChange(data);
    }

    /**
     * 更新数据
     */
    update =(data,key)=> {
        let result = data;
        this.setState({
            [key]:{
                latitude:result.latitude,
                longitude: result.longitude
            }
        },()=>{
            let deviceMarker = this.state.deviceMarker;
            let myMarker = this.state.myMarker;
            if(deviceMarker && myMarker){
                //百度可视范围直接传值
                this.setState({
                    visualRange:[deviceMarker,myMarker],
                    distance:gps.distance(deviceMarker.latitude,deviceMarker.longitude,myMarker.latitude,myMarker.longitude).toFixed(2)
                },()=>{
                    //谷歌地图可视范围
                    if(this.refs.GooglePosition){
                        this.refs.GooglePosition.fitAllMarkers(this.state.visualRange);
                    }
                });
            }
        });
    }

    /**
     * 切换位置样式设置
     */
    ChangePositionBtn = ()=>{
        let op = {
            style:{
                position:'absolute',
                left:15,
                bottom:this.state.positionBtnHeight,
                width:37,
                height:37,
                zIndex:100,
                ...this.props.ChangePositionBtn
            }
        };
        return op;
    }

    /**
     * 导航
     */
    navigation = ()=>{
        if(!this.state.deviceMarker){
            Toast.message('无定位信息无法导航');
            return;
        }
        httpApp('jm_location.navigation',{
            latitude:this.state.deviceMarker.latitude,
            longitude:this.state.deviceMarker.longitude,
            onSuccess: () => {

            },
            onFail: () => {

            },
            onComplete:()=>{
                
            }
        });
    }
}