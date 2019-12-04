/*
 * @Descripttion: 
 * @version: 
 * @Author: xieruizhi
 * @Date: 2019-09-25 11:48:19
 * @LastEditors: xieruizhi
 * @LastEditTime: 2019-12-02 10:49:44
 */
import React, {Component} from 'react';
import {View,Text,Animated} from 'react-native';
import DatePickerView from '../components/datePickerDialog/DatePickerView';

export default class Test extends Component { 
    constructor(props) {
        super(props);
    }
    

    render() {
        return <DatePickerView></DatePickerView>;
    }
}