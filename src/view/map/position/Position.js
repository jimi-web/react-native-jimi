/*
 * @Descripttion: 
 * @version: 
 * @Author: xieruizhi
 * @Date: 2019-08-12 09:36:35
 * @LastEditors: xieruizhi
 * @LastEditTime: 2020-06-17 18:25:10
 */
import React,{Component} from 'react';
import {View} from 'react-native';
import BaiduPosition from './BaiduPosition';
import GooglePosition from './GooglePosition';


export default class Position extends Component { 


    render(){
        return <View style={{flex:1}}>
            {
                I18n.locale === 'zh-Hans' ? <BaiduPosition {...this.props}  ref={(ref)=>this.Position=ref} >
                        {this.props.children}
                </BaiduPosition> : <GooglePosition {...this.props} ref={(ref)=>this.Position=ref} >
                        {this.props.children}
                </GooglePosition>
            }
        </View>;
    }
 
}