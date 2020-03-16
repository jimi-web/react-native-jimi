/*
 * @Descripttion: 指令组件
 * @version: 
 * @Author: liujinyuan
 * @Date: 2019-12-29 13:57:55
 * @LastEditors: liujinyuan
 * @LastEditTime: 2020-03-10 15:48:59
 */
import React, { Component } from 'react';
import {View,Text,ScrollView} from 'react-native';
import { Jimi } from '../index';
export default class Instruction extends Component {
    

    constructor(props){
        super(props);
        this.data =[
            { 
                type:'title',
                content:'标题',
            },
            {
                type:'switch',
                content:{
                    text:'低电告警',
                    viceText:'电量过少时会触发报警',
                },
                value:false,
                border:true,
                insID:'ins1',
                insSymmetry:{true:0,false:1},
                insValue:1
            },
            {
                type:'arrowButton',
                content:{
                    text:'震动报警',
                    viceText:'震动时报警',
                    value:'震动报警开',
                    id:'1',
                    img:'https://facebook.github.io/react-native/img/tiny_logo.png'
                },
                border:true
            },
            {
                type:'select',
                content:[
                    {
                        text:'选择1',
                        value:'#1',
                        
                    },
                    {
                        text:'选择1',
                        value:'#2',
                    },
                    {
                        text:'选择1',
                        value:'#3'
                    },
                ],
                value:'#1',
                border:true,
                insID:'ins2',
                insValue:'#1',
            },
            {
                type:'multiSelect',
                content:{
                    symbol:'|',
                    isMust:true,
                    multiArr:[
                        {
                            text:'多选1',
                            value:'$1',
                        },
                        {
                            text:'多选2',
                            value:'$2',
                        },
                        {
                            text:'多选3',
                            value:'$3',
                        },
                    ],
                },
                value:['$1','$2'],
                border:true,
                insID:'ins3',
                insValue:'$1|$2',
            },
            {
                type:'input',
                content:{
                    placeholder:'请输入',
                    type:'',
                    text:'报警时间',
                    rule:/^[0-9]*[1-9][0-9]*$/
                },
                value:'6',
                border:true,
                insID:'ins4',
                insValue:'6',
            },
            {
                type:'modelSelect',
                content:{
                    text:'移动侦测',
                    modelType:'Custom',
                    modelData:[
                        {
                            text:'5s',
                            value:5
                        },
                        {
                            text:'10s',
                            value:10
                        },
                        {
                            text:'15s',
                            value:15
                        },
                        {
                            text:'20s',
                            value:20
                        },
                    ]
                },
                value:'15s',
                border:true,
                insID:'ins5',
                insValue:'5',
            },
            {
                type:'step',
                content:{
                    text:'灵敏度',
                    stepValue:[
                        {
                            text:'低',
                            value:0
                        },
                        {
                            text:'中',
                            value:1
                        },
                        {
                            text:'高',
                            value:2
                        },
                    ]
                },
                value:2,
                insID:'ins6',
                insValue:2,
                border:true,
            },
        ];
    }
    render(){
        return (
            <Jimi.Instruction instructionArr={this.data} onArrowButton={(data) => this.onArrowButton(data)}></Jimi.Instruction>
        );
    }
    onArrowButton = (data) => {
        this.porps.navigation.push({
            url:'instruction',
            params:data
        });
    }
}