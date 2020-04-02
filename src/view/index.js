/*
 * @Descripttion: 业务模块集成
 * @version: 1.0.0
 * @Author: liujinyuan
 * @Date: 2019-08-08 14:46:00
 * @LastEditors: liujinyuan
 * @LastEditTime: 2020-03-31 16:09:31
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
import Photo from './photo/index';
import LocalPhotoList from './photo/photoList/LocalPhotoList';
import LongPhotoList from './photo/photoList/LongPhotoList';
import Photograph from './photo/photoDeatil/Photograph';
import Video from './photo/photoDeatil/Video';
import PhotoDeatil from './photo/photoDeatil/PhotoDeatil';
import Empty from './empty/Empty';
import RVC from './RVC/MonitorView';
import FlowCard from './flowCard/index';
import MediaSyc from './mediaSyn/MediaSyn';
import Instruction from './instruction/instruction';
import MediaContral from './mediaSyn/MediaContral';
import MediaDetails from './mediaSyn/MediaDetails';
import Details from './details/index';
import IconLibrary from './details/IconLibrary';

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
    Share,
    Photo,
    LocalPhotoList,
    LongPhotoList,
    PhotoDeatil,
    Photograph,
    Video,
    Empty,
    RVC,
    FlowCard,
    MediaSyc,
    Instruction,
    MediaContral,
    Details,
    IconLibrary,
    MediaDetails
};

module.exports = Jimi;