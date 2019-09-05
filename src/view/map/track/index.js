/*
 * @Descripttion: 
 * @version: 
 * @Author: xieruizhi
 * @Date: 2019-09-03 10:32:27
 * @LastEditors: xieruizhi
 * @LastEditTime: 2019-09-05 16:41:15
 */
import React, {Component} from 'react';
import {View,TouchableOpacity,Image} from 'react-native';
import PropTypes from 'prop-types';
import Styles from '../style/base';
import MapStyles from '../style/track';
import Controller from '../track/TrackController';
import trackData from '../track/json';
import {Toast} from 'teaset';

export default class TrackUtils extends Component {  
    static propTypes = {
        initialRegion:PropTypes.object,//初始化中心点
        mapType: PropTypes.oneOf(['standard', 'satellite']),//地图类型
        trafficEnabled:PropTypes.bool,//是否开启路况
        startMarkerOperation:PropTypes.object,//起点marker
        endMarkerOperation:PropTypes.object,//终点marker
        deviceMarkerOperation:PropTypes.object,//终点marker
    }

    static defaultProps = {
        initialRegion:{
            latitude: 22.596904,
            longitude: 113.936674,
            latitudeDelta:0.0922,
            longitudeDelta: 0.0421,
        },
        mapType:'standard',
        trafficEnabled:false,
        startMarkerOperation:{
            style:MapStyles.startEndImg,
            image:require('../../../assets/track/trajectory_map_start.png'),
        },  
        endMarkerOperation:{
            style:MapStyles.startEndImg,
            image:require('../../../assets/track/trajectory_map_end.png'),
        }, 
        deviceMarkerOperation:{
            style:Styles.deviceMarker,
            image:require('../../../assets/track/track_icon_deveice.png'),
        },
    }

    constructor(props) {
        super(props);
        this.timer = null;

        this.state = {
            mapType:this.props.mapType,//地图类型
            trafficEnabled:this.props.trafficEnabled,//路况是否开启
            startMarker:{
                latitude:null,
                longitude:null,  
            }, //起点的标注
            endMarker:{
                latitude:null,
                longitude:null,  
            }, //终点的标注
            longitudeData:null,//轨迹数据
            pointArr:[],//存储播放中的轨迹数组
            isTrackPolylineShow:true,//轨迹线是否显示
            trackPolylinePoint:[],//存储整条轨迹线
            deviceMarker:{},//设备标记
            speed:700,//播放速度
            progress:0,//进度条
            totalProgress:0,//总进度条
            isPlay:false
        };
    }

    /**
     * 路况按钮
     */
    roadBtn = ()=> {
        return <TouchableOpacity style={[Styles.btn,Styles.roadBtn,this.props.roadBtnStyle]}  activeOpacity={1} onPress={() => this.setState({trafficEnabled:!this.state.trafficEnabled})}>
            <Image style={Styles.btnImg} source={this.state.trafficEnabled?require('../../../assets/map/road_active.png'):require('../../../assets/map/road.png')} />
        </TouchableOpacity>;
    }

    /**
     * 地图类型按钮
     */
    mapTypeBtn = ()=> {
        return <TouchableOpacity style={[Styles.btn,Styles.mapTypeBtn,this.props.mapTypeBtnStyle]}   activeOpacity={1} onPress={this.setMapType}>
            <Image style={Styles.btnImg} source={this.state.mapType==='standard'?require('../../../assets/map/layer.png'):require('../../../assets/map/home_icon_live-action.png')} />
        </TouchableOpacity>; 
    }

    /**
     * 控制面板所有组件
     */
    controller = ()=>{
        return <Controller 
            onConfirm={this.datepickerOnConfirm} 
            onBarChange={this.onBarChange} 
            onShowType={this.onShowType}
            onSpeed={this.onSpeed}
            onReplay={this.onReplay}
            onTrackShow = {this.onTrackShow}
            onPlay={this.onPlay}
            progress={this.state.progress}
            totalProgress={this.state.totalProgress}
            isPlay={this.state.isPlay}
        >
        </Controller>;        
    }

    /**
     * 获取数据
     */
    getMarkPoint = () =>{
        let allPoint = this.getTrackPointArr();
        let pointArr=[];
        pointArr.push(allPoint[0]); //初始化设备位置
        this.setState({
            longitudeData:trackData,
            startMarker:{latitude:trackData[0].latLng.lat,longitude:trackData[0].latLng.lng},
            endMarker:{latitude:trackData[trackData.length-1].latLng.lat,longitude:trackData[trackData.length-1].latLng.lng},
            trackPolylinePoint:allPoint,
            deviceMarker:trackData[0],
            pointArr:pointArr,
            totalProgress:allPoint.length-1,
        },()=>{
            
        });   
    }

    /**
     * 获取整条轨迹线
     */
    getTrackPointArr = () =>{
        let arr = [];
        trackData.forEach((data)=> {
            arr.push({
                latitude:data.latLng.lat,
                longitude :data.latLng.lng,
            });
        });

        return arr;
    }


    /**
     * 时间选择确认按钮
     */
    datepickerOnConfirm = (data)=> {
        console.log(data);
        console.log('开始时间和结束时间');
    }

    /**
     * 日期快捷切换面板监听
     */
    onBarChange = (data) =>{
        console.log(data);
        console.log('开始时间和结束时间');  
    }

    /**
     * 隐藏轨迹
     */
    onTrackShow = (isShow)=>{
        this.setState({
            isTrackPolylineShow:isShow
        },()=>{
            console.log(this.state.isTrackPolylineShow);
        });
    }

    
    /**
     * 重置
     */
    onReplay = () => {
        
    }

    /**
     *播放和暂停点击事件
     */

     onPlay = (isPlay) =>{
         if(isPlay){
             this.play();
         }else {
             this.pause();
         }

         this.setState({
             isPlay:isPlay
         });
     }

     /**
     * 速度切换事件
     */
    onSpeed = (data) => {
        console.log(data);
        console.log('速度切换');    
    }


    /**
     * 定位类型切换监听
     */
    onShowType = (data) =>{ 
        console.log(data);
        console.log('定位类型');        
    }

    /**
     * 播放轨迹
     */
    play =()=>{
        let currentProgress = this.state.progress; //当前播放进度
        let pointArr = [...this.state.pointArr];//获取轨迹绘制的数组
        this.timer = setInterval(()=>{
            //已播完
            if(this.state.progress === this.state.totalProgress){
                Toast.message('播放完成');
                this.setState({
                    progress:0
                });
                this.pause();
                return;
            }

            //播放中
            currentProgress++;
            console.log(currentProgress);
            console.log(pointArr);
            pointArr.push(this.state.trackPolylinePoint[currentProgress]);
            
            this.setState({
                progress:currentProgress,
                pointArr:pointArr
            },()=>{
                console.log(this.state.pointArr,this.state.trackPolylinePoint);
            });
        },this.state.speed);
    }

    /**
     * 暂停
     */
    pause =()=>{
        clearInterval(this.timer);
    }
    

}