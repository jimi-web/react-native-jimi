/*
 * @Descripttion: 
 * @version: 
 * @Author: xieruizhi
 * @Date: 2019-09-25 11:48:19
 * @LastEditors: xieruizhi
 * @LastEditTime: 2019-10-22 16:15:35
 */
import React, {Component} from 'react';
import {View} from 'react-native';
import {Jimi} from '../index';
import {jmAjax} from '../http/business';
import api from '../api/index';


export default class Fence extends Component { 

    constructor(props) {
        super(props);
    }
    
    render() {
        return <Jimi.FenceList
            getData = {this.getList}
            onAddEditFence={(data)=>{
                console.log(data);
                let obj = data ? {fenceId:data.fenceId} : null;
                this.props.navigation.push('AddFence',obj);
            }}
        ></Jimi.FenceList>;
    }


    getList =(data) =>{
        jmAjax({
            url:api.fenceList,
            method:'GET',
            encoding:true,
            encodingType:true
        }).then((res)=>{
            data(res);
        });
    }
}