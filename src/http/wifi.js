/*
 * @Descripttion: wifi相关
 * @version: 
 * @Author: liujinyuan
 * @Date: 2019-09-24 09:21:33
 * @LastEditors: liujinyuans
 * @LastEditTime: 2019-11-27 18:23:50
 */

import {httpApp} from './basic';
/**
 * 获取wifi状态
 */
export const getWifiState = ()=>{
    return new Promise((resolve,reject) => {
        httpApp('jm_dev_wifi.command',{
            command:'getWiFiState',
            jmDeviceWifiCallback:(res)=>{
                resolve(res);
            },
        });
    });
    
};
