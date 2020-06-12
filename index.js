/*
 * @Descripttion: 
 * @version: 
 * @Author: xieruizhi
 * @Date: 2019-08-08 16:51:19
 * @LastEditors: xieruizhi
 * @LastEditTime: 2020-06-04 11:56:50
 */
/**
 * @format
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */
import React from 'react';
import {AppRegistry,StyleSheet,Text,Platform} from 'react-native';
import App from './src/App';
import _ from 'lodash';


AppRegistry.registerComponent('JMRNSmallApp', () => App);//几米圈平台运行固定名称

// android兼容部分字体
if(Platform.OS !== 'ios'){
    const styles = StyleSheet.create({
        defaultFontFamily: {
            fontFamily: '',  
        }
    });
    Text.render = _.wrap(Text.render, function (func, ...args) {
        let originText = func.apply(this, args);
        return React.cloneElement(originText, {style: [originText.props.style, styles.defaultFontFamily]});
    });
}