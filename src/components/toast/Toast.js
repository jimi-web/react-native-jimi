/*
 * @Descripttion: 
 * @version: 
 * @Author: xieruizhi
 * @Date: 2019-10-10 16:01:37
 * @LastEditors: xieruizhi
 * @LastEditTime: 2019-10-15 14:45:57
 */
import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Text,
    DeviceEventEmitter
} from 'react-native';
import {isIphoneX,iphoneXHeight} from '../../libs/utils';

export default class Toast extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible:false
        };
    }

    componentDidMount() {
        DeviceEventEmitter.addListener('jmToastShow', state=>{
            this.setState({
                visible:state
            });
        });
    }

    static show() {
        DeviceEventEmitter.emit('jmToastShow',true);
        setTimeout(()=>{
            DeviceEventEmitter.emit('jmToastShow',false);
        },1500);
    }


    render(){
        return  <View style={Styles.tip}>
            {
                this.state.visible ? 
                    <View style={Styles.text}>
                        <Text style={{color:'#fff',fontSize:14}}>{this.props.message}</Text>
                    </View>:
                    null
            }
        </View>;
    }
}


const Styles =  StyleSheet.create({ 
    tip:{
        position:'absolute',
        bottom:isIphoneX()?iphoneXHeight(30):30,
        right:0,
        left:0,
        justifyContent:'center',
        flexDirection:'row',
        zIndex:2,
        alignItems:'center'
    },
    text:{
        padding:10,
        paddingLeft:15,
        paddingRight:15,
        borderRadius:6,
        backgroundColor:'#000000bd',
    }
});