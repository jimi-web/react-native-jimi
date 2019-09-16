/*
 * @Descripttion: 
 * @version: 
 * @Author: xieruizhi
 * @Date: 2019-09-12 15:48:07
 * @LastEditors: xieruizhi
 * @LastEditTime: 2019-09-12 17:47:36
 */
import React, {Component} from 'react';
import {View,Platform,TouchableOpacity,Image,Text,Dimensions} from 'react-native';
import {SegmentedBar} from 'teaset';

export default class Test extends Component {
    constructor(props) {
        super(props);
    }

    render(){
        return <View>
            <SegmentedBar>
                <SegmentedBar.Item title='Apple' />
                <SegmentedBar.Item title='Banana' />
                <SegmentedBar.Item title='Cherry' />
                <SegmentedBar.Item title='Durian' />
            </SegmentedBar>
        </View>;
    }
}
