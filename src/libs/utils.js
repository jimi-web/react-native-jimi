/*
 * @Descripttion: 公共数据处理，逻辑处理方法出口
 * @version: 1.0.0
 * @Author: liujinyuan
 * @Date: 2019-08-05 17:17:51
 * @LastEditors: liujinyuan
 * @LastEditTime: 2019-08-13 17:29:46
 */

/**
 * 区分ios和安卓返回的数据转为对象
 * @param  {object} data 需要被转换的字符串
 */
export const getObject = (data)=> {
    if(!data){
        return null;
    }
    var obj = typeof data === 'string'?obj = JSON.parse(data):data;
    return obj;
};