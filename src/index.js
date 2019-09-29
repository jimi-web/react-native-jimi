/*
 * @Descripttion: 
 * @version: 
 * @Author: liujinyuan
 * @Date: 2019-08-26 14:28:40
 * @LastEditors: liujinyuan
 * @LastEditTime: 2019-09-29 14:50:39
 */
import Icon from './assets';
import Circle from './components';
import Jimi from './view';
import Applet from './http/index';
import api from './api/index';
api.setServer('http://10.0.17.227:3000');
const Jm  = {
    Icon,
    Circle,
    Jimi,
    Applet,
    api
};

module.exports = Jm;