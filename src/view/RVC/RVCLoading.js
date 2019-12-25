/*
 * @Descripttion: 
 * @version: 
 * @Author: liujinyuan
 * @Date: 2019-12-19 15:01:45
 * @LastEditors  : liujinyuan
 * @LastEditTime : 2019-12-23 09:36:44
 */


import React, { Component } from 'react';
import { ActivityIndicator} from 'react-native';
export default class RvcLoading extends Component {
    

    render(){
        return (
            <ActivityIndicator color={'#fff'} size={'large'} animating={true} style={{width:50,height:50,color:'#fff'}}/> 
        );
    }
}