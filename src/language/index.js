/*
 * @Descripttion: 语言国际化处理中心
 * @version: 1.0.0
 * @Author: liujinyuan
 * @Date: 2019-08-05 17:20:04
 * @LastEditors: liujinyuan
 * @LastEditTime: 2020-06-17 17:17:58
 */
import Chinese from './Chinese';
import English from './English';
import I18n from 'i18n-js';

I18n.fallbacks = true;

I18n.setLanguage = (locale,obj)=>{
    I18n.translations = {
        'zh-Hans':Object.assign(Chinese,obj && obj.cn),
        'en':Object.assign(English,obj && obj.en)
    };
    I18n.locale = locale;
};
I18n.insInternation = (text) => {
    if(text === '' || text === undefined){
        return '';
    }
    return I18n.t(text)
}

export default I18n;