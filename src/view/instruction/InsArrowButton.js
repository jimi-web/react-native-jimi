/*
 * @Descripttion: 
 * @version: 
 * @Author: liujinyuan
 * @Date: 2020-01-07 10:04:51
 * @LastEditors  : liujinyuan
 * @LastEditTime : 2020-01-17 09:52:52
 */
import React, { Component } from 'react';
import {View,Text,TouchableOpacity,Image} from 'react-native';
import PropTypes from 'prop-types';
import {Switch,Icon} from '../../components/index';
import baseStyle from '../baseStyle';

export default class InsArrowButton extends Component {
    constructor(props){
        super(props);
    }
    render(){
        let {content} = this.props.data;
        return <TouchableOpacity activeOpacity={0.6}  style={this.renderStyle()} onPress={this.onPress}>
           
            <View style={{justifyContent:'center',flexDirection:'row',alignItems:'center'}}>
                <View style={{marginRight:10}}>
                    <Image style={{width:22,height:22,backgroundColor:'#ccc'}} source={{uri:'https://facebook.github.io/react-native/img/tiny_logo.png'}} />
                </View>
                <View>
                    <Text style={{fontSize:14}}>{content.text}</Text>
                    {
                        content.viceText?<Text style={{fontSize:10}}>{content.viceText}</Text>:null
                    }
                </View>
            </View>
            <View>
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
        this.props.onPress && this.props.onPress(this.props.data);
    }
}