/*
 * @Descripttion: 
 * @version: 
 * @Author: liujinyuan
 * @Date: 2019-10-26 09:05:31
 * @LastEditors: liujinyuan
 * @LastEditTime: 2019-10-26 10:08:59
 */

import React, {Component} from 'react';
import {Text, View,StyleSheet,Animated,Image,TouchableOpacity,Modal} from 'react-native';
import JmTopView from './TopView';
import Theme from '../themes/index';
import PropTypes from 'prop-types';
import OverlayView from './OverlayView';
class Model extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            <View style={{flex:1,backgroundColor:'rgba(0,0,0,0.4)',justifyContent:'center',alignItems:'center'}}>
                <TouchableOpacity style={{flex:1, width:'100%',height:'100%'}} onPress={() => this.props.onPress && this.props.onPress()}></TouchableOpacity>
                <View style={{position:'absolute',zIndex:1001}}>{this.props.children}</View>
            </View>
        );
    }
}