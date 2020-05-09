/*
 * @Descripttion: 
 * @version: 
 * @Author: liujinyuan
 * @Date: 2019-12-19 15:01:45
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-05-09 09:20:40
 */


import React, { Component } from 'react';
import { TouchableOpacity,Text} from 'react-native';
export default class RvcLoading extends Component {
    get(){
        const errMessage = [
            {
                code:3,
                message:'视频停止播放'
            },
            {
                code:4,
                message:'请求超时'
            },
            {
                code:5,
                message:'URL无效'
            },
            {
                code:6,
                message:'打开URL失败'
            },
            {
                code:7,
                message:'打开URL超时'
            },
            {
                code:8,
                message:'播放异常或设备停止推流'
            },
            {
                code:9,
                message:'http请求超时'
            },
            {
                code:10,
                message:'域名或IP错误'
            },
            {
                code:11,
                message:'http参数错误'
            },
            {
                code:12,
                message:'服务器数据解析异常'
            },
            {
                code:13,
                message:'设备回复“失败”及拒绝响应'
            },
            {
                code:14,
                message:'网络异常'
            },
        ];
        return errMessage;
    }

    render(){
        return (
            <TouchableOpacity style={{width:200,height:200,position:'absolute',zIndex:335,alignItems:'center',justifyContent:'center'}}  activeOpacity={1} onPress={this.onAgain}>
                <Text style={{fontSize:14,color:'#fff',marginBottom:15}}>{this.getErrorMessage()}</Text>
                <Text style={{fontSize:14,color:'#fff',padding:10,borderColor:'#fff',borderStyle:'solid',borderWidth:1,borderRadius:4}}>{'点击重试'}</Text>
            </TouchableOpacity>
        );
    }
    onAgain = () => {
        this.props.onAgain && this.props.onAgain();
    }
    getErrorMessage = () => {
        const {errorCode,errorMessage} = this.props;
        if(errorMessage){
            return errorMessage;
        }
        const errArray = this.get();
        const errorMessages = errArray.filter(item => {
            return item.code == errorCode;
        });
        const message = `${errorMessages[0].message}[${errorMessages[0].code}]` || '网络不给力[-1]';
        return message;
    }
}             