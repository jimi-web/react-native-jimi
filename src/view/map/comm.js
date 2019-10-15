/*
 * @Descripttion: 
 * @version: 
 * @Author: xieruizhi
 * @Date: 2019-10-10 10:52:06
 * @LastEditors: xieruizhi
 * @LastEditTime: 2019-10-14 15:38:04
 */
import {jmAjax} from '../../http/business';
import gps from '../../libs/coversionPoint';
import api from '../../api/index';

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
            resolve(res.data);
        }); 
    }); 
}; 

/**
 * 地址解析
 * @param {Object} data  定位信息
 */
export const geocoder = (data)=> {
    return new Promise((resolve) => {
        jmAjax({
            url:api.geocoder,
            method:'GET',
            data:{
                latitude:data.latitude,
                longitude:data.longitude,
            }
        }).then((res)=>{
            let result = res.data;
            data.address = result.location;
            resolve(data);
        });
    });
};

/**
 * 设备完整信息已经解析完地址的
 */
export const devicePosition = async(lastPoint,lastAddress)=> {
    let deviceInfo = await getDevicePosition();
    let address = '';
    if(lastPoint.latitude){
        let distance = gps.distance(lastPoint.latitude,lastPoint.longitude,deviceInfo.latitude,deviceInfo.longitude);
        if(distance>10){
            address = await geocoder(deviceInfo);
        }else {
            deviceInfo.address = lastAddress;
            address = deviceInfo;
        }
    }else{
        address = await geocoder(deviceInfo);
    } 
    return address;
};


