/*
 * @Descripttion: 
 * @version: 
 * @Author: xieruizhi
 * @Date: 2019-10-10 10:52:06
 * @LastEditors: xieruizhi
 * @LastEditTime: 2020-06-12 17:23:12
 */
import {jmAjax} from '../../http/business';
import gps from '../../libs/coversionPoint';
import api from '../../api/index';

/**
 * 获取设备定位信息
 */
export const getDevicePosition = (error)=> {
   console.log('执行') 
    return new Promise((resolve,reject) => {
        jmAjax({
            url:api.position,
            method:'GET',
            encoding:true,
            encodingType:true,
            error:error
        }).then((res)=>{
            console.log(res,'定位的数据')
            let data = res.data;
            resolve(data);
        }).catch((res)=>{
            reject(res);
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
export const devicePosition = async(lastPoint={},lastAddress,userMapType,error)=> {
    let deviceInfo = await getDevicePosition(error);
    deviceInfo.gpsLatitude = deviceInfo.latitude;
    deviceInfo.gpsLongitude = deviceInfo.longitude;
    let info = '';
    if(deviceInfo.latitude){
        if(lastPoint.latitude){
            let distance = gps.distance(lastPoint.latitude,lastPoint.longitude,deviceInfo.latitude,deviceInfo.longitude);
            if(distance>10){
                info = await geocoder(deviceInfo);
                let baidu = userMapType? gps.GPSToChina(info.latitude,info.longitude) :gps.GPSToBaidu(info.latitude,info.longitude);
                info.latitude = baidu.lat;
                info.longitude = baidu.lng;
            }else {
                deviceInfo.address = lastAddress;
                info = deviceInfo;
            }
        }else{
            info = await geocoder(deviceInfo);
            let baidu = userMapType? gps.GPSToChina(info.latitude,info.longitude) :gps.GPSToBaidu(info.latitude,info.longitude);
            info.latitude = baidu.lat;
            info.longitude = baidu.lng;
        } 
    }else {
        info = deviceInfo;
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


/**
 * 计算设备估计总里程
 */
export const  countTotalTrack = (track = []) => {
    let totalMileage = 0;
    for (let i = 0; i < track.length; i++) {
        const item = track[i];
        if(i > 0){
            const itemSuper = track[i - 1];
            totalMileage += gps.distance(item.latitude,item.longitude,itemSuper.latitude,itemSuper.longitude);
        }
    }
   
    return totalMileage;
};

