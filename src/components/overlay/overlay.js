/*
 * @Descripttion: 对话框
 * @version: 
 * @Author: liujinyuan
 * @Date: 2019-10-12 14:01:19
 * @LastEditors: liujinyuan
 * @LastEditTime: 2019-10-14 11:46:13
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
                {this.props.children}
            </View>
        );
    }
}

export default class Overlay extends JmTopView{
    static add(view){
        const element = <Model>{view}</Model>;
        let key = JmTopView.add(element);
        return key;
    }
    static remove(key){
        JmTopView.remove(key);
    }
}