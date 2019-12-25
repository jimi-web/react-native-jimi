/*
 * @Descripttion: 
 * @version: 
 * @Author: xieruizhi
 * @Date: 2019-11-19 09:51:32
 * @LastEditors: xieruizhi
 * @LastEditTime: 2019-11-27 14:06:50
 */
import React from 'react';
import { Image } from 'react-native';
import {fileDelete,saveToAlbum,saveVideoToAlbum } from '../../http/index';
import {Toast} from '../../components/index';

const succeedImg = <Image style={{width:38,height:38}} source={require('../../assets/photo/photo_save_success.png')}></Image>;
const failImg = <Image style={{width:38,height:38}} source={require('../../assets/photo/photo_save_failure.png')}></Image>;

/**
 * 文件批量删除
 * @param {Array} urlList 
 */
export const batchFileDelete = async(urlList,callBack)=>{
    try {
        let del = Toast.loading('删除中...');
        let succeed = await fileDelete(urlList);
        Toast.remove(del);
        Toast.loading('删除成功',1000,'center',succeedImg);
        callBack && callBack();
        return succeed;
    } catch (error) {
        Toast.loading('删除失败',1000,'center',failImg);
        return ;
    }
};

/**
 * 批量保存到相册
 * @param {Array} urlList
 */
export const batchSaveToAlbum = (urlList,videoType,callBack)=>{
    let save = Toast.loading('保存中...');
    urlList.forEach((item,index) => {
        let type = item.split('.')[1];
        if(videoType.indexOf(type)>-1){
            saveVideoToAlbum(item).then(()=>{
                if(index === urlList.length-1 ){
                    Toast.remove(save);
                    Toast.loading('保存成功',1000,'center',succeedImg);
                    callBack && callBack();
                }
            }).catch(()=> {
                Toast.loading('保存失败',1000,'center',failImg);
            }); 
        }else{
            saveToAlbum(item).then(()=>{
                if(index === urlList.length-1 ){
                    Toast.remove(save);
                    Toast.loading('保存成功',1000,'center',succeedImg);
                    callBack && callBack();
                }
            }).catch(()=> {
                Toast.loading('保存失败',1000,'center',failImg);
            }); 
        }
    });
};





