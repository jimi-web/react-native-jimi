/*
 * @Descripttion: wifi相关
 * @version: 
 * @Author: liujinyuan
 * @Date: 2019-09-24 09:21:33
 * @LastEditors: liujinyuan
 * @LastEditTime: 2020-03-20 16:30:56
 */

import {httpWifi,httpApp} from './basic';
import {Platform} from 'react-native';
/**
 * 获取wifi状态
 */
export const getWifiState = ()=>{
    let data = {
        status:0,
        message:'wifi未打开',
        data:[]
    };
    return new Promise((resolve,reject) => {
        httpWifi('getWiFiState',(res) => {
            console.log(res,'状态');
            if(res.code == 1003){
                if(Platform.OS === 'ios'){
                    resolve(data);
                }else{
                    httpWifi('openWifi',(res) => {
                        console.log(res,'打开wifi');
                        if(res.code == 1202){
                            data.message = 'WIFI已关闭';
                            resolve(data);
                        }
                        if(res.code == 1200){
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

export const scanWifi = (accout,password)=>{
    httpWifi('scan',(res) => {
        console.log(res,'扫描结果');
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
        console.log(params,21312);
        if(accout == params.ssid){
            httpWifi('connect',(res) => {
                console.log(res,'连接结果');
                resolve({status:1,message:'成功'});
            },params);
        }else{
            let time = setTimeout(() => {
                clearInterval(time);
            },1500);
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
        console.log(index,111);
        if(index > 3){
            resolve({status:0,message:'失败'});
        }
        httpWifi('scan',(res) => {
            console.log(res,'扫描结果');
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
            console.log(params,21312);
            if(accout == params.ssid){
                httpWifi('connect',(res) => {
                    console.log(res,'连接结果');
                    resolve({status:1,message:'成功'});
                },params);
            }else{
                // let time = setTimeout(() => {
                //     clearInterval(time);
                // },1500);
            }
        });
    });
    
};