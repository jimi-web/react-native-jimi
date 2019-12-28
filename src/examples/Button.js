/*
 * @Descripttion: 
 * @version: 
 * @Author: xieruizhi
 * @Date: 2019-12-27 17:43:23
 * @LastEditors  : xieruizhi
 * @LastEditTime : 2019-12-28 14:06:04
 */
import React,{Component} from 'react';
import {View,StyleSheet} from 'react-native';
import { Circle } from '../index';

const { Button }  = Circle;

export default class ButtonExample extends Component { 
    
    constructor(props){
        super(props);
    }


    render(){
        return <View>
            <Button title={'Default'} style={styles.btn}></Button>
            <Button title={'Primary'} type={'primary'} style={styles.btn}></Button>
            <Button title={'Danger'} type={'danger'} style={styles.btn}></Button>

            <Button title={'Default'} style={styles.btn} size={'sm'}></Button>
            <Button title={'Primary'} type={'primary'} style={styles.btn} size={'sm'}></Button>
            <Button title={'Danger'} type={'danger'} style={styles.btn} size={'sm'}></Button>

            <Button title={'Default'} style={styles.btn} size={'xs'}></Button>
            <Button title={'Primary'} type={'primary'} style={styles.btn} size={'xs'}></Button>
            <Button title={'Danger'} type={'danger'} style={styles.btn} size={'xs'}></Button>
        </View>;
    }
}

const styles = StyleSheet.create({
    btn:{
        margin:10
    }
});