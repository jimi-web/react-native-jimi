/*
 * @Descripttion: 
 * @version: 
 * @Author: liujinyuan
 * @Date: 2019-08-26 14:28:40
 * @LastEditors: xieruizhi
 * @LastEditTime: 2020-06-01 15:27:01
 */
import Icon from './assets';
import Circle from './components';
import Jimi from './view';
import Applet from './http/index';
import Api from './api/index';
import I18n from './language/index';
Api.setServer('http://apis.jimimax.com');
// Api.setServer('http://test.api.jimimax.com');
// Api.setServer('http://pre.api.jimimax.com');
const Jm  = {
    Icon,
    Circle,
    Jimi,
    Applet,
    Api,
    I18n
};

module.exports = Jm;