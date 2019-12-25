/*
 * @Descripttion: 
 * @version: 
 * @Author: xieruizhi
 * @Date: 2019-11-08 09:48:04
 * @LastEditors: xieruizhi
 * @LastEditTime: 2019-11-19 10:09:47
 */
import React,{Component} from 'react';
import {View} from 'react-native';
import {Circle} from '../index';

export default class SwitchTest  extends Component {

    constructor(props) {
        super(props);
    }


    render(){
        return <Circle.Switch value={true} onChange={(value)=>{
            console.log(value);
                
        }}/>;

    }
}