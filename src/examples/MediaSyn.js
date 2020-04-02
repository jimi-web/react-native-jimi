/*
 * @Descripttion: 媒体同步
 * @version: 
 * @Author: liujinyuan
 * @Date: 2020-2-19 21:16:42
 * @LastEditors: liujinyuan
 * @LastEditTime: 2020-03-31 16:43:27
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
            <Jimi.MediaSyc onSelect={(item) => this.onSelect(item)} />
            // <Jimi.MediaSyn config={this.config} subPath = {this.subPath} />
        );
        
    }
    onSelect = (item) => {
        this.props.navigation.navigate('MediaDetails',item);
    }

}