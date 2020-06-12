/*
 * @Descripttion: 业务模块集成
 * @version: 1.0.0
 * @Author: liujinyuan
 * @Date: 2019-08-08 14:46:00
 * @LastEditors: xieruizhi
 * @LastEditTime: 2020-06-12 11:24:25
 */

// import Photo from './photo/index';
import '../libs/time';
import Track from './map/track/Track';
import Trace from './map/trace/Trace';
import Position from './map/position/Position';
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
import MediaSyc from './mediaSyn/MediaSyn';
import Instruction from './instruction/instruction';
import MediaContral from './mediaSyn/MediaContral';
import MediaDetails from './mediaSyn/MediaDetails';
import Details from './details/index';
import IconLibrary from './details/IconLibrary';
import PhotoAlbum from './photo/photoDeatil/PhotoAlbum';

const Jimi = {
    Track,
    Trace,
    Position,
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
    PhotoAlbum,
    Empty,
    RVC,
    MediaSyc,
    Instruction,
    MediaContral,
    Details,
    IconLibrary,
    MediaDetails
};

module.exports = Jimi;