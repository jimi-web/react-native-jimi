/*
 * @Descripttion: 业务模块集成
 * @version: 1.0.0
 * @Author: liujinyuan
 * @Date: 2019-08-08 14:46:00
 * @LastEditors: xieruizhi
 * @LastEditTime: 2019-10-21 11:57:48
 */

// import Photo from './photo/index';
import '../libs/time';
import BaiduPosition from './map/position/BaiduPosition';
import GooglePosition from './map/position/GooglePosition';
import BaiduTrack from './map/track/BaiduTrack';
import GoogleTrack from './map/track/GoogleTrack';
import BaiduTrace from './map/trace/BaiduTrace';
import GoogleTrace from './map/trace/GoogleTrace';
import FenceList from './map/fence/fenceList/FenceList';
import BaiduAddFence from './map/fence/addFence/BaiduAddFence';
import GoogleAddFence from './map/fence/addFence/GoogleAddFence';
import Record from './record';
import Share from './map/share/Share';



const Jimi = {
    BaiduPosition,
    GooglePosition,
    BaiduTrack,
    GoogleTrack,
    BaiduTrace,
    GoogleTrace,
    FenceList,
    BaiduAddFence,
    GoogleAddFence,
    Record,
    Share
};

module.exports = Jimi;