/*
 * @Descripttion: 
 * @version: 
 * @Author: liujinyuan
 * @Date: 2019-08-09 13:51:44
 * @LastEditors: xieruizhi
 * @LastEditTime: 2019-08-14 17:00:34
 */
import React, {Component} from 'react';
import {View,Text,StyleSheet} from 'react-native';
import {Button} from '../../components/index';

export default class Home extends Component{
    constructor(props){
        super(props);
        this.state = {
            homeName:'这里主页面'
        };
    }
    
    render(){
        return (
            <View style={styles.main}>
                <Button title={'相册'} />
                <Button title={'定位'} onPress={()=>{this.props.navigation.push('Position');}} />
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