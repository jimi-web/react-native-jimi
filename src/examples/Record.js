/*
 * @Descripttion: 
 * @version: 
 * @Author: liujinyuan
 * @Date: 2019-09-30 10:33:07
 * @LastEditors: liujinyuan
 * @LastEditTime: 2019-09-30 11:10:03
 */
import React, { Component } from 'react';
import { View} from 'react-native';
import { Jimi } from '../index';

export default class Record extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <Jimi.Record></Jimi.Record>
            </View>
        );
    }
}