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
import { Jimi } from '../index';

export default class EmptyExample extends Component { 
    
    constructor(props){
        super(props);
    }

    componentDidMount(){
        
    }

    render(){
        return <Jimi.Empty />;
    }
}