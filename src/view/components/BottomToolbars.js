/*
 * @Descripttion: 
 * @version: 
 * @Author: xieruizhi
* @Date: 2019-09-26 17:39:03
 * @LastEditors: xieruizhi
 * @LastEditTime: 2019-10-09 09:26:20
 */
import React, {Component} from 'react';
import {View,StyleSheet,Dimensions} from 'react-native';
import PropTypes from 'prop-types';
import {BoxShadow} from 'react-native-shadow';
import {isIphoneX,iphoneXHeight} from '../../libs/utils';
const {width} = Dimensions.get('window');

export default class BottomToolbars extends Component {
    static propTypes = {
        height:PropTypes.number, //高度
        style:PropTypes.object //样式
    }

    static defaultProps = {
        height:54,
        style:{}
    }

    constructor(props) {
        super(props);
       
    }

    render(){
        const getHeight = isIphoneX()? iphoneXHeight(this.props.height):this.props.height;
        let setting = {
            width:width,
            height:getHeight,
            color:'#b5b3b3',
            border:4,
            radius:0,
            opacity:0.3,
            x:0,
            y:0,
            style:{marginVertical:0,position:'absolute',bottom:0}
        };
        return <BoxShadow setting={setting}>
            <View style={[Styles.bottom,{height:getHeight,...this.props.style}]}>
                {this.props.children}
            </View>
        </BoxShadow>;
    }
}

const Styles =  StyleSheet.create({
    bottom:{
        position:'absolute',
        bottom:0,
        width:width,
        backgroundColor:'#fff',
    }  
});
