/*
 * @Descripttion: 
 * @version: 
 * @Author: xieruizhi
 * @Date: 2019-08-19 10:36:46
 * @LastEditors: xieruizhi
 * @LastEditTime: 2019-09-04 14:34:37
 */

import React, {Component} from 'react';
import {View,Platform,TouchableOpacity,Image,Text,Slider} from 'react-native';
import {MapView,Overlay} from 'react-native-baidu-map-jm';
import Styles from '../style/base';
import MapStyles from '../style/track';
import TrackUtils from '../track/index';
import Controller from '../track/TrackController';
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
        return (
            <View style={Styles.container}>
                <MapView
                    mapType={this.state.mapType === 'standard' ? 1 : 2}
                    style={Styles.container}
                    zoom={18}
                    center={this.state.region?this.state.region:this.props.initialRegion}
                    onMapLoaded={()=>{
                       
                    }}
                > 
                    {/* 起点 */}
                    {/* {
                        this.state.startMarker.latitude ?
                            <Overlay.Marker
                                location={this.state.startMarker}
                                icon={this.props.markerOperation.image}
                            />
                            :
                            null
                    } */}
                </MapView>
                <View style={MapStyles.bottomContent}>
                    <Controller></Controller>
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