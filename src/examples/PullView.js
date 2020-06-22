/*
 * @Descripttion: 
 * @version: 
 * @Author: xieruizhi
 * @Date: 2019-12-27 17:43:23
 * @LastEditors: xieruizhi
 * @LastEditTime: 2020-06-22 11:17:55
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
        this.props.navigation.push(name,{I18n:I18n});
    }  
}

const styles = StyleSheet.create({
    btn:{
        margin:10
    }
});