/*
 * @Descripttion: 
 * @version: 
 * @Author: xieruizhi
 * @Date: 2019-10-12 16:14:36
 * @LastEditors: xieruizhi
 * @LastEditTime: 2019-10-21 16:47:09
 */
import React from 'react';
import {View,Platform,Image,Text} from 'react-native';
import MapView,{Marker,Callout,Circle} from 'react-native-maps';
import PropTypes from 'prop-types';
import Styles from '../../style/base';
import AddFenceStyles from '../../style/addfence';
import AddFenceUtils from './index';

export default class GoogleAddFence extends AddFenceUtils { 
    static propTypes = {
        ...AddFenceUtils.propTypes,
    };
    
    static defaultProps = {
        ...AddFenceUtils.defaultProps,
    }; 

    constructor(props) {
        super(props);
    }
    
    
    render(){
        return <View style={[AddFenceStyles.map,{position:'relative'}]}>
            {
                this.searchElement()
            }
            <View style={[AddFenceStyles.map,{backgroundColor:'red'}]}>
                <MapView
                    {...this.props}
                    ref={ref => {
                        this.map = ref;
                    }}
                    style={AddFenceStyles.map}
                    onMapReady={()=>{
                        this.onMapReady(1);
                    }}
                    loadingEnabled={true}
                    minZoomLevel={0}
                    maxZoomLevel={20}
                    showsIndoors={true}
                    showsCompass={false}
                    mapType={'standard'}
                    provider={Platform.OS === 'ios'?undefined:'google'}
                    onRegionChangeComplete={this.onMapStatusChangeFinish}
                    initialRegion={this.state.initialRegion}
                    region={this.state.fencePoint.latitude ? this.state.fencePoint : this.state.initialRegion} >
                    <Marker  
                        coordinate={this.state.deviceInfo?{longitude:this.state.deviceInfo.longitude,latitude:this.state.deviceInfo.latitude}:{longitude:0,latitude:0}}
                    > 
                        <Image 
                            style={[this.props.deviceMarkerOptions.style ? this.props.deviceMarkerOptions.style:Styles.deviceMarker,{transform:[{rotate:this.state.deviceInfo? this.state.deviceInfo.direction+'deg':'0deg'}]}]} 
                            source={this.props.deviceMarkerOptions.image} />
                    </Marker>
                    <Circle center={this.state.fencePoint}
                        radius={this.state.radius}
                        fillColor={this.props.fillColor}
                        strokeColor={this.props.strokeStyle.color}
                        zIndex={2}
                        strokeWidth={this.props.strokeStyle.width}
                    />
                    <Marker coordinate={this.state.fencePoint}>
                        <View style={{marginTop:-30}}>
                            {
                                this.radiusTip()
                            }
                        </View>
                    </Marker>
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