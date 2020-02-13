/*
 * @Descripttion: 指令组件
 * @version: 
 * @Author: liujinyuan
 * @Date: 2019-12-29 13:57:55
 * @LastEditors  : liujinyuan
 * @LastEditTime : 2020-02-13 09:53:23
 */
import React, { Component } from 'react';
import {View,Text,ScrollView,Image} from 'react-native';
import PropTypes from 'prop-types';
import {Toast,Button} from '../../components/index';
import InsSwitch from './InsSwitch';
import baseStyle from '../baseStyle';
import InsArrowButton from './InsArrowButton';
import InsSelect from './InsSelect';
import InsMultiSelect from './InsMultiSelect';
import InsInput from './InsInput';
import InsModelSelect from './InsModelSelect';
import InsStep from './InsStep';
import Api from '../../api';
export default class Instruction extends Component {

    static propTypes = {
        instructionArr:PropTypes.array,
        instruction:PropTypes.string,
        isButton:PropTypes.bool,//是否需要按钮，当开启该按钮时，除确定外，所有事件都不会触发指令
    }

    static defaultProps = {
        instruction:'21323,ins1,ins2,ins3,ins4,ins5,ins6#',
        isButton:true,
        instructionArr:[
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
        ]
    }
    constructor(props){ 
        super(props);
        this.insArr = JSON.parse(JSON.stringify(this.props.instructionArr));
    }
    render(){
        return (
            <ScrollView style={{backgroundColor:'#f7f7f7',flex:1}}>
                {
                    this.props.instructionArr.map((item,index) => {
                        return <View key={index} style={this.renderItemStyle()}>{this.renderInstruction(item,index)}</View>;
                    })
                }
                {/* 底部按钮 */}
                {
                    this.props.isButton
                        ?
                        <View style={{marginTop:40,marginBottom:40,alignItems:'center'}}>
                            <Button title={'发送指令'} />
                        </View>
                        :
                        null
                }
            </ScrollView>
        );
    }
    /**
     * 渲染每一行的样式
     */
    renderItemStyle = () => {
        const {itemStyle} = this.props;
        const styles = [
            {
                justifyContent:'center',
                paddingLeft:15,
                paddingRight:15,
                width:'100%',
                backgroundColor:'#fff',
            }
        ].concat(itemStyle);
        return styles;
    }
    /*
    *渲染指令
    */
    renderInstruction = (item,index) => {
        let element = null;
        switch (item.type) {
        case 'switch':
            element = <InsSwitch index={index} data={item} onValueChange={(data,index) => this.onIns(data,index)} />;
            break;
        case 'select':
            element = <InsSelect index={index} data={item} onSelect={(data,index) => this.onIns(data,index)}  />;
            break;
        case 'multiSelect':
            element = <InsMultiSelect index={index} data={item} onMultiSelect={(data,index) => this.onIns(data,index)} />;
            break;
        case 'input':
            element = <InsInput index={index} data={item} onInput={(data,index) => this.onIns(data,index)} />;
            break;
        case 'title':
            element = <View index={index} style={[baseStyle.bottomBorderStyle,{flex:1,justifyContent:'center',height:50}]}><Text>{item.content}</Text></View>;  
            break;
        case 'arrowButton':
            element = <InsArrowButton index={index} data={item} onPress={(item) => this.onArrowButton(item,index)} />;  
            break;
        case 'modelSelect':
            element = <InsModelSelect index={index} data={item} onPress={(data,index) => this.onIns(data,index)} />;  
            break;
        case 'step':
            element = <InsStep index={index} data={item} onEndTouches={(data,index) => this.onIns(data,index)}/>;  
            break;
        case 'element':
            element = item.data;
            break;
        default:
            break;
        }
        return element;
    }
    /*
    * 点击跳转（跳转位置由外部自定义）
     */
     onArrowButton = (data) => {
         this.props.onArrowButton && this.props.onArrowButton(data);
     }

    /*
    *匹配指令统一方法
     */
    getIns = (data) => {
        const {instruction} = this.props;
        let ins = instruction;
        for (let i = 0; i < data.length; i++) {
            const item = data[i];
            if(item.insID){
                ins = ins.replace(item.insID,item.insValue);
            }
        }
        return ins;
    }
    /*
    * 触发指令统一方法
    */
   onIns = (data,index) => {
       const {instruction} = this.props;
       this.insArr[index]  = data;
       const ins = this.getIns(this.insArr);
       const inProps = {
           ins,
           insArr:this.insArr
       };
       this.props.onIns && this.props.onIns(inProps);
       if(this.props.isButton){
           return;
       }
       this.setInstruction(this.insArr,ins);
        
   }
   /*
    *发送指令公用方法
     */
    setInstruction = (params,instrution) => {
        const url = Api.instruction;
        const data = {
            encodingType:'IMEI',
            cmdCode:instrution,
            cmdType:0,
            cmdId:0,
            isSync:0,
            offLineFlag:0,
            platform:'app',
            offLineInsType:'customIns',
            instructSetting:params
        };
        jmAjax({
            url,
            data,
            method:'post',
            encoding:true,
            encodingType:true,
        }).then(res => {
            const insProps = {
                pnarams,
                istrution
            };
            this.props.setInstruction && this.props.setInstruction(insProps);
        });
    }
}