/*
 * @Descripttion: 
 * @version: 
 * @Author: xieruizhi
 * @Date: 2019-08-12 09:36:35
 * @LastEditors: xieruizhi
 * @LastEditTime: 2019-10-22 14:10:43
 */
import React, {Component} from 'react';
import {View,TouchableOpacity,Image,Text,DeviceEventEmitter,AsyncStorage} from 'react-native';
import Styles from '../style/base';
import MapStyles from '../style/position';
import gps from '../../../libs/coversionPoint';
import Loading from '../../../components/loading/Loading';
import { devicePosition } from '../comm';
import {httpLocationGet,jmAjax} from '../../../http/business';
import api from '../../../api/index';
import PropTypes from 'prop-types';
import '../../../libs/time';

export default class PositionUtils extends Component { 
    static propTypes = {
        trafficEnabled:PropTypes.bool,//是否开启路况
        isRefresh:PropTypes.bool,//是否刷新
        refreshTime:PropTypes.number,
        mapType: PropTypes.oneOf(['standard', 'satellite']),//地图类型
        initialRegion:PropTypes.object,//初始化中心点
        deviceMarkerOptions:PropTypes.object,//车辆标记属性
        mylocationOptions:PropTypes.object,//我的位置属性
        edgePadding:PropTypes.object, //标记距离地图内边距(暂不需要)
        ChangePositionBtn:PropTypes.object,//切换车和我的位置的按钮属性
        getData:PropTypes.func,//获取定位信息
        // customItem:PropTypes.func,//在地图上自定义其他元素
        markerInfoWindow:PropTypes.object,//infoWindow
        roadBtnStyle:PropTypes.object,//路况样式
        mapTypeBtnStyle:PropTypes.object,//地图类型样式
        mapControls:PropTypes.func,//添加地图控件
        onDeviceChange:PropTypes.func,//设备位置改变监听事件
        onMyChange:PropTypes.func,//我的位置改变监听事件
    };
    static defaultProps = {
        trafficEnabled:false,
        mapType:'standard',
        initialRegion:{
            latitude: 22.596904,
            longitude: 113.936674,
            latitudeDelta:0.0922,
            longitudeDelta: 0.0421,
        },
        deviceMarkerOptions:{
            style:Styles.deviceMarker,
            image:require('../../../assets/map/device.png'),
        },
        mylocationOptions:{
            style:MapStyles.myMarker,
            image:require('../../../assets/map/trajectory_map_phone_position.png'),
        },
        edgePadding:{ 
            top: 30, 
            right: 30, 
            bottom: 30, 
            left: 30 
        },
        ChangePositionBtn:{
            isShow:true,
            style:MapStyles.phonePointBtn,
            markerImg:require('../../../assets/map/position_map_current-position.png'),
            myPositionImg:require('../../../assets/map/map_phone_position.png')
        },
        isRefresh:true,
        refreshTime:15000,
        markerInfoWindow:{
            isCustom:false,
            visible:true
        },
        // customItem:null,
        roadBtnStyle:Styles.btn,
        mapTypeBtnStyle:Styles.btn,
    };

    constructor(props) {
        super(props);
        this.state = {
            // 初始化中心点
            region:{
                latitude:39.938285,
                longitude: 116.350658,
                latitudeDelta:0.09,//145.5468733622675 0.00040644735832984225 最大值和最小值
                longitudeDelta:0.04 //106.60983654376228 0.0005647605017351509 最大值和最小值
            },
            trafficEnabled:this.props.trafficEnabled,//路况是否开启
            mapType:this.props.mapType,//地图类型
            // 当前手机位置
            phonePoint:{
                latitude: 0,
                longitude: 0, 
            },            
            markerPoint:{
                latitude:0,
                longitude:0,                
            },
            isMyPosition :false,// 判断是否切换到我的位置
            isInit:false,//判断出否初始化结束
            timeInterval:null,//计时器
            locationData:null,//定位的所有数据
            ChangePositionBtn:{
                isShow:this.props.ChangePositionBtn.style ? true :this.props.ChangePositionBtn.isShow ? true : false,
                markerImg:this.props.ChangePositionBtn.markerImg ? this.props.ChangePositionBtn.markerImg : require('../../../assets/map/position_map_current-position.png'),
                myPositionImg:this.props.ChangePositionBtn.myPositionImg ? this.props.ChangePositionBtn.markerImg : require('../../../assets/map/map_phone_position.png')                
            },
            userMapType:0,//0为百度，1为谷歌
            lastAddress:null,//上一次定位点的地址
            visualRange:null
        };
    }


    static upDate() {
        DeviceEventEmitter.emit('jmPosition',{});
    }

    
    componentWillMount(){
        if(this.mapViewFunc){
            this.mapViewFunc.reloadView();
        }
        DeviceEventEmitter.addListener('jmPosition', ()=>{
            this.getMarker();
        });
    }

