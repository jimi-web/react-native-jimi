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
    console.log(deviceInfo,'deviceInfo111111');
    console.log(lastPoint,'是否存在');
    let address = '';
    if(lastPoint.latitude){
        console.log('出来');
        let distance = gps.distance(lastPoint.latitude,lastPoint.longitude,deviceInfo.latitude,deviceInfo.longitude);
        if(distance>10){
            address = await geocoder(deviceInfo);
        }else {
            deviceInfo.address = lastAddress;
            address = deviceInfo;
        }
    }else{
        console.log('进入');
        
        address = await geocoder(deviceInfo);
    } 
    return address;
};


