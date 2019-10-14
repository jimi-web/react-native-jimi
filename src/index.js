/*
 * @Descripttion: 
 * @version: 
 * @Author: liujinyuan
 * @Date: 2019-08-26 14:28:40
 * @LastEditors: xieruizhi
 * @LastEditTime: 2019-10-14 13:53:51
 */
import Icon from './assets';
import Circle from './components';
import Jimi from './view';
import Applet from './http/index';
import Api from './api/index';
Api.setServer('http://10.0.17.155:3000');
const Jm  = {
    Icon,
    Circle,
    Jimi,
    Applet,
    Api
};

module.exports = Jm;