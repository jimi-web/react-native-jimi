/*
 * @Descripttion: 
 * @version: 
 * @Author: xieruizhi
 * @Date: 2019-11-19 09:52:42
 * @LastEditors: xieruizhi
 * @LastEditTime: 2020-06-11 14:20:28
 */
import React, {Component} from 'react';
import { Jimi } from '../index';

export default class Photo extends Component { 

    constructor(props){
        super(props);
    }

    componentWillMount(){
        this.willFocusSubscription = this.props.navigation.addListener(
            'willFocus',
            obj => {
                this.photo.upDate();
            }
        );
    }

    componentWillUnmount(){
        this.willFocusSubscription.remove();
    }

    render(){
        return <Jimi.Photo onSelect={(data)=>{
            this.props.navigation.push('PhotoList',{fileType:data.fileType,title:I18n.t(data.title),mediaList:data.mediaList});}}
        ref={(e)=>this.photo =e} />;
    }
}