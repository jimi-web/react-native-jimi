/*
 * @Descripttion: 组件统一样式，集成组件样式由此分发方便进行修改
 * @version: 
 * @Author: liujinyuan
 * @Date: 2019-08-08 15:05:25
 * @LastEditors: xieruizhi
 * @LastEditTime: 2019-08-12 10:14:41
 */
import themeDefault from './themeDefault';

const Theme = {
    /**
     * 
     * @param {Object} Theme 重新设置样式表
     */
    set:function(Theme){
        Object.assign(this,Theme);
    }
};

Theme.set(themeDefault);

module.exports = Theme;