/*
 * @Descripttion: 
 * @version: 
 * @Author: xieruizhi
 * @Date: 2019-09-25 11:48:19
 * @LastEditors: xieruizhi
 * @LastEditTime: 2019-12-12 15:15:37
 */
import React, {Component} from 'react';
import {View,Text,Animated} from 'react-native';
import {Icon} from '../components/index';


export default class Test extends Component { 
    constructor(props) {
        super(props);
    }
    
    componentDidMount() {

        
    }

    render() {
        return <Icon name='weixinzhifu' size={100} color={'red'} rotation={50}></Icon>;
    }
}