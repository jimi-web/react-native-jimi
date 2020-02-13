/*
 * @Descripttion: 指令组件
 * @version: 
 * @Author: liujinyuan
 * @Date: 2019-12-29 13:57:55
 * @LastEditors  : liujinyuan
 * @LastEditTime : 2020-01-07 11:14:48
 */
import React, { Component } from 'react';
import {View,Text,ScrollView} from 'react-native';
import InstructionContent from '../view/instruction/instruction';
export default class Instruction extends Component {
    

    constructor(props){
        super(props);
    }
    render(){
        return (
            <InstructionContent></InstructionContent>
        );
    }
}