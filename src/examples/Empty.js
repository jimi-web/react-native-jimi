/*
 * @Descripttion: 
 * @version: 
 * @Author: xieruizhi
 * @Date: 2019-12-27 17:43:23
 * @LastEditors: liujinyuan
 * @LastEditTime: 2020-03-31 13:57:16
 */
import React,{Component} from 'react';
import {View} from 'react-native';
import { Jimi } from '../index';

export default class EmptyExample extends Component { 
    
    constructor(props){
        super(props);
    }

    componentDidMount(){
        //
    }

    render(){
        return <Jimi.Empty />;
    }
}