    componentWillUnmount() {
        Loading.hide();
        clearInterval(this.state.timeInterval);
    }

    /**
     * 地图加载完毕
     * @param {String} type  坐标类型
     */
    onMapReady(type){
        Loading.show();
        this.setState({
            userMapType:type
        },()=>{
            this.getMarker();
            if(this.state.ChangePositionBtn.isShow){
                this.getPhonePoint();
            }
            
            if(this.props.isRefresh){
                this.state.timeInterval = setInterval(() => {
                    this.getMarker();
                    if(this.state.ChangePositionBtn.isShow){
                        this.getPhonePoint();
                    }
                },this.props.refreshTime);
            }
        });
    }

    /**
     * 设备地图类型
     */
    setMapType = () => {
        let type = this.state.mapType === 'satellite'?'standard':'satellite';
        this.setState({mapType:type});
    };

    /**
     * 我的位置和车辆切换
     */
    changeMarker = () => {
        let type = this.state.isMyPosition ? false : true;
        this.setState({
            isMyPosition:type,
        },()=>{
            //切换设置中心位置
            let region = type ? this.state.phonePoint : this.state.markerPoint;
            this.setState({
                region:{
                    ...this.state.region,
                    ...region
                }
            });
            //google气泡切换暂时停用,多次点击会产生偏移
            // let openName = type ? 'myMarker' :'markers';
            // this.showInfoWindow(openName);//显示气泡
        });
    }
    /**
     * 获取手机位置
     */
    getPhonePoint = () => {
        let type = this.state.userMapType ? 'WGS84':'BD09';
        httpLocationGet(type).then((res)=>{
            let data = res;
            let lat = Number(data.lat);
            let lng = Number(data.lng);
            if(this.state.userMapType){
                data = gps.GPSToChina(lat,lng);
            }

            //获取上一次设置的经纬度,减少渲染
            let comparisonData = this.state.phonePoint;
            if(lat === comparisonData.latitude && lng === comparisonData.longitude){
                return;
            }

            let point = {
                latitude: lat,
                longitude: lng
            };

            this.setState({
                phonePoint:point,
            },()=>{
                this.onMyChange(point);
            });
        });       
    };

    /**
     * 获取标记
     */
    getMarker = ()=> {
        if(this.props.getData){
            this.props.getData((data)=>{
                let res = data;
                this.drawMarker(res);
            });
        }else {
            this.request();
        }
    };

    
    /**
     * 请求数据默认
     */
    request = async()=>{
        let deviceInfo = await devicePosition(this.state.markerPoint,this.state.lastAddress);
        this.setState({
            lastAddress:deviceInfo.address
        },()=>{
            if(deviceInfo.latitude){
                this.drawMarker(deviceInfo);
            }else{
                this.onDeviceChange(deviceInfo);
            } 
        });
    }


    /**
     * 绘制marker
     * @param {Object} data  定位信息
     */
    drawMarker = (data)=>{

        console.log(data);
        
        let point = {
            latitude:data.latitude,
            longitude: data.longitude,
        };
        
        AsyncStorage.getItem('jmDeviceName').then((value)=>{
            if(value != data.deviceName){
                AsyncStorage.setItem('jmDeviceName', data.deviceName);
            }
        });
       
        
        data.gpsTime = new Date(data.gpsTime).Format('YYYY-MM-DD hh:mm:ss');
        data.time = new Date(data.time).Format('YYYY-MM-DD hh:mm:ss');
        data.otherPosTime = new Date(data.otherPosTime).Format('YYYY-MM-DD hh:mm:ss');
       
        this.setState({
            markerPoint:point,
            locationData:data       
        },()=>{
            this.onDeviceChange(this.state.locationData);
            if(this.state.userMapType){
                this.showInfoWindow('markers');
            }else {
                //安卓infoWindwo更新需要延迟10ms
                setTimeout(()=>{
                    this.InfoWindowFunc.update();
                },10);
            }
            //仅初始化会可视化两点坐标
            if(!this.state.isInit){ 
                this.setState({
                    isInit:true,
                    region:{
                        ...this.state.region,
                        ...point
                    }
                });
            }

            Loading.hide();
        });
    }


