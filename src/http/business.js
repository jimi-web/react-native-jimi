/*
 * @Descripttion: 业务通讯服务，铜须服务输送到各页面出口，涉及数据转换，逻辑处理，基础业务功能实现
 * @version: 1.0.0
 * @Author: liujinyuan
 * @Date: 2019-08-05 17:13:40
 * @LastEditors: liujinyuan
 * @LastEditTime: 2020-03-24 10:41:38
 */
import { httpApp,getObject } from './basic';
import {Toast} from 'teaset';
import api from '../api';
import Loading from '../components/loading/Loading';

let isHttpLocationGetShow = true;

/**
 * 后台请求通用方法封装
 * @param {Object} params 后台需要的参数url，method，data
 */
const request = (params) => {
    console.log(params,'request');
    
    return new Promise((resolve,reject) => {
        let header = null;
        if( typeof params.header === 'number' && params.header){
            header = params.header;
        }else{
            switch (params.header) {
            case 0:
                header = {
                    'Accept': 'application/json',
                    'Content-Type': 'application/x-www-form-urlencoded',
                };
                break;
            case 1:
                header = null;
                break;
            default:
                header = {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                };
                break;
            }
        }
        httpApp('jm_net.request', {
            url: params.url,
            method: params.method ? params.method : 'GET',
            data: params.data ? JSON.stringify(params.data):{},
            // 提交参数的数据方式,这里以json的形式
            headers:header,
            onSuccess: (res) => {
                Loading.hide();
                if(res.code <= 0){
                    resolve(res);
                }else {
                    reject(res);
                    Toast.message(`${res.message}[${res.code}]`);
                }
            },
            onFail: (res) => {
                reject(res);
                Loading.hide();
                if(params.error){
                    console.log('无提示');
                }else{
                    Toast.message('网络异常,请稍后再试'); 
                }
            },
            onComplete: (res) => {
                Loading.hide();
            }
        });
    });
};

/**
 * 数据请求
 * @param {Object} params 后台需要的参数url，method，data,如果需要encoding 或者是encodingType 只要设置该参数为true
 */
// let isDeleteFlag  = [];
export const jmAjax = (params)=> {
    // 防止重复点击（暂时屏蔽，后续测试开放）
    // for (let i = 0; i < isDeleteFlag.length; i++) {
    //     const item = isDeleteFlag[i];
    //     if(item.url === params.url){
    //         return;
    //     }   
    // }
    // isDeleteFlag.push(params);
    return new Promise((resolve,reject) => { 
        if(params.encoding || params.encodingType){
            getEncoding().then((res)=>{
                let data = res;
                params.data =  params.data?params.data:{};
                if(params.encoding){
                    // params.data.encoding = '869354040432859';
                    // params.data.encoding = '869354040542244';
                    params.data.encoding = data.encoding;
                    // params.data.encoding = '860047040658106';
                    // params.data.encoding = '201910242000099';
                    // params.data.encoding = data.encoding;
                }
                if(params.encodingType){
                    params.data.encodingType = data.encodType;
                }
                request(params).then((res)=>{
                    // const index = isDeleteFlag.findIndex(item => {
                    //     return item.url === params.url;
                    // });
                    // isDeleteFlag = isDeleteFlag.splice(index,index);
                    resolve(res);
                }).catch((res)=>{
                    reject(res);
                });
            });
        }else {
            request(params).then((res)=>{
                console.log(res,'定位信息');
                resolve(res);
            }).catch((res)=>{
                reject(res);
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
 * 错误码
 */
const errorCode =(code)=>{
    let message ='定位失败';
    switch(code){
    case -200:
        message = '定位服务未打开';
        break;
    case -201:
        message = '定位权限未申请';
        break;
    case -202:
        message = '定位权限已关闭';
        break;
    default:
        message = '定位失败';
        break;
    }
    return message;
};

/**
 * 获取当前手机位置
 * @param {string} type 地图经纬度类型
 */
export const httpLocationGet = (type) =>{
    return new Promise( (resolve,reject)=>{
        httpApp('jm_location.get', {
            type:type,
            onSuccess: (res) => {
                let data = res;
                resolve(data);
            },
            // 请求失败
            onFail: (res) => {
                if(isHttpLocationGetShow){
                    Toast.message(errorCode(res.code));
                    isHttpLocationGetShow = false;
                }
                reject(res);
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
 * 获取当前IMEI
 */
export const getEncoding = () =>{
    return new Promise((resolve,reject)=> {
        httpApp('jm_user.getEncoding', {
            onSuccess: (res) => {
                let data =  res;
                resolve(data);
            },
            // 请求失败
            onFail: () => {
                reject();
                Toast.message('设备唯一码请求失败');
            },
            // 请求失败或成功
            onComplete: () => {
                //
            },
        }); 
    });
};


 /**
  * 流量卡
  */
export const goFlowCard = ({onSuccess,onFail})=>{
    jmAjax({
        url:api.encodeUserInfo,
        method:'GET',
        encoding:true,
        encodingType:true,
        data:{
            apptype:'jmaxapp'
        }
    }).then((res)=>{
        httpApp('jm_pay.loadPrepaidPage', {
            url:api.flowUrl+res.data,
            title:'流量卡',
            onSuccess: onSuccess,
            // 请求失败
            onFail:onFail
        }); 
    }); 
}





