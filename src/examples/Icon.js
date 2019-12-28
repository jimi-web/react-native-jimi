/*
 * @Descripttion: 
 * @version: 
 * @Author: xieruizhi
 * @Date: 2019-12-27 17:43:23
 * @LastEditors  : xieruizhi
 * @LastEditTime : 2019-12-28 10:30:35
 */
import React,{Component} from 'react';
import {View} from 'react-native';
import { Circle } from '../index';

const { Icon }  = Circle;

export default class IconExample extends Component { 
    
    constructor(props){
        super(props);
    }

    componentDidMount(){
        
    }

    render(){
        return <Icon name='weixinzhifu' size={100} color={'red'} rotation={50}></Icon>;
    }
}