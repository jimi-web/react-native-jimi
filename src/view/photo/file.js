/*
 * @Descripttion: 
 * @version: 
 * @Author: xieruizhi
 * @Date: 2019-11-19 09:51:32
 * @LastEditors: liujinyuan
 * @LastEditTime: 2020-04-11 15:16:44
 */
import React from 'react';
import { Image } from 'react-native';
import {fileDelete,saveToAlbum,saveVideoToAlbum,getFileList,createTheFolder} from '../../http/index';
import {Toast} from '../../components/index';
import {jmAjax} from '../../http/business';
import api from '../../api/index';
import RNFS from 'react-native-fs';


const succeedImg = <Image style={{width:38,height:38}} source={require('../../assets/photo/photo_save_success.png')}></Image>;
const failImg = <Image style={{width:38,height:38}} source={require('../../assets/photo/photo_save_failure.png')}></Image>;
let downloadFileIndex = 0;//存储下载的位置标签
let save = null;
/**
 * 文件批量删除
 * @param {Array} urlList 
 */
export const batchFileDelete = (urlList,callBack)=>{
    let del = Toast.loading('删除中...')          
    fileDeleteComm(del,urlList,callBack);
};

/**
 * 文件删除通用
 * @param {Function} loading loading组件
 * @param {Array} urlList 图片地址列表
 * @param {Function} callBack 成功回调
 */
export const fileDeleteComm = async(loading,urlList,callBack)=>{
    try {
        let succeed = await fileDelete(urlList);
        Toast.remove(loading);
        Toast.loading('删除成功',1000,'center',succeedImg);
        callBack && callBack();
        return succeed;
    } catch (error) {
        console.log(error,'本地删除失败');
        Toast.loading('删除失败',1000,'center',failImg);
        return ;
    }
}


/**
 * 批量保存到相册
 * @param {Array} urlList
 */
export const batchSaveToAlbum = (urlList,videoType,callBack)=>{
    let item = urlList[downloadFileIndex];
    let type = item.split('.')[1];
    singleSaveToAlbum(item,type,urlList.length,videoType,()=>{
        batchSaveToAlbum(urlList,videoType,callBack);
    },callBack);
};


/**
 * 保存成功回调;
 */
const saveSucceedCallBack  = (index,itself,callBack) =>{

    if(downloadFileIndex === index-1 ){
        downloadFileIndex=0;
        Toast.remove(save);
        Toast.loading('保存成功',1000,'center',succeedImg);
        callBack && callBack();
    }else{
        downloadFileIndex++;
        itself();
    }
}

const saveFailedCallBack = ()=>{
    console.log('本地下载失败');
    downloadFileIndex = 0;
    Toast.remove(save);
    Toast.loading('保存失败',1000,'center',failImg);
}


export const singleSaveToAlbum = (url,type,index,videoType,itself,callBack)=>{
    console.log(url,'保存地址');
    if(videoType.includes(type)){
        saveVideoToAlbum(url).then(()=>{
            saveSucceedCallBack(index,itself,callBack);
        }).catch((error)=> {
            console.log(error,'视频下载失败');
            saveFailedCallBack();
        }); 
    }else{
        saveToAlbum(url).then(()=>{
            saveSucceedCallBack(index,itself,callBack);
        }).catch((error)=> {
            console.log(error,'相册下载失败');
            saveFailedCallBack();
        }); 
    }
}



/**
 * 获取本地数据
 * @param {String} name 存储媒体文件夹名称
 */;
export const getLocalList = async(name,fn)=> {
    try {
        let fileData = await getFileList(name);
        fn(fileData);
    } catch (error) {
        if(error.code === -14){
            let fileUrl = await createTheFolder(name);
            if(fileUrl){
                let fileData = await getFileList(name);
                if(fileData.fileList.files.length===0){
                    return;
                }
                fn(fileData);
            }
        }
    }
}


/**
 *获取远程相册数据;
 * @param {Object} params 参数
 */
export const queryDeviceVideoPicFile = (params)=>{
    return new Promise((resolve,reject) => {
        jmAjax({
            url:api.queryDeviceVideoPicFile,
            method:'GET',
            encoding:true,
            encodingType:true,
            data:params
        }).then((res)=>{
            let data = res.data;
            resolve(data);
        }).catch((res)=>{
            reject(res);
        });
    }); 
}

/**
 * 远程批量下载文件
 * @param {Object} params 
 */

export const downloadFile = (longList,filePath,videoType,callBack)=> {
    if(downloadFileIndex===0){
        save = Toast.loading('保存中...');
    }
    let longPhotoList = longList[downloadFileIndex];
    if(longPhotoList.isDown){
        singleSaveToAlbum(longPhotoList.url,longPhotoList.type,longList.length,videoType,()=>{
            downloadFile(longList,filePath,videoType,callBack);
        },callBack);
    }else{
        const options = {
            fromUrl:longPhotoList.fileUrl ,
            toFile: filePath+longPhotoList.fileKey+'.'+longPhotoList.type,
            background: true,
            progressDivider: 5,
        };
        const ret = RNFS.downloadFile(options);
        ret.promise.then(res => {
            longPhotoList.url = 'file:///' +filePath+longPhotoList.fileKey+'.'+longPhotoList.type;
            longPhotoList.isDown = true;
            singleSaveToAlbum('file:///' +filePath+longPhotoList.fileKey+'.'+longPhotoList.type,longPhotoList.type,longList.length,videoType,()=>{
                downloadFile(longList,filePath,videoType,callBack);
            },callBack);
        }) 
        .catch(err => {
            console.log('网络保存失败');
            //下载失败
            Toast.remove(save);
            Toast.loading('保存失败',1000,'center',failImg);
        });

    }
  
    // longList.forEach((element,index) => {
    //     if(element.isDown){
    //         console.log('下载过');
    //         singleSaveToAlbum(element.url,save,element.type,index,longList,videoType,callBack);
    //     }else{
    //         console.log('没有下载过');
    //         const options = {
    //             fromUrl:element.fileUrl ,
    //             toFile: filePath+'/'+element.fileKey+'.'+element.type,
    //             background: true,
    //             progressDivider: 5,
    //         };

    //         const ret = RNFS.downloadFile(options);
    //         //下载结束
    //         ret.promise.then(res => {
    //             element.url = 'file:///' +filePath+'/'+element.fileKey+'.'+element.type;
    //             element.isDown = true;
    //             singleSaveToAlbum('file:///' +filePath+'/'+element.fileKey+'.'+element.type,save,element.type,index,longList,videoType,callBack);
    //         }) 
    //         .catch(err => {
    //             //下载失败
    //             console.log('远程 下载失败');
    //             Toast.remove(save);
    //             Toast.loading('保存失败',1000,'center',failImg);
    //         });
    //     }
    // });
}

/**
 * 删除照片
 */
export const deleteDeviceVideoPicFile = (params)=>{
        let del = Toast.loading('删除中...');
        console.log(params);
        jmAjax({
            url:api.deleteDeviceVideoPicFile,
            method:'DELETE',
            header:0,
            data:{fileIds:params.longFileIds.join(',')}
        }).then((res)=>{
            if(params.localFileIds.length>0){
                fileDeleteComm(del,params.localFileIds,params.callBack);
            }else{
                params.callBack()
            }
            Toast.remove(del);
        }).catch((res)=>{
            console.log('网络删除失败');
            console.log(res.message);
        });
    }
