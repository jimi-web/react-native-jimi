/*
 * @Descripttion: 
 * @version: 
 * @Author: liujinyuan
 * @Date: 2019-08-09 13:51:44
 * @LastEditors: xieruizhi
 * @LastEditTime: 2019-08-23 09:43:39
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
                    <Button style={styles.btn} title={'相册'} onPress={() => {this.props.navigation.push('Photo');}} />
                    <Button style={styles.btn} title={'定位'} onPress={()=>{this.props.navigation.push('Position');}} />
                  
                </View>
                <View style={styles.itemStyle}>
                <Button style={styles.btn} title={'轨迹'} onPress={()=>{this.props.navigation.push('Track');}} />
                </View>
               
            </View>
        );
    }
}
·
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
    },
    btn:{
        marginBottom:10
    }
});