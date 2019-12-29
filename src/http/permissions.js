/*
 * @Descripttion: 权限相关
 * @version: 
 * @Author: liujinyuan
 * @Date: 2019-09-24 09:21:33
 * @LastEditors  : liujinyuan
 * @LastEditTime : 2019-12-28 15:55:25
 */

import {httpApp} from './basic';

/**
 * 获取麦克风信息，0：查询，1：申请，2：跳转到设置
 */
export const getMicrophone = (ask) => {
    return new Promise((resolve,reject) => {
        httpApp('jm_device_permissions.microphone',{
            ask,
            onSuccess:(res) => {
                resolve(res);
            },
            onFail:(res) => {
                reject(res);
            },
            onComplete:() => {
                //
            }
        });
    });
};
