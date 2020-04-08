/*
 * @Descripttion: wifi相关
 * @version: 
 * @Author: liujinyuan
 * @Date: 2019-09-24 09:21:33
 * @LastEditors: liujinyuan
 * @LastEditTime: 2020-04-08 10:41:42
 */

import {httpWifi,httpApp} from './basic';
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
    console.log('请求');
    return new Promise((resolve) => {
        httpWifi('getWiFiInfo',(res) => {
            if(res.code == 1300){
                data.status = 1;
                data.message = 'WIFI已打开';
                data.data = res.data;
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
            console.log(res,'状态11');
            if(res.code == 1003){
                if(Platform.OS === 'ios'){
                    resolve(data);
                }else{
                    httpWifi('getWiFiInfo',(res) => {
                        if(res.code == 1300){
                            data.status = 1;
                            data.message = 'WIFI已打开';
                            data.data = res.data;
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
let index = 0;
export const connectWifi = (accout,password)=>{
    index++;
    return new Promise((resolve,reject) => {
        httpWifi('scan',(res) => {
            let params = {};
            console.log(res,'扫描结果');
            if(!res.data || !res.data.length){
                resolve({status:0,message:'失败'});
                return;
            }
            res.data.forEach(item => {
                console.log(item.ssid == accout,'是否搜寻到wifi');
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