/*
 * @Descripttion: 和app交互文件相关内容，文件地址的规则为小程序位置 + imei + 文件类别（下载获取均使用此格式）
 * @version: 
 * @Author: liujinyuan
 * @Date: 2019-09-19 18:18:47
 * @LastEditors: liujinyuan
 * @LastEditTime: 2019-09-23 17:47:20
 *
/**
* 获取小程序位置
*/
import {httpApp,getObject} from './basic'; 
import {getEncoding} from './business'; 
export const getSmallAppPath = ()=>{
    return new Promise((resolve,reject) => {
        httpApp('jm_file.getSmallAppPath',{
            onSuccess:(res)=>{
                const data = getObject(res);
                resolve(data);
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



/**
 * 
 * @param {String} url 获取当前imei指定文件夹文件
 * 当前的文件夹和文件保持一致
 */
export const getFileList = (url)=>{
    return new Promise((resolve,resject) => {
        getSmallAppPath().then(location => {
            getEncoding().then(data => {
                const filePath = `${location.filePath}/${data.encoding}/${url}/`;
                httpApp('jm_file.getFileList',{
                    filePath,
                    onSuccess:(res)=>{
                        if(res){
                            const data = getObject(res);
                            resolve(data);
                        }
                    },
                    onFail:()=>{
                        const data = res || '获取失败';
                        reject(data);
                    },
                    onComplete:()=>{
                        //
                    }
                });
            });
        });
    });
};



/**
 * 创建文件夹
 * @param  {string} url 需要被创建的路径
 */
export const createFolder = (url) => {
    return new Promise((resolve,reject) => {
        httpApp('jm_file.createFolder', {
            filePath: url,
            onSuccess: (res) => {
                resolve(res);
            },
            onFail: (res) => {
                const data = res || '获取失败';
                reject(data);
            },
            onComplete: () => {
                //
            }
        });
    });
        
};
/**
 * 
 * @param {String} url 创建指定文件夹
 * 当前文件夹名为当前小程序位置+imei，后续为自己想创建的文件夹，设计到多级使用/分隔
 */
export const createTheFolder = (url) => {
    return new Promise((resolve,reject) => {
        getSmallAppPath().then(location => {
            getEncoding().then(data => {
                const createUrl = `${location.filePath}/${data.encoding}/${url}/`;
                createFolder(createUrl).then(res => {
                    resolve(createUrl);
                });   
            });
        });
    });
};