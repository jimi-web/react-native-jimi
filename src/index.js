/*
 * @Descripttion: 
 * @version: 
 * @Author: liujinyuan
 * @Date: 2019-08-26 14:28:40
 * @LastEditors: xieruizhi
 * @LastEditTime: 2019-09-29 15:48:06
 */
import Icon from './assets';
import Circle from './components';
import Jimi from './view';
import Applet from './http/index';
import api from './api/index';
api.setServer();
const Jm  = {
    Icon,
    Circle,
    Jimi,
    Applet,
    api
};

module.exports = Jm;