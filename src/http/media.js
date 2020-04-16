/*
 * @Descripttion: 媒体相关，播放视频，录音，图片
 * @version: 
 * @Author: liujinyuan
 * @Date: 2019-09-24 09:21:33
 * @LastEditors: liujinyuan
 * @LastEditTime: 2020-04-11 13:11:11
 */

import {httpApp} from './basic';

/**
 * 播放音频
 * @param {String} url  音频路径
 */
export const playAudio = (url)=>{
    return new Promise((resolve,reject) => {
        httpApp('jm_media.playAudio',{
            audioPath:url,
            onSuccess:(res)=>{
                resolve(res);
            },
            onFail:(res)=>{
                reject(res);
            },
            onComplete:()=>{
                //
            }
        });
    });
    
};


export const stopAudio = (data)=>{
    return new Promise((resolve,reject) => {
        httpApp('jm_media.stopAudio',{
            userData:data,
            onSuccess:(res)=>{
                resolve(res);
            },
            onFail:(res)=>{
                reject(res);
            },
            onComplete:()=>{
                //
            }
        });
    });
    
};

/**
 * 获取视频第一帧
 * @param {String} videoPaths 
 */
export const getVideoFirstImage = (videoPaths)=>{
    return new Promise((resolve,reject) => {
        httpApp('jm_media.getVideoFirstImage',{
            videoPaths:videoPaths,
            onSuccess:(res)=>{
                resolve(res);
            },
            onFail:(res)=>{
                reject(data);
            },
            onComplete:()=>{
                //
            }
        });
    }); 
};

/**
 * 获取视频时长
 * @param  {String} url 视频路径
 */
export const getVideoTime = (url) => {
    return new Promise((resolve,reject) => {
        httpApp('jm_media.getVideoTime', {
            videoPaths: url,
            onSuccess: (res) => {
                resolve(res);
            },
            onFail: (res) => {
                reject(res);
            },
            onComplete: () => {
                //
            }
        });
    });     
};


/**
 * 改变屏幕方向
 * @param  {String} orientation landscapeRight:右横向，landscapeLeft:左横向；portrait:竖屏
 */
export const changeSreenDirection = (orientation) => {
    return new Promise((resolve,reject) => {
        httpApp('jm_media.changeSreenDirection', {
            orientation: orientation,
            onSuccess: (res) => {
                resolve(res);
            },
            onFail: (res) => {
                reject(res);
            },
            onComplete: () => {
                //
            }
        });
    });     
};

