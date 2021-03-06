/*
 * @Descripttion: 
 * @version: 
 * @Author: liujinyuan
 * @Date: 2020-01-07 10:04:51
 * @LastEditors: liujinyuan
 * @LastEditTime: 2020-06-22 15:36:54
 */
import React, { Component } from 'react';
import {View,Text} from 'react-native';
import {Switch} from '../../components/index';
import baseStyle from '../baseStyle';
import I18n from '../../language/index';

export default class InsSwitch extends Component {
    constructor(props){
        super(props);
    }
    render(){
        let {content} = this.props.data;
        return <View style={this.renderStyle()}>
            <View>
                <Text style={{fontSize:14}}>{I18n.t(content.text)}</Text>
                {
                    content.viceText?
                        <Text style={{fontSize:10}}>{I18n.t(content.viceText)}</Text>
                        :
                        null
                }
            </View>
            <View>
                {
                    this.renderSwitch()
                }
            </View>
        </View>;
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
    /*
    *渲染开关
     */
    renderSwitch = () => {
        
        const { data } = this.props;
        let element = <Switch value={data.value} onValueChange={(value) => this.onValueChange(value)}  activeColor={'#13A887'} />;
        return element;
    }
    onValueChange = (value) => {
        const {data,index} = this.props;
        data.value = value;
        if(data.insID){
            const value  = data.insSymmetry[data.value];
            data.insValue = value;
        }
        this.props.onValueChange && this.props.onValueChange(data,index);
    }
}