/*
 * @Descripttion: 
 * @version: 
 * @Author: xieruizhi
 * @Date: 2019-09-03 10:32:27
 * @LastEditors: xieruizhi
 * @LastEditTime: 2019-10-21 17:51:18
 */
import React, {Component} from 'react';
import {TouchableOpacity,Image} from 'react-native';
import PropTypes from 'prop-types';
import Styles from '../style/base';
import Loading from '../../../components/loading/Loading';
import MapStyles from '../style/track';
import Controller from './TrackController';
import {Toast} from 'teaset';
import {jmAjax} from '../../../http/business';
import api from '../../../api/index';
import gps from '../../../libs/coversionPoint';
import PullTime from './PullTime';


export default class TrackUtils extends Component {  
    static propTypes = {
        initialRegion:PropTypes.object,//初始化中心点
        mapType: PropTypes.oneOf(['standard', 'satellite']),//地图类型
        trafficEnabled:PropTypes.bool,//是否开启路况
        startMarkerOptions:PropTypes.object,//起点marker
        endMarkerOptions:PropTypes.object,//终点marker
        deviceMarkerOptions:PropTypes.object,//终点marker
        dimDd:PropTypes.number,
        customItem:PropTypes.func,//在地图上自定义其他元素
        polylineOptions:PropTypes.object,
        playPolylineOptions:PropTypes.object,
        roadBtnStyle:PropTypes.object,//路况样式
        mapTypeBtnStyle:PropTypes.object,//地图类型样式
        playImg:PropTypes.object, 
        getData:PropTypes.func
    }

    static defaultProps = {
        roadBtnStyle:Styles.btn,
        mapTypeBtnStyle:Styles.btn,
        initialRegion:{
            latitude: 22.596904,
            longitude: 113.936674,
            latitudeDelta:0.1922,
            longitudeDelta: 0.1421,
        },
        mapType:'standard',
        trafficEnabled:false,
        startMarkerOptions:{
            style:MapStyles.startEndImg,
            image:require('../../../assets/track/trajectory_map_start.png'),
        },  
        endMarkerOptions:{
            style:MapStyles.startEndImg,
            image:require('../../../assets/track/trajectory_map_end.png'),
        }, 
        deviceMarkerOptions:{
            style:Styles.deviceMarker,
            image:require('../../../assets/map/device.png'),
        },
        dimDd:7,
        // customItem:null,
        playImg:{
            play:require('../../../assets/track/play.png'),
            pause:require('../../../assets/track/pause.png')
        }
    }

    constructor(props) {
        super(props);
        this.timer = null;

        this.state = {
            mapType:this.props.mapType,//地图类型
            trafficEnabled:this.props.trafficEnabled,//路况是否开启
            isTrackPolylineShow:true,//轨迹线是否显示
            isPlay:false,//是否播放
            speed:700,//播放速度
            startDate:new Date(new Date(new Date().Format('yyyy/MM/dd')+' 00:00').getTime()).Format('YYYY-MM-DD hh:mm'),//开始时间
            endDate:new Date().Format('YYYY-MM-DD hh:mm'),//开始时间
            posType:0,//定位类型
            userMapType:0,//0为百度，1为谷歌,            
            trackData:[],//存储完整数据
            startMarker:{
                latitude:0,
                longitude:0,  
            }, //起点的标注
            endMarker:{
                latitude:0,
                longitude:0,  
            }, //终点的标注
            pointArr:[],//存储播放中的轨迹数组
            trackPolylinePoint:[],//存储整条轨迹线
            deviceMarker:{
                latitude:0,
                longitude:0,
            },//设备标记
            progress:0,//进度条
            totalProgress:0,//总进度条
        };
    }

    componentDidMount() {
        this.onPullTime();
    }

    componentWillUnmount() {
        Loading.hide();
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
     * 设备地图类型
     */
    setMapType = () => {
        let type = this.state.mapType === 'satellite'?'standard':'satellite';
        this.setState({mapType:type});
    };

    /**
     * 控制面板
     */
    controller = ()=>{
        return <Controller 
            playImg={this.props.playImg}
            onPullTime={this.onPullTime}
            onShowType={this.onShowType}
            onSpeed={this.onSpeed}
            onReplay={this.onReplay}
            onTrackShow = {this.onTrackShow}
            onPlay={this.onPlay}
            progress={this.state.progress}
            totalProgress={this.state.totalProgress}
            isPlay={this.state.isPlay}
            deviceInformation={this.state.deviceMarker}
            onSlidingComplete={this.onSlidingComplete}
        >
        </Controller>;      
    }

    /**
     * 时间选择框
     */
    pullTime = ()=>{
        return <PullTime 
            onConfirm={this.onConfirm} 
            dimDd = {this.props.dimDd}
            startDate={this.state.startDate}
            endDate={this.state.endDate}
        ></PullTime>;    
    }


    onMapReady(userMapType) {
        this.setState({
            userMapType:userMapType
        },()=>{
            this.requestMode();
        });
    }

    /**
     * 数据请求模式判断
     */
    requestMode = ()=>{
        Loading.show();
        if(this.props.getData){
            this.getTrackPoints();
        }else{
            this.request();
        } 
    }


    /**
     *  自己传入数据
     */
    getTrackPoints = ()=>{
        let data = {
            startTime:this.state.startDate,
            endTime:this.state.endDate,
            posType:this.state.posType
        };

        this.props.getData(data,(res)=>{
            this.getTrackData(res);
        });

    }

    /**
     * 默认请求数据
     */
    request = ()=> {
        let data = {
            startTime:new Date(this.state.startDate.replace(/-/g,'/')).getTime(),
            endTime:new Date(this.state.endDate.replace(/-/g,'/')).getTime(),
            posType:this.state.posType
        };
        jmAjax({
            url:api.track,
            method:'GET',
            encoding:true,
            encodingType:true,
            data:data
        }).then((res)=>{
            let result = res.data;
            this.getTrackData(result);
        });
    }

    /**
     * 获取轨迹数据
     */
    getTrackData = (result)=>{
        Loading.hide();
        if(result.length>0){
            this.setState({
                trackData:result
            },()=>{
                this.getMarkPoint();
            });
        }else {
            Toast.message('暂无轨迹');
            this.useDefaults();
        }        
    }

    
    /**
     * 获取数据
     */
    getMarkPoint = () =>{
        //如果是重新查询条件，在播放中则暂停
        if(this.state.isPlay){
            this.pause();
        }
        let trackData = this.state.trackData;
        let allPoint = this.getTrackPointArr();
        let pointArr=[];
        pointArr.push(allPoint[0]); //初始化设备位置
        trackData[0].totalDistance = 0;
        let deviceMarker = trackData[0];
        
        this.setState({
            startMarker:{latitude:trackData[0].latitude,longitude:trackData[0].longitude},
            endMarker:{latitude:trackData[trackData.length-1].latitude,longitude:trackData[trackData.length-1].longitude},
            trackPolylinePoint:allPoint,
            deviceMarker:deviceMarker,
            pointArr:pointArr,
            totalProgress:allPoint.length,
            progress:0
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
            this.requestMode();
        });
    }

    /**
     * 显示选择框
     */
    onPullTime = ()=>{
        PullTime.show();
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
        if(trackData.length === 0){
            Toast.message('暂无轨迹');
            return;
        }
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
         if(this.state.pointArr.length>0){
             if(isPlay){
                 this.play();
             }else {
                 this.pause();
             }
   
             this.setState({
                 isPlay:isPlay
             });
         }else{
             Toast.message('暂无轨迹，无法播放');
         }
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
            this.requestMode();
        });        
    }

    /**
     * 播放轨迹
     */
    play =()=>{
        let trackData = this.state.trackData;
        console.log(trackData.length);
        let currentProgress = this.state.progress; //当前播放进度
        console.log(currentProgress);
        console.log(this.state.totalProgress);
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

            let deviceMarker = trackData[currentProgress];
            
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
     * 滑块事件
     */
    onSlidingComplete = (progress)=> {
        console.log(progress,'多少数据');
        
        if(this.state.isPlay){
            this.pause();
        }
        if(progress > this.state.totalProgress-1 || progress < 1){
            if(this.state.isPlay){
                this.play();
            }
            return;
        }
        let trackPolylinePoint = this.state.trackPolylinePoint;
        //过滤轨迹线目前移动的点
        let pointArr = trackPolylinePoint.filter((item,index) => {
            return index < progress;
        });

        //所有数据更新
        this.setState({
            progress,
            pointArr,
            deviceMarker:this.state.trackData[progress-1]
        },()=>{
            //如果在播放在继续播放
            if(this.state.isPlay){
                this.play();
            }
        });
    }
    
    /**
     * 恢复初始状态
     */
   useDefaults = ()=>{
       this.setState({
           trackData:[],
           startMarker:{
               latitude:0,
               longitude:0
           },
           endMarker:{
               latitude:0,
               longitude:0
           },
           trackPolylinePoint:[],
           deviceMarker:{
               latitude:0,
               longitude:0
           },
           progress:0,
           totalProgress:0,
           pointArr:[]
       });
   }    
}