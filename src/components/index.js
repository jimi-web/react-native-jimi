/*
 * @Descripttion: 基础组件集成
 * @version: 1.0.0
 * @Author: liujinyuan
 * @Date: 2019-08-08 14:28:59
 * @LastEditors: liujinyuan
 * @LastEditTime: 2019-10-14 11:27:56
 */

import TopView from './overlay/TopView';
import Theme from './themes/index';
import Button from './button/button';
import Dialog from './dialog';
import Overlay from './overlay/overlay';

const Circle = {
    TopView,
    Theme,
    Button,
    Dialog,
    Overlay
};

module.exports =  Circle;