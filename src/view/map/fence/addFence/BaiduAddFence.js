/*
 * @Descripttion: 
 * @version: 
 * @Author: xieruizhi
 * @Date: 2019-09-29 14:02:31
 * @LastEditors: xieruizhi
 * @LastEditTime: 2019-10-14 11:37:22
 */
import React, {Component} from 'react';
import {View,Text} from 'react-native';
import {MapView,Overlay} from 'react-native-baidu-map-jm';
import AddFenceStyles from '../../style/addfence';
import AddFenceUtils from './index';
import PropTypes from 'prop-types';

export default class BaiduAddFence extends AddFenceUtils { 
    
    static propTypes = {
        ...AddFenceUtils.propTypes,
    };
    
    static defaultProps = {
        ...AddFenceUtils.defaultProps,
    };


    constructor(props) {
        super(props);
    }

    render() {
        return <View style={{flex:1,position:'relative'}}>
            {
                this.searchElement()
            }
            <View style={AddFenceStyles.map}>
                <MapView
                    mapType={1}
                    zoom={this.state.zoom}
                    center={this.state.fencePoint}
                    style={{flex:1}}
                    onMapStatusChangeFinish={(params)=>{
                        this.setState({
                            fencePoint:params.target
                        });
                    }}
                    onMapLoaded={()=>{
                        this.onMapReady(0);
                    }}
                >
                    <Overlay.Marker
                        tag={0}
                        location={this.state.deviceInfo?{longitude:this.state.deviceInfo.longitude,latitude:this.state.deviceInfo.latitude}:{longitude:0,latitude:0}}
                        icon={require('../../../../assets/map/device.png')}
                        rotate={this.state.deviceInfo ? this.state.deviceInfo.direction :0 }
                    />
                    <Overlay.Marker
                        tag={1}
                        location={this.state.fencePoint}
                        icon={require('../../../../assets/fence/empty.png')}
                        rotate={0}
                    />
                    <Overlay.Circle
                        center={this.state.fencePoint}
                        radius={this.state.radius}
                        fillColor={this.props.fillColor}
                        stroke={this.props.strokeStyle}
                    />
                  
                    <Overlay.InfoWindow
                        ref={(e)=>{this.InfoWindowFunc=e;}}
                        tag={1}
                        visible={true}
                        style={[{position:'relative',backgroundColor:'#fff0',height:34,width:74}]}
                    >
                        <View  style={[{backgroundColor:'#fff0',height:34,width:74,alignItems:'center'}]}>
                            <View style={[{height:24,width:74,backgroundColor:'#3479F6',borderRadius:12,justifyContent:'center',alignItems:'center'}]}>
                                <Text style={{color:'#fff',fontSize:11}}>半径:{this.state.radius}m</Text>
                            </View>
                            <View style={[{backgroundColor:'#3479F6',height:10,width:2}]}>
                            </View>
                        </View>
                    </Overlay.InfoWindow>                  
                </MapView>
            </View>
            {
                this.spaceElement()
            }
            {
                this.infoBoxElement()
            }
            {
                this.inputBoxElement()
            }
            {
                this.state.addressList.length>0?
                    this.addressList():null
            }
            {
                this.slidersliderElement()
            }
            {
                this.props.children
            }
        </View>;
    } 

    
}