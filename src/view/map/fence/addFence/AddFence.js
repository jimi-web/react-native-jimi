/*
 * @Descripttion: 
 * @version: 
 * @Author: xieruizhi
 * @Date: 2019-09-29 14:02:31
 * @LastEditors: xieruizhi
 * @LastEditTime: 2020-06-18 10:18:30
 */
import React,{Component} from 'react';
import {View} from 'react-native';
import BaiduAddFence from './BaiduAddFence';
import GoogleAddFence from './GoogleAddFence';

export default class AddFence extends Component { 
    

    constructor(props) {
        super(props);
    }

    render(){
        return <View style={{flex:1}}>
            {
                I18n.locale === 'zh-Hans' && !I18n.isForeign ? <BaiduAddFence {...this.props} >
                        {this.props.children}
                </BaiduAddFence> : <GoogleAddFence {...this.props} >
                        {this.props.children}
                </GoogleAddFence>
            }
        </View>;
    }
}