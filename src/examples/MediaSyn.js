/*
 * @Descripttion: 媒体同步
 * @version: 
 * @Author: liujinyuan
 * @Date: 2020-2-19 21:16:42
 * @LastEditors: liujinyuan
 * @LastEditTime: 2020-03-10 15:12:52
 */
import React, {Component} from 'react';
import { Jimi } from '../index';
export default class MediaSyc extends Component { 

    constructor(props){
        super(props);
        this.config ={
            baseUrl:'192.17.1.227',
            mode:'passive',
            port:1245679,
            account:'jimitest',
            password:'jimi123'
        },
        this.subPath = 'www.baidu.com';
    }

    render(){
        return (
            <Jimi.MediaSyc config={this.config} subPath = {this.subPath} />
            // <Jimi.MediaSyn config={this.config} subPath = {this.subPath} />
        );
    }

}