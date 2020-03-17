/*
 * @Descripttion: 
 * @version: 
 * @Author: xieruizhi
 * @Date: 2019-11-08 09:48:04
 * @LastEditors: xieruizhi
 * @LastEditTime: 2019-11-19 10:09:47
 */
import React,{Component} from 'react';
import {Jimi} from '../index';
import { View } from 'react-native';

export default class FlowCard  extends Component {

    constructor(props) {
        super(props);
    }


    render(){
        return <View style={{flex:1}}>
            <Jimi.FlowCard></Jimi.FlowCard>
        </View>
    }
}