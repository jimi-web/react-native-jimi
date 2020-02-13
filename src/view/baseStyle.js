/*
 * @Descripttion: 模块可修改样式，（此样式表为暴露的统一样式，给予组件使用者一次性修改主题色，主要字体等统一样式）
 * @version: 
 * @Author: liujinyuan
 * @Date: 2019-09-16 15:11:25
 * @LastEditors  : liujinyuan
 * @LastEditTime : 2020-01-07 14:37:39
 */
import {StyleSheet} from 'react-native';

const baseStyle = {
    mainColor:'#3479F6',
    mainFontSize:16,
    bottomBorderStyle:{
        borderStyle:'solid',
        borderBottomColor:'#f7f7f7',
        borderBottomWidth:StyleSheet.hairlineWidth
    }
};


export default baseStyle;