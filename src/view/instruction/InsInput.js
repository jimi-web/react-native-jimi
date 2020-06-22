/*
 * @Descripttion: 
 * @version: 
 * @Author: liujinyuan
 * @Date: 2020-01-07 10:04:51
 * @LastEditors: liujinyuan
 * @LastEditTime: 2020-06-22 15:38:52
 */
import React, { Component } from 'react';
import {View,Text,TextInput } from 'react-native';
import {Toast} from '../../components/index';
import baseStyle from '../baseStyle';
import I18n from '../../language/index'

export default class InsArrowButton extends Component {
    constructor(props){
        super(props);
        this.state = {
            inputValue:this.props.data.value
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
                            <View style={{flexDirection:'row',alignItems:'center'}}>
                                <Text style={{fontSize:14}}>{I18n.t(content.text)}</Text>
                                {
                                    content.viceText?<Text style={{fontSize:10}}>{I18n.t(content.viceText)}</Text>:null
                                }
                                <TextInput style={{marginLeft:30,width:150}} keyboardType={content.keyboardType || 'default'} onFocus={this.onFocus} onBlur={this.onBlur} onChangeText={(inputValue) => this.setState({inputValue})} autoComplete={content.type?content.type:'off'} maxLength={content.maxLength || 50} placeholder={I18n.t(content.placeholder)} defaultValue={value}></TextInput>
                            </View>
                            <View>
                                {
                                    content.unit?<Text style={{marginLeft:10,color:'#C7C7C7',fontSize:14}}>{I18n.t(content.unit)}</Text>:null
                                }
                            </View>
                        </View >
                        :
                        null
                }
            </View>
        );  
    }
    onFocus = () => {
        this.state.inputValue = this.props.data.value;
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
                Toast.message(data.hint || I18n.t('您当前输入的格式有误'));
            }
        }
        data.insValue = data.value;
        this.props.onInput && this.props.onInput(data,index);
    }
}