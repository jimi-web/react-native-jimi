/*
 * @Descripttion: 
 * @version: 
 * @Author: xieruizhi
 * @Date: 2019-08-12 09:34:22
 * @LastEditors: xieruizhi
 * @LastEditTime: 2019-08-19 14:43:01
 */
import React, {Component} from 'react';
import {View,Platform,TouchableOpacity,Image,Text,Dimensions} from 'react-native';
import {MapView, MapTypes, Overlay} from 'react-native-baidu-map-jm';
import MapStyles from '../style/position';
import {httpLocationGet} from '../../../http/business';
const {height, width} = Dimensions.get('window');
import PropTypes from 'prop-types';


export default class Position extends Component { 
    static propTypes = { 
        mapType: PropTypes.oneOf(['standard', 'satellite']),//地图类型
        initialRegion:PropTypes.object,//初始化中心点
        customItem:PropTypes.func,//在地图上自定义其他元素
        roadBtnStyle:PropTypes.object,//路况样式
        mapTypeBtnStyle:PropTypes.object,//地图类型样式
        phonePointBtnStyle:PropTypes.object,//我的位置样式
        ChangePositionBtn:PropTypes.object,//切换车和我的位置的按钮属性
    }

    static defaultProps = {
        mapType:'standard',
        initialRegion:{
            latitude: 22.596904,
            longitude: 113.936674,
            latitudeDelta:0.0922,
            longitudeDelta: 0.0421,
        }, 
        customItem:null,
        roadBtnStyle:MapStyles.btn,
        mapTypeBtnStyle:MapStyles.btn,
        phonePointBtnStyle:MapStyles.phonePointBtn    
    }


    constructor(props) {
        super(props);
        this.state = {
            mapType:this.props.mapType,//地图类型
            // 初始化中心点
            region:null,
            initialRegion:this.props.region,
            trafficEnabled:this.props.trafficEnabled,//路况是否开启
            // 当前手机位置
            phonePoint:{
                latitude: null,
                longitude: null, 
            },            
            markerPoint:{
                latitude:null,
                longitude:null,                    
            },
            ChangePositionBtn:{
                markerImg:require('../../../assets/map/equipment.png'),
                positionImg:require('../../../assets/map/old.png')
            },
            isMyPosition :false,// 判断是否切换到我的位置
            isInit:false
        };
    }

    render(){
        return (
            <View style={MapStyles.map}>
                <MapView
                    mapType={this.state.mapType === 'standard' ? 1 : 0}
                    width={width}
                    height={height}
                    zoom={18}
                    center={this.state.region?this.state.region:this.state.initialRegion}
                    trafficEnabled={this.state.trafficEnabled}
                    onMapLoaded={(params)=>{
                        this.getPhonePoint();
                        this.getMarker();
                    }}
                >  

                    <Overlay.Marker
                        location={this.state.markerPoint}
                        icon={'icon_car'}
                    />
                    <Overlay.Marker
                        title={'我的位置'}
                        location={this.state.phonePoint}
                        icon={'home_icon_locat'}
                    />
                    
                </MapView>
                <TouchableOpacity style={[MapStyles.btn,MapStyles.roadBtn,this.props.roadBtnStyle]}  activeOpacity={1} onPress={() => this.setState({isRoad:!this.state.isRoad})}>
                    <Image style={MapStyles.btnImg} source={this.state.isRoad?require('../../../assets/map/road_active.png'):require('../../../assets/map/road.png')} />
                </TouchableOpacity>
                <TouchableOpacity style={[MapStyles.btn,MapStyles.mapTypeBtn,this.props.mapTypeBtnStyle]}   activeOpacity={1} onPress={this.setMapType}>
                    <Image style={MapStyles.btnImg} source={this.state.mapType==='standard'?require('../../../assets/map/layer.png'):require('../../../assets/map/home_icon_live-action.png')} />
                </TouchableOpacity>   
                {
                    this.state.phonePoint.latitude === null?null:
                        <TouchableOpacity style={[MapStyles.phonePointBtn,this.props.phonePointBtnStyle]}  activeOpacity={1}  onPress={this.changeMarker}> 
                            <Image style={MapStyles.btnImg} source={this.state.isMyPosition? this.props.ChangePositionBtn.positionImg :this.props.ChangePositionBtn.markerImg} />
                        </TouchableOpacity>
                }
                {this.props.customItem ?this.props.customItem :null} 
            </View>
        );
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
        });
    }


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
            this.setState({
                markerPoint:point,
                locationData:data       
            },()=>{
                // this.showInfoWindow('markers');
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
            this.setState({
                phonePoint:point,
            });
        });       
    };

}