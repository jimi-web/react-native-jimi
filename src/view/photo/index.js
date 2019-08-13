/*
 * @Descripttion: 相册模块
 * @version: 1.0.0
 * @Author: liujinyuan
 * @Date: 2019-08-08 14:48:01
 * @LastEditors: liujinyuan
 * @LastEditTime: 2019-08-12 15:20:10
 */
import React, {Component} from 'react';
import {View,Text,StyleSheet} from 'react-native';

export default class Home extends Component{
    constructor(props){
        super(props);
        this.state = {
        };
    }
    
    render(){
        return (
            <View style={styles.main}>
                <Text style={{color:'#000',fontSize:20}}>{'相册'}</Text>
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