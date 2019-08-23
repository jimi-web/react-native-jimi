/*
 * @Descripttion: 顶层组件，全局弹框，下拉框，加载提示等组件由此入口添加到全局中
 * @version: 1.0.0
 * @Author: liujinyuan
 * @Date: 2019-08-05 17:27:14
 * @LastEditors: xieruizhi
 * @LastEditTime: 2019-08-21 09:55:10
 */

import React, {Component} from 'react';
import {DeviceEventEmitter, Text, View,StyleSheet,Animated} from 'react-native';
import Theme from '../themes/index';

let keyIndex = 0;

export default class TopView extends Component {
    
    static add (element) {
        let key = ++keyIndex;
        DeviceEventEmitter.emit('jmAddOverlay',{key,element});
        return key;
    }
    
    static remove (key) {
        DeviceEventEmitter.emit('jmRemoveOverlay',{key,element});
    }
    
    static removeAll() {
        DeviceEventEmitter.emit('jmRemoveAllOverlay', {});
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
        DeviceEventEmitter.addListener('jmAddOverlay', e => this.add(e));
        DeviceEventEmitter.addListener('jmRemoveOverlay', e => this.remove(e));
        DeviceEventEmitter.addListener('jmRemoveAllOverlay', e => this.removeAll(e));
    }
    componentWillUnmount() {
        let {unregisterTopViewHandler} = this.context;
        if (unregisterTopViewHandler) {
            unregisterTopViewHandler(this);
            return;
        }
        DeviceEventEmitter.removeAllListeners('jmAddOverlay');
        DeviceEventEmitter.removeAllListeners('jmRemoveOverlay');
        DeviceEventEmitter.removeAllListeners('jmRemoveAllOverlay');
    }

    render(){
        const {elements} = this.state;
        console.log(this.props.children,11111111);
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
        right: 0,
        bottom: 0,
        color:'#fff',
    },
});
