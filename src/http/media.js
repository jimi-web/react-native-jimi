/*
 * @Descripttion: 媒体相关，播放视频，录音，图片
 * @version: 
 * @Author: liujinyuan
 * @Date: 2019-09-24 09:21:33
 * @LastEditors: liujinyuan
 * @LastEditTime: 2019-10-29 11:10:09
 */

import {httpApp} from './basic';

export const playAudio = (url)=>{
    return new Promise((resolve,reject) => {
        httpApp('jm_media.playAudio',{
            audioPath:url,
            onSuccess:(res)=>{
                resolve(res);
            },
            onFail:(res)=>{
                const data = res || '获取失败';
                reject(data);
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
                const data = res || '获取失败';
                reject(data);
            },
            onComplete:()=>{
                //
            }
        });
    });
    
};