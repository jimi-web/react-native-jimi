/*
 * @Descripttion: 
 * @version: 
 * @Author: liujinyuan
 * @Date: 2019-08-09 13:51:44
 * @LastEditors: xieruizhi
 * @LastEditTime: 2019-11-19 10:15:27
 */
import React, {Component} from 'react';
import {View,Text,StyleSheet} from 'react-native';
import {Button} from '../../components/index';
import {Overlay,Dialog} from '../../components/index';

export default class Home extends Component{
    constructor(props){
        super(props);
        this.state = {
            homeName:''
        };
    }
    render(){
        return (
            <View style={styles.mainStyle}>
                <View >
                    {/* <Button style={styles.btn} title={'相册'} onPress={() => {this.props.navigation.push('Photo');}} /> */}
                    <Button style={styles.btn} title={'定位'} onPress={()=>{this.props.navigation.push('Position');}} />
                    <Button style={styles.btn} title={'轨迹'} onPress={()=>{this.props.navigation.push('Track');}} />
                    <Button style={styles.btn} title={'追踪'} onPress={()=>{this.props.navigation.push('Trace');}} />
                    <Button style={styles.btn} title={'上拉刷新下拉加载'} onPress={()=>{this.props.navigation.push('PullView');}} />
                    <Button style={styles.btn} title={'开关'} onPress={()=>{this.props.navigation.push('Switch');}} />   
                    <Button style={styles.btn} title={'相册'} onPress={()=>{this.props.navigation.push('Photo');}} />   
                    <Button style={styles.btn} title={'滚轮'} onPress={()=>{this.props.navigation.push('GetWheel');}} />  
                    <Button style={styles.btn} title={'录音'} onPress={()=>{this.props.navigation.push('Record');}} />  
                    <Button style={styles.btn} title={'围栏'} onPress={()=>{this.props.navigation.push('Fence');}} />  
                    <Button style={styles.btn} title={'弹框'} onPress={()=>{Overlay.add(<Dialog></Dialog>);}} />  
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
    },
    btn:{
        marginBottom:10
    }
});