/*
 * @Descripttion: 
 * @version: 
 * @Author: xieruizhi
 * @Date: 2019-08-12 09:36:35
 * @LastEditors: xieruizhi
 * @LastEditTime: 2019-09-03 10:10:20
 */
import React, {Component} from 'react';
import {View,Platform,TouchableOpacity,Image,Text} from 'react-native';
import MapStyles from '../style/position';
import gps from '../../../libs/coversionPoint';
import {httpLocationGet} from '../../../http/business';
import PropTypes from 'prop-types';

export default class MapUtils extends Component { 
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
            }
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
        this.getMarker(type);
        if(this.state.ChangePositionBtn.isShow){
            this.getPhonePoint(type);
        }
        
        if(this.props.isRefresh){
            this.state.timeInterval = setInterval(() => {
                this.getMarker(type);
                if(this.state.ChangePositionBtn.isShow){
                    this.getPhonePoint(type);
                }
            },this.props.refreshTime);
        }
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
     * @param {String} type  坐标类型
     */
    getPhonePoint = (type) => {
        httpLocationGet(type).then((data)=>{
            if(type == 'WGS84'){
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

            console.log(point);
            
            this.setState({
                phonePoint:point,
            });
        });       
    };

    /**
     * 获取标记
     */
    getMarker = (type)=> {
        if(this.props.getMarkerPoint){
            this.props.getMarkerPoint((data)=>{
                this.drawMarker(data,type);
            });
        }else {
            let data = {
                imei:'555137100102921',
                latitude:22.54605355,
                longitude:114.02597366,
                gpsTime:'2019-08-09 10:37:42',
                otherPosTime:'2019-08-09 10:37:42',
                posType:'WIFI',
                gpsSpeed:'10',
                address:'深圳市宝安区留仙一路高新奇b栋几米物联有限公司gubuygyhiuhuihui'
            };

            this.drawMarker(data,type);
        }

    };

    /**
     * 绘制marker
     */
    drawMarker = (data,type)=>{
        //如果和上次地址一样则不渲染
        if(this.state.markerPoint.latitude === data.latitude && this.state.markerPoint.longitude === data.longitude){
            return;
        }
        let point = {
            latitude:data.latitude,
            longitude: data.longitude,
        };
        console.log(point);
        this.setState({
            markerPoint:point,
            locationData:data       
        },()=>{
            if(type == 'WGS84'){
                this.showInfoWindow('markers');
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
        return <View style={MapStyles.infoWindow}>
            <View style={MapStyles.infoWindowItem}>
                <Text style={MapStyles.imei}>{this.state.locationData.imei}</Text>
            </View>
            <View style={MapStyles.infoWindowItem}>
                <Text style={MapStyles.infoWindowTitle}>速       度:</Text>
                <Text style={MapStyles.infoWindowValue}> {this.state.locationData.gpsSpeed}km/h</Text>
            </View>                          
            <View style={MapStyles.infoWindowItem}>
                <Text style={MapStyles.infoWindowTitle}>定位方式:</Text>
                <Text style={MapStyles.infoWindowValue}> {this.state.locationData.posType}</Text>
            </View>      
            <View style={MapStyles.infoWindowItem}>
                <Text style={MapStyles.infoWindowTitle}>定位时间:</Text>
                <Text style={MapStyles.infoWindowValue}> {this.state.locationData.gpsTime}</Text>
            </View>     
            <View style={MapStyles.infoWindowItem}>
                <Text style={MapStyles.infoWindowTitle}>通讯时间:</Text>
                <Text style={MapStyles.infoWindowValue}> {this.state.locationData.otherPosTime}</Text>
            </View>    
            <View style={[MapStyles.infoWindowItem]}>
                <Text style={MapStyles.infoWindowTitle}>地        址:</Text>
                <Text style={MapStyles.infoWindowValue}> {this.state.locationData.address}{'\n'}                                                        
                </Text>
            </View>     
        </View>;
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
                    if(mapType){
                        this.InfoWindowFunc.update();
                    }
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