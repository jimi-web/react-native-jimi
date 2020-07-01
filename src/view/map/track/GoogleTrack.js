/*
 * @Descripttion: 
 * @version: 
 * @Author: xieruizhi
 * @Date: 2019-08-19 10:36:46
 * @LastEditors: xieruizhi
 * @LastEditTime: 2020-06-30 11:34:13
 */

import React, {Component} from 'react';
import {View,Platform,TouchableOpacity,Image,Text,Slider} from 'react-native';
import MapView,{Marker,Polyline} from 'react-native-maps';
import Styles from '../style/base';
import MapStyles from '../style/track';
import TrackUtils from './index';
import Controller from './TrackController';
import PropTypes from 'prop-types';

export default class GoogleTrack extends TrackUtils { 

    static propTypes = {
        ...TrackUtils.propTypes
    }

    static defaultProps = {
        ...TrackUtils.defaultProps
    }


    constructor(props) {
        super(props);

    }

    render(){
        return (
            <View style={Styles.container}>
                <MapView
                    ref={ref => {
                        this.map = ref;
                    }}
                    initialRegion={this.state.initialRegion}
                    region={this.state.initialRegion}
                    provider={Platform.OS === 'ios'?undefined:'google'}
                    style={Styles.container} 
                    loadingEnabled={true}
                    minZoomLevel={0}
                    maxZoomLevel={20}
                    showsIndoors={true}
                    showsCompass={false}
                    mapType={this.state.mapType}
                    onMapReady={()=>{
                        this.onMapReady(1);
                    }}
                    onRegionChange={this.onRegionChange}
                >
                    {this.startMarker()}
                    {this.endMarker()}
                    {this.deviceMarker()}
                    {this.allPolyline()}
                    {this.playPolyline()}
                </MapView>
                <View style={MapStyles.bottomContent}>
                    {this.controller()}
                </View>
                {
                    this.roadBtn()
                }
                {
                    this.mapTypeBtn()
                } 
               {
                    this.pullTime()
                }                  
                {
                    this.props.children
                }
            </View>
        );
    }

    /**
     * 开始标记
     */
    startMarker = ()=>{
        const markers = this.state.startMarker.latitude ? 
            <Marker
                coordinate={this.state.startMarker}
            >
                <Image 
                    style={[this.props.startMarkerOptions.style ? this.props.startMarkerOptions.style:MapStyles.startEndImg]} 
                    source={this.props.startMarkerOptions.image? this.props.startMarkerOptions.image :require('../../../assets/track/trajectory_map_start.png') }/>              
            </Marker>:null;
        return markers;
    };

    /**
     * 结束标记
     */
    endMarker = ()=>{
        const markers = this.state.endMarker.latitude ? 
            <Marker
                coordinate={this.state.endMarker}
            >
                <Image 
                    style={[this.props.endMarkerOptions.style ? this.props.endMarkerOptions.style:MapStyles.startEndImg]} 
                    source={this.props.endMarkerOptions.image? this.props.endMarkerOptions.image :require('../../../assets/track/trajectory_map_end.png')}/>              
            </Marker>:null;
        return markers;
    };

    /**
     * 设备标记
     */
    deviceMarker = ()=> {
        const markers = this.state.deviceMarker.latitude ? 
            <Marker
                coordinate={this.state.deviceMarker}
            >
                <Image 
                    style={[this.props.deviceMarkerOptions.style ? this.props.deviceMarkerOptions.style:Styles.deviceMarker,{transform:[{rotate:this.state.deviceMarker.direction?this.state.deviceMarker.direction+'deg':'0deg'}]}]} 
                    source={this.props.deviceMarkerOptions.image? this.props.deviceMarkerOptions.image :require('../../../assets/map/device.png')}/>              
            </Marker>:null;
        return markers;
    }

    /**
     * 整条轨迹
     */
    allPolyline =()=> {
        let color = this.props.polylineOptions ? this.props.polylineOptions.color ? this.props.polylineOptions.color :'#50AE6F' : '#50AE6F';
        let width = this.props.polylineOptions ? this.props.polylineOptions.width ? this.props.polylineOptions.width :2 : 2;
        let track =  this.state.isTrackPolylineShow?  
            this.state.trackPolylinePoint.length > 0 ?<Polyline
                coordinates={this.state.trackPolylinePoint}
                strokeColor={color} 
                strokeWidth={width}
            />:null 
            :null;

        return track;
    }

    /**
     * 播放轨迹
     */
    playPolyline =()=>{
        let color = this.props.playPolylineOptions ? this.props.playPolylineOptions.color ? this.props.playPolylineOptions.color :'#50AE6F' : '#50AE6F';
        let width = this.props.playPolylineOptions ? this.props.playPolylineOptions.width ? this.props.playPolylineOptions.width :2 : 2;        
        let track =  this.state.pointArr.length > 1 ?<Polyline
            coordinates={this.state.pointArr}
            strokeColor={color} 
            strokeWidth={width}
        />:null; 
        return track;        
    }

    /**
     * 缩放地图事件
     */
    onRegionChange =(data)=> {
        this.state.initialRegion = data;
    }
 
}