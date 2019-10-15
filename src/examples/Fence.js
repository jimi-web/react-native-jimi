/*
 * @Descripttion: 
 * @version: 
 * @Author: xieruizhi
 * @Date: 2019-09-25 11:48:19
 * @LastEditors: xieruizhi
 * @LastEditTime: 2019-10-14 10:20:04
 */
import React, {Component} from 'react';
import {View} from 'react-native';
import {Jimi} from '../index';


export default class Fence extends Component { 

    constructor(props) {
        super(props);
    }
    
    render() {
        return <Jimi.FenceList
            routeName={'AddFence'}
        ></Jimi.FenceList>;
    }
}