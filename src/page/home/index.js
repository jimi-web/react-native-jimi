/*
 * @Descripttion: 
 * @version: 
 * @Author: liujinyuan
 * @Date: 2019-08-09 13:51:44
 * @LastEditors: liujinyuan
 * @LastEditTime: 2019-08-13 16:00:46
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
            <View style={styles.mainStyle}>
                <View style={styles.itemStyle}>
                    <Button title={'相册'} onPress={() => {this.props.navigation.push('Photo');}} />
                    {/* <Button title={'相册'} onPress={() => {this.props.navigation.push('Photo');}} /> */}
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    mainStyle:{
        flex:1,
        padding:20
    },
    itemStyle:{
        width:100,
        justifyContent:'space-between',
        paddingTop:50,
        flexDirection:'row'
    }
});