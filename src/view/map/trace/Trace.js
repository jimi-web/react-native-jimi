/*
 * @Descripttion: 
 * @version: 
 * @Author: xieruizhi
 * @Date: 2019-09-19 11:49:16
 * @LastEditors: xieruizhi
 * @LastEditTime: 2020-06-18 10:18:15
 */
import React,{Component} from 'react';
import {View} from 'react-native';
import BaiduTrace from './BaiduTrace';
import GoogleTrace from './GoogleTrace'

export default class Trace extends Component { 
    constructor(props) {
        super(props);
    }

    render(){
        return <View style={{flex:1}}>
            {
                I18n.locale === 'zh-Hans' && !I18n.isForeign ? <BaiduTrace {...this.props} >
                    {this.props.children}
                </BaiduTrace> : <GoogleTrace {...this.props} >
                    {this.props.children}
                </GoogleTrace>
            }
        </View>;
    }   

    
}