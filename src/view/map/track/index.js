/*
 * @Descripttion: 
 * @version: 
 * @Author: xieruizhi
 * @Date: 2019-09-03 10:32:27
 * @LastEditors: xieruizhi
 * @LastEditTime: 2019-09-11 16:37:21
 */
import React, {Component} from 'react';
import {View,TouchableOpacity,Image} from 'react-native';
import PropTypes from 'prop-types';
import Styles from '../style/base';
import MapStyles from '../style/track';
import Controller from './TrackController';
import {Toast} from 'teaset';
import {jmAjax} from '../../../http/business';
import {map} from '../../../api/index';
import gps from '../../../libs/coversionPoint';


export default class TrackUtils extends Component {  
    static propTypes = {
        initialRegion:PropTypes.object,//初始化中心点
        mapType: PropTypes.oneOf(['standard', 'satellite']),//地图类型
        trafficEnabled:PropTypes.bool,//是否开启路况
        startMarkerOperation:PropTypes.object,//起点marker
        endMarkerOperation:PropTypes.object,//终点marker
        deviceMarkerOperation:PropTypes.object,//终点marker
        dimDd:PropTypes.number,
        customItem:PropTypes.func,//在地图上自定义其他元素
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
        dimDd:7,
        customItem:null
    }

    constructor(props) {
        super(props);
        this.timer = null;

        this.state = {
            mapType:this.props.mapType,//地图类型
            trafficEnabled:this.props.trafficEnabled,//路况是否开启
            trackData:[],
            startMarker:{
                latitude:null,
                longitude:null,  
            }, //起点的标注
            endMarker:{
                latitude:null,
                longitude:null,  
            }, //终点的标注
            pointArr:[],//存储播放中的轨迹数组
            isTrackPolylineShow:true,//轨迹线是否显示
            trackPolylinePoint:[],//存储整条轨迹线
            deviceMarker:{},//设备标记
            speed:700,//播放速度
            progress:0,//进度条
            totalProgress:0,//总进度条
            isPlay:false,//是否播放
            startDate:new Date(new Date(new Date().Format('yyyy/MM/dd')+' 00:00').getTime()).Format('YYYY-MM-DD hh:mm'),//开始时间
            endDate:new Date().Format('YYYY-MM-DD hh:mm'),//开始时间
            posType:100,//定位类型
            userMapType:0,//0为百度，1为谷歌
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
            onConfirm={this.onConfirm} 
            onShowType={this.onShowType}
            onSpeed={this.onSpeed}
            onReplay={this.onReplay}
            onTrackShow = {this.onTrackShow}
            onPlay={this.onPlay}
            progress={this.state.progress}
            totalProgress={this.state.totalProgress}
            isPlay={this.state.isPlay}
            deviceInformation={this.state.deviceMarker}
            dimDd = {this.props.dimDd}
            startDate={this.state.startDate}
            endDate={this.state.endDate}
        >
        </Controller>;      
    }

    onMapReady(userMapType) {
        this.setState({
            userMapType:userMapType
        },()=>{
            this.request();
        });
    }
    
    /**
     * 请求数据
     */
    request = ()=> {
        let data = {
            startTime:this.state.startTime,
            endTime:this.state.endTime,
            posType:this.state.posType
        };
    
        jmAjax({
            url:map.track,
            method:'GET',
            encoding:true,
            encodingType:true,
            data:data
        }).then((res)=>{
            let result = res.data;
            if(result.length>0){
                this.setState({
                    trackData:result
                },()=>{
                    this.getMarkPoint();
                });
            }else {
                Toast.message('暂无轨迹');
            }
        });
    }

    
    /**
     * 获取数据
     */
    getMarkPoint = () =>{
        let trackData = this.state.trackData;
        let allPoint = this.getTrackPointArr();
        let pointArr=[];
        pointArr.push(allPoint[0]); //初始化设备位置

        let deviceMarker = trackData[0];
        deviceMarker.totalDistance = 0;
        
        this.setState({
            startMarker:{latitude:trackData[0].latitude,longitude:trackData[0].longitude},
            endMarker:{latitude:trackData[trackData.length-1].latitude,longitude:trackData[trackData.length-1].longitude},
            trackPolylinePoint:allPoint,
            deviceMarker:deviceMarker,
            pointArr:pointArr,
            totalProgress:allPoint.length,
        },()=>{
            //如果是谷歌地图则设置可视区域
            if(this.state.userMapType){
                this.fitAllMarkers();
            }
        });   
    }

    /**
     * 获取整条轨迹线
     */
    getTrackPointArr = () =>{
        let arr = [];
        let trackData = this.state.trackData;
        trackData.forEach((res)=> {
            arr.push({
                latitude:res.latitude,
                longitude :res.longitude,
            });
        });
        return arr;
    }


    /**
     * 时间选择确认按钮
     */
    onConfirm = (data)=> {
        this.setState({
            startDate:data.startDate,
            endDate:data.endDate
        },()=>{
            this.request();
        });
    }


    /**
     * 隐藏轨迹
     */
    onTrackShow = (isShow)=>{
        this.setState({
            isTrackPolylineShow:isShow
        });
    }

    
    /**
     * 重置
     */
    onReplay = () => {
        let trackData = this.state.trackData;
        let deviceMarker = trackData[0];
        this.pause();
        this.setState({
            progress:0,
            isPlay:true,
            pointArr:[this.state.trackPolylinePoint[0]],
            deviceMarker:trackData[0]
        },()=>{
            this.play();
        });
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
    onSpeed = (val) => {
        let speed = val;
        this.setState({
            speed:speed
        },()=>{
            //切换速度需要重新设置下播放，如果是在播放状态需要停止再播放
            if(this.state.isPlay){
                this.pause();
                this.play();
            }
        });  
    }


    /**
     * 定位类型切换监听
     */
    onShowType = (data) =>{ 
        this.setState({
            posType:data
        },()=>{
            this.request();
        });        
    }

    /**
     * 播放轨迹
     */
    play =()=>{
        let trackData = this.state.trackData;
        let currentProgress = this.state.progress; //当前播放进度
        let pointArr = null;
        this.timer = setInterval(()=>{
            //已播完
            if(this.state.progress === this.state.totalProgress-1){
                Toast.message('播放完成');
                this.reset();
                this.pause();
                return;
            }
            
            //播放中
            currentProgress++;
            pointArr = this.state.trackPolylinePoint.slice(0,currentProgress+1);
            if(!trackData[currentProgress].totalDistance){
                trackData[currentProgress].totalDistance = this.countTotalTrack(pointArr); //计算总里程
            }

            if(!trackData[currentProgress].time){
                //时间戳转
                trackData[currentProgress].time  = new Date(trackData[currentProgress].gpsTime).Format('YYYY-MM-DD hh:mm:ss');
            }
            
            let deviceMarker = trackData[currentProgress];
            console.log(trackData);
            
            this.setState({
                progress:currentProgress,
                pointArr:pointArr,
                deviceMarker:deviceMarker
            });
        },this.state.speed);
    }

    /**
     * 暂停
     */
    pause =()=>{
        clearInterval(this.timer);
    }

    /**
     * 重置
     */
    reset = ()=> {
        let trackData = this.state.trackData;
        let deviceMarker = trackData[0];
        //恢复初始化
        this.setState({
            progress:0,
            isPlay:false,
            pointArr:[this.state.trackPolylinePoint[0]],
            deviceMarker:deviceMarker
        });
    }

    /**
     * 计算设备估计总里程
     */
    countTotalTrack = (track = []) => {
        let totalMileage = 0;
        for (let i = 0; i < track.length; i++) {
            const item = track[i];
            if(i > 0){
                const itemSuper = track[i - 1];
                totalMileage += gps.distance(item.latitude,item.longitude,itemSuper.latitude,itemSuper.longitude);
            }
        }
        return totalMileage.toFixed(2);
    }

    /**
     *  可是可视范围内(仅限谷歌)
     */
    fitAllMarkers =()=> {
        this.map.fitToCoordinates(this.state.trackPolylinePoint, {
            edgePadding:{top: 40,right: 40,bottom: 40,left: 40 },
            animated: true,
        });
    }


    /**
     * 自定义覆盖物
     */
    customOverlay = ()=> {
        return this.props.customItem ?this.props.customItem() :null;
    }
}