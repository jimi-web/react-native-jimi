/*
 * @Descripttion: 模块可修改样式，（此样式表为暴露的统一样式，给予组件使用者一次性修改主题色，主要字体等统一样式）
 * @version: 
 * @Author: liujinyuan
 * @Date: 2019-09-16 15:11:25
 * @LastEditors: liujinyuan
 * @LastEditTime: 2020-03-23 10:34:51
 */
import {StyleSheet} from 'react-native';

const baseStyle = {
    backgroundColor:'#f7f7f7',//背景颜色
    disableColor:'#98BBF9',//禁用颜色
    mainColor:'#3479F6',//主题色

    //字体
    mainFontSize:16,
    
    
    bottomBorderStyle:{
        borderStyle:'solid',
        borderBottomColor:'#bebebe',
        borderBottomWidth:StyleSheet.hairlineWidth
    },
    leftOrRight:{
        marginLeft:15,
        marginRight:15,       
    }
};


export default baseStyle;