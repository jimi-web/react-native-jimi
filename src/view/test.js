/*
 * @Descripttion: 
 * @version: 
 * @Author: xieruizhi
 * @Date: 2019-09-25 11:48:19
 * @LastEditors  : liujinyuan
 * @LastEditTime : 2019-12-28 13:42:13
 */
import React, {Component} from 'react';
import {View,Text,Animated} from 'react-native';
import {Icon} from '../components/index';


export default class Test extends Component { 
    constructor(props) {
        super(props);
    }

    render() {
        return <Icon name='weixinzhifu' size={100} color={'red'} rotation={50}></Icon>;
    }
}