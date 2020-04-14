/*
 * @Descripttion: 
 * @version: 
 * @Author: liujinyuan
 * @Date: 2019-08-26 14:28:40
 * @LastEditors: liujinyuan
 * @LastEditTime: 2020-04-09 16:42:56
 */
import Icon from './assets';
import Circle from './components';
import Jimi from './view';
import Applet from './http/index';
import Api from './api/index';
Api.setServer('http://apis.jimimax.com');
// Api.setServer('http://test.api.jimimax.comcom');
// Api.setServer('http://pre.api.jimimax.com');
const Jm  = {
    Icon,
    Circle,
    Jimi,
    Applet,
    Api
};

module.exports = Jm;