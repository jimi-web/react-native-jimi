/*
 * @Descripttion: 基础组件集成
 * @version: 1.0.0
 * @Author: liujinyuan
 * @Date: 2019-08-08 14:28:59
 * @LastEditors: liujinyuan
 * @LastEditTime: 2019-11-06 09:34:03
 */

import TopView from './overlay/TopView';
import Theme from './themes/index';
import Button from './button/button';
import Dialog from './dialog';
import Alert from './alert/index';
import Overlay from './overlay/overlay';
import Loading from './loading/Loading';
import Toast from './toast/Toast';
import PopUpBox from './popUpBox/PopUpBox';
import InputBox from './popUpBox/inputBox';
import Timeline from './timeline';

const Circle = {
    TopView,
    Theme,
    Button,
    Dialog,
    Overlay,
    Loading,
    Toast,
    PopUpBox,
    InputBox,
    Alert,
    Timeline
};

module.exports =  Circle;