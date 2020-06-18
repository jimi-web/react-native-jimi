/*
 * @Descripttion: 
 * @version: 
 * @Author: liujinyuan
 * @Date: 2020-01-07 10:04:51
 * @LastEditors: xieruizhi
 * @LastEditTime: 2020-06-17 13:54:13
 */
import React, { Component } from 'react';
import {View,Text,TouchableOpacity,Image} from 'react-native';
import PropTypes from 'prop-types';
import {Icon,TimePicker} from '../../components/index';
import baseStyle from '../baseStyle';

export default class InsTime extends Component {
    constructor(props){
        super(props);
    }
    render(){
        let {content,value} = this.props.data;
        return <TouchableOpacity activeOpacity={0.6}  style={this.renderStyle()} onPress={this.onPress}>
           
            <View style={{justifyContent:'center',flexDirection:'row',alignItems:'center'}}>
                <View>
                    <Text style={{fontSize:14}}>{content.text}</Text>
                    {
                        content.viceText?<Text style={{fontSize:10}}>{content.viceText}</Text>:null
                    }
                </View>
            </View>
            <View style={{flexDirection:'row'}}>
                <Text style={{marginRight:10}}>{value}</Text>
                <Icon name={'subordinate_arrow'} />
            </View>
        </TouchableOpacity >;
    }
    
    renderStyle = () => {
        const {border} = this.props.data;
        let style = this.props.style;
        let borderStyle = border?baseStyle.bottomBorderStyle:null;
        const styles = [
            {
                flexDirection:'row',
                justifyContent:'space-between',
                alignItems:'center',
                flex:1,
                height:50
            },
            borderStyle
        ].concat(style);
        return styles;
    }
    onPress = () => {
        const {data,index} = this.props;
        TimePicker.show({
            onConfirm:(value)=>{
                data.value = value;
                if(data.insID){
                    data.insValue = data.value;
                }
                this.props.onConfirm && this.props.onConfirm(data,index);
            },
            defaultValue:data.value
        });    
    }
}