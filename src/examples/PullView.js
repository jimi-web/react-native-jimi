/*
 * @Descripttion: 
 * @version: 
 * @Author: xieruizhi
 * @Date: 2019-12-27 17:43:23
 * @LastEditors  : xieruizhi
 * @LastEditTime : 2019-12-28 10:30:35
 */
import React,{Component} from 'react';
import {View,StyleSheet,Text,Dimensions} from 'react-native';
const {width} = Dimensions.get('window');
import { Circle } from '../index';

const { Button }  = Circle;

export default class PullView extends Component { 
    
    constructor(props){
        super(props);
    }

    componentDidMount(){
        
    }


    render(){
        return <View>
        <Button title={'普通列表'} onPress={()=>this._onPress('PullList')} style={styles.btn}></Button>
        <Button title={'分组列表'} onPress={()=>this._onPress('GroupList')} style={styles.btn}></Button>
    </View>
    }

    _onPress = (name)=>{
        this.props.navigation.push(name);
    }  
}

const styles = StyleSheet.create({
    btn:{
        margin:10
    }
});