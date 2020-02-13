/*
 * @Descripttion: 
 * @version: 
 * @Author: liujinyuan
 * @Date: 2020-01-07 10:04:51
 * @LastEditors  : liujinyuan
 * @LastEditTime : 2020-01-15 17:54:30
 */
import React, { Component } from 'react';
import {View,Text,TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import {Switch,Icon} from '../../components/index';
import baseStyle from '../baseStyle';

export default class InsSelect extends Component {
    constructor(props){
        super(props);
    }
    render(){
        const {content} = this.props.data;
        return (
            <View>
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
        <View style={this.renderStyle()}>
            <View>
                <Text style={{fontSize:14}}>{item.text}</Text>
            </View>
            <View>
                {value == item.value?<Icon name={'photo_save_success'} color={`${baseStyle.mainColor}`}/> : null}
            </View>
        </View >;
        return element;
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
    onPress = (item) => {
        const {data,index} = this.props;
        data.value = item.value;
        if(data.insID){
            data.insValue = data.value;
        }
        this.props.onSelect && this.props.onSelect(data,index);
    }
}