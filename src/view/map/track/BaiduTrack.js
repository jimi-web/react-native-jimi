/*
 * @Descripttion: 
 * @version: 
 * @Author: xieruizhi
 * @Date: 2019-08-19 10:36:46
 * @LastEditors: xieruizhi
 * @LastEditTime: 2020-07-17 19:40:59
 */

import React from 'react';
import {View, ImageBackground,Text} from 'react-native';
import {MapView,Overlay} from 'react-native-baidu-map-jm';
import Styles from '../style/base';
import TrackUtils from './index';
import MapStyles from '../style/track';
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
                    ref={(e)=>this.mapViewFunc=e}
                    mapType={this.state.mapType === 'standard' ? 1 : 2}
                    style={Styles.container}
                    zoom={18}
                    center={this.state.initialRegion}
                    onMapLoaded={()=>{
                        this.onMapReady(0);
                    }}
                    visualRange = {this.state.visualRange}
                    trafficEnabled={this.state.trafficEnabled}
                    onMarkerClick={this.onMarkerClick}
                >
                    <Overlay.Polyline
                        width={this.props.playPolylineOptions ? this.props.playPolylineOptions.width ? this.props.playPolylineOptions.width :2 : 2}
                        color={this.props.playPolylineOptions ? this.props.playPolylineOptions.color ? this.props.playPolylineOptions.color :'#50AE6F' : '#50AE6F'}
                        visible={this.props.controllerType?false:true}
                        points={this.state.pointArr}/>
                    {/* 整条轨迹 */}
                    <Overlay.Polyline
                        width={this.props.polylineOptions ? this.props.polylineOptions.width ? this.props.polylineOptions.width :2 : 2}
                        color={this.props.polylineOptions ? this.props.polylineOptions.color ? this.props.polylineOptions.color :'#50AE6F' : '#50AE6F'}
                        visible ={this.props.controllerType?false:this.state.isTrackPolylineShow}
                        points={this.state.trackPolylinePoint}/>
                    {/* 起点 */}
                    {
                        this.props.controllerType?null:
                            <Overlay.Marker
                                tag={1001}
                                isIteration={true}
                                location={this.state.startMarker}
                                icon={this.props.startMarkerOptions.image}
                                visible={this.state.startMarker.latitude?true:false}
                            />
                    }

                    {/* 终点 */} 
                    {
                    this.props.controllerType?null:
                        <Overlay.Marker
                            tag={1002}
                            isIteration={true}
                            location={this.state.endMarker}
                            icon={this.props.endMarkerOptions.image}
                            visible={this.state.endMarker.latitude?true:false}
                        />
                    }

                    {/* 设备 */}
                    {
                        this.props.controllerType?this.dotting():
                            <Overlay.Marker
                                tag={1003}
                                isIteration={true}
                                location={{latitude:this.state.deviceMarker.latitude,longitude:this.state.deviceMarker.longitude}}
                                icon={this.props.deviceMarkerOptions.image}
                                rotate={this.state.deviceMarker.direction}
                                visible={this.state.deviceMarker.latitude?true:false}
                            />
                    }
                </MapView>
                {this.controller()}
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

    dotting = ()=>{
        return this.state.markerArr.map((item,index)=>{
         return <Overlay.Marker
                    tag={index}
                    isIteration={true}
                    icon = {item.icon}
                    location={{latitude:item.latitude,longitude:item.longitude}}
                    visible={item.visible}
                >
                    {/* {
                         index>0 && index<this.state.trackPolylinePoint.length-1 && !item.isClikc?
                         <View  style={MapStyles.defaultMarker} >
                             <ImageBackground source={require('../../../assets/track/journey_detail_icon_path.png')} style={MapStyles.markerIcon} >
                                <Text style={MapStyles.markerIconText}>{index+1}</Text>
                             </ImageBackground>
                         </View>:
                         item.isClikc ? <View  style={MapStyles.specialMarker}>
                            <ImageBackground source={require('../../../assets/track/journey_detail_icon_start.png')} style={MapStyles.markerIcon} >
                                <Text style={MapStyles.specialMarkerIconText}>{index+1}</Text>
                            </ImageBackground>
                         </View>:null
                    }
                    {
                        index === this.state.trackPolylinePoint.length-1 && this.state.trackPolylinePoint.length!=1?
                        <View style={MapStyles.specialMarker} >
                            <ImageBackground source={require('../../../assets/track/journey_detail_icon_end.png')} style={MapStyles.markerIcon} >
                                <Text style={MapStyles.specialMarkerIconText}>{index+1}</Text>
                            </ImageBackground>                              
                        </View>:null
                    }
                    {
                        index == 0 ||   this.state.trackPolylinePoint.length==1 ?
                        <View style={MapStyles.specialMarker} >
                            <ImageBackground source={require('../../../assets/track/journey_detail_icon_start.png')} style={MapStyles.markerIcon} >
                                <Text style={MapStyles.specialMarkerIconText}>{index+1}</Text>
                            </ImageBackground>                            
                        </View>:null
                    } */}
                </Overlay.Marker> 
        });
    }
}