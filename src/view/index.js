/*
 * @Descripttion: 业务模块集成
 * @version: 1.0.0
 * @Author: liujinyuan
 * @Date: 2019-08-08 14:46:00
 * @LastEditors: xieruizhi
 * @LastEditTime: 2019-09-11 18:36:14
 */

import Photo from './photo/index';
import BaiduPosition from './map/position/BaiduPosition';
import GooglePosition from './map/position/GooglePosition';
import BaiduTrack from './map/track/BaiduTrack';
import GoogleTrack from './map/track/GoogleTrack';

const Jimi = {
    Photo,
    BaiduPosition,
    GooglePosition,
    BaiduTrack,
    GoogleTrack
};

module.exports = Jimi;