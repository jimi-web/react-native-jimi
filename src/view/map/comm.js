/*
 * @Descripttion: 
 * @version: 
 * @Author: xieruizhi
 * @Date: 2019-10-10 10:52:06
 * @LastEditors: xieruizhi
 * @LastEditTime: 2019-10-16 11:21:18
 */
import {jmAjax} from '../../http/business';
import gps from '../../libs/coversionPoint';
import api from '../../api/index';
import {Toast} from 'teaset';

/**
 * 获取设备定位信息
 */
export const getDevicePosition = ()=> {
    return new Promise((resolve) => {
        jmAjax({
            url:api.position,
            method:'GET',
            encoding:true,
            encodingType:true
        }).then((res)=>{
            let data = res.data;
            console.log(data,'111111返回结果');
            
            resolve(data);
        }); 
    }); 
}; 

/**
 * 地址解析
 * @param {Object} data  定位信息
 */
export const geocoder = (data)=> {
    let getData = {...data};
    return new Promise((resolve) => {
        jmAjax({
            url:api.geocoder,
            method:'GET',
            data:{
                latitude:getData.latitude,
                longitude:getData.longitude,
            }
        }).then((res)=>{
            let result = res.data;
            getData.address = result.location;
            resolve(getData);
        });
    });
};




/**
 * 设备完整信息已经解析完地址的
 */
export const devicePosition = async(lastPoint={},lastAddress)=> {
    let deviceInfo = await getDevicePosition();
    let info = '';
    if(deviceInfo.latitude){
        if(lastPoint.latitude){
            let distance = gps.distance(lastPoint.latitude,lastPoint.longitude,deviceInfo.latitude,deviceInfo.longitude);
            if(distance>10){
                info = await geocoder(deviceInfo);
                let baidu = gps.GPSToBaidu(info.latitude,info.longitude);
                info.latitude = baidu.lat;
                info.longitude = baidu.lng;
            }else {
                deviceInfo.address = lastAddress;
                info = deviceInfo;
            }
        }else{
            info = await geocoder(deviceInfo);
            let baidu = gps.GPSToBaidu(info.latitude,info.longitude);
            info.latitude = baidu.lat;
            info.longitude = baidu.lng;
        } 
    }else {
        Toast.message('请先激活设备');
        return;
    }

    return info;
};

/**
 * 计算距离
 */
export const distance = (distance,type)=>{
    if(type){
        return distance>1000 ? (distance/1000).toFixed(2)+'km':distance+'m';
    }

    if(distance>1){
        return distance>1000 ? (distance/1000).toFixed(2)+'km':distance.toFixed(2)+'m';
    }


    return 0+'m';
};


