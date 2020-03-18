/*
 * @Descripttion: 
 * @version: 
 * @Author: xieruizhi
 * @Date: 2019-09-18 11:47:02
 * @LastEditors: liujinyuan
 * @LastEditTime: 2020-03-18 14:30:03
 */
import {httpApp,httpBlue,httpWifi,httpWs,httpCameraState,httpCameraInfo,httpClose} from './basic'; 
import {request,jmAjax,httpExit,httpLocationGet,httpSamllLocation,getEncoding} from './business';
import {getSmallAppPath,getFileList,createFolder,createTheFolder,fileDelete,saveToAlbum} from './file';
import {playAudio,getVideoFirstImage,saveVideoToAlbum,getVideoTime,changeSreenDirection,stopAudio} from './media';
import { getMicrophone,skipSetWifi } from './permissions';
import {authorizationProcess} from './authorization';//授权
import {getWifiState} from './wifi';

const Applet  = {
    getWifiState,
    httpApp,
    httpBlue,
    httpWifi,
    httpWs,
    httpCameraState,
    httpCameraInfo,
    httpClose,
    request,
    jmAjax,
    httpExit,
    httpLocationGet,
    httpSamllLocation,
    getEncoding,
    
    getFileList,
    getSmallAppPath,
    createFolder,
    createTheFolder,
    fileDelete,
    saveToAlbum,
    
    playAudio,
    stopAudio,
    getVideoFirstImage,
    saveVideoToAlbum,
    getVideoTime,
    changeSreenDirection,

    getMicrophone,
    skipSetWifi,
    authorizationProcess,
};

module.exports = Applet;