/*
 * @Descripttion: 
 * @version: 
 * @Author: xieruizhi
 * @Date: 2019-09-19 11:49:16
 * @LastEditors: xieruizhi
 * @LastEditTime: 2020-06-12 14:18:58
 */
import React,{Component} from 'react';
import {View} from 'react-native';
import BaiduTrack from './BaiduTrack';
import GoogleTrack from './GoogleTrack';

export default class Track extends Component { 
    constructor(props) {
        super(props);
    }

    render(){
        return <View style={{flex:1}}>
            {
                I18n.locale === 'en' ? <BaiduTrack {...this.props} >
                    {this.props.children}
                </BaiduTrack> : <GoogleTrack {...this.props} >
                    {this.props.children}
                </GoogleTrack>
            }
        </View>;
    }   
}