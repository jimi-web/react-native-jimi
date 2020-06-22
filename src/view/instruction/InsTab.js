/*
 * @Descripttion: 
 * @version: 
 * @Author: liujinyuan
 * @Date: 2020-01-07 10:04:51
 * @LastEditors: liujinyuan
 * @LastEditTime: 2020-06-22 15:16:13
 */
import React, { Component } from 'react';
import {View,Text,TouchableOpacity } from 'react-native';
import baseStyle from '../baseStyle';
import I18n from '../../language/index';

export default class InsTab extends Component {
    constructor(props){
        super(props);
    }
    render(){
        const {content} = this.props.data;
        return (
                <View style={{flex:1,flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                {
                    content.map((item,i) => {
                        return <TouchableOpacity key={i} activeOpacity={0.6} onPress={this.onPress.bind(this,item)}>
                            {this.renderSelect(item,i)}
                        </TouchableOpacity>;
                    })
                }
                </View>
        );
    }
    renderSelect = (item,index) => {
        const {value} = this.props.data;
        let element =  
        <View style={this.renderStyle(item)}>
            <View>
                <Text style={{fontSize:14,color:value == item.value?'#3479F6':'#4D4D4D'}}>{I18n.t(item.text)}</Text>
            </View>
        </View >;
        return element;
    }
    renderStyle = (item) => {
        const {value} = this.props.data;
        let style = this.props.style;
        const styles = [
            {
                justifyContent:'center',
                flex:1,
                height:45,
                borderBottomWidth:value == item.value?2:0,
                borderBottomColor:'#3479F6'
            },
        ].concat(style);
        return styles;
    }
    onPress = (item) => {
        const {data,index} = this.props;
        data.value = item.value;
        if(data.insID){
            data.insValue = data.value;
        }
        this.props.onSelect && this.props.onSelect(data,index);
    }
}