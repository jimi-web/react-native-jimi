/*
 * @Descripttion: 
 * @version: 
 * @Author: xieruizhi
 * @Date: 2019-09-29 14:02:31
 * @LastEditors: xieruizhi
 * @LastEditTime: 2019-09-29 15:10:39
 */
import React, {Component} from 'react';
import {View} from 'react-native';
import AddFenceStyles from '../style/addfence';
import {SearchInput } from 'teaset';

export default class AddFence extends Component { 
    
    constructor(props) {
        super(props);
    }

    render() {
        return <View style={{flex:1,backgroundColor:'red'}}>
            <View style={AddFenceStyles.search}>
                
            </View>
        </View>;
    } 
     
}