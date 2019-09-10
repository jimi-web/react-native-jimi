/*
 * @Descripttion: 
 * @version: 
 * @Author: xieruizhi
 * @Date: 2019-08-12 09:36:35
 * @LastEditors: xieruizhi
 * @LastEditTime: 2019-09-10 10:25:45
 */
import React, {Component} from 'react';
import {View,Platform,TouchableOpacity,Image,Text,ImageBackground} from 'react-native';
import MapStyles from '../style/position';
import gps from '../../../libs/coversionPoint';
import {httpLocationGet,jmAjax} from '../../../http/business';
import {map} from '../../../api/index';
import PropTypes from 'prop-types';

export default class PositionUtils extends Component { 
    static propTypes = {
        trafficEnabled:PropTypes.bool,//是否开启路况
        isRefresh:PropTypes.bool,//是否刷新
        refreshTime:PropTypes.number,
        mapType: PropTypes.oneOf(['standard', 'satellite']),//地图类型
        initialRegion:PropTypes.object,//初始化中心点
        markerOperation:PropTypes.object,//车辆标记属性
        mylocationOperation:PropTypes.object,//我的位置属性
        edgePadding:PropTypes.object, //标记距离地图内边距(暂不需要)
        ChangePositionBtn:PropTypes.object,//切换车和我的位置的按钮属性
        getMarkerPoint:PropTypes.func,//获取定位信息
        customItem:PropTypes.func,//在地图上自定义其他元素
        markerInfoWindow:PropTypes.object,//infoWindow
        roadBtnStyle:PropTypes.object,//路况样式
        mapTypeBtnStyle:PropTypes.object,//地图类型样式
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
        markerOperation:{
            style:MapStyles.markerImg,
            image:require('../../../assets/map/oldMan.png'),
        },
        mylocationOperation:{
            style:MapStyles.markerImg,
            image:require('../../../assets/map/phone.png'),
        },
        edgePadding:{ 
            top: 200, 
            right: 200, 
            bottom: 200, 
            left: 200 
        },
        ChangePositionBtn:{
            isShow:true,
            style:MapStyles.phonePointBtn,
            markerImg:require('../../../assets/map/equipment.png'),
            myPositionImg:require('../../../assets/map/old.png')
        },
        isRefresh:true,
        refreshTime:15000,
        markerInfoWindow:{
            isCustom:false,
        },
        customItem:null,
        roadBtnStyle:MapStyles.btn,
        mapTypeBtnStyle:MapStyles.btn,
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
                latitude: null,
                longitude: null, 
            },            
            markerPoint:{
                latitude:null,
                longitude:null,                    
            },
            isMyPosition :false,// 判断是否切换到我的位置
            isInit:false,//判断出否初始化结束
            timeInterval:null,//计时器
            locationData:null,//定位的所有数据
            ChangePositionBtn:{
                isShow:this.props.ChangePositionBtn.style ? true :this.props.ChangePositionBtn.isShow ? true : false,
                markerImg:this.props.ChangePositionBtn.markerImg ? this.props.ChangePositionBtn.markerImg : require('../../../assets/map/equipment.png'),
                myPositionImg:this.props.ChangePositionBtn.myPositionImg ? this.props.ChangePositionBtn.markerImg : require('../../../assets/map/old.png')                
            },
            userMapType:0,//0为百度，1为谷歌
        };
    }

    componentWillUnmount() {
        clearInterval(this.state.timeInterval);
    }

    /**
     * 地图加载完毕
     * @param {String} type  坐标类型
     */
    onMapReady(type){
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
        httpLocationGet(type).then((data)=>{
            if(this.state.userMapType){
                data = gps.GPSToChina(data.lat,data.lng);
            }
            //获取上一次设置的经纬度,减少渲染
            let comparisonData = this.state.phonePoint;
            if(data.lat === comparisonData.latitude && data.lng === comparisonData.longitude){
                return;
            }

            let point = {
                latitude: data.lat,
                longitude: data.lng
            };

            this.setState({
                phonePoint:point,
            });
        });       
    };

    /**
     * 获取标记
     */
    getMarker = ()=> {
        console.log(this.props.getMarkerPoint);
        
        if(this.props.getMarkerPoint){
            this.props.getMarkerPoint((data)=>{
                let res = data;
                console.log(res);
                this.drawMarker(res);
            });
        }else {
            this.request();
        }
    };

    /**
     * 请求数据默认
     */
    request = ()=>{
        // jmAjax({
        //     url:map.position,
        //     method:'GET',
        //     encoding:true,
        //     encodingType:true
        // }).then((res)=>{
        //     let data = res;
        //     console.log(data);
        //     console.log('data');
        // });
        let result = {
            'code': 0,
            'data': {
                'encodingType': 'imei',
                'encoding': '351608089944623',
                'deviceStatus': 2,
                'clientId': '350000199603207563',
                'deviceId': 'F4AB29e5-D5fa-3f37-69Db-5faEE3D61cdd',
                'deviceName': 'Eric',
                'acc': 'accacc',
                'ci': '5546',
                'direction': 41,
                'baseX': '',
                'lastAccTurnTime': '1120663607495',
                'gateId': 'd5d8BeE9-F798-b3eE-Cbed-AF9Ef4dDaC85',
                'gateTime': '960440526415',
                'gpsInfo': 1,
                'gpsMode': 1,
                'gpsSpeed': 49,
                'gpsTime': '1263511883300',
                'ica': '9875',
                'latitude': 22.5583432558,
                'longitude': 113.9065941055,
                'mcc': '',
                'mnc': '',
                'posType': 2,
                'otherPosTime': '759797411814',
                'posMethod': 2,
                'recordTime': '1309722536121',
                'hbOffOn': 1,
                'accStatus': '',
                'deviceInfo': 'Uzxdyeytr xdd krlu vcyovrnfj.',
                'ext': '',
                'fortifyStatus': '',
                'gPSSignal': '',
                'gpsStatus': 1,
                'oilEleStatus': 1,
                'powerLevel': 1,
                'batteryPowerVal': '',
                'powerValue': '',
                'powerStatus': '',
                'powerPer': '10',
                'seqNo': '',
                'time': '946994902071',
                'alarmType': '20'
            },
            'msg': 'ok'
        };
        this.geocoder(result.data);
    }


    /**
     * 地址解析
     */
    geocoder = (data)=> {
        // jmAjax({
        //     url:map.geocoder,
        //     method:'GET',
        //     data:{
        //         latitude:data.latitude,
        //         longitude:data.longitude,
        //     }
        // }).then((res)=>{
        //     let data = res;
        //     console.log(data);
        //     console.log('data');
        // });

        let result = {
            code:0,
            data:{
                location:'深圳市宝安区新安街道高新奇'
            },
            message:'msg'
        };
        data.address = result.data.location;
        this.drawMarker(data);
    }

    
    /**
     * 绘制marker
     */
    drawMarker = (data)=>{
        console.log(data);
        
        //如果和上次地址一样则不渲染
        if(this.state.markerPoint.latitude === data.latitude && this.state.markerPoint.longitude === data.longitude){
            return;
        }
        let point = {
            latitude:data.latitude,
            longitude: data.longitude,
        };
       
        this.setState({
            markerPoint:point,
            locationData:data       
        },()=>{
            if(this.state.userMapType){
                this.showInfoWindow('markers');
            }else {
                console.log('渲染info');
                console.log(this.InfoWindowFunc);
                this.InfoWindowFunc.update();
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
                    this.state.locationData.powerPer ?
                        <ImageBackground source={require('../../../assets/map/position_bubble_electricity.png')} style={MapStyles.batterybg}>
                            <View style={{height:9,width:18,marginRight:1}}>
                                <View style={{width:this.batteryState().per+'%',height:'100%',backgroundColor:this.batteryState().bgColor,borderRadius:1}}></View>
                            </View>
                        </ImageBackground>:null
                }
            </View>
            <View style={MapStyles.infoWindowItem}>
                <Text style={{color:this.deviceState().color}}>{this.deviceState().text}</Text>
                <Text style={MapStyles.line}>|</Text>
                <Text style={MapStyles.infoWindowTitle}>{this.posType()}</Text>
                <Text style={MapStyles.line}>|</Text>
                <Text style={MapStyles.infoWindowTitle}>{this.state.locationData.gpsSpeed}km/h</Text>
            </View>                              
            <View style={MapStyles.infoWindowItem}>
                <Text style={MapStyles.infoWindowTitle}>定位时间:{this.state.locationData.gpsTime}</Text>
            </View>     
            <View style={MapStyles.infoWindowItem}>
                <Text style={MapStyles.infoWindowTitle}>通讯时间:{this.state.locationData.time}</Text>
            </View>    
            <View style={[MapStyles.infoWindowItem,{paddingBottom:0}]}>
                <Text style={MapStyles.infoWindowTitle}>{this.state.locationData.address}{'\n'}                                                        
                </Text>
            </View>     
        </View>;
    }

    /**
     * 设备状态
     */
    deviceState =()=>{
        let stateOject = {};
        switch (this.state.locationData.deviceStatus) {
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
    posType = ()=>{
        let type = null;
        switch (this.state.locationData.posType) {
        case 0:
            type = 'GPS定位';
            break;
        case 1:
            type = 'LBS定位';
            break;
        case 2:
            type = 'WIFI定位';
        } 

        return type;        
    }
    
    /**
     * 路况按钮
     */
    roadBtn = ()=> {
        return <TouchableOpacity style={[MapStyles.btn,MapStyles.roadBtn,this.props.roadBtnStyle]}  activeOpacity={1} onPress={() => this.setState({trafficEnabled:!this.state.trafficEnabled})}>
            <Image style={MapStyles.btnImg} source={this.state.trafficEnabled?require('../../../assets/map/road_active.png'):require('../../../assets/map/road.png')} />
        </TouchableOpacity>;
    }

    /**
     * 地图类型按钮
     */
    mapTypeBtn = ()=> {
        return <TouchableOpacity style={[MapStyles.btn,MapStyles.mapTypeBtn,this.props.mapTypeBtnStyle]}   activeOpacity={1} onPress={this.setMapType}>
            <Image style={MapStyles.btnImg} source={this.state.mapType==='standard'?require('../../../assets/map/layer.png'):require('../../../assets/map/home_icon_live-action.png')} />
        </TouchableOpacity>; 
    }

    /**
     * 我的位置按钮
     * @param {String} mapType  地图类型，1百度地图
     */
    phonePointBtn = (mapType)=> {
        return  this.state.ChangePositionBtn.isShow ? this.state.phonePoint.latitude === null?null:
            <TouchableOpacity style={[MapStyles.phonePointBtn,this.props.ChangePositionBtn.style?this.props.ChangePositionBtn.style:null]}  activeOpacity={1}  
                onPress={()=>{
                    this.changeMarker();
                }}> 
                <Image style={MapStyles.btnImg} source={this.state.isMyPosition? this.state.ChangePositionBtn.myPositionImg :this.state.ChangePositionBtn.markerImg} />
            </TouchableOpacity>:null;
    }

    /**
     * 自定义覆盖物
     */
    customOverlay = ()=> {
        return this.props.customItem ?this.props.customItem() :null;
    }
}