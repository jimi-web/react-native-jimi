/*
 * @Descripttion: 公共数据处理，逻辑处理方法出口
 * @version: 1.0.0
 * @Author: liujinyuan
 * @Date: 2019-08-05 17:17:51
 * @LastEditors: liujinyuan
 * @LastEditTime: 2019-09-26 17:05:44
 */
import {Dimensions,Platform} from 'react-native';
import Theme from '../components/themes/index';
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

export const iphoneXHeight = (initHeight)=>{
    return initHeight+Theme.iphoneXBottomDefault;
};

/**
 * 
 * @param {Number} time 时间简化显示处理
 */
export const parseDate = (time) => {
    var delta = Date.now() - time;
    var d = parseInt(delta / 24 / 60 / 60 / 1000);
    if (d < 0) {
        return new Date(time).Format('YYYY-MM-DD');
    }
    if (d > 3) {
        return new Date(time).Format('YYYY-MM-DD');
    } else if (d > 2) {
        return '前天';
    } else if (d > 1) {
        return '昨天';
    } else {
        return '今天';
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

    h = h > 10 ? h : `0${h}`;
    m = m > 10 ? m : `0${m}`;
    s = s > 10 ? s : `0${s}`;
    
    return `${h}:${m}:${s}`;
};
