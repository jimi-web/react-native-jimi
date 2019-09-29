/*
 * @Descripttion: 
 * @version: ;
 * @Author: xieruizhi
 * @Date: 2019-09-19 11:49:27
 * @LastEditors: xieruizhi
 * @LastEditTime: 2019-09-28 16:59:58
 */
import React, {Component} from 'react';
import {View} from 'react-native';
import PropTypes from 'prop-types';
import { Polyline } from 'react-native-maps';
import TraceUtils from './index';
import GooglePosition from '../position/GooglePosition'; 

export default class GoogleTrace extends TraceUtils { 
    static propTypes = {
        ...TraceUtils.propTypes,
    };
    
    static defaultProps = {
        ...TraceUtils.defaultProps,
    };


    constructor(props) {
        super(props);
    }

    render(){
        return <View style={{flex:1}}>
            <GooglePosition
                ref='GooglePosition'
                {...this.props}
                onMyChange={this.onMyChange}
                onDeviceChange={this.onDeviceChange}
                ChangePositionBtn={this.ChangePositionBtn()}
                mapControls={this.polyline}
            ></GooglePosition>
            {
                this.whitespace()
            }
            {
                this.pullUpBox()
            }
            {
                this.shareBtn()
            }
            {
                this.drawerShare()
            }
        </View>;
    }

    polyline = ()=>{
        let color = this.props.polylineOptions ? this.props.polylineOptions.color ? this.props.polylineOptions.color :'#F82E1B' : '#F82E1B';
        let width = this.props.polylineOptions ? this.props.polylineOptions.width ? this.props.polylineOptions.width :2 : 2;  
        return <Polyline
            strokeWidth={width}
            strokeColor={color}
            coordinates={this.state.visualRange ? this.state.visualRange:[{latitude: 0, longitude: 0},{latitude: 0, longitude: 0}]}
        />;
    }    
}