/*
 * @Descripttion: 
 * @version: 
 * @Author: liujinyuan
 * @Date: 2020-01-07 10:04:51
 * @LastEditors: liujinyuan
 * @LastEditTime: 2020-06-22 15:35:51
 */
import React, { Component } from 'react';
import {View,Text,TouchableOpacity,Image} from 'react-native';
import {Icon} from '../../components/index';
import baseStyle from '../baseStyle';
import I18n from '../../language/index'

export default class InsArrowButton extends Component {
    constructor(props){
        super(props);
    }
    render(){
        let {content} = this.props.data;
        return <TouchableOpacity activeOpacity={0.6}  style={this.renderStyle()} onPress={this.onPress}>
           
            <View style={{justifyContent:'center',flexDirection:'row',alignItems:'center'}}>
                <View style={{marginRight:10}}>
                    <Image style={{width:22,height:22}} source={typeof content.img == 'string'?{uri:content.img}:content.img} />
                </View>
                <View>
                    <Text style={{fontSize:14}}>{I18n.t(content.text)}</Text>
                    {
                        content.viceText?<Text style={{fontSize:10}}>{I18n.t(content.viceText)}</Text>:null
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