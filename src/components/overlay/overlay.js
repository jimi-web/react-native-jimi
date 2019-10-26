/*
 * @Descripttion: 对话框
 * @version: 
 * @Author: liujinyuan
 * @Date: 2019-10-12 14:01:19
 * @LastEditors: liujinyuan
 * @LastEditTime: 2019-10-25 13:55:57
 */
import React, {Component} from 'react';
import {Text, View,StyleSheet,Animated,Image,TouchableOpacity,Modal} from 'react-native';
import JmTopView from './TopView';
import Theme from '../themes/index';
import PropTypes from 'prop-types';




class Model extends Component{
    render(){
        return (
            <View style={{flex:1,backgroundColor:'rgba(0,0,0,0.4)',justifyContent:'center',alignItems:'center'}}>
                <TouchableOpacity style={{flex:1, width:'100%',height:'100%'}} onPress={() => this.props.onPress && this.props.onPress()}></TouchableOpacity>
                <View style={{position:'absolute',zIndex:1001}}>{this.props.children}</View>
            </View>
        );
    }
}

let overlayKey = null;
export default class Overlay extends JmTopView{
    static add(view){
        const element = <Model onPress={() => super.remove && super.remove(overlayKey)}>{view}</Model>;
        overlayKey = JmTopView.add(element);
        return overlayKey;
    }
    static remove(key){
        JmTopView.remove(key);
    }
}