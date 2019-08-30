/*
 * @Descripttion: 相册模块
 * @version: 1.0.0
 * @Author: liujinyuan
 * @Date: 2019-08-08 14:48:01
 * @LastEditors: liujinyuan
 * @LastEditTime: 2019-08-26 10:00:46
 */
import React, {Component} from 'react';
import {View,StyleSheet} from 'react-native';
import {httpSamllLocation} from '../../http/business';
import Album from './Album';
export default class Photo extends Component{
    constructor(props){
        super(props);
        this.state = {
            
        };
    }
    componentDidMount(){
        this.getSamllLocation();
    }
    
    /**
     * 获取小程序为位置
     */
    getSamllLocation = () => {
        httpSamllLocation().then(res => {
            console.log(res,'小程序位置');
        });
        
    }
    render(){
        return (
            <View style={{flex:1}}>
                <Album />
            </View>
        );
    }
    

}

const styles = StyleSheet.create({
    
});