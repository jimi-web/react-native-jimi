/*
 * @Descripttion: 业务模块集成
 * @version: 1.0.0
 * @Author: liujinyuan
 * @Date: 2019-08-08 14:46:00
 * @LastEditors: xieruizhi
 * @LastEditTime: 2019-09-10 11:05:45
 */

import Photo from './photo/index';
import BaiduPosition from '../view/map/Position/BaiduPosition';
import GooglePosition from '../view/map/Position/GooglePosition';
import BaiduTrack from '../view/map/Track/BaiduTrack';
import GoogleTrack from '../view/map/Track/GoogleTrack';

const Jimi = {
    Photo,
    BaiduPosition,
    GooglePosition,
    BaiduTrack,
    GoogleTrack
};

module.exports = Jimi;