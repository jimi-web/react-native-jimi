/*
 * @Descripttion: 
 * @version: 
 * @Author: xieruizhi
 * @Date: 2019-10-16 14:36:46
 * @LastEditors: xieruizhi
 * @LastEditTime: 2019-10-16 17:10:26
 */
import React from 'react';
import {
    ActivityIndicator
} from 'react-native';
import {Toast} from 'teaset';

export default class Loading { 
    static customKey  = null

    static show() {
        this.customKey = Toast.show({
            text: '正在加载...',
            icon: <ActivityIndicator size='large' color={'#fff'} />,
            position: 'center',
            duration: 1000000,
        });
    }


    static hide() {
        Toast.hide(this.customKey);
    }
}


