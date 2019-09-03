/*
 * @Descripttion: 业务模块集成
 * @version: 1.0.0
 * @Author: liujinyuan
 * @Date: 2019-08-08 14:46:00
 * @LastEditors: xieruizhi
 * @LastEditTime: 2019-09-03 09:37:07
 */

import Photo from './photo/index';
import BaiduPosition from '../view/map/baidu/Position';
import GooglePosition from '../view/map/google/Position';

const Jimi = {
    Photo,
    BaiduPosition,
    GooglePosition
};

module.exports = Jimi;