/*
 * @Descripttion: 
 * @version: ;
 * @Author: xieruizhi
 * @Date: 2019-09-19 11:49:27
 * @LastEditors: xieruizhi
 * @LastEditTime: 2019-12-06 16:31:32
 */
import React, {Component} from 'react';
import {View} from 'react-native';
import PropTypes from 'prop-types';
import {Overlay} from 'react-native-baidu-map-jm';
import TraceUtils from '../trace/index';
import BaiduPosition from '../position/BaiduPosition'; //组件完全继承定位


export default class BaiduTrace extends TraceUtils { 
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
            <BaiduPosition
                {...this.props}
                ref={(e)=>this.mapViewFunc=e}
                onMyChange={this.onMyChange}
                onDeviceChange={this.onDeviceChange}
                visualRange={this.state.visualRange}
                ChangePositionBtn={this.ChangePositionBtn()}
                // mapControls={this.polyline}
            >
                {
                    this.polyline()
                }
            </BaiduPosition>
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
        return <Overlay.Polyline
            width={this.props.polylineOptions ? this.props.polylineOptions.width ? this.props.polylineOptions.width :2 : 2}
            color={this.props.polylineOptions ? this.props.polylineOptions.color ? this.props.polylineOptions.color :'#50AE6F' : '#50AE6F'}
            points={this.state.visualRange.length>0 ? this.state.visualRange:[{latitude: 0, longitude: 0},{latitude: 0, longitude: 0}]}
        />;
    }   
}