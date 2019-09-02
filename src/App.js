/*
 * @Descripttion: 
 * @version: 
 * @Author: liujinyuan
 * @Date: 2019-08-05 17:05:47
 * @LastEditors: xieruizhi
 * @LastEditTime: 2019-08-30 14:00:10
 */
import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import {TopView} from './components/index';
import {Root} from './router/index';
import store from './store/index';
import { Provider } from 'react-redux';

export default class App extends Component{
    render() {
        return (
            <Provider store={store}>
                <TopView>
                    <Root/>
                </TopView>
            </Provider>
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
