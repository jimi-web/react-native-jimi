/*
 * @Descripttion: 基础组件集成
 * @version: 1.0.0
 * @Author: liujinyuan
 * @Date: 2019-08-08 14:28:59
 * @LastEditors: liujinyuan
 * @LastEditTime: 2019-08-13 09:36:18
 */

import TopView from './overlay/TopView';
import Theme from './themes/index';
import Button from './button/button';

const Circle = {
    TopView,
    Theme,
    Button

};

module.exports =  Circle;