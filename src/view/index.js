/*
 * @Descripttion: 业务模块集成
 * @version: 1.0.0
 * @Author: liujinyuan
 * @Date: 2019-08-08 14:46:00
 * @LastEditors: liujinyuan
 * @LastEditTime: 2019-09-12 10:24:57
 */

import Photo from './photo/index.js';
import BaiduPosition from './map/position/BaiduPosition.js';
import GooglePosition from './map/position/GooglePosition.js';
import BaiduTrack from './map/track/BaiduTrack.js';
import GoogleTrack from './map/track/GoogleTrack.js';

const Jimi = {
    Photo,
    BaiduPosition,
    GooglePosition,
    BaiduTrack,
    GoogleTrack
};

module.exports = Jimi;