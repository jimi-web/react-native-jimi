/*
 * @Descripttion: 公共数据处理，逻辑处理方法出口
 * @version: 1.0.0
 * @Author: liujinyuan
 * @Date: 2019-08-05 17:17:51
 * @LastEditors: xieruizhi
 * @LastEditTime: 2019-09-20 15:44:36
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