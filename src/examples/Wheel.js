/*
 * @Descripttion: 
 * @version: 
 * @Author: xieruizhi
 * @Date: 2019-11-13 16:12:39
 * @LastEditors: xieruizhi
 * @LastEditTime: 2019-11-19 10:09:24
 */
import React, {Component} from 'react';
import {Circle} from '../index';
  
export default class GetWheel extends Component {

    constructor(props){
        super(props);
    }

    render(){
        return <Circle.Wheel
            style={{height: 150, width: 50}}
            itemStyle={{textAlign: 'center'}}
            items={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
        />;
    }

}