    /**
     * 标记的气泡
     */
    markerInfo= ()=>{
        let infoBordeRadius = this.state.userMapType ? null : 8;
        let shadow = this.state.userMapType ?  null :MapStyles.infoWindowShadow;
        let spaceBetween = this.state.userMapType ? {padding:5,paddingBottom:0} :null;
        return <View style={[MapStyles.infoWindow,shadow,{borderRadius:infoBordeRadius},spaceBetween]}>
            <View style={[MapStyles.infoWindowItem,MapStyles.infoWindowItemImei]}>
                <Text style={MapStyles.imei}>{this.state.locationData.deviceName}</Text>
                {
                    this.state.locationData.powerPer != null ?
                        <View style={MapStyles.batterybg}>
                            <View style={MapStyles.batteryRight}></View>
                            <View style={{height:9,width:18}}>
                                <View style={{width:this.batteryState().per+'%',height:'100%',backgroundColor:this.batteryState().bgColor,borderRadius:1}}></View>
                            </View>
                        </View>
                        :null
                }
            </View>
            <View style={MapStyles.infoWindowItem}>
                <Text style={[MapStyles.infoWindowTitle,{color:this.deviceState(this.state.locationData.deviceStatus).color,paddingTop:1}]}>{this.deviceState(this.state.locationData.deviceStatus).text}</Text>
                <Text style={MapStyles.line}>|</Text>
                <Text style={MapStyles.infoWindowTitle}>{this.posType().text}</Text>
                <Text style={MapStyles.line}>|</Text>
                <Text style={MapStyles.infoWindowTitle}>{this.state.locationData.gpsSpeed ? this.state.locationData.gpsSpeed:0}km/h</Text>
            </View>                              
            <View style={MapStyles.infoWindowItem}>
                <Text style={MapStyles.infoWindowTitle}>定位时间：{this.posType().time}</Text>
            </View>     
            <View style={MapStyles.infoWindowItem}>
                <Text style={MapStyles.infoWindowTitle}>通讯时间：{ this.state.locationData.time}</Text>
            </View>    
            <View style={[MapStyles.infoWindowItem,{paddingBottom:0}]}>
                <Text style={MapStyles.infoWindowTitle}>地址：{this.state.locationData.address}{'\n'}                                                        
                </Text>
            </View>     
        </View>;
    }

    /**
     * 设备状态
     */
    deviceState =(deviceStatus)=>{
        let stateOject = {};
        switch (deviceStatus) {
        case 0:
            stateOject.text = '离线';
            stateOject.color = '#000';
            break;
        case 1:
            stateOject.text = '在线';
            stateOject.color = '#13A887';
            break;
        case 2:
            stateOject.text = '运动';
            stateOject.color = '#13A887';
            break;
        case 3:
            stateOject.text = '静止';
            stateOject.color = '#F82E1B';
            break;
        case null:
            stateOject.text = '离线';
            stateOject.color = '#000'; 
        }
        return stateOject;
    }

    /**
     * 电量状态
     */
    batteryState =()=>{
        let stateOject = {};
        stateOject.per = this.state.locationData.powerPer ;
        stateOject.bgColor = this.state.locationData.powerPer > 20 ? '#13A887' : '#F82E1B';
        return stateOject;
    }

    /**
     * 定位类型
     */
    posType = (deviceInfo)=>{
        let data =deviceInfo ? deviceInfo :this.state.locationData;
        let type = {};
        switch (data.posType) {
        case 'GPS':
            type.text = 'GPS定位';
            type.time = data.gpsTime;
            break;
        case 'LBS':
            type.text = 'LBS定位';
            type.time = data.otherPosTime;
            break;
        case 'WIFI':
            type.text = 'WIFI定位';
            type.time = data.otherPosTime;
        } 
        return type;        
    }
    
    /**
     * 路况按钮
     */
    roadBtn = ()=> {
        return <TouchableOpacity style={[Styles.btn,Styles.roadBtn,this.props.roadBtnStyle]}  activeOpacity={1} onPress={() => this.setState({trafficEnabled:!this.state.trafficEnabled},()=>{
            
        })}>
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
     * 我的位置按钮
     */
    phonePointBtn = ()=> {
        return  this.state.ChangePositionBtn.isShow ? this.state.phonePoint.latitude === null?null:
            <TouchableOpacity style={[MapStyles.phonePointBtn,this.props.ChangePositionBtn.style?this.props.ChangePositionBtn.style:null]}  activeOpacity={1}  
                onPress={()=>{
                    this.changeMarker();
                }}> 
                <Image style={MapStyles.btnImg} source={this.state.isMyPosition? this.state.ChangePositionBtn.myPositionImg :this.state.ChangePositionBtn.markerImg} />
            </TouchableOpacity>:null;
    }

    // /**
    //  * 自定义覆盖物
    //  */
    // customOverlay = ()=> {
    //     return this.props.customItem?this.props.customItem() :null;
    // }

    /**
     * 监听数据变化
     */
    onDeviceChange = (data)=>{
        console.log(data,'wushuju ');
        
        this.props.onDeviceChange && this.props.onDeviceChange(data);
    }

    /**
     * 监听我的位置变化
     */
    onMyChange =(data)=>{
        this.props.onMyChange && this.props.onMyChange(data);
    }
}