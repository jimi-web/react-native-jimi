/*
 * @Descripttion: 
 * @version: 
 * @Author: liujinyuan
 * @Date: 2019-08-26 14:28:40
 * @LastEditors  : xieruizhi
 * @LastEditTime : 2020-01-04 18:28:14
 */
import Icon from './assets';
import Circle from './components';
import Jimi from './view';
import Applet from './http/index';
import Api from './api/index';
Api.setServer('http://test.api.jimimax.com');

const Jm  = {
    Icon,
    Circle,
    Jimi,
    Applet,
    Api
};

module.exports = Jm;