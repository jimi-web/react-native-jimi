/*
 * @Descripttion: 
 * @version: 
 * @Author: xieruizhi
 * @Date: 2019-09-06 15:42:52
 * @LastEditors: liujinyuan
 * @LastEditTime: 2019-09-25 09:26:37
 */

const dev = 0;
const server = dev?'http://10.0.16.126:3000':'http://10.0.17.227:3000';


export const map = {
    position:server + '/proxy/module/paas/device/info',
    track:server + '/proxy/module/paas/track',
    geocoder:server + '/proxy/module/paas/geocoder',
};


export const recordApi = {
    recordList:server + '/record/module/file/page',//获取录音列表
    instruction:server + '/proxy/module/instruction',//发送指令
    deleteRecord:server + '/record/module/file',//发送指令
};



