/*
 * @Descripttion: 基础组件集成
 * @version: 1.0.0
 * @Author: liujinyuan
 * @Date: 2019-08-08 14:28:59
 * @LastEditors: xieruizhi
 * @LastEditTime: 2019-10-16 18:00:55
 */

import TopView from './overlay/TopView';
import Theme from './themes/index';
import Button from './button/button';
import Dialog from './dialog';
import Overlay from './overlay/overlay';
import Loading from './loading/Loading';

const Circle = {
    TopView,
    Theme,
    Button,
    Dialog,
    Overlay,
    Loading
};

module.exports =  Circle;