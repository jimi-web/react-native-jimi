/*
 * @Descripttion: 设置主页
 * @version: 
 * @Author: liujinyuan
 * @Date: 2019-08-12 14:36:06
 * @LastEditors: liujinyuan
 * @LastEditTime: 2019-08-12 14:36:42
 */

import React, {Component} from 'react';
import {View,Text,StyleSheet} from 'react-native';

export default class Home extends Component{
    constructor(props){
        super(props);
        this.state = {
            homeName:'这里设置'
        };
    }
    
    render(){
        return (
            <View style={styles.main}>
                <Text style={{color:'#000',fontSize:20}}>{'这里是设置'}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    main:{
        justifyContent:'center',
        alignItems:'center',
        flex:1,
    }
});