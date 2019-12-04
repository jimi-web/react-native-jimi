/*
 * @Descripttion: 
 * @version: 
 * @Author: liujinyuan
 * @Date: 2019-10-14 10:59:56
 * @LastEditors: xieruizhi
 * @LastEditTime: 2019-12-03 10:49:01
 */
/*
 * @Descripttion: 模态框
 * @version: 
 * @Author: liujinyuan
 * @Date: 2019-10-12 14:01:19
 * @LastEditors: liujinyuan
 * @LastEditTime: 2019-10-26 09:32:34
 */
import React, {Component} from 'react';
import {Text, View,StyleSheet,Animated,Image,TouchableOpacity,Modal} from 'react-native';
import JmTopView from './TopView';
import Theme from '../themes/index';
import PropTypes from 'prop-types';
import OverlayView from './OverlayView';


let overlayKey = null;//全局遮罩只能一级级取消
export default class Overlay extends JmTopView{
    static add(view,option){
        const element = <OverlayView {...option}>{view}</OverlayView>;
        let elements = React.cloneElement(element);
        overlayKey = JmTopView.add(elements);
        return overlayKey;
    }
    static remove(key){
        JmTopView.remove(key);
    }

    static show(overlayView){
        let key;
        let element = React.cloneElement(overlayView);
        key = JmTopView.add(element);
        return key;
    }
}