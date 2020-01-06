/*
 * @Descripttion: 
 * @version: 
 * @Author: liujinyuan
 * @Date: 2019-08-05 17:05:47
 * @LastEditors  : xieruizhi
 * @LastEditTime : 2019-12-29 16:14:07
 */
import React, {Component} from 'react';
import {Root} from './router/index';
import store from './store/index';
import { Provider } from 'react-redux';
import './libs/time';

export default class App extends Component{
    render() {
        return (
            <Provider store={store}>
                <Root/>
            </Provider>
        );
    }
}

