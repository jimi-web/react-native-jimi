/*
 * @Descripttion: 
 * @version: 
 * @Author: xieruizhi
 * @Date: 2019-09-19 11:49:16
 * @LastEditors: xieruizhi
 * @LastEditTime: 2020-06-28 10:17:36
 */
import React from 'react';
import {View,TouchableOpacity,Image,Text,PanResponder,AsyncStorage} from 'react-native';
import {Theme,Icon} from '../../../components/index';
import PropTypes from 'prop-types';
import {httpApp,getEncoding} from '../../../http/index';
import api from '../../../api/index';
import Share from '../share/Share';
import {isIphoneX,iphoneXHeight} from '../../../libs/utils';
import PositionUtils from '../position/index';
import Styles from '../style/base';
import MapStyles from '../style/trace';
import {Toast} from 'teaset';
import {distance,countTotalTrack} from '../comm';

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
        isShareBtn:PropTypes.bool
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
        ChangePositionBtn:{},
        isShareBtn:true
    };


    constructor(props) {
        super(props);
        this.state = {
            visualRange:[],//可视区域
            deviceMarker:null,
            myMarker:null,
            deviceInfo:{},//设备信息
            asyncStorageAeviceName:'',
            pullUpHeight:isIphoneX()?iphoneXHeight(80):80,//上拉框高度
            touchStart:null,
            pullState:0,//0为默认高度，1为上拉
            positionBtnHeight:10,//定位高度
            distance:0,//两点间的距离
        };
    }

    componentWillMount() {
        if(this.mapViewFunc){
            this.mapViewFunc.reloadView();
        }
        this.asyncStorageAeviceName();
        this.onTouch();
    }

    asyncStorageAeviceName = async () => {
        let key = await getEncoding().encoding + 'jmDeviceName';
        let result = await AsyncStorage.getItem(key);
        if(result){
            this.setState({
                asyncStorageAeviceName:result
            });
        }
        
    }


    pullUpBox = ()=>{ 
        let pullUpDownImg = this.state.pullState === 0 ? 'track_operating_expand' :'track_operating_contract';
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
                        <Icon name={pullUpDownImg} size={'100%'} />
                    </TouchableOpacity>
                </View>    
                <View style={MapStyles.information}  {...this._panResponder.panHandlers}>
                    <View style={MapStyles.item}>
                        <Text style={MapStyles.title}>{deviceInfo.deviceName?deviceInfo.deviceName:this.state.asyncStorageAeviceName}</Text>
                    </View> 
                    <View style={[MapStyles.item,MapStyles.state]}>
                        <Text style={[MapStyles.text,{color:this.deviceState(deviceInfo.deviceStatus,deviceInfo.deviceStatusName).color,paddingTop:1}]}>{deviceInfo.deviceStatus?I18n.t(this.deviceState(deviceInfo.deviceStatus,deviceInfo.deviceStatusName).text):I18n.t('离线')}</Text>
                        <Text style={MapStyles.line}>|</Text>
                        <Text style={MapStyles.text}>{I18n.t('距离')}:{this.state.distance? distance(this.state.distance):0+'m'}</Text>
                        <Text style={MapStyles.line}>|</Text>
                        <Text style={MapStyles.text}>{deviceInfo.posType?I18n.t(this.posType(deviceInfo).text):I18n.t('无')}</Text>
                        <Text style={MapStyles.line}>|</Text>
                        <Text style={MapStyles.text}>{deviceInfo.gpsSpeed?deviceInfo.gpsSpeed:0}km/h</Text>
                    </View>
                    {
                        this.state.pullState ?
                            <View>
                                <View style={MapStyles.item}>
                                    <Text style={MapStyles.text}>{I18n.t('定位时间')}：{deviceInfo.posType?this.posType(deviceInfo).time:I18n.t('无')}</Text>
                                </View> 
                                <View style={MapStyles.item}>
                                    <Text style={MapStyles.text}>{I18n.t('通讯时间')}：{deviceInfo.time?deviceInfo.time:I18n.t('无')}</Text>
                                </View> 
                                <View style={MapStyles.item}>
                                    <Text style={MapStyles.text}>{deviceInfo.address?deviceInfo.address:null}{'\n'}</Text>
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
        return this.props.isShareBtn ?<TouchableOpacity style={[Styles.btn,Styles.shareBtn,this.props.shareBtnStyle]}  activeOpacity={0.5} onPress={()=>{
            this.share.show();
        }}>
            <Icon name={'track_map_share'} size={'100%'} />
            {/* <Image style={Styles.btnImg} source={require('../../../assets/trace/track_map_share.png')} /> */}
        </TouchableOpacity>:null;
    }

    /**
     * 分享
     */
    drawerShare = ()=> {
        return <Share 
            checkedTitle ={I18n.t(this.props.checkedTitle)}
            shareUrl ={this.props.shareUrl}
            shareTitle ={I18n.t(this.props.shareTitle)}
            shareText ={I18n.t(this.props.shareText)}
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
            pullUpHeight:isIphoneX()?iphoneXHeight(180):180,
            pullState:1,
            positionBtnHeight:100
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
        if(data.latitude){
            this.setState({
                deviceInfo:data
            },()=>{
                this.update(data,'deviceMarker');
                this.props.onDeviceChange &&  this.props.onDeviceChange(data);
            });
        }else{
            this.props.onDeviceChange &&  this.props.onDeviceChange(data);
        }
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
                let visualRange = [...this.state.visualRange];
                visualRange.push(deviceMarker);
                
                this.setState({
                    visualRange:visualRange,
                },()=>{
                    this.setState({
                        distance:countTotalTrack(this.state.visualRange)
                    });
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
                left:Theme.myPositionBtnLeft,
                bottom:this.state.positionBtnHeight,
                width:Theme.controlBtnWidth,
                height:Theme.controlBtnHeight,
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
            Toast.message(I18n.t('无定位信息无法导航'));
            return;
        }
        httpApp('jm_location.navigation',{
            latitude:this.state.deviceInfo.gpsLatitude,
            longitude:this.state.deviceInfo.gpsLongitude,
            onSuccess: () => {
                //
            },
            onFail: () => {
                // Toast.message('请下载地图');
            },
            onComplete:()=>{
                //
            }
        });
    }


}