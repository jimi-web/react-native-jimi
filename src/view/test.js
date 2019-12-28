/*
 * @Descripttion: 
 * @version: 
 * @Author: xieruizhi
 * @Date: 2019-09-25 11:48:19
 * @LastEditors  : xieruizhi
 * @LastEditTime : 2019-12-27 18:25:40
 */
import React, {Component} from 'react';
import {Icon} from '../components/index';


export default class Test extends Component { 
    constructor(props) {
        super(props);
    }
    
    componentDidMount() {

        
    }

    render() {
        return <Icon name='weixinzhifu' size={100} color={'red'} rotation={50}></Icon>;
    }
}