/*
 * @Descripttion: 和app交互文件相关内容，文件地址的规则为小程序位置 + imei + 文件类别（下载获取均使用此格式）
 * @version: 
 * @Author: liujinyuan
 * @Date: 2019-09-19 18:18:47
 * @LastEditors: xieruizhi
 * @LastEditTime: 2020-06-22 17:36:05
 *
 */
/**
* 获取小程序位置
*/
import {httpApp} from './basic'; 
import {getEncoding} from './business'; 
import Toast from '../components/index';
import I18n from '../language/index';

export const getSmallAppPath = ()=>{
    return new Promise((resolve,reject) => {
        httpApp('jm_file.getSmallAppPath',{
            onSuccess:(res)=>{
                resolve(res);
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
 * 
 * @param {String} url 获取当前imei指定文件夹文件
 * 当前的文件夹和文件保持一致
 */
export const getFileList = (url)=>{
    return new Promise((resolve,reject) => {
        getSmallAppPath().then(location => {
            getEncoding().then(data => {
                const filePath = `${location.filePath}/${data.encoding}/${url}/`;
                console.log(filePath,'获取文件来源');
                
                httpApp('jm_file.getFileList',{
                    filePath,
                    onSuccess:(res)=>{
                        let result = {
                            filePath:filePath,
                            fileList:res
                        };
                        resolve(result);
                    },
                    onFail:(res)=>{
                        reject(res);
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
                reject(res);
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
                }).catch((res)=>{
                    //失败回调
                    reject(res);
                });   
            });
        });
    });
};

/**
 * 删除文件
 * @param {Array} url 
 */
export const fileDelete = (url) => {
    return new Promise((resolve,reject) => {
        httpApp('jm_file.delete', {
            filePath: typeof url === 'string' ? url: url.join(','),
            onSuccess: (res) => {
                resolve(res);
            },
            onFail: (res) => {
                reject(res);
            },
            onComplete: () => {
                //
            }
        });
    });
};

/**
 * 保存到相册
 * @param  {string} url 图片路径
 */
export const saveToAlbum = (url) => {
    console.log(url,'保存图片');
    return new Promise((resolve,reject) => {
        httpApp('jm_image.saveToAlbum', {
            filePath: url,
            onSuccess: (res) => {
                resolve(res);
            },
            onFail: (res) => {
                reject(res);
            },
            onComplete: () => {
                //
            }
        });
    });     
};


/**
 * 保存视频相册
 * @param  {string} url 视频的本地
 */
export const saveVideoToAlbum = (url) => {
    return new Promise((resolve,reject) => {
        httpApp('jm_media.saveVideoToAlbum', {
            filePath: url,
            onSuccess: (res) => {
                resolve(res);
            },
            onFail: (res) => {
                console.log(res,'报错');
                if(res.code == -330){
                    return Toast.message(I18n.t('视频解析失败'))
                }
                reject(res);
            },
            onComplete: () => {
                //
            }
        });
    });     
};
