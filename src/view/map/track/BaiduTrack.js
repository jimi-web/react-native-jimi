/*
 * @Descripttion: 
 * @version: 
 * @Author: xieruizhi
 * @Date: 2019-08-19 10:36:46
 * @LastEditors: xieruizhi
 * @LastEditTime: 2019-09-29 10:20:11
 */

import React from 'react';
import {View} from 'react-native';
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
                    trafficEnabled={this.state.trafficEnabled}
                >
                    <Overlay.Polyline
                        width={this.props.playPolylineOptions ? this.props.playPolylineOptions.width ? this.props.playPolylineOptions.width :2 : 2}
                        color={this.props.playPolylineOptions ? this.props.playPolylineOptions.color ? this.props.playPolylineOptions.color :'#50AE6F' : '#50AE6F'}
                        visible={true}
                        points={this.state.pointArr}/>
                   
                    {/* 整条轨迹 */}

                    <Overlay.Polyline
                        width={this.props.polylineOptions ? this.props.polylineOptions.width ? this.props.polylineOptions.width :2 : 2}
                        color={this.props.polylineOptions ? this.props.polylineOptions.color ? this.props.polylineOptions.color :'#50AE6F' : '#50AE6F'}
                        visible ={this.state.isTrackPolylineShow}
                        points={this.state.trackPolylinePoint}/>

                    {/* 起点 */}
                    <Overlay.Marker
                        location={this.state.startMarker}
                        icon={this.props.startMarkerOptions.image}
                        visible={this.state.startMarker.latitude?true:false}
                    />

                    {/* 终点 */}
                    <Overlay.Marker
                        location={this.state.endMarker}
                        icon={this.props.endMarkerOptions.image}
                        visible={this.state.endMarker.latitude?true:false}
                    />

                    {/* 设备 */}
                    <Overlay.Marker
                        location={{latitude:this.state.deviceMarker.latitude,longitude:this.state.deviceMarker.longitude}}
                        icon={this.props.deviceMarkerOptions.image}
                        rotate={this.state.deviceMarker.direction}
                        visible={this.state.deviceMarker.latitude?true:false}
                    />

       

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
}