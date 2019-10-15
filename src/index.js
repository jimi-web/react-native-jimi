/*
 * @Descripttion: 
 * @version: 
 * @Author: liujinyuan
 * @Date: 2019-08-26 14:28:40
 * @LastEditors: xieruizhi
 * @LastEditTime: 2019-10-15 14:19:30
 */
import Icon from './assets';
import Circle from './components';
import Jimi from './view';
import Applet from './http/index';
import Api from './api/index';
Api.setServer('http://172.16.0.106:7888');
const Jm  = {
    Icon,
    Circle,
    Jimi,
    Applet,
    Api
};

module.exports = Jm;