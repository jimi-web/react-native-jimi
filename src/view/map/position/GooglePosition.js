/*
 * @Descripttion: 
 * @version: 
 * @Author: xieruizhi
 * @Date: 2019-08-12 09:36:35
 * @LastEditors: xieruizhi
 * @LastEditTime: 2020-06-29 11:32:51
 */
import React from 'react';
import {View,Platform,Image,Text} from 'react-native';
import MapStyles from '../style/position';
import PositionUtils from './index';
import MapView,{Marker,Callout} from 'react-native-maps';
import PropTypes from 'prop-types';


export default class GooglePosition extends PositionUtils { 
    static propTypes = {
        ...PositionUtils.propTypes,
    };
    
    static defaultProps = {
        ...PositionUtils.defaultProps,
    };

    constructor(props) {
        super(props);
    }

    render(){
        return (
            <View style={MapStyles.map}>
                <MapView
                    {...this.props}
                    ref={ref => {
                        this.map = ref;
                    }}
                    style={MapStyles.map}
                    onMapReady={()=>{
                        this.onMapReady(1);
                    }}
                    provider={Platform.OS === 'ios'?undefined:'google'}
                    initialRegion={this.props.initialRegion}
                    region={this.state.region}
                    loadingEnabled={true}
                    minZoomLevel={0}
                    maxZoomLevel={20}
                    showsTraffic={this.state.trafficEnabled}
                    onRegionChange={this.regionChange}
                    showsIndoors={true}
                    showsCompass={false}
                    mapType={this.state.mapType}>
                    {this.markers()}
                    {this.myMarker()}
                    {
                        this.props.children
                    } 
                </MapView>
                {/* 按钮功能 */}
                {
                    this.roadBtn()
                }
                {
                    this.mapTypeBtn()
                }
                {
                    this.phonePointBtn()
                }   
                {
                    this.customOverlay()
                }             
            </View>
        );
    }

    /**
     * 设置中心点缩放
     */
    regionChange = (data) =>{
        console.log(data,'datadatadatadata');
        
        //避免与气泡冲突
        if(this.state.isInit){
            this.state.region = data;
        }
    }


    /**
     * 显示气泡
     * @param {String} name  marker的id名字
     */
    showInfoWindow= (name)=>{
        if(this.refs[name]){
            setTimeout(() => {
                this.refs[name].showCallout();
            },50);
        }
    }

    /**
     * 隐藏气泡
     * @param {String} name  marker的id名字
     */
    hideInfoWindow= (name)=>{
        this.refs[name].hideCallout();
    }

    
    /**
     * 我的位置
     */
    myMarker = ()=> {
        const marker = this.state.phonePoint.latitude == null?null:
            <Marker 
                ref={'myMarker'}
                identifier={'phone'} 
                coordinate={this.state.phonePoint} >
                <Image 
                    style={this.props.mylocationOptions.style ? this.props.mylocationOptions.style:MapStyles.markerImg} 
                    source={this.props.mylocationOptions.image} />
                <Callout >
                    <View style={{width:58}}>
                        <Text>我的位置</Text>
                    </View>
                </Callout>
            </Marker>;
        return marker;
    };

    /**
     * 车辆标记
     */
    markers = ()=>{
        const markers = this.state.locationData===null? null:
            <Marker
                ref={'markers'}
                identifier={'mapMark'}
                coordinate={this.state.markerPoint}
            >
                <Image 
                    style={[this.props.deviceMarkerOptions.style ? this.props.deviceMarkerOptions.style:MapStyles.markerImg,{transform:[{rotate:this.state.locationData.direction+'deg'}]}]} 
                    source={this.props.deviceMarkerOptions.image? this.props.deviceMarkerOptions.image :require('../../../assets/map/device.png') }/>
                {
                    this.props.markerInfoWindow.visible ? 
                        <Callout tooltip={this.props.isCustom}>
                            {this.props.markerInfoWindow.markerInfo ? this.props.markerInfoWindow.markerInfo() : this.markerInfo()}
                        </Callout> :
                        null
                }
              
            </Marker>;
        return markers;
    };

 
    /**
     *  可是可视范围内
     */
    fitAllMarkers=(points)=> {
        this.map.fitToCoordinates(points, {
            edgePadding: this.props.edgePadding,
            animated: true,
        });
    }
}