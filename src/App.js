/*
 * @Descripttion: 
 * @version: 
 * @Author: liujinyuan
 * @Date: 2019-08-05 17:05:47
 * @LastEditors: xieruizhi
 * @LastEditTime: 2020-06-01 15:28:12
 */
import React, {Component} from 'react';
import { Root } from './router/index';
import store from './store/index';
import { Provider } from 'react-redux';
import './libs/time';
import './libs/global';

export default class App extends Component{
    componentWillMount() {
        //设置语言
        I18n.setLanguage(this.props.language,{});
    }

    render() {
        return (
            <Provider store={store}>
                <Root/>
            </Provider>
        );
    }
}

