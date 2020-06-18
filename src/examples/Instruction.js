/*
 * @Descripttion: 指令组件
 * @version: 
 * @Author: liujinyuan
 * @Date: 2019-12-29 13:57:55
 * @LastEditors: liujinyuan
 * @LastEditTime: 2020-06-18 11:33:35
 */
import React, { Component } from 'react';
import {View,Text,ScrollView} from 'react-native';
import { Jimi } from '../index';
export default class Instruction extends Component {
    
    constructor(props){
        super(props);
        //DVR配置
        // this.data =[
        //     {
        //         type:'arrowButton',
        //         content:{
        //             text:'SOS设置',
        //             viceText:'',
        //             value:'',
        //             id:'0',
        //             img:'http://apps.jimimax.com/setting/instuct/SOS_number@3x.png'
        //         },
        //         border:true,
        //         data:{
        //             isButton:true,
        //             instruction:'SOS,ins1,ins2,ins3,ins4#',
        //             hint:'SOS号码用于接收报警短信以及SOS报警，支持3-20位数字SOS号码设置',
        //             instructionArr:[
        //                 {
        //                     type:'switch',
        //                     content:{
        //                         text:'SOS设置'
        //                     },
        //                     value:true,
        //                     insID:'ins1',
        //                     insSymmetry:{true:'A',false:'D'},
        //                     insValue:'A'
        //                 },
        //                 {
        //                     type:'title',
        //                     content:'',
        //                     style:{
        //                         paddingTop:0,
        //                         paddingBottom:0
        //                     }
        //                 },
        //                 {
        //                     contral:0,
        //                     type:'input',
        //                     content:{
        //                         placeholder:'请输入SOS号码',
        //                         type:'',
        //                         text:'号码1',
        //                         rule:'^[0-9]{3,20}$',
        //                         keyboardType:'number-pad',
                               
        //                     },
        //                     hint:'仅支持3-20位数字SOS号码设置',
        //                     value:'',
        //                     border:true,
        //                     insID:'ins2',
        //                     insValue:'',
        //                     stop:true
        //                 },
        //                 {
        //                     type:'input',
        //                     content:{
        //                         placeholder:'请输入SOS号码',
        //                         type:'',
        //                         text:'号码2',
        //                         rule:'^[0-9]{3,20}$',
        //                         keyboardType:'number-pad',
                               
        //                     },
        //                     hint:'仅支持3-20位数字SOS号码设置',
        //                     value:'',
        //                     border:true,
        //                     insID:'ins3',
        //                     insValue:'',
        //                 },
        //                 {
        //                     type:'input',
        //                     content:{
        //                         placeholder:'请输入SOS号码',
        //                         type:'',
        //                         text:'号码3',
        //                         rule:'^[0-9]{3,20}$',
        //                         keyboardType:'number-pad',
                               
        //                     },
        //                     hint:'仅支持3-20位数字SOS号码设置',
        //                     value:'',
        //                     border:true,
        //                     insID:'ins4',
        //                     insValue:'',
        //                 }
        //             ]
        //         }
        //     },
        //     {
        //         type:'arrowButton',
        //         content:{
        //             text:'SOS报警',
        //             viceText:'',
        //             value:'',
        //             id:'1',
        //             img:'http://apps.jimimax.com/setting/instuct/SOS_alarm%20@3x.png'
        //         },
        //         border:true,
        //         data:{
        //             isButton:true,
        //             instruction:'SOSALM,ins1,ins2#',
        //             hint:'关闭SOS报警后，设备的SOS按键在按下后不会再触发报警，请谨慎操作',
        //             instructionArr:[
        //                 {
        //                     type:'switch',
        //                     content:{
        //                         text:'SOS报警'
        //                     },
        //                     value:true,
        //                     insID:'ins1,',
        //                     insSymmetry:{true:'ON,',false:'OFF'},
        //                     insValue:'ON,',
        //                 },
        //                 { 
        //                     contral:0,
        //                     type:'title',
        //                     content:'上报方式',
        //                 },
        //                 {
        //                     contral:0,
        //                     type:'select',
        //                     content:[
        //                         {
        //                             text:'平台',
        //                             value:0,
                                    
        //                         },
        //                         {
        //                             text:'平台+短信',
        //                             value:1,
        //                         },
        //                         {
        //                             text:'平台+电话',
        //                             value:2,
        //                         },
        //                         {
        //                             text:'平台+短信+电话',
        //                             value:3,
        //                         },
        //                     ],
        //                     value:3,
        //                     border:true,
        //                     insID:'ins2',
        //                     insValue:3,
        //                 },
        //             ]
        //         }
        //     },
        //     {
        //         type:'arrowButton',
        //         content:{
        //             text:'位移报警',
        //             viceText:'',
        //             value:'',
        //             id:'2',
        //             img:'http://apps.jimimax.com/setting/instuct/Displacement@3x.png'
        //         },
        //         border:true,
        //         data:{
        //             isButton:true,
        //             instruction:'MOVING,ins1ins2ins3#',
        //             hint:'移动半径范围：100~1000 单位：米',
        //             instructionArr:[
        //                 {
        //                     type:'switch',
        //                     content:{
        //                         text:'位移报警'
        //                     },
        //                     value:false,
        //                     insID:'ins1',
        //                     insSymmetry:{true:'ON,',false:'OFF'},
        //                     insValue:'OFF',
        //                 },
        //                 {
        //                     type:'title',
        //                     content:'',
        //                     style:{
        //                         paddingTop:0,
        //                         paddingBottom:0
        //                     }
        //                 },
        //                 {
        //                     contral:0,
        //                     type:'input',
        //                     content:{
        //                         placeholder:'请填写半径范围单位：米',
        //                         type:'',
        //                         text:'半径',
        //                         rule:'^[1-9][0-9]{2,2}$|1000',
        //                         keyboardType:'number-pad',
        //                         symbol:','
        //                     },
        //                     hint:'请输入移动半径范围在100~1000米',
        //                     value:'300',
        //                     border:true,
        //                     insID:'ins2',
        //                     insValue:'300',
        //                     stop:true,
        //                 },
        //                 {
        //                     contral:0,
        //                     type:'perch',
        //                     border:true,
        //                     insID:'ins3',
        //                     insSymmetry:{true:'0',false:''},
        //                 }
        //             ]
        //         }
        //     },
        //     {
        //         type:'arrowButton',
        //         content:{
        //             text:'呼叫设置',
        //             viceText:'',
        //             value:'',
        //             id:'3',
        //             img:'http://apps.jimimax.com/setting/instuct/Call_times%20@3x.png'
        //         },
        //         border:true,
        //         data:{
        //             isButton:true,
        //             instruction:'CALL,ins1#',
        //             instructionArr:[
        //                 { 
        //                     type:'title',
        //                     content:'呼叫次数',
        //                 },
        //                 {
        //                     type:'select',
        //                     content:[
        //                         {
        //                             text:'1次',
        //                             value:1,
                                    
        //                         },
        //                         {
        //                             text:'2次',
        //                             value:2,
        //                         },
        //                         {
        //                             text:'3次',
        //                             value:3,
        //                         }
        //                     ],
        //                     value:3,
        //                     border:true,
        //                     insID:'ins1',
        //                     insValue:3,
        //                 },
        //             ]
        //         }
        //     },
        //     {
        //         type:'arrowButton',
        //         content:{
        //             text:'电子狗设置',
        //             viceText:'',
        //             value:'',
        //             id:'4',
        //             img:'http://apps.jimimax.com/setting/instuct/Electronic_dog@3x.png'
        //         },
        //         border:true,
        //         data:{
        //             isButton:true,
        //             instruction:'DOG,ins1',
        //             instructionArr:[
        //                 {
        //                     type:'title',
        //                     content:'',
        //                     style:{
        //                         paddingTop:0,
        //                         paddingBottom:0
        //                     }
        //                 },
        //                 {
        //                     type:'switch',
        //                     content:{
        //                         text:'电子狗设置'
        //                     },
        //                     value:true,
        //                     insID:'ins1',
        //                     insSymmetry:{true:'ON',false:'OFF'},
        //                     insValue:'ON',
        //                 }
        //             ]
        //         }
        //     },
        //     {
        //         type:'arrowButton',
        //         content:{
        //             text:'远程控制',
        //             viceText:'',
        //             value:'',
        //             id:'5',
        //             img:'http://apps.jimimax.com/setting/instuct/Remote_control@3x.png'
        //         },
        //         border:true,
        //         data:{
        //             isButton:true,
        //             instruction:'RELAY,ins1#',
        //             instructionArr:[
        //                 {
        //                     type:'title',
        //                     content:'',
        //                     style:{
        //                         paddingTop:0,
        //                         paddingBottom:0
        //                     }
        //                 },
        //                 {
        //                     type:'switch',
        //                     content:{
        //                         text:'是否断油电'
        //                     },
        //                     value:true,
        //                     insID:'ins1',
        //                     insSymmetry:{true:'1',false:'0'},
        //                     insValue:'1',
        //                 }
        //             ]
        //         }
        //     },
        //     {
        //         type:'arrowButton',
        //         content:{
        //             text:'震动报警',
        //             viceText:'',
        //             value:'',
        //             id:'6',
        //             img:'http://apps.jimimax.com/setting/instuct/Shock@3x.png'
        //         },
        //         border:true,
        //         data:{
        //             isButton:true,
        //             instruction:'SENALM,ins1,ins2#',
        //             instructionArr:[
        //                 {
        //                     type:'title',
        //                     content:'',
        //                     style:{
        //                         paddingTop:0,
        //                         paddingBottom:0
        //                     }
        //                 },
        //                 {
        //                     type:'switch',
        //                     content:{
        //                         text:'是否开启震动报警'
        //                     },
        //                     value:true,
        //                     insID:'ins1,',
        //                     insSymmetry:{true:'ON,',false:'OFF'},
        //                     insValue:'ON,',
        //                 },
        //                 {
        //                     type:'title',
        //                     content:'',
        //                     style:{
        //                         paddingTop:0,
        //                         paddingBottom:0
        //                     }
        //                 },
        //                 {
        //                     contral:1,
        //                     type:'select',
        //                     content:[
        //                         {
        //                             text:'低',
        //                             value:0,
                                    
        //                         },
        //                         {
        //                             text:'中',
        //                             value:1,
        //                         },
        //                         {
        //                             text:'高',
        //                             value:2,
        //                         },
        //                     ],
        //                     value:1,
        //                     border:true,
        //                     insID:'ins2',
        //                     insValue:1,
        //                 },
        //             ]
        //         }
        //     },
        //     {
        //         type:'arrowButton',
        //         content:{
        //             text:'超速告警',
        //             viceText:'',
        //             value:'',
        //             id:'7',
        //             img:'http://apps.jimimax.com/setting/instuct/Speeding@3x.png'
        //         },
        //         border:true,
        //         data:{
        //             isButton:true,
        //             instruction:'SPEED,ins1ins2ins3ins4#',
        //             hint:'速度超出阀值后设备发出报警',
        //             instructionArr:[
        //                 {
        //                     type:'switch',
        //                     content:{
        //                         text:'允许报警'
        //                     },
        //                     value:true,
        //                     insID:'ins1',
        //                     insSymmetry:{true:'ON,',false:'OFF'},
        //                     insValue:'ON,',
        //                 },
        //                 {
        //                     type:'title',
        //                     content:'',
        //                     style:{
        //                         paddingTop:0,
        //                         paddingBottom:0
        //                     }
        //                 },
        //                 {
        //                     contral:0,
        //                     type:'input',
        //                     content:{
        //                         placeholder:'请输入持续时间',
        //                         type:'',
        //                         text:'持续时间',
        //                         keyboardType:'number-pad',
        //                         symbol:','
        //                     },
        //                     value:'20',
        //                     border:true,
        //                     insID:'ins2',
        //                     insValue:'20',
        //                     stop:true
        //                 },
        //                 {
        //                     contral:0,
        //                     type:'input',
        //                     content:{
        //                         placeholder:'请输入超速范围',
        //                         type:'',
        //                         text:'超速范围',
        //                         keyboardType:'number-pad',
        //                         symbol:','
        //                     },
        //                     value:'100',
        //                     border:true,
        //                     insID:'ins3',
        //                     insValue:'100',
        //                     stop:true,
                            
        //                 },
        //                 {
        //                     contral:0,
        //                     type:'perch',
        //                     border:true,
        //                     insID:'ins4',
        //                     insSymmetry:{true:'0',false:''},
        //                 }
        //             ]
        //         }
        //     },
        //     {
        //         type:'arrowButton',
        //         content:{
        //             text:'自定义',
        //             viceText:'',
        //             value:'',
        //             id:'8',
        //             img:'http://apps.jimimax.com/setting/instuct/Customize@3x.png'
        //         },
        //         border:true,
        //         data:{
        //             isButton:true,
        //             instruction:'ins1',
        //             instructionArr:[
        //                 {
        //                     type:'title',
        //                     content:'',
        //                     style:{
        //                         paddingTop:0,
        //                         paddingBottom:0
        //                     }
        //                 },
        //                 {
        //                     type:'input',
        //                     content:{
        //                         placeholder:'请输入自定义指令',
        //                         type:'',
        //                         text:'自定义指令',
        //                         rule:'^[\d\D]*'
        //                     },
        //                     value:'',
        //                     border:true,
        //                     insID:'ins1',
        //                     insValue:'',
        //                 }
        //             ]
        //         }
        //     },
        // ];

        this.data = [
            {
                type:'arrowButton',
                content:{
                    text:'SOS号码设置',
                    viceText:'',
                    value:'',
                    id:'0',
                    img:'http://apps.jimimax.com/setting/instuct/SOS_number@3x.png'
                },
                border:true,
                data:{
                    isButton:true,
                    instruction:'SOS,A,ins1,ins2,ins3#',
                    hint:'SOS号码用于接收报警短信以及SOS报警，支持3-20位数字SOS号码设置',
                    instructionArr:[
                        {
                            type:'input',
                            content:{
                                placeholder:'请输入SOS号码',
                                type:'',
                                text:'号码1',
                                keyboardType:'number-pad',
                               
                            },
                            value:'',
                            border:true,
                            insID:'ins1',
                            insValue:'',
                        },
                        {
                            type:'input',
                            content:{
                                placeholder:'请输入SOS号码',
                                type:'',
                                text:'号码2',
                                keyboardType:'number-pad',
                               
                            },
                            value:'',
                            border:true,
                            insID:'ins2',
                            insValue:'',
                        },
                        {
                            type:'input',
                            content:{
                                placeholder:'请输入SOS号码',
                                type:'',
                                text:'号码3',
                                keyboardType:'number-pad',
                               
                            },
                            value:'',
                            border:true,
                            insID:'ins3',
                            insValue:'',
                        }
                    ]
                }
            },
            {
                type:'arrowButton',
                content:{
                    text:'SOS号码删除',
                    viceText:'',
                    value:'',
                    id:'1',
                    img:'http://apps.jimimax.com/setting/instuct/Sos@3x.png'
                },
                border:true,
                data:{
                    isButton:true,
                    instruction:'SOS,D,ins1#',
                    hint:'选择需要删除的SOS号码',
                    instructionArr:[
                        {
                            type:'select',
                            content:[
                                {
                                    text:'SOS号码1',
                                    value:1,
                                    
                                },
                                {
                                    text:'SOS号码2',
                                    value:2,
                                },
                                {
                                    text:'SOS号码3',
                                    value:3,
                                },
                            ],
                            value:1,
                            border:true,
                            insID:'ins1',
                            insValue:1,
                        },
                    ]
                }
            },
            {
                type:'arrowButton',
                content:{
                    text:'震动报警',
                    viceText:'',
                    value:'',
                    id:'2',
                    img:'http://apps.jimimax.com/setting/instuct/Shock@3x.png'
                },
                border:true,
                data:{
                    isButton:true,
                    instruction:'SENALM,ins1ins2#',
                    instructionArr:[
                        {
                            type:'switch',
                            content:{
                                text:'是否开启震动报警'
                            },
                            value:false,
                            insID:'ins1',
                            insSymmetry:{true:'ON,',false:'OFF'},
                            insValue:'OFF',
                        },
                        {
                            type:'title',
                            content:'上报方式',
                            contral:0,
                        },
                        {
                            contral:0,
                            type:'select',
                            content:[
                                {
                                    text:'平台',
                                    value:0,
                                    
                                },
                                {
                                    text:'平台+短信',
                                    value:1,
                                },
                                {
                                    text:'平台+短信+电话',
                                    value:2,
                                },
                            ],
                            value:1,
                            border:true,
                            insID:'ins2',
                            insValue:1,
                        },
                    ]
                }
            },
            {
                type:'arrowButton',
                content:{
                    text:'低电报警',
                    viceText:'',
                    value:'',
                    id:'3',
                    img:'http://apps.jimimax.com/setting/instuct/Electricity_low@3x.png'
                },
                border:true,
                data:{
                    isButton:true,
                    instruction:'BATALM,ins1ins2#',
                    hint:'设备内置电池低电后触发低电报警',
                    instructionArr:[
                        {
                            type:'switch',
                            content:{
                                text:'是否开启低电报警'
                            },
                            value:true,
                            insID:'ins1',
                            insSymmetry:{true:'ON,',false:'OFF'},
                            insValue:'ON,',
                        },
                        {
                            type:'title',
                            content:'上报方式',
                            contral:0,
                        },
                        {
                            contral:0,
                            type:'select',
                            content:[
                                {
                                    text:'平台',
                                    value:0,
                                    
                                },
                                {
                                    text:'平台+短信',
                                    value:1,
                                },
                            ],
                            value:1,
                            border:true,
                            insID:'ins2',
                            insValue:1,
                        },
                    ]
                }
            },
            {
                type:'arrowButton',
                content:{
                    text:'声控报警',
                    value:'',
                    id:'4',
                    img:'http://apps.jimimax.com/setting/instuct/Voice_control@3x.png'
                },
                border:true,
                data:{
                    isButton:true,
                    instruction:'SODALM,ins1ins2ins3ins4ins5#',
                    hint:'设备检测到周围的声音达到60分呗触发报警',
                    instructionArr:[
                        {
                            type:'switch',
                            content:{
                                text:'是否开启声控报警'
                            },
                            value:false,
                            insID:'ins1',
                            insSymmetry:{true:'ON,',false:'OFF'},
                            insValue:'OFF',
                        },
                        { 
                            type:'title',
                            content:'上报方式',
                            contral:0,
                        },
                        {
                            type:'select',
                            contral:0,
                            value:'1,',
                            border:true,
                            insID:'ins2',
                            insValue:'1,',
                            content:[
                                {
                                    text:'平台+自动录音',
                                    value:'0,',
                                    
                                },
                                {
                                    text:'平台',
                                    value:'1,',
                                },
                                {
                                    text:'平台+监听',
                                    value:'2,',
                                }
                            ],
                            
                        },
                        { 
                            contral:0,
                            type:'title',
                            content:'灵敏度',
                        },
                        {
                            contral:0,
                            type:'step',
                            value:'3,',
                            border:true,
                            insID:'ins3',
                            insValue:'3,',
                            content:{
                                text:'声控灵敏度',
                                stepValue:[
                                    {
                                        text:'低',
                                        value:'3,',
                                    },
                                    {
                                        text:'中',
                                        value:'5,',
                                    },
                                    {
                                        text:'高',
                                        value:'7,',
                                    },
                                ]
                               
                            },
                            hint:'仅支持1-10之间的数字',
                            value:'3,',
                            border:true,
                            insID:'ins3',
                            insValue:'3,',
                            stop:true,
                        },
                        {
                            contral:0,
                            type:'perch',
                            insID:'ins4',
                            insSymmetry:{true:'2,',false:''},
                        },
                        {
                            contral:0,
                            type:'perch',
                            insID:'ins5',
                            insSymmetry:{true:'60',false:''},
                        }
                    ]
                }
            },
            {
                type:'arrowButton',
                content:{
                    text:'换卡报警',
                    value:'',
                    id:'5',
                    img:'http://apps.jimimax.com/setting/instuct/Card_change@3x.png'
                },
                border:true,
                data:{
                    isButton:true,
                    instruction:'SIMALM,ins1ins2#',
                    hint:'设备中的SIM卡更换后产生换卡报警。',
                    instructionArr:[
                        {
                            type:'switch',
                            content:{
                                text:'是否开启换卡报警'
                            },
                            value:false,
                            insID:'ins1',
                            insSymmetry:{true:'ON,',false:'OFF'},
                            insValue:'OFF',
                        },
                        { 
                            type:'title',
                            content:'上报方式',
                            contral:0,
                        },
                        {
                            contral:0,
                            type:'select',
                            value:'1,',
                            border:true,
                            insID:'ins2',
                            insValue:'1,',
                            content:[
                                {
                                    text:'平台',
                                    value:'0,',
                                    
                                },
                                {
                                    text:'短信+平台',
                                    value:'1,',
                                },
                                {
                                    text:'平台+短信+电话',
                                    value:'2,',
                                },
                                {
                                    text:'平台+电话',
                                    value:'3,',
                                }
                            ],
                           
                        },
                    ]
                }
            },
            {
                type:'arrowButton',
                content:{
                    text:'获取号码',
                    viceText:'',
                    value:'',
                    id:'6',
                    img:'http://apps.jimimax.com/setting/instuct/Number_acquisition@3x.png'
                },
                border:true,
                data:{
                    isButton:true,
                    instruction:'FW,ins1,ins2#',
                    instructionArr:[
                        {
                            type:'input',
                            content:{
                                placeholder:'请输入发送的电话号码',
                                type:'',
                                text:'号码',
                                rule:'^([0-9]|-){3,20}$',
                                keyboardType:'number-pad',
                               
                            },
                            hint:'请输入正确的电话号码',
                            value:'',
                            border:true,
                            insID:'ins1',
                            insValue:'',
                            stop:true,
                        },
                        {
                            type:'input',
                            content:{
                                placeholder:'请输入需要发送的信息',
                                type:'',
                                text:'信息',
                                rule:'^.+$',
                            },
                            value:'',
                            border:true,
                            insID:'ins2',
                            insValue:'',
                            hint:'请输入需要发送的信息',
                            stop:true,
                        },
                    ]
                }
            },
            {
                type:'arrowButton',
                border:true,
                content:{
                    text:'立即定位',
                    viceText:'',
                    value:'',
                    id:'7',
                    img:'http://apps.jimimax.com/setting/instuct/Position_now@3x.png'
                },
                data:{
                    isButton:true,
                    instruction:'LJDW#',
                    hint:'指令下发后，立即打开卫星定位，如果在卫星盲区将进行WIFI定位。',
                    instructionArr:[
                        {
                            type:'title',
                            content:'立即定位',
                            border:true,
                            style:{
                                backgroundColor:'#fff'
                            }
                        }
                    ]
                }
            },
            {
                type:'arrowButton',
                border:true,
                content:{
                    text:'WIFI定位',
                    viceText:'',
                    value:'',
                    id:'8',
                    img:'http://apps.jimimax.com/setting/instuct/Customize@3x.png'
                },
                data:{
                    isButton:true,
                    instruction:'WIFION#',
                    hint:'发送成功后地图上显示WIFI定位,如WIFI信号没有被服务收集的地方，无法正常定位。',
                    instructionArr:[
                        {
                            type:'title',
                            content:'WIFI定位',
                            style:{
                                backgroundColor:'#fff'
                            }
                        }
                    ]
                }
            },
            {
                type:'arrowButton',
                content:{
                    text:'工作模式',
                    viceText:'',
                    value:'',
                    id:'10',
                    img:'http://apps.jimimax.com/setting/instuct/Mode@3x.png'
                },
                border:true,
                data:{
                    isButton:true,
                    instruction:'MODE,ins1ins2ins3ins4#',
                    hint:'设置设备工作模式',
                    instructionArr:[
                        {
                            type:'select',
                            content:[
                                {
                                    text:'智能定位模式',
                                    value:'1,',
                                    
                                },
                                {
                                    text:'定时定位模式',
                                    value:'2,',
                                },
                                {
                                    text:'寻车模式',
                                    value:'3',
                                },
                            ],
                            value:'1,',
                            insID:'ins1',
                            insValue:'1,',
                            border:'true'
                        },
                        {
                            type:'title',
                        },
                        {
                            contral:0,
                            contralValue:'1,',
                            type:'modelSelect',
                            value:10,
                            insID:'ins2',
                            insValue:10,
                            content:{
                                text:'请选择时间',
                                modelType:'Custom',
                                modelData:[
                                    {
                                        text:'10秒钟',
                                        value:10
                                    },
                                    {
                                        text:'20秒钟',
                                        value:20
                                    },
                                    {
                                        text:'30秒钟',
                                        value:30
                                    },
                                    {
                                        text:'1分钟',
                                        value:60
                                    },
                                    {
                                        text:'2分钟',
                                        value:120
                                    },
                                    {
                                        text:'5分钟',
                                        value:300
                                    },
                                    {
                                        text:'10分钟',
                                        value:600
                                    },
                                ]
                            }
                        },
                        {
                            contral:0,
                            contralValue:'2,',
                            type:'modelSelect',
                            value:7200,
                            insID:'ins3',
                            insValue:7200,
                            content:{
                                text:'请选择时间',
                                modelType:'Custom',
                                modelData:[
                                    {
                                        text:'5分钟',
                                        value:300
                                    },
                                    {
                                        text:'10分钟',
                                        value:600
                                    },
                                    {
                                        text:'20分钟',
                                        value:1200
                                    },
                                    {
                                        text:'30分钟',
                                        value:1800
                                    },
                                    {
                                        text:'1小时',
                                        value:3600
                                    },
                                    {
                                        text:'2小时',
                                        value:7200
                                    },
                                    {
                                        text:'5小时',
                                        value:18000
                                    },
                                    {
                                        text:'12小时',
                                        value:43200
                                    },
                                    {
                                        text:'24小时',
                                        value:86400
                                    },
                                ]
                            }
                        },
                        {
                            type:'title',
                        },                       
                        {
                            contral:[0,3],
                            contralValue:['2,',[3600,18000,1200]],
                            type:'modelSelect',
                            value:7200,
                            insID:'ins4',
                            insValue:7200,
                            content:{
                                text:'时间单位',
                                modelType:'Custom',
                                modelData:[
                                    {
                                        text:'5分钟',
                                        value:300
                                    },
                                    {
                                        text:'10分钟',
                                        value:600
                                    },
                                    {
                                        text:'20分钟',
                                        value:1200
                                    },
                                    {
                                        text:'30分钟',
                                        value:1800
                                    },
                                    {
                                        text:'1小时',
                                        value:3600
                                    },
                                    {
                                        text:'2小时',
                                        value:7200
                                    },
                                    {
                                        text:'5小时',
                                        value:18000
                                    },
                                    {
                                        text:'12小时',
                                        value:43200
                                    },
                                    {
                                        text:'24小时',
                                        value:86400
                                    },
                                ]
                            }
                        }
                        
                    ]
                }
            },
            {
                type:'arrowButton',
                content:{
                    text:'自定义',
                    viceText:'',
                    value:'',
                    id:'11',
                    img:'http://apps.jimimax.com/setting/instuct/Customize@3x.png'
                },
                border:true,
                data:{
                    isButton:true,
                    instruction:'ins1',
                    instructionArr:[
                        {
                            type:'title',
                            content:'',
                            style:{
                                paddingTop:0,
                                paddingBottom:0
                            }
                        },
                        {
                            type:'input',
                            content:{
                                placeholder:'请输入自定义指令',
                                type:'',
                                text:'自定义指令',
                            },
                            value:'',
                            border:true,
                            insID:'ins1',
                            insValue:'',
                        }
                    ]
                }
            }
        ]
        this.state = {
            data:[]
        }
        
    }
    componentDidMount(){
        const data = Jimi.Instruction.ftmInternation(this.data);
        console.log(data,'获取的数据');
        this.setState({
            data
        })

    }
    render(){
        return (
            <Jimi.Instruction instructionArr={this.data} onArrowButton={(data) => this.onArrowButton(data)}></Jimi.Instruction>
        );
    }
    onArrowButton = (data) => {
        const params = JSON.parse(JSON.stringify(data.data));
        params.I18n = I18n;
        this.props.navigation.navigate('Instructions',params);
    }
}