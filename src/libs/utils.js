/*
 * @Descripttion: 公共数据处理，逻辑处理方法出口
 * @version: 1.0.0
 * @Author: liujinyuan
 * @Date: 2019-08-05 17:17:51
 * @LastEditors: xieruizhi
 * @LastEditTime: 2019-08-09 10:24:53
 */

/**
 * 区分ios和安卓返回的数据转为对象
 * @param  {object} data 需要被转换的字符串
 */
export const getObject = (data)=> {
    var obj = '';
    if (typeof data === 'string') {
        obj = JSON.parse(data);
    } else {
        obj = data;
    }
    return obj;
};