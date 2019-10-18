/*
 * @Descripttion: 
 * @version: 
 * @Author: xieruizhi
 * @Date: 2019-09-25 11:48:19
 * @LastEditors: xieruizhi
 * @LastEditTime: 2019-10-18 14:02:42
 */
import React, {Component} from 'react';
import {Jimi} from '../index';


export default class BaiduAddFence extends Component { 
    constructor(props) {
        super(props);
    }
    

    render() {
        let {params} = this.props.navigation.state;
        return <Jimi.BaiduAddFence
            fenceId={params?params.fenceId:''}
            onSave={()=>{
                this.props.navigation.goBack();
            }}
            onDeviceChange = {(data)=>{
                console.log(data,'设备数据');
                
            }}
        ></Jimi.BaiduAddFence>;
    }
}