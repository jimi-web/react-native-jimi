/*
 * @Descripttion: 
 * @version: 
 * @Author: xieruizhi
 * @Date: 2019-08-19 10:36:46
 * @LastEditors: xieruizhi
 * @LastEditTime: 2019-09-03 10:59:29
 */

import React, {Component} from 'react';
import {View,Platform,TouchableOpacity,Image,Text,Slider} from 'react-native';
import {MapView,Overlay,Geolocation} from 'react-native-baidu-map-jm';
import Styles from '../style/base';
import MapStyles from '../style/track';
import Controller from '../track/TrackController';

export default class Track extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mapType:'standard',
            initialRegion:{
                latitude: 22.596904,
                longitude: 113.936674,
                latitudeDelta:0.0922,
                longitudeDelta: 0.0421,
            },
        };
    }

    

    render(){
        return (
            <View style={Styles.container}>
                <MapView
                    mapType={this.state.mapType === 'standard' ? 1 : 2}
                    style={Styles.container}
                    zoom={18}
                    center={this.state.region?this.state.region:this.state.initialRegion}
                    onMapLoaded={()=>{
                       
                    }}
                > 
                </MapView>
                <View style={MapStyles.bottomContent}>
                    <Controller></Controller>
                </View>
            </View>
        );
    }
}