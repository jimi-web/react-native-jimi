/*
 * @Descripttion: 
 * @version: 
 * @Author: xieruizhi
 * @Date: 2019-08-19 10:36:46
 * @LastEditors: xieruizhi
 * @LastEditTime: 2019-09-11 15:20:42
 */

import React, {Component} from 'react';
import {View,Platform,TouchableOpacity,Image,Text,Slider} from 'react-native';
import {MapView,Overlay} from 'react-native-baidu-map-jm';
import Styles from '../style/base';
import MapStyles from '../style/track';
import TrackUtils from './index';
import PropTypes from 'prop-types';

export default class BaiduTrack extends TrackUtils {
    static propTypes = {
        ...TrackUtils.propTypes
    }

    static defaultProps = {
        ...TrackUtils.defaultProps
    }


    constructor(props) {
        super(props);
        Object.assign(this.state, {
            region:null
        });
    }

    render(){
        return (
            <View style={Styles.container}>
                <MapView
                    mapType={this.state.mapType === 'standard' ? 1 : 2}
                    style={Styles.container}
                    zoom={18}
                    center={this.props.initialRegion}
                    onMapLoaded={()=>{
                        this.onMapReady(0);
                    }}
                    visualRange = {this.state.trackPolylinePoint}
                >
                    {/* 起点 */}
                    {
                        this.state.startMarker.latitude ?
                            <Overlay.Marker
                                location={this.state.startMarker}
                                icon={this.props.startMarkerOperation.image}
                            />
                            :
                            null
                    }
                    {/* 终点 */}
                    {
                        this.state.endMarker.latitude ?
                            <Overlay.Marker
                                location={this.state.endMarker}
                                icon={this.props.endMarkerOperation.image}
                            />
                            :
                            null
                    }
                    {/* 设备 */}
                    {
                        this.state.deviceMarker.latitude ?
                            <Overlay.Marker
                                location={{latitude:this.state.deviceMarker.latitude,longitude:this.state.deviceMarker.longitude}}
                                icon={this.props.deviceMarkerOperation.image}
                                rotate={this.state.deviceMarker.direction}
                            />
                            :
                            null
                    }
                    {
                        this.state.pointArr.length > 0 ?
                            <Overlay.Polyline
                                width={2}
                                visible={true}
                                color={'50AE6F'}
                                points={this.state.pointArr}/>
                            :
                            null
                    }                    
                    {/* 整条轨迹 */}
                    {
                        this.state.trackPolylinePoint.length > 0 ?
                            <Overlay.Polyline
                                width={2}
                                color={'50AE6F'}
                                visible ={this.state.isTrackPolylineShow}
                                points={this.state.trackPolylinePoint}/>
                            :
                            null
                    }
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
                    this.customOverlay()
                }           
            </View>
        );
    }
}