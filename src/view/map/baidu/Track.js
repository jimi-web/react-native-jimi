/*
 * @Descripttion: 
 * @version: 
 * @Author: xieruizhi
 * @Date: 2019-08-19 10:36:46
 * @LastEditors: xieruizhi
 * @LastEditTime: 2019-09-05 16:47:29
 */

import React, {Component} from 'react';
import {View,Platform,TouchableOpacity,Image,Text,Slider} from 'react-native';
import {MapView,Overlay} from 'react-native-baidu-map-jm';
import Styles from '../style/base';
import MapStyles from '../style/track';
import TrackUtils from '../track/index';
import PropTypes from 'prop-types';

export default class Track extends TrackUtils {
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
        console.log(this.state.pointArr,88);
        
        return (
            <View style={Styles.container}>
                <MapView
                    mapType={this.state.mapType === 'standard' ? 1 : 2}
                    style={Styles.container}
                    zoom={18}
                    center={this.state.region?this.state.region:this.props.initialRegion}
                    onMapLoaded={()=>{
                        this.getMarkPoint();
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
                        this.state.deviceMarker.latLng ?
                            <Overlay.Marker
                                location={{latitude:this.state.deviceMarker.latLng.lat,longitude:this.state.deviceMarker.latLng.lng}}
                                icon={this.props.deviceMarkerOperation.image}
                            />
                            :
                            null
                    }
                    {
                        this.state.pointArr.length > 1 ?
                            <Overlay.Polyline
                                width={1}
                                visible={true}
                                color={'50AE6F'}
                                points={this.state.pointArr}/>
                            :
                            null
                    }                    
                    {/* 整条轨迹 */}
                    {/* {
                        this.state.trackPolylinePoint.length > 0 ?
                            <Overlay.Polyline
                                width={2}
                                color={'50AE6F'}
                                visible ={this.state.isTrackPolylineShow}
                                points={this.state.trackPolylinePoint}/>
                            :
                            null
                    } */}
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
}