/*
 * @Descripttion: 
 * @version: 
 * @Author: xieruizhi
 * @Date: 2019-08-12 09:36:35
 * @LastEditors: xieruizhi
 * @LastEditTime: 2019-08-13 10:38:19
 */
import React, {Component} from 'react';
import {View,Platform,TouchableOpacity,Image,Text} from 'react-native';
import MapStyles from '../../../components/themes/map';
import MapView,{Marker,Callout} from 'react-native-maps';
import {httpApp} from '../../../http/basic';
import {httpLocationGet} from '../../../http/business';
import gps from '../../../libs/coversionPoint';

const DEFAULT_PADDING = { top: 60, right: 40, bottom: 40, left: 60 };//默认边距
let viewport = [];//可视区域列表
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
                latitude: 22.576904,
                longitude: 113.916674,
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
            currentPoint:0,//0是设备位置，1为手机位置
            markerPoint:{
                latitude:null,
                longitude:null,                    
            },
        };
    }

    componentWillUnmount() {
        
    }

    componentDidMount() {
        // this.getPhonePoint();
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
                        <TouchableOpacity style={MapStyles.phonePointBtn}  activeOpacity={1}>
                            <Image style={MapStyles.btnImg} source={this.state.currentPoint === 0?require('../../../assets/map/equipment.png'):require('../../../assets/map/old.png')} />
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
        this.getMarker();
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
     * 获取手机位置
     */
        getPhonePoint = () => {
            httpLocationGet('WGS84').then((data)=>{
                this.setState({
                    phonePoint:{
                        latitude: data.lat,
                        longitude: data.lng
                    },
                },()=>{
                    //默认显示infoWindow
                    if(this.refs['myMarker']){
                        setTimeout(() => {
                            this.refs['myMarker'].showCallout();
                        },50);
                    }
                    viewport.push({
                        latitude: data.lat,
                        longitude: data.lng
                    });
                    console.log(viewport);
                    
                    this.fitAllMarkers();
                });
            });       
        };

        /**
     * 获取标记
     */
        getMarker = ()=> {
            this.setState({
                markerPoint:{
                    latitude:39.938285,
                    longitude: 116.350658,
                }              
            },()=>{
                viewport.push({
                    latitude:39.938285,
                    longitude: 116.350658,
                });
                this.fitAllMarkers();
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
         */
        fitAllMarkers=()=> {
            this.map.fitToCoordinates(this.state.viewport, {
                edgePadding: { top: 0, right: 0, bottom: 0, left: 0 },
                animated: true,
            });
        }


}