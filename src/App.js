/*
 * @Descripttion: 
 * @version: 
 * @Author: liujinyuan
 * @Date: 2019-08-05 17:05:47
 * @LastEditors: liujinyuan
 * @LastEditTime: 2019-08-13 14:06:54
 */
import React, {Component} from 'react';
import {StyleSheet,Text, View} from 'react-native';
import {TopView} from './components/index';
import {Root} from './router/index';
export default class App extends Component{
    render() {
        return (
            <View style={{flex:1}}>
                <TopView>
                    <Root/>
                </TopView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#fff',
        marginBottom: 5,
    },
});
