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
    mainColor:'#3479F6',
    mainFontSize:16,
    bottomBorderStyle:{
        borderStyle:'solid',
        borderBottomColor:'#eee',
        borderBottomWidth:StyleSheet.hairlineWidth
    },
    leftOrRight:{
        paddingLeft:15,
        paddingRight:15
    }
};


export default baseStyle;