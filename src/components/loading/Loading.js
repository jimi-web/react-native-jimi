/*
 * @Descripttion: 
 * @version: 
 * @Author: xieruizhi
 * @Date: 2019-10-16 14:36:46
 * @LastEditors: xieruizhi
 * @LastEditTime: 2019-11-25 11:56:59
 */
import React from 'react';
import {
    ActivityIndicator
} from 'react-native';
import {Toast} from 'teaset';

export default class Loading { 
    static customKey  = null

    static show(text,icon=<ActivityIndicator size='large' color={'#fff'} />,duration=15000) {
        this.customKey = Toast.show({
            text: text?text:'加载中...',
            icon: icon,
            position: 'center',
            duration: duration,
        });
    }


    static hide() {
        Toast.hide(this.customKey);
    }
    
}


