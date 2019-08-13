/*
 * @Descripttion: 
 * @version: 
 * @Author: xieruizhi
 * @Date: 2019-08-12 09:36:35
 * @LastEditors: xieruizhi
 * @LastEditTime: 2019-08-13 14:09:00
 */
import React, {Component} from 'react';
import {View,Platform,TouchableOpacity,Image,Text} from 'react-native';
import MapStyles from '../../../components/themes/map';
import MapView,{Marker,Callout} from 'react-native-maps';
import {httpApp} from '../../../http/basic';
import {httpLocationGet} from '../../../http/business';
import gps from '../../../libs/coversionPoint';

export default class Position extends Component { 
    constructor(props) {
        super(props);
        this.state = {
            // 中心点
            point:{ 
                latitude: 22.596904,
                longitude: 113.936674,
                latitudeDelta:0.0922,
                longitudeDelta: 0.0421,
            },
            // 初始化中心点
            region:{
                latitude:39.938285,
                longitude: 116.350658,
                latitudeDelta:0.09,//145.5468733622675 0.00040644735832984225 最大值和最小值
                longitudeDelta:0.04 //106.60983654376228 0.0005647605017351509 最大值和最小值
            },
            // 当前手机位置
            phonePoint:{
                latitude: null,
                longitude: null, 
            },
            isRoad:false,//路况是否开启
            mapType:'standard',//地图类型
            markerPoint:{
                latitude:null,
                longitude:null,                    
            },
            isMyPosition :false,// 判断是否切换到我的位置
            isInit:false,//判断出否初始化结束

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
                    initialRegion={this.state.point}
                    region={this.state.region}
                    loadingEnabled={true}
                    minZoomLevel={0}
                    maxZoomLevel={20}
                    onRegionChange={this.regionChange}
                    showsTraffic={this.state.isRoad}
                    showsIndoors={true}
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
                            <Image style={MapStyles.btnImg} source={this.state.isMyPosition?require('../../../assets/map/old.png') :require('../../../assets/map/equipment.png')} />
                        </TouchableOpacity>
                }                             
            </View>
        );
    }

    /**
     * 地图加载完毕
     */
    onMapReady(){
        this.getPhonePoint();
    }

    /**
     * 设置中心点缩放
     */
    regionChange = (data) =>{
        this.state.region = data;
    };

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
            if(type){
                this.getPhonePoint();
            }else {
                this.getMarker();
            }
        });
    }

    /**
     * 获取手机位置
     */
    getPhonePoint = (marker) => {
        httpLocationGet('WGS84').then((data)=>{
            let point = {
                latitude: data.lat,
                longitude: data.lng
            };
            this.setState({
                phonePoint:point,
            },()=>{
                //默认显示infoWindow
                if(this.refs['myMarker']){
                    setTimeout(() => {
                        this.refs['myMarker'].showCallout();
                    },50);
                }
                //初始化先加载手机坐标再加之车辆坐标
                if(!this.state.isInit){
                    this.getMarker(point);                    
                }else {
                    //切换到中心位置
                    this.setState({
                        region:point
                    });
                }
            });
        });       
    };

    /**
     * 获取标记
     */
    getMarker = (myPosition )=> {
        let point = {
            latitude:39.938285,
            longitude: 116.350658,
        };
        this.setState({
            markerPoint:point,
            isInit:true           
        },()=>{
            //仅初始化会可视化两点坐标
            if(!this.state.isInit){ 
                let viewport = [
                    point,
                    myPosition
                ];
                this.fitAllMarkers(viewport);
            }else {
                this.setState({
                    region:point
                });
            }
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
                <Image style={MapStyles.markerImg} source={require('../../../assets/map/phone.png')} />
                <Callout tooltip={false}>
                    <View style={{width:58}}>
                        <Text>我的位置</Text>
                    </View>
                </Callout>
            
            </Marker>;
        return marker;
    };

    /**
     * 多标记
     */
    markers = ()=>{
        const markers = this.state.markerPoint.latitude===null? null:
            <Marker
                ref={'markers'}
                identifier={'mapMark'}
                coordinate={this.state.markerPoint}
            >
                <Image style={MapStyles.markerImg} source={require('../../../assets/map/oldMan.png')} />
            </Marker>;
        return markers;
    };

    /**
     *  可是可视范围内
     * @param {Array} viewport  可视区域的坐标
     */
    fitAllMarkers=(viewport)=> {
        this.map.fitToCoordinates(viewport, {
            edgePadding: { top: 100, right: 100, bottom: 100, left: 100 },
            animated: true,
        });
    }
}