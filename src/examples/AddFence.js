/*
 * @Descripttion: 
 * @version: 
 * @Author: xieruizhi
 * @Date: 2019-09-25 11:48:19
 * @LastEditors: xieruizhi
 * @LastEditTime: 2019-10-21 14:56:23
 */
import React, {Component} from 'react';
import {Jimi} from '../index';
import {View} from 'react-native';


export default class BaiduAddFence extends Component { 
    constructor(props) {
        super(props);
        this.state = {
            isBaidu:false
        };
    }
    

    render() {
        let {params} = this.props.navigation.state;
        return  <View style={{flex:1}}>
        
            {
                this.state.isBaidu ? <Jimi.BaiduAddFence
                    fenceId={params?params.fenceId:''}
                    onSave={()=>{
                        this.props.navigation.goBack();
                    }}
                    onDeviceChange = {(data)=>{
                        console.log(data,'设备数据');
                
                    }}
                ></Jimi.BaiduAddFence>:<Jimi.GoogleAddFence></Jimi.GoogleAddFence>
            }
        </View>;
    }
}