/*
 * @Descripttion: 
 * @version: 
 * @Author: xieruizhi
 * @Date: 2019-08-19 10:36:46
 * @LastEditors: xieruizhi
 * @LastEditTime: 2019-09-10 16:40:34
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
                    style={[this.props.startMarkerOperation.style ? this.props.startMarkerOperation.style:MapStyles.startEndImg,{transform:[{rotate:this.state.startMarker.direction+'deg'}]}]} 
                    source={this.props.startMarkerOperation.image? this.props.startMarkerOperation.image :require('../../../assets/track/trajectory_map_start.png') }/>              
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
                    style={[this.props.endMarkerOperation.style ? this.props.endMarkerOperation.style:MapStyles.startEndImg,{transform:[{rotate:this.state.endMarker.direction+'deg'}]}]} 
                    source={this.props.endMarkerOperation.image? this.props.endMarkerOperation.image :require('../../../assets/track/trajectory_map_end.png')}/>              
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
                    style={[this.props.deviceMarkerOperation.style ? this.props.deviceMarkerOperation.style:Styles.deviceMarker,{transform:[{rotate:this.state.deviceMarker.direction+'deg'}]}]} 
                    source={this.props.deviceMarkerOperation.image? this.props.deviceMarkerOperation.image :require('../../../assets/track/track_icon_deveice.png')}/>              
            </Marker>:null;
        return markers;
    }

    /**
     * 整条轨迹
     */
    allPolyline =()=> {
        let track =  this.state.isTrackPolylineShow?  
            this.state.trackPolylinePoint.length > 0 ?<Polyline
                coordinates={this.state.trackPolylinePoint}
                strokeColor="#50AE6F" 
                strokeWidth={2}
            />:null 
            :null;

        return track;
    }

    /**
     * 播放轨迹
     */
    playPolyline =()=>{
        let track =  this.state.pointArr.length > 1 ?<Polyline
            coordinates={this.state.pointArr}
            strokeColor="#50AE6F" 
            strokeWidth={2}
        />:null; 
        return track;        
    }
 
}