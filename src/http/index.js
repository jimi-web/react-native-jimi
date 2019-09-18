/*
 * @Descripttion: 
 * @version: 
 * @Author: xieruizhi
 * @Date: 2019-09-18 11:47:02
 * @LastEditors: xieruizhi
 * @LastEditTime: 2019-09-18 14:17:04
 */
import {httpApp,httpBlue,httpWifi,httpWs,httpCameraState,httpCameraInfo,httpClose} from './basic'; 
import {request,jmAjax,httpExit,httpLocationGet,httpSamllLocation,getFileList,getEncoding} from './business';

const Applet  = {
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
    getFileList,
    getEncoding
};

module.exports = Applet;