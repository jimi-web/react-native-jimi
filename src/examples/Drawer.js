/*
 * @Descripttion: 
 * @version: 
 * @Author: xieruizhi
 * @Date: 2019-12-27 17:43:23
 * @LastEditors: xieruizhi
 * @LastEditTime: 2020-07-10 13:42:47
 */
import React,{Component} from 'react';
import {View,StyleSheet,Text,Dimensions} from 'react-native';
const {width} = Dimensions.get('window');
import { Circle } from '../index';

const { Drawer,Button }  = Circle;

export default class Drawerample extends Component { 
    
    constructor(props){
        super(props);
    }
    render(){
        return <View>
            <Button title={'底部抽屉'} onPress={this._onPress} style={styles.btn}></Button>
        </View>;
    }

    _onPress = ()=>{
        //弹出框
        let open = Drawer.open(
            <View style={{width:width,height:300,backgroundColor:'#fff',alignItems:'center',justifyContent:'center'}}>
                <Button title={'关闭抽屉'} onPress={()=>{
                    Drawer.close(open);
                }}></Button>
            </View>
        );
    }
    
}

const styles = StyleSheet.create({
    btn:{
        margin:10
    }
});