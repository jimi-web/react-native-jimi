/*
 * @Descripttion: 
 * @version: 
 * @Author: xieruizhi
 * @Date: 2019-10-08 11:54:07
 * @LastEditors: xieruizhi
 * @LastEditTime: 2019-10-08 12:01:31
 */
import React, {Component} from 'react';
import {BoxShadow} from 'react-native-shadow';
export default class Shadow extends Component {
    
    constructor(props) {
        
    }

    render() {
        let options = {
            ...this.props.options,
            color:'#e0e0e0',
            border:15,
            radius:19,
            opacity:0.3,
            x:0,
            y:0,
            style:{marginVertical:0}
        };
        return <BoxShadow setting={options}></BoxShadow>;
    }
}

