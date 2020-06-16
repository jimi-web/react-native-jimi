/*
 * @Descripttion: 
 * @version: 
 * @Author: xieruizhi
 * @Date: 2019-11-29 10:19:57
 * @LastEditors: xieruizhi
 * @LastEditTime: 2020-06-16 14:56:19
 */
import React,{Component} from 'react';
import {View,Button,StyleSheet} from 'react-native';
import {Circle} from '../index';

export default class Datepicker extends Component{

    constructor(props){
        super(props);
    }
    
    componentDidMount(){

    }

    render(){
        return <View>
            <Button title={'日期选择器'} onPress={this.datePicker} style={styles.btn}></Button>
            <Button title={'时间选择器'} onPress={this.timePicker} style={styles.btn}></Button>
        </View>;
    }

    datePicker() {
        Circle.Datepicker.show({
            onConfirm:(value)=>{
                console.log(value);
            }
        });
    }

    timePicker () {
        Circle.TimePicker.show({
            onConfirm:(value)=>{
                console.log(value);
            }
        });        
    }
}

const styles = StyleSheet.create({
    btn:{
        margin:10
    }
});