/*
 * @Descripttion: 
 * @version: 
 * @Author: xieruizhi
 * @Date: 2019-09-03 10:32:27
<<<<<<< HEAD
 * @LastEditors: liujinyuan
 * @LastEditTime: 2020-07-20 18:23:00
=======
 * @LastEditors: xieruizhi
 * @LastEditTime: 2020-07-02 16:18:56
>>>>>>> d0ec6cce4bda8c6c63736d619b74440f92df8904
 */
import React, {Component} from 'react';
import {View,TouchableOpacity,Dimensions} from 'react-native';
import PropTypes from 'prop-types';
import Styles from '../style/base';
import { Icon,Toast } from '../../../components/index'
import MapStyles from '../style/track';
import Controller from './TrackController';
import MarkerController from './MarkerController';
import {jmAjax} from '../../../http/business';
import api from '../../../api/index';
import gps from '../../../libs/coversionPoint';
import PullTime from './PullTime';
import {geocoder} from '../comm';

const FirstImg = require('../../../assets/track/journey_detail_icon_start.png');
const DefaultImg = require('../../../assets/track/journey_detail_icon_path.png');
const LastImg = require('../../../assets/track/journey_detail_icon_end.png');
const ActiveImg = require('../../../assets/track/journey_detail_icon_start_de.png');
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
        roadBtnOptions:PropTypes.object,//路况样式设置
        mapTypeBtnOptions:PropTypes.object,//地图类型设置
        // roadBtnStyle:PropTypes.object,//路况样式
        // roadBtnIcon:PropTypes.object,//路况图标
        // mapTypeBtnStyle:PropTypes.object,//地图类型样式
        // mapTypeBtnIcon:PropTypes.object,//地图类型图标
        playImg:PropTypes.object, 
        getData:PropTypes.func,
        controllerType:PropTypes.number,//控制面板类型 0为轨迹，1为打点
        startDate:PropTypes.oneOfType([PropTypes.string,PropTypes.number]),
        endDate:PropTypes.oneOfType([PropTypes.string,PropTypes.number])
    }

    static defaultProps = {
        // roadBtnStyle:Styles.btn,
        // mapTypeBtnStyle:Styles.btn,
        // mapTypeBtnIcon:{
        //     on:'map_cutover_off',
        //     off:'map_cutover_on'
        // },
        // roadBtnIcon:{
        //     on:'map_road-condition_on',
        //     off:'map_road-condition_off'
        // },
        roadBtnOptions:{
            image:{
                on:'map_road-condition_on',
                off:'map_road-condition_off',
            },
            style:Styles.btn
        },
        mapTypeBtnOptions:{
            image:{
                on:'map_cutover_off',
                off:'map_cutover_on',
            },
            style:Styles.btn            
        },
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
            play:'trajectory_play_on',
            pause:'trajectory_play_off'
        },
        controllerType:0,
        startDate:new Date(new Date(new Date().Format('yyyy/MM/dd')+' 00:00').getTime()).Format('YYYY-MM-DD hh:mm'),
        endDate:new Date().Format('YYYY-MM-DD hh:mm')
    }

    constructor(props) {
        super(props);
        this.timer = null;

        this.state = {
            initialRegion:this.props.initialRegion,
            mapType:this.props.mapType,//地图类型
            trafficEnabled:this.props.trafficEnabled,//路况是否开启
            isTrackPolylineShow:true,//轨迹线是否显示
            isPlay:false,//是否播放
            speed:700,//播放速度
            startDate:this.props.startDate,
            endDate:this.props.endDate,
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
            visualRange:[],//可是区域范围
            deviceMarker:{
                latitude:0,
                longitude:0,
            },//设备标记
            progress:0,//进度条
            totalProgress:0,//总进度条
            totalDistance:0,
            markerArr:[],//打点设备坐标数组,
            byClickMarkerInfo:{
                date:'',
                address:''
            },
            isPanelShow:false,//显示信息面板
            tagIndex:0,//点击的气泡位置
        };
    }

    // componentWillMount() {
    //     if(this.mapViewFunc){
    //         this.mapViewFunc.reloadView();
    //     }
    // }

    componentDidMount() {
        this.onPullTime();
    }

    componentWillUnmount() {
        Toast.remove(this.loading);
    }

    /**
     * 路况按钮
     */
    roadBtn = ()=> {
        return <TouchableOpacity style={[Styles.btn,Styles.roadBtn,this.props.roadBtnOptions.style]}  activeOpacity={1} onPress={() => this.setState({trafficEnabled:!this.state.trafficEnabled})}>
             <Icon name={this.state.trafficEnabled?this.props.roadBtnOptions.image.on:this.props.roadBtnOptions.image.off} size={'100%'} />
        </TouchableOpacity>;
    }

    /**
     * 地图类型按钮
     */
    mapTypeBtn = ()=> {
        return <TouchableOpacity style={[Styles.btn,Styles.mapTypeBtn,this.props.mapTypeBtnOptions.style]}   activeOpacity={1} onPress={this.setMapType}>
            <Icon name={this.state.mapType==='standard'?this.props.mapTypeBtnOptions.image.off:this.props.mapTypeBtnOptions.image.on} size={'100%'} />
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
        return this.props.controllerType?<MarkerController
                onSpeed={this.onSpeed}
                progress={this.state.progress}
                totalProgress={this.state.totalProgress}
                isPlay={this.state.isPlay}
                onSlidingComplete={this.onSlidingComplete}
                deviceInformation={this.state.deviceMarker}
                onReplay={this.onReplay}
                onPlay={this.onPlay}
                byClickMarkerInfo={this.state.byClickMarkerInfo}
                isPanelShow={this.state.isPanelShow}
                onPanel={this.onPanel}
        >
        </MarkerController>
        : <View style={MapStyles.bottomContent}>
            <Controller
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
                    totalDistance={this.state.totalDistance}
                >
            </Controller>
        </View>;      
    }

    /**
     * 时间选择框
     */
    pullTime = ()=>{
        return !this.props.controllerType? <PullTime 
            onConfirm={this.onConfirm} 
            dimDd = {this.props.dimDd}
            startDate={this.state.startDate}
            endDate={this.state.endDate}
        ></PullTime>:null;    
    }


    onMapReady(userMapType) {
        if(this.mapViewFunc){
            this.mapViewFunc.reloadView();
        }
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
        this.loading = Toast.loading(I18n.t('加载中')+'...');
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

    onPanel = ()=> {
        this.setState({
            isPanelShow:false
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
<<<<<<< HEAD
=======
            console.log(res,'地址轨迹');
>>>>>>> d0ec6cce4bda8c6c63736d619b74440f92df8904
            let result = res.data || [];
            this.getTrackData(result);
        }).catch(()=>{
            Toast.remove(this.loading);
        });
    }

    /**
     * 获取轨迹数据
     */
    getTrackData = (result)=>{
        Toast.remove(this.loading);
        if(result.length>0){
            result.forEach((res)=> {
<<<<<<< HEAD
                res.gpsLatitude = res.latitude;
                res.gpsLongitude = res.longitude;
=======
>>>>>>> d0ec6cce4bda8c6c63736d619b74440f92df8904
                let baidu = this.state.userMapType ? gps.GPSToChina(res.latitude,res.longitude): gps.GPSToBaidu(res.latitude,res.longitude);
                res.latitude = baidu.lat;
                res.longitude = baidu.lng;
            });
            this.setState({
                trackData:result
            },()=>{
                this.getMarkPoint();
            });
        }else {
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
            this.setState({
                isPlay:false
            }); 
        }

        let trackData = this.state.trackData;
        let allPoint = this.getTrackPointArr();
        let pointArr=[];
        pointArr.push(allPoint[0]); //初始化设备位置
        let deviceMarker = trackData[0];
        
        this.setState({
            startMarker:{latitude:trackData[0].latitude,longitude:trackData[0].longitude},
            endMarker:{latitude:trackData[trackData.length-1].latitude,longitude:trackData[trackData.length-1].longitude},
            trackPolylinePoint:allPoint,
            visualRange:allPoint,
            deviceMarker:deviceMarker,
            pointArr:pointArr,
            totalProgress:this.props.controllerType?allPoint.length:allPoint.length-1,
            progress:0,
            markerArr:this.getMarkerArr(),
            totalDistance:this.countTotalTrack(allPoint),
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

    getMarkerArr = ()=>{
        let arr = [];
        let trackData = this.state.trackData;
        trackData.forEach((res,index)=> {
            let icon = index == 0 ? FirstImg : index === trackData.length-1?LastImg:DefaultImg;
            arr.push({
                latitude:res.latitude,
                longitude :res.longitude,
                visible:true,
                icon:icon
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
        console.log('重置啦啦啦啦啦啦啦啦');
        let trackData = this.state.trackData;
        if(trackData.length === 0){
            Toast.message(I18n.t('暂无轨迹'));
            return;
        }
        let deviceMarker = trackData[0];
        this.pause();
        this.setState({
            progress:0,
            isPlay:true,
            pointArr:[this.state.trackPolylinePoint[0]],
            deviceMarker:deviceMarker
        },()=>{
            // this.play();
            this.onBegining();
        });
    }   

    /**
     *播放和暂停点击事件
     */

     onPlay = (isPlay) =>{
         if(this.state.pointArr.length>0){
             if(isPlay){
                //播放的时候打点的marker需要恢复到默认的图标
               let markerArr = this.state.markerArr;
               if(this.state.tagIndex!=0 && this.state.tagIndex!=markerArr.length-1){
                    markerArr[this.state.tagIndex].icon = DefaultImg;
               }
               this.setState({
                    markerArr
               },()=>{
                    if(this.state.progress == 0){
                        this.onBegining();
                    }else {
                        this.play();
                    }
               });
             }else {
                 this.pause();
             }
             this.setState({
                 isPlay:isPlay
             },()=>{
             });
         }else{
             Toast.message(I18n.t('暂无轨迹，无法播放'));
             this.setState({
                 isPlay:false
             });
         }
     }

     /**
      * 从头播放
      */
     onBegining =()=> {
        this.setState({
            markerArr:this.updateMarkerArr()
        },()=>{
            this.play();
        });
     }

     /**
      * 重置marker恢复初始化状态
      */
     updateMarkerArr = ()=>{
         let markerArr = [...this.state.markerArr];
         markerArr.forEach((item)=>{item.visible=false;});
         return markerArr;
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
        this.setState({
            isPanelShow:false
        },()=>{
            
        });

        let trackData = this.state.trackData;
        let currentProgress = this.state.progress; //当前播放进度
        let pointArr = null;

        this.timer = setInterval(()=>{  

            //已播完 
            if(this.state.progress === this.state.totalProgress){
                Toast.message(I18n.t('播放完成'));
                this.reset();
                this.pause();
                return;
            }
              
            //打点
            let markerArr = [...this.state.markerArr];
            markerArr[currentProgress].visible = true;
    
            //播放中
            currentProgress++;
            //轨迹
            pointArr = this.state.trackPolylinePoint.slice(0,currentProgress+1);
            let deviceMarker = trackData[currentProgress];
     
            this.setState({
                progress:currentProgress,
                pointArr:pointArr,
                deviceMarker:deviceMarker,
<<<<<<< HEAD
                visualRange:this.props.controllerType? [trackData[currentProgress-1]]:[deviceMarker],
                markerArr:markerArr
=======
                visualRange:[{
                    latitude:deviceMarker.latitude,
                    longitude :deviceMarker.longitude,
                }]
>>>>>>> d0ec6cce4bda8c6c63736d619b74440f92df8904
            },()=>{
                this.onViewArea(deviceMarker);
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
            deviceMarker:deviceMarker,
            visualRange:this.state.trackPolylinePoint
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
        return totalMileage;
    }

    /**
     *  可是可视范围内(仅限谷歌)
     */
    fitAllMarkers =()=> {
        this.map.fitToCoordinates(this.state.visualRange, {
            edgePadding:{top: 40,right: 40,bottom: 40,left: 40 },
            animated: true,
        });
    }
    
    /**
     * 可视区域（仅限谷歌）
     */
    onViewArea =(point)=> {
        const dimensions = Dimensions.get('window');//获取屏幕大小
        if(this.state.userMapType){
            this.map.pointForCoordinate(point).then(coordinate => {
                if(coordinate.x < 10 || coordinate.y < 10 || coordinate.x > dimensions.width - 10 || coordinate.x > dimensions.height * 0.7 - 10){
                    this.setState({
                        initialRegion:{
                            ...this.state.initialRegion,
                            latitude:point.latitude,
                            longitude:point.longitude
                        }
                    });
                }
            });
        }    
    }
    

    /**
     * 滑块事件
     */
    onSlidingComplete = (progress)=> {
        if(this.state.trackData.length===0){
            return;
        }
        
        let trackPolylinePoint = this.state.trackPolylinePoint;

        if(this.state.isPlay){
            this.pause();
        }
        if(progress > this.state.totalProgress || progress < 1){
            if(progress<1){
                this.setState({
                    progress:0,
                    pointArr:[trackPolylinePoint[0]],
                    deviceMarker:this.state.trackData[0],
                    markerArr:this.updateMarkerArr()
                },()=>{
                    if(this.state.isPlay){
                        this.play();
                    }
                });
            }else{
                if(this.state.isPlay){
                    this.play();
                }
            }
            return;
        }
        

        //过滤轨迹线目前移动的点
        let pointArr = trackPolylinePoint.filter((item,index) => {
            return index < progress;
        });

        this.state.markerArr.forEach((item,index) => {
            item.visible = index < progress ? true :false  
        });

        //所有数据更新
        this.setState({
            progress,
            pointArr,
            deviceMarker:this.state.trackData[progress],
            markerArr:this.state.markerArr
        },()=>{
            //如果在播放在继续播放
            if(this.state.isPlay){
                this.play();
            }
        });
    }

    onMarkerClick = (data)=> {
        if(this.state.isPlay){
            this.pause();
            this.setState({
                isPlay:!this.state.isPlay
            });
        }
        //地址解析
        geocoder(this.state.trackData[data.tag]).then((res)=>{
            this.setState({
                byClickMarkerInfo:{
                    address:res.address,
                    date:res.gpsTime
                },
                isPanelShow:true
            });
        });
        //被点击的marker更新一下图标
        let markerArr = this.state.markerArr;
        markerArr.forEach((item,markerArrIndex)=>{
            if(data.tag == markerArrIndex ){
                if(data.tag!=0 && data.tag!=this.state.trackData.length-1){
                    item.icon = ActiveImg;
                }
            }else {
                if(markerArrIndex!=0 && markerArrIndex!=this.state.trackData.length-1){
                    item.icon = DefaultImg;
                } 
            }
        });

        this.setState({
            markerArr:markerArr,
            tagIndex:data.tag
        },()=>{
        })
    }
    
    /**
     * 恢复初始状态
     */
   useDefaults = ()=>{
       if(this.state.isPlay){
           this.pause();
           this.setState({
               isPlay:false
           }); 
       }
       Toast.message(I18n.t('暂无轨迹'));
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
           pointArr:[],
           totalDistance:0
       });
   }   
}