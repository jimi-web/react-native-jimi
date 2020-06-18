/*
 * @Descripttion: 
 * @version: 
 * @Author: liujinyuan
 * @Date: 2019-08-05 17:05:47
 * @LastEditors: xieruizhi
 * @LastEditTime: 2020-06-18 10:17:12
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
        I18n.isForeign = this.props.isForeign;
        I18n.setLanguage(this.props.isForeign?this.props.language:'',{});
    }

    render() {
        console.log(I18n,'路由先加载');
        return (
            <Provider store={store}>
                <Root />
            </Provider>
        );
    }
}

