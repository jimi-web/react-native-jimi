/*
 * @Descripttion: wifi相关
 * @version: 
 * @Author: liujinyuan
 * @Date: 2019-09-24 09:21:33
 * @LastEditors: liujinyuan
 * @LastEditTime: 2020-04-09 13:38:57
 */

import {httpWifi,getObject} from './basic';
import {Platform} from 'react-native';


/**
 * 获取wiif信息接口
 * @param {String} methods 发送的方法
 * @param {*} data 发送的数据
 */
export const getWifiMessage = (methods,data) => {
    //
};


/**
 * 获取WIFI信息
 */
export const getWifiInfo = () => {
    let data = {
        status:0
    };
    return new Promise((resolve) => {
        httpWifi('getWiFiInfo',(res) => {
            if(res.code == 1300){
                data.status = 1;
                data.message = 'WIFI已打开';
                data.data = getObject(res.data);
            }
            resolve(data);
        });
    });
    
};

/**
 * 获取wifi状态
 */
export const getWifiState = ()=>{
    let data = {
        status:0,
        message:'wifi未打开',
        data:[]
    };
    return new Promise((resolve) => {
        httpWifi('getWiFiState',(res) => {
            if(res.code == 1003){
                if(Platform.OS === 'ios'){
                    resolve(data);
                }else{
                    httpWifi('getWiFiInfo',(res) => {
                        if(res.code == 1300){
                            data.status = 1;
                            data.message = 'WIFI已打开';
                            data.data = getObject(res.data);
                        }
                        resolve(data);
                       
                    });
                }
            }
            if(res.code == 1001){
                httpWifi('getWiFiInfo',(res) => {
                    if(res.code == 1300){
                        data.status = 1;
                        data.message = 'WIFI已打开';
                        data.data = res.data;
                    }
                    resolve(data);
                });
            }
        });
       
    });
    
};


export const openWifi = () => {
    return new Promise((resolve,reject) => {
        httpWifi('openWifi',(res) => {
            resolve(res);  
        });
    });
};

/**
 * 连接WIFI
 * @param {String} accout 账号
 * @param {String} password 密码
 */
export const scanWifi = (accout,password)=>{
    httpWifi('scan',(res) => {
        let params = {};
        res.data.forEach(item => {
            if(item.ssid == accout){
                params = {
                    bssid:item.accout,
                    ssid:item.ssid,
                    capabilities:item.capabilities,
                    password:password
                };
            }
        });
       
        if(accout == params.ssid){
            httpWifi('connect',(res) => {
                resolve({status:1,message:'成功'});
            },params);
        }else{
            resolve({status:0,message:'失败'});
        }
    });
};

/**
 * 
 * @param {String} accout 账号
 * @param {String} password 密码
 */
export const connectWifi = (accout,password)=>{
    return new Promise((resolve,reject) => {
        httpWifi('scan',(res) => {
            console.log(res,'扫描结果');
            let params = {};
            if(res.code != 1100){
                resolve({status:0,message:'失败'});
                return;
            }
            if(!res.data || !res.data.length){
                resolve({status:0,message:'失败'});
                return;
            }
            res.data.forEach(item => {
                if(item.ssid == accout){
                    params = {
                        bssid:item.bssid,
                        ssid:item.ssid,
                        capabilities:item.capabilities,
                        password:password
                    };
                }
            });
            if(accout == params.ssid){
                httpWifi('connect',(res) => {
                    resolve({status:1,message:'成功'});
                },params);
            }else{
                // let time = setTimeout(() => {
                //     clearInterval(time);
                // },1500);
                resolve({status:0,message:'失败'});
            }
        });
    });
    
};