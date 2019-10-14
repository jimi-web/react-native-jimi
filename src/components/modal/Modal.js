/*
 * @Descripttion: 
 * @version: 
 * @Author: liujinyuan
 * @Date: 2019-09-30 15:15:25
 * @LastEditors: liujinyuan
 * @LastEditTime: 2019-09-30 16:01:15
 */
import React, {Component} from 'react';
import {Text, View,StyleSheet,Animated,Image,TouchableOpacity,Modal} from 'react-native';
import TopView from '../overlay/TopView';
import Theme from '../themes/index';
import PropTypes from 'prop-types';

export default class jmModal extends Component{
    
    constructor(props){
        super(props);
    }
    render(){
        return (
            <View style={{height:60,backgroundColor:'red'}}>
                <Text>{'弹框'}</Text>
            </View>
        );
    }
}

TopView.add(jmModal);