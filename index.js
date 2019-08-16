/*
 * @Descripttion: 
 * @version: 
 * @Author: xieruizhi
 * @Date: 2019-08-08 16:51:19
 * @LastEditors: liujinyuan
 * @LastEditTime: 2019-08-14 17:14:25
 */
/**
 * @format
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */
import React from 'react';
import {AppRegistry,StyleSheet,Text,Platform} from 'react-native';
import App from './src/App';
import _ from 'lodash';

// import App from './src/view/map/google/position';
// import App from './src/view/map/google/test';

// import {name as appName} from './app.json';
// AppRegistry.registerComponent(appName, () => App);
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