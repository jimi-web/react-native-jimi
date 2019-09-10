/*
 * @Descripttion: 业务通讯服务，铜须服务输送到各页面出口，涉及数据转换，逻辑处理，基础业务功能实现
 * @version: 1.0.0
 * @Author: liujinyuan
 * @Date: 2019-08-05 17:13:40
 * @LastEditors: xieruizhi
 * @LastEditTime: 2019-09-09 14:24:00
 */
import { httpApp,getObject } from './basic';
import {Toast} from 'teaset';

/**
 * 后台请求通用方法封装
 * @param {Object} params 后台需要的参数url，method，data
 */
const request = (params) => {
    return new Promise((resolve, reject) => {
        httpApp('jm_net.request', {
            url: params.url,
            method: params.method,
            data: JSON.stringify(params.data),
            // 提交参数的数据方式,这里以json的形式
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            onSuccess: (res) => {
                console.log(res);
                console.log('请求成功');
                if(res.code === 0){
                    resolve(res);
                }else {
                    Toast.fail('请求失败');
                }
            },
            onFail: (res) => {
                Toast.fail('请求失败');
            },
            onComplete: (res) => {
                //
            }
        });
    });
};

/**
 * 数据请求
 * @param {Object} params 后台需要的参数url，method，data,如果需要encodingType 或者是encodingType 只要设置该参数为true
 */
export const jmAjax = (params)=> {
    return new Promise((resolve, reject) => { 
        if(params.encoding || params.encodingType){
            getEncoding().then((res)=>{
                let data = res;
                if(params.encoding){
                    params.data.encoding = data.encoding;
                }
                if(params.encodingType){
                    params.data.encodingType = data.encodingType;
                }
                request(params);
            });
        }else {
            request(params);
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
            callback();
        }
    });
};

/**
 * 获取当前手机位置
 * @param {string} type 地图经纬度类型
 */
export const httpLocationGet = (type) =>{
    return new Promise(function (resolve, reject) {
        httpApp('jm_location.get', {
            type:type,
            onSuccess: (res) => {
                let data = res;
                resolve(data);
            },
            // 请求失败
            onFail: () => {
                reject();
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
 * 
 * @param {String} url 文件夹位置，需手动添加文件夹：imei+'/Media/'
 */
export const getFileList = (url) =>{
    return new Promise(function (resolve, reject) {
        httpApp('jm_file.getFileList',{
            onSuccess:(res)=>{
                if(res){
                    const data = res;
                    this.setState({
                        filePath:data.files,
                    },()=>{
                        this.fileListSplit(data.files);
                    });
                    
                }
            },
            onFail:()=>{
                //  
            },
            onComplete:()=>{
                //
            }
        },{
            filePath:url
        });
    });
};

/**
 * 获取当前手机位置
 * @param {string} type 地图经纬度类型
 */
export const getEncoding = () =>{
    return new Promise((resolve, reject)=> {
        httpApp('jm_user.getEncoding', {
            onSuccess: (res) => {
                let data = res;
                resolve(data);
            },
            // 请求失败
            onFail: () => {
                Toast.fail('设备唯一码请求失败');
            },
            // 请求失败或成功
            onComplete: () => {
                //
            },
        }); 
    });
};




