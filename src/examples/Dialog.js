/*
 * @Descripttion: 
 * @version: 
 * @Author: xieruizhi
 * @Date: 2019-12-27 17:43:23
 * @LastEditors  : xieruizhi
 * @LastEditTime : 2019-12-27 18:04:14
 */
import React,{Component} from 'react';
import {View} from 'react-native';
import { Circle } from '../index';

const { Modal}  = Circle;

export default class Dialog extends Component { 
    
    constructor(props){
        super(props);
    }

    componentDidMount(){
        Modal.dialog({
            contentText:'提示框！'
        });
    }

    render(){
        return <View></View>
    }
}