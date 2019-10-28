/*
 * @Descripttion: 业务通讯服务，铜须服务输送到各页面出口，涉及数据转换，逻辑处理，基础业务功能实现
 * @version: 1.0.0
 * @Author: liujinyuan
 * @Date: 2019-08-05 17:13:40
 * @LastEditors: liujinyuan
 * @LastEditTime: 2019-10-26 17:51:10
 */
import { httpApp,getObject } from './basic';
import {Toast} from 'teaset';
import Loading from '../components/loading/Loading';

/**
 * 后台请求通用方法封装
 * @param {Object} params 后台需要的参数url，method，data
 */
const request = (params) => {
    return new Promise((resolve) => {
        httpApp('jm_net.request', {
            url: params.url,
            method: params.method,
            data: JSON.stringify(params.data),
            // 提交参数的数据方式,这里以json的形式
            headers:params.header ? {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded',
            }:{
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            onSuccess: (res) => {
                Loading.hide();
                if(res.code === 0){
                    resolve(res);
                }else {
                    Toast.message(`${res.message}[${res.code}]`);
                }
            },
            onFail: (res) => {
                Loading.hide();
                Toast.message('网络异常,请稍后再试');
            },
            onComplete: (res) => {
                Loading.hide();
            }
        });
    });
};

/**
 * 数据请求
 * @param {Object} params 后台需要的参数url，method，data,如果需要encodingType 或者是encodingType 只要设置该参数为true
 */
export const jmAjax = (params)=> {
    return new Promise((resolve) => { 
        if(params.encoding || params.encodingType){
            getEncoding().then((res)=>{
                let data = res;
                params.data =  params.data?params.data:{};
                if(params.encoding){
                    // params.data.encoding = '201910281005000';
                    // params.data.encoding = '201910242000099';
                    params.data.encoding = data.encoding;
                }
                if(params.encodingType){
                    params.data.encodingType = data.encodType;
                }
                request(params).then((res)=>{
                    resolve(res);
                });
            });
        }else {
            request(params).then((res)=>{
                resolve(res);
            });
        }
    });
};


/**
 * 开启与关闭ReactNative退出按钮监听
 * @param {Function} callback 关闭小程序前回调
 */
export const httpExit = (callback) => {
    httpApp('jm_api.exitListener', {
        isOpenListen: true,
        onSuccess: () => {
            //
        },
        // 请求失败
        onFail: () => {
            //

        },
        // 请求失败或成功
        onComplete: () => {
            //
        },
        // 将要关闭小程序回调
        onWillClosePage: () => {
            callback && callback();
        }
    });
};

/**
 * 获取当前手机位置
 * @param {string} type 地图经纬度类型
 */
export const httpLocationGet = (type) =>{
    return new Promise(function (resolve) {
        httpApp('jm_location.get', {
            type:type,
            onSuccess: (res) => {
                let data = res;
                resolve(data);
            },
            // 请求失败
            onFail: (res) => {
                Toast.message('定位失败');
            },
            // 请求失败或成功
            onComplete: () => {
                //
            },
        }); 
    });
};


/**
 * 获取小程序位置
 */
export const httpSamllLocation = () =>{
    return new Promise(function (resolve, reject) {
        httpApp('jm_file.getSmallAppPath',{
            onSuccess:(res)=>{
                const data = res;
                resolve(data);
            },
            onFail:()=>{
                reject();
            },
            onComplete:()=>{
                //
            }
        });
    });
};

/**
 * 获取当前IMEI
 */
export const getEncoding = () =>{
    return new Promise((resolve)=> {
        httpApp('jm_user.getEncoding', {
            onSuccess: (res) => {
                let data =  res;
                resolve(data);
            },
            // 请求失败
            onFail: () => {
                Toast.message('设备唯一码请求失败');
            },
            // 请求失败或成功
            onComplete: () => {
                //
            },
        }); 
    });
};




