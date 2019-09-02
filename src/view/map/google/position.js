/*
 * @Descripttion: 
 * @version: 
 * @Author: xieruizhi
 * @Date: 2019-08-12 09:36:35
 * @LastEditors: xieruizhi
 * @LastEditTime: 2019-08-29 18:22:00
 */
import React, {Component} from 'react';
import {View,Platform,TouchableOpacity,Image,Text} from 'react-native';
import MapStyles from '../style/position';
import mapUtils from '../mapUtils';
import MapView,{Marker,Callout} from 'react-native-maps';
import PropTypes from 'prop-types';


export default class Position extends mapUtils { 
    static propTypes = {
        ...mapUtils.propTypes,
    };
    
    static defaultProps = {
        ...mapUtils.defaultProps,
    };

    constructor(props) {
        super(props);
    }

    render(){
        return (
            <View style={MapStyles.map}>
                <MapView
                    ref={ref => {
                        this.map = ref;
                    }}
                    style={MapStyles.map}
                    onMapReady={()=>{
                        this.onMapReady('WGS84');
                    }}
                    provider={Platform.OS === 'ios'?undefined:'google'}
                    initialRegion={this.props.initialRegion}
                    region={this.state.region}
                    loadingEnabled={true}
                    minZoomLevel={0}
                    maxZoomLevel={20}
                    showsTraffic={this.state.trafficEnabled}
                    onRegionChange={this.regionChange}
                    showsIndoors={true}
                    showsCompass={false}
                    mapType={this.state.mapType}>
                    {this.markers()}
                    {this.myMarker()}
                </MapView>
                {/* 按钮功能 */}
                {
                    this.roadBtn()
                }
                {
                    this.mapTypeBtn()
                }
                {
                    this.phonePointBtn()
                }
                {
                    this.customOverlay()
                }                    
            </View>
        );
    }

    /**
     * 设置中心点缩放
     */
    regionChange = (data) =>{
        //避免与气泡冲突
        if(this.state.isInit){
            this.state.region = data;
        }
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
                coordinate={this.state.markerPoint}
                
            >
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
     *  可是可视范围内
     */
    fitAllMarkers=()=> {
        this.map.fitToCoordinates([this.state.markerPoint,this.state.phonePoint], {
            edgePadding: this.props.edgePadding,
            animated: true,
        });
    }
}