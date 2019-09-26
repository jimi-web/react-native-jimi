/*
 * @Descripttion: 
 * @version: 
 * @Author: xieruizhi
 * @Date: 2019-08-12 09:34:22
 * @LastEditors: xieruizhi
 * @LastEditTime: 2019-09-19 16:04:37
 */
import React, {Component} from 'react';
import {View,Platform,TouchableOpacity,Image,Text,Dimensions} from 'react-native';
import {MapView,Overlay,Geolocation} from 'react-native-baidu-map-jm';
import MapStyles from '../style/position';
import PositionUtils from './index';
import PropTypes from 'prop-types';


export default class BaiduPosition extends PositionUtils { 
    static propTypes = {
        ...PositionUtils.propTypes,
    };
    
    static defaultProps = {
        ...PositionUtils.defaultProps,
    };

    constructor(props) {
        super(props);
        Object.assign(this.state, {
            region:null
        });
    }

    render(){
        return this.renderContent();
    }


    renderContent =()=>{
        return  <View style={MapStyles.map}>
            <MapView
                mapType={this.state.mapType === 'standard' ? 1 : 2}
                style={MapStyles.map}
                zoom={18}
                center={this.state.region?this.state.region:this.props.initialRegion}
                trafficEnabled={this.state.trafficEnabled}
                onMapLoaded={()=>{
                    this.onMapReady(0);
                }}
                visualRange = {this.props.visualRange ? this.props.visualRange :[this.props.initialRegion]}
            >  
                {
                    <Overlay.Marker
                        tag={1}
                        location={this.state.markerPoint}
                        icon={this.props.markerOptions.image}
                        rotate={this.state.locationData ? this.state.locationData.direction :0 }
                    />
                }
                {
                    this.state.phonePoint.latitude ?
                        <Overlay.Marker
                            tag={2}
                            location={this.state.phonePoint}
                            icon={this.props.mylocationOptions.image}
                        />
                        :
                        null
                }
                <Overlay.InfoWindow
                    ref={(e)=>{this.InfoWindowFunc=e;}}
                    style={[{position:'relative',backgroundColor:'#fff0',height:400,width:300}]}
                    tag={1}
                    visible = {this.props.markerInfoWindow.visible}
                >
                    <View style={{position:'absolute',bottom:10,flexDirection:'row',justifyContent:'center',width:300}}>
                        {
                       
                            this.props.markerInfoWindow.markerInfo ? this.props.markerInfoWindow.markerInfo() : this.state.locationData ?this.markerInfo():null
                        }
                    </View>
                    <View style={{position:'absolute',width:20,height:10,bottom:0,left:'50%',marginLeft:-10}}>
                        <Image source={require('../../../assets/map/position_bubble_shadow.png')} style={{width:20,height:10}} />
                    </View>
                </Overlay.InfoWindow>
                {
                    this.props.mapControls? this.props.mapControls():null
                }
            </MapView> 
            {
                this.roadBtn()
            }
            {
                this.mapTypeBtn()
            }
            {
                this.phonePointBtn(1)
            }
            {
                this.customOverlay()
            }
        </View>;        
    }
}