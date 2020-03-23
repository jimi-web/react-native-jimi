/*
 * @Descripttion: 
 * @version: 
 * @Author: liujinyuan
 * @Date: 2020-03-17 16:22:00
 * @LastEditors: liujinyuan
 * @LastEditTime: 2020-03-23 10:44:53
 */
import React, { Component } from 'react';
import { Jimi } from '../index';
export default class Instruction extends Component {
    constructor(props){
        super(props);
    }
    render(){
        const data = this.props.navigation.state.params;
        return (
            <Jimi.Instruction hint={data.hint} instructionArr={data.instructionArr} isButton={data.isButton} instruction={data.instruction}></Jimi.Instruction>
        );
    }
}