/*
 * @Descripttion: 顶层组件，全局弹框，下拉框，加载提示等组件由此入口添加到全局中
 * @version: 1.0.0
 * @Author: liujinyuan
 * @Date: 2019-08-05 17:27:14
 * @LastEditors: liujinyuan
 * @LastEditTime: 2019-08-13 15:52:05
 */

import React, {Component} from 'react';
import {DeviceEventEmitter, Text, View,StyleSheet,Animated} from 'react-native';
import Theme from '../themes/index';

let keyIndex = 0;

export default class TopView extends Component {
    
    static add (element) {
        let key = ++keyIndex;
        DeviceEventEmitter.emit('addOverlay',{key,element});
        return key;
    }
    
    static remove (key) {
        DeviceEventEmitter.emit('removeOverlay',{key,element});
    }
    
    static removeAll() {
        DeviceEventEmitter.emit('removeAllOverlay', {});
    }
    constructor(props){
        super(props);
        this.state = {
            elements:[]
        };
    }
    componentWillMount() {
        let {registerTopViewHandler} = this.context;
        if (registerTopViewHandler) {
            registerTopViewHandler(this);
            return;
        }
        DeviceEventEmitter.addListener('addOverlay', e => this.add(e));
        DeviceEventEmitter.addListener('removeOverlay', e => this.remove(e));
        DeviceEventEmitter.addListener('removeAllOverlay', e => this.removeAll(e));
    }
    componentWillUnmount() {
        let {unregisterTopViewHandler} = this.context;
        if (unregisterTopViewHandler) {
            unregisterTopViewHandler(this);
            return;
        }
        DeviceEventEmitter.removeAllListeners('addOverlay');
        DeviceEventEmitter.removeAllListeners('removeOverlay');
        DeviceEventEmitter.removeAllListeners('removeAllOverlay');
    }

    render(){
        const {elements} = this.state;
        return (
            <View style={{flex:1}}>
                <Animated.View style={{flex:1}}> 
                    {this.props.children}
                </Animated.View>
                {
                    elements.map((item,index) => {
                        return (
                            <View key={item.key} style={styles.overlay} pointerEvents='box-none'>
                                {item.element}
                            </View>
                        );
                    })
                }
            </View>
        );
    }
}


const styles = StyleSheet.create({
    overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0)',
        position: 'absolute',
        top: 0,
        left: 0,
        color:'#fff',
    },
});
