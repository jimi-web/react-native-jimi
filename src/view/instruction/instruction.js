/*
 * @Descripttion: 指令组件
 * @version: 
 * @Author: liujinyuan
 * @Date: 2019-12-29 13:57:55
 * @LastEditors  : liujinyuan
 * @LastEditTime : 2020-01-06 10:13:16
 */
import React, { Component } from 'react';
import {View,Text,ScrollView} from 'react';
import PropTypes from 'prop-types';
import {Toast} from '../../components/index';
export default class Instruction extends Component {
    
    static PropTypes = {
        instructionArr:PropTypes.array
    }
    static defaultProps = {
        instructionArr:[]
    }
    constructor(props){
        super(props);
    }
    render(){
        return (
            <ScrollView>
                {
                    this.renderInstruction()
                }
            </ScrollView>
        );
    }
    renderInstruction = () => {
        //
    }
}