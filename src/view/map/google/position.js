/*
 * @Descripttion: 
 * @version: 
 * @Author: xieruizhi
 * @Date: 2019-08-12 09:36:35
 * @LastEditors: xieruizhi
 * @LastEditTime: 2019-08-14 16:31:10
 */
import React, {Component} from 'react';
import {View,Platform,TouchableOpacity,Image,Text} from 'react-native';
import MapStyles from '../../../components/themes/map';
import MapView,{Marker,Callout} from 'react-native-maps';
import {httpApp} from '../../../http/basic';
import {httpLocationGet} from '../../../http/business';
import gps from '../../../libs/coversionPoint';
import PropTypes from 'prop-types';


export default class Position extends Component { 
    
    static propTypes = {
        isRoad:PropTypes.bool,//是否开启路况
        isRefresh:PropTypes.bool,//是否刷新
        refreshTime:PropTypes.number,
        mapType: PropTypes.oneOf(['standard', 'satellite']),//地图类型
        initialRegion:PropTypes.object,//初始化中心点
        region:PropTypes.object,//中心点
        markerOperation:PropTypes.object,//车辆标记属性
        mylocationOperation:PropTypes.object,//我的位置属性
        edgePadding:PropTypes.object, //标记距离地图内边距
        ChangePositionBtn:PropTypes.object,//切换车和我的位置的按钮属性
        markerInfoWindow:PropTypes.object,//infoWindow
        getMarkerPoint:PropTypes.func,//获取定位信息
        customItem:PropTypes.element,//在地图上自定义其他元素
    };
    
    static defaultProps = {
        isRoad:false,
        mapType:'standard',
        initialRegion:{
            latitude: 22.596904,
            longitude: 113.936674,
            latitudeDelta:0.0922,
            longitudeDelta: 0.0421,
        },
        region:{
            latitude:39.938285,
            longitude: 116.350658,
            latitudeDelta:0.09,//145.5468733622675 0.00040644735832984225 最大值和最小值
            longitudeDelta:0.04 //106.60983654376228 0.0005647605017351509 最大值和最小值
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
            markerImg:require('../../../assets/map/equipment.png'),
            positionImg:require('../../../assets/map/old.png')
        },
        isRefresh:true,
        refreshTime:15000,
        markerInfoWindow:{
            isCustom:false,
        },
        customItem:null
    };

    constructor(props) {
        super(props);
        this.state = {
            // 初始化中心点
            region:this.props.region,
            isRoad:this.props.isRoad,//路况是否开启
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
        };

        
    }

    componentWillUnmount() {
        clearInterval(this.state.timeInterval);
    }

    componentDidMount() {

    }

    render(){
        return (
            <View style={MapStyles.map}>
                <MapView
                    ref={ref => {
                        this.map = ref;
                    }}
                    style={MapStyles.map}
                    onMapReady={this.onMapReady.bind(this)}
                    provider={Platform.OS === 'ios'?undefined:'google'}
                    initialRegion={this.props.initialRegion}
                    region={this.state.region}
                    loadingEnabled={true}
                    minZoomLevel={0}
                    maxZoomLevel={20}
                    showsTraffic={this.state.isRoad}
                    onRegionChange={this.regionChange}
                    showsIndoors={true}
                    showsCompass={false}
                    mapType={this.state.mapType}>
                    {this.markers()}
                    {this.myMarker()}
                </MapView>
                {/* 按钮功能 */}
                <TouchableOpacity style={[MapStyles.btn,MapStyles.roadBtn]}  activeOpacity={1} onPress={() => this.setState({isRoad:!this.state.isRoad})}>
                    <Image style={MapStyles.btnImg} source={this.state.isRoad?require('../../../assets/map/road_active.png'):require('../../../assets/map/road.png')} />
                </TouchableOpacity>
                <TouchableOpacity style={[MapStyles.btn,MapStyles.MapTypeBtn]}   activeOpacity={1} onPress={this.setMapType}>
                    <Image style={MapStyles.btnImg} source={this.state.mapType==='standard'?require('../../../assets/map/layer.png'):require('../../../assets/map/home_icon_live-action.png')} />
                </TouchableOpacity>   
                {
                    this.state.phonePoint.latitude === null?null:
                        <TouchableOpacity style={MapStyles.phonePointBtn}  activeOpacity={1}  onPress={this.changeMarker}> 
                            <Image style={MapStyles.btnImg} source={this.state.isMyPosition? this.props.ChangePositionBtn.positionImg :this.props.ChangePositionBtn.markerImg} />
                        </TouchableOpacity>
                }
                {this.props.customItem()}                        
            </View>
        );
    }

    /**
     * 设置中心点缩放
     */
    regionChange = (data) =>{
        console.log(data,558);
        
        //初始化时不设置,会与可视化冲突
        this.state.region = data;
    }

    /**
     * 地图加载完毕
     */
    onMapReady(){
        this.getMarker();
        this.getPhonePoint();
        if(this.props.isRefresh){
            this.state.timeInterval = setInterval(() => {
                this.getMarker();
                this.getPhonePoint();
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
            console.log(region,555);
            
            this.setState({
                region:{
                    ...this.state.region,
                    ...region
                }
            },()=>{
                console.log(this.state.region,900);
            });
            
            //气泡切换暂时停用,多次点击会产生偏移
            // let openName = type ? 'myMarker' :'markers';
            // this.showInfoWindow(openName);//显示气泡
        });
    }

    /**
     * 显示气泡
     * @param {String} name  marker的id名字
     */
    showInfoWindow= (name)=>{
        if(this.refs[name]){
            setTimeout(() => {
                this.refs[name].showCallout();
            },50);
        }
    }

    /**
     * 隐藏气泡
     * @param {String} name  marker的id名字
     */
    hideInfoWindow= (name)=>{
        this.refs[name].hideCallout();
    }

    /**
     * 获取手机位置
     */
    getPhonePoint = (marker) => {
        httpLocationGet('WGS84').then((data)=>{
            //获取上一次设置的经纬度,减少渲染
            let comparisonData = this.state.phonePoint;
            if(data.lat === comparisonData.latitude && data.lng === comparisonData.longitude){
                return;
            }

            let point = {
                latitude: data.lat,
                longitude: data.lng
            };
            console.log(point,999);
            this.setState({
                phonePoint:point,
            });
        });       
    };

    /**
     * 获取标记
     */
    getMarker = ()=> {
        this.props.getMarkerPoint((data)=>{
            //如果和上次地址一样则不渲染
            if(this.state.markerPoint.latitude === data.latitude && this.state.markerPoint.longitude === data.longitude){
                return;
            }
            let point = {
                latitude:data.latitude,
                longitude: data.longitude,
            };
            console.log(point,678);
            this.setState({
                markerPoint:point,
                locationData:data       
            },()=>{
                this.showInfoWindow('markers');
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
        });
    };

    /**
     * 我的位置
     */
    myMarker = ()=> {
        const marker = this.state.phonePoint.latitude == null?null:
            <Marker 
                ref={'myMarker'}
                identifier={'phone'} 
                coordinate={this.state.phonePoint} >
                <Image 
                    style={this.props.mylocationOperation.style ? this.props.mylocationOperation.style:MapStyles.markerImg} 
                    source={this.props.mylocationOperation.image} />
                <Callout >
                    <View style={{width:58}}>
                        <Text>我的位置</Text>
                    </View>
                </Callout>
            </Marker>;
        return marker;
    };

    /**
     * 车辆标记
     */
    markers = ()=>{
        const markers = this.state.markerPoint.latitude===null? null:
            <Marker
                ref={'markers'}
                identifier={'mapMark'}
                coordinate={this.state.markerPoint}>
                <Image 
                    style={this.props.markerOperation.style ? this.props.markerOperation.style:MapStyles.markerImg} 
                    source={this.props.markerOperation.image? this.props.markerOperation.image :require('../../../assets/map/oldMan.png') }/>
                <Callout tooltip={this.props.isCustom}>
                    {this.props.markerInfoWindow.markerInfo ? this.props.markerInfoWindow.markerInfo() : this.markerInfo()}
                </Callout>               
            </Marker>;
        return markers;
    };

    /**
     * 标记的气泡
     */
    markerInfo= ()=>{
        return <View style={MapStyles.infoWindow}>
            <View style={MapStyles.infoWindowItem}>
                <Text>{this.state.locationData.imei}</Text>
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
            <View style={MapStyles.infoWindowItem}>
                <Text style={MapStyles.infoWindowTitle}>地       址:</Text>
                <Text style={MapStyles.infoWindowValue}> {this.state.locationData.address}</Text>
            </View>            
        </View>;
    }


    /**
     *  可是可视范围内
     */
    fitAllMarkers=()=> {
        this.map.fitToCoordinates([this.state.markerPoint,this.state.phonePoint], {
            edgePadding: this.props.edgePadding,
            animated: true,
        });
    }
}