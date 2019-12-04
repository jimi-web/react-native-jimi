/*
 * @Descripttion: 基础组件集成
 * @version: 1.0.0
 * @Author: liujinyuan
 * @Date: 2019-08-08 14:28:59
 * @LastEditors: xieruizhi
 * @LastEditTime: 2019-12-03 15:01:15
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
import PullList from './pullList/PullList';
import Switch from './switch/Switch';
import Drawer from './drawer/Drawer';
import Wheel from './wheel/Wheel';
import Datepicker from './datePickerDialog/DatePicker';
import Modal from './modal/Modal';

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
    PullList,
    Switch,
    Drawer,
    Wheel,
    Datepicker,
    Modal
};

module.exports =  Circle;