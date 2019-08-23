/*
 * @Descripttion: 
 * @version: 
 * @Author: xieruizhi
 * @Date: 2019-08-19 10:36:46
 * @LastEditors: xieruizhi
 * @LastEditTime: 2019-08-19 18:13:01
 */

import React, {Component} from 'react';
import {View,Platform,TouchableOpacity,Image,Text,Slider} from 'react-native';
import MapView,{Marker} from 'react-native-maps';
import MapStyles from '../style/track';
import Controller from './trackController';

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
            }
        };

    }


    render(){
        return (
            <View style={MapStyles.container}>
                <MapView
                    initialRegion={this.state.initialRegion}
                    provider={Platform.OS === 'ios'?undefined:'google'}
                    style={MapStyles.container} 
                    loadingEnabled={true}
                    minZoomLevel={0}
                    maxZoomLevel={20}
                    mapType={this.state.mapType}

                >
                </MapView>
                <View style={MapStyles.bottomContent}>
                    <Controller></Controller>
                </View>
            </View>
        );
    }
    
}