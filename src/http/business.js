/*
 * @Descripttion: 业务通讯服务，铜须服务输送到各页面出口，涉及数据转换，逻辑处理，基础业务功能实现
 * @version: 1.0.0
 * @Author: liujinyuan
 * @Date: 2019-08-05 17:13:40
 * @LastEditors: xieruizhi
 * @LastEditTime: 2019-08-29 16:41:37
 */
import { httpApp,getObject } from './basic';

/**
 * 后台请求通用方法封装
 * @param {Object} params 后台需要的参数
 * @param {Object} requestParams 请求需要的参数，无需传后台的，url，method，key
 */
const request = (params, requestParams) => {
    return new Promise((resolve, reject) => {
        httpApp('jm_net.request', {
            url: requestParams.url,
            method: requestParams.method,
            data: JSON.stringify(params),
            // 提交参数的数据方式,这里以json的形式
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            onSuccess: (res) => {
                resolve(res);
            },
            onFail: (res) => {
                reject(res);
            },
            onComplete: (res) => {
                //
            }
        });
    });
};

/**
 * Get请求
 * @param {String} url  请求地址
 * @param {Oject} params 参数
 * @param {String} key  imei的字段名
 */
export const httpServiceGet = (url, params) => {
    return new Promise((resolve, reject) => {
        request(params, {
            url: url,
            method: 'GET',
        }).then((succeed, failure) => {
            resolve(succeed);
            resolve(failure);
        });
    });
};


/**
 * delete请求
 * @param {String} url  请求地址
 * @param {Oject} params 参数
 * @param {String} key  imei的字段名
 */
export const httpServiceDelete = (url, params) => {
    return new Promise((resolve, reject) => {
        request(params, {
            url: url,
            method: 'DELETE',
        }).then((succeed, failure) => {
            resolve(succeed);
            resolve(failure);
        });
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
                console.log(res,1);
                const data = getObject(res);
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
                    const data = getObject(res);
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


