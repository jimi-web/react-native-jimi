/*
 * @Descripttion: 公共数据处理，逻辑处理方法出口
 * @version: 1.0.0
 * @Author: liujinyuan
 * @Date: 2019-08-05 17:17:51
 * @LastEditors: liujinyuan
 * @LastEditTime: 2020-03-12 17:38:42
 */
import {Dimensions,Platform} from 'react-native';
import Theme from '../components/themes/index';
import md5 from './md5';
/**
 * 兼容ios
 */
export const isIphoneX =()=> {
    const screenWidth = Dimensions.get('window').width;
    const screenHeight = Dimensions.get('window').height;

    // iPhoneX
    const X_WIDTH = 375;
    const X_HEIGHT = 812;
    return (
        Platform.OS === 'ios' &&
        (screenHeight === X_HEIGHT && screenWidth === X_WIDTH ||
            screenHeight === X_WIDTH && screenWidth === X_HEIGHT)
    );  
};

export const iphoneXHeight = (initHeight = 0)=>{
    return initHeight+Theme.iphoneXBottomDefault;
};

/**
 * 
 * @param {Number} time 时间简化显示处理
 */
export const parseDate = (time) => {
    var dZero = new Date(new Date().toLocaleDateString()).getTime();
    var d = 24 * 60 * 60 * 1000;
    if (time > dZero) {
        return '今天';
    } else if (time > dZero - d) {
        return '昨天';
    } else if (time > dZero - d * 2) {
        return '前天';
    } else {
        return new Date(time).Format('YYYY-MM-DD');
    }
};

/**
 * 
 * @param {Number} time 时间
 */
export const parseTime = (time) => {
    var h = parseInt(time / 60 / 60);
    var m = parseInt(time / 60) % 60;
    var s = time % 60;

    h = h > 9 ? h : `0${h}`;
    m = m > 9 ? m : `0${m}`;
    s = s > 9 ? s : `0${s}`;
    
    return `${h}:${m}:${s}`;
};


/**
 * 
 * @param {object} MIFIParams 需要进行加密的参数
 */
export const sginMd5 = (secret,MIFIParams) => {
    let key = [];
    for(let item in MIFIParams){
        key.push(item);
    }
    key.sort();
    //拼接字符串 result = imei123456sign123456；
    let result = '';
    key.forEach(function (value) {
        result += value + MIFIParams[value];
    });

    //md5加密
    let data = md5(secret + result + secret);
    //转16进制并且转大写
    data = data.toString(16).toUpperCase();
    return data;
};


/**
     * 日期转换
     */
dateConversion = (day)=>{
    let param = new Date(day.replace(/-/g,'/'));
    let date = new Date();
    var today = new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime();
    var yestday = new Date(today - 24*3600*1000).getTime();
    let week = ['周日','周一','周二','周三','周四','周五','周六'];
    if(today === param.getTime()){
        return '今天';
    }
    if(yestday === param.getTime()){
        return '昨天';
    }
    let sundayTime =  new Date(today - date.getDay()*24*3600*1000).getTime(); 
    if(param.getTime()>=sundayTime){
        return week[param.getDay()];
    }
    return day;
};


// /**
//  * 
//  * @param {object} MIFIParams 需要进行加密的参数
//  */
// export const sginMd5 = (secret,MIFIParams) => {
//     let key = [];
//     for(let item in MIFIParams){
//         key.push(item);
//     }
//     key.sort((a,b) => {
//         return  a.charCodeAt() - b.charCodeAt();
//     });
//     console.log(key,111);
//     //拼接字符串 result = imei123456sign123456；
//     let result = '';
//     key.forEach(function (value) {
//         result += value + MIFIParams[value];
//     });
//     //md5加密
//     let data = secret + result;
//     //转16进制并且转大写
//     return data;
// };