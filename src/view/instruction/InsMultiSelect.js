/*
 * @Descripttion: 
 * @version: 
 * @Author: liujinyuan
 * @Date: 2020-01-07 10:04:51
 * @LastEditors: liujinyuan
 * @LastEditTime: 2020-03-18 13:56:42
 */
import React, { Component } from 'react';
import {View,Text,TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import {Switch,Icon,Toast} from '../../components/index';
import baseStyle from '../baseStyle';

export default class InsMultiSelect extends Component {
    constructor(props){
        super(props);
    }
    render(){
        const {data,index} = this.props;
        const {content} = this.props.data;
        return (
            <View>
                {
                    content.multiArr.map((item,i) => {
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
        // 计算当前item是否选中
        let isSelect = false;
        for (let i = 0; i < value.length; i++) {
            const v = value[i];
            if(item.value == v){
                isSelect = true;
            }
        }
        let element =  
        <View style={this.renderStyle()}>
            <View>
                <Text style={{fontSize:14}}>{item.text}</Text>
            </View>
            <View>
                {isSelect?<Icon name={'gou'} color={`${baseStyle.mainColor}`}/> : null}
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
        const {content} = data;
       
        let arr = [];
        // 计算当前选中或取消的值
        for (let i = 0; i < content.multiArr.length; i++) {
            const v = content.multiArr[i].value;
            if(data.value.indexOf(v) != -1){
                if(item.value != v){
                    arr.push(v);
                }
            }else{
                if(item.value == v){
                    arr.push(v);
                }
            }
        }
        if(content.isMust && arr.length === 0){
            return Toast.message('当前选择不可为空');
        }
        data.value = arr;
        console.log(data.value,'获取的值');
        if(data.insID){
            data.insValue = data.value.join(content.symbol);
        }
        console.log(data);
        this.props.onMultiSelect && this.props.onMultiSelect(data,index);
    }
}