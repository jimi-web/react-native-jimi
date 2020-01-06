/*
 * @Descripttion: 指令组件
 * @version: 
 * @Author: liujinyuan
 * @Date: 2019-12-29 13:57:55
 * @LastEditors  : liujinyuan
 * @LastEditTime : 2020-01-06 09:53:21
 */
import React, { Component } from 'react';
import {View,Text,ScrollView} from 'react';
import Instruction from './instruction';
export default class Instructions extends Component {
    

    constructor(props){
        super(props);
    }
    render(){
        return (
            <Instruction />
        );
    }
}