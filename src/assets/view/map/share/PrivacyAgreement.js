/*
 * @Descripttion: 
 * @version: 
 * @Author: xieruizhi
 * @Date: 2019-09-24 10:24:27
 * @LastEditors: xieruizhi
 * @LastEditTime: 2019-09-24 10:28:25
 */
import React, { Component } from 'react';
import { WebView,View } from 'react-native';
export default class PrivacyAgreement extends Component {
    constructor(props) {
        super(props);
        this.state = {
            url:'http://apps.jimimax.com/static/privacyPolicy.html',
        };
    }
    
    render() {
        return (
            <View style={{flex:1}}>
                <WebView
                    source={{uri: this.state.url}}
                    style={{flex:1}}
                />
            </View>
        );
    }

}