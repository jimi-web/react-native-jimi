/*
 * @Descripttion: 
 * @version: 
 * @Author: xieruizhi
 * @Date: 2019-12-27 17:43:23
 * @LastEditors: xieruizhi
 * @LastEditTime: 2020-06-02 15:54:03
 */
import React,{Component} from 'react';
import {View,StyleSheet} from 'react-native';
import { Circle } from '../index';

const { Modal,Button,Toast}  = Circle;

export default class Dialog extends Component { 
    
    constructor(props){
        super(props);
    }


    render(){
        return <View>
            <Button title={'对话框'} onPress={this.dialog} style={styles.btn}></Button>
            <Button title={'提示框'} onPress={this.alert} style={styles.btn}></Button>
            <Button title={'轻提示'} onPress={this.toast} style={styles.btn}></Button>
            <Button title={'加载'} onPress={this.loading} style={styles.btn}></Button>
        </View>;
    }


    dialog = ()=> {
        Modal.dialog({
            contentText:'对话框!',
            onConfirm:()=>{
                console.log('确定');
            },
            onCancel:()=>{
                console.log('取消');
            }
        });
    }

    alert = ()=> {
        Modal.alert({
            contentText:'是否删除',
            onConfirm:()=>{
                console.log('确定'); 
            }
        });
    }

    toast = ()=> {
        Toast.message('dasdasdasdasdasdad');
    }

    loading = ()=> {
        Toast.loading('加载中...',2000);
    }
}

const styles = StyleSheet.create({
    btn:{
        margin:10
    }
});