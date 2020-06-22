/*
 * @Descripttion: 语言国际化处理中心
 * @version: 1.0.0
 * @Author: liujinyuan
 * @Date: 2019-08-05 17:20:04
 * @LastEditors: liujinyuan
 * @LastEditTime: 2020-06-22 15:34:42
 */
import Chinese from './Chinese';
import English from './English';
import I18n from 'i18n-js';

let isInternationalization = false;//是否开启国际化

I18n.fallbacks = true;

I18n.setLanguage = (locale,obj)=>{
    isInternationalization = true;//当该函数被调用，说明此小程序设置了国际化内容
    I18n.translations = {
        'zh-Hans':Object.assign(Chinese,obj && obj.cn),
        'en':Object.assign(English,obj && obj.en)
    };
    I18n.locale = locale?locale:'zh-Hans';
};

/**
 * 国际化公用方法
 * @param {text} key
 */
const fn = I18n.t;
I18n.t = (key) => {
    console.log(key,'国际化',isInternationalization)
    if(!isInternationalization){
        return key;
    }
    if(key === '' || key === undefined){
        return '';
    }
    return fn(key)
}

export default I18n;