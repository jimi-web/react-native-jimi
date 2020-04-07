/*
 * @Descripttion: 
 * @version: 
 * @Author: liujinyuan
 * @Date: 2020-01-07 10:04:51
 * @LastEditors: liujinyuan
 * @LastEditTime: 2020-04-07 17:57:20
 */
import React, { Component } from 'react';
import {View,Text,TouchableOpacity,TextInput } from 'react-native';
import PropTypes from 'prop-types';
import {Switch,Icon,Toast} from '../../components/index';
import baseStyle from '../baseStyle';

export default class InsArrowButton extends Component {
    constructor(props){
        super(props);
        this.state = {
            inputValue:''
        };
    }
    render(){
        let {isShow} = this.props;
        let {content,value} = this.props.data;
        return(
            <View>
                {
                    isShow ? 

                        <View style={this.renderStyle()}>
                            <View>
                                <Text style={{fontSize:14}}>{content.text}</Text>
                                {
                                    content.viceText?<Text style={{fontSize:10}}>{content.viceText}</Text>:null
                                }
                            </View>
                            <View>
                                <TextInput onBlur={this.onBlur} onChangeText={(inputValue) => this.setState({inputValue})} autoComplete={content.type?content.type:'off'} maxLength={50} placeholder={content.placeholder} defaultValue={value}></TextInput>
                            </View>
                        </View >
                        :
                        null
                }
            </View>
        );  
    }
    renderStyle = () => {
        const { border } = this.props.data;
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
    onBlur = () => {
        const {data,index} = this.props;
        const {rule} = data.content;
        data.value = this.state.inputValue;
        if(rule){
            let regExp = new RegExp(rule);//根据字符串生成正则
            if(!regExp.test(data.value)){
                Toast.message(data.hint || '您当前输入的格式有误！');
                data.stop = true;
            }
        }
        data.insValue = data.value;
        this.props.onInput && this.props.onInput(data,index);
    }
}