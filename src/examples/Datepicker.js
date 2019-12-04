/*
 * @Descripttion: 
 * @version: 
 * @Author: xieruizhi
 * @Date: 2019-11-29 10:19:57
 * @LastEditors: xieruizhi
 * @LastEditTime: 2019-12-03 13:45:21
 */
import React,{Component} from 'react';
import {View} from 'react-native';
import {Circle} from '../index';

export default class Datepicker extends Component{

    constructor(props){
        super(props);
    }
    
    componentDidMount(){
        Circle.Datepicker.show({
            onConfirm:(value)=>{
                console.log(value);
            }
        });
    }

    render(){
        return <View></View>;
    }
}