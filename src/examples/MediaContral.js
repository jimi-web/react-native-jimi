/*
 * @Descripttion: 设备控制
 * @version: 
 * @Author: liujinyuan
 * @Date: 2020-03-16 09:32:25
 * @LastEditors: liujinyuan
 * @LastEditTime: 2020-03-31 16:29:45
 */
import React, {Component} from 'react';
import { Jimi } from '../index';
export default class MediaSyc extends Component { 

    constructor(props){
        super(props);
    }

    render(){
        return (
            <Jimi.MediaContral/>
        );
    }

    

}