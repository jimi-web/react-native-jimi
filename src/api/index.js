/*
 * @Descripttion: 
 * @version: 
 * @Author: xieruizhi
 * @Date: 2019-09-06 15:42:52
 * @LastEditors  : liujinyuan
 * @LastEditTime : 2019-12-28 16:39:28
 */

//后台地址
const serverUrl = { 
    position:'/locator/device/info',//定位
    track:'/proxy/module/paas/track',//轨迹
    geocoder:'/proxy/module/paas/geocoder',//追踪
    shareToken:'/share/token',//分享
    fenceList:'/fence/list',
    fenceDel:'/fence/delete',
    fenceSave:'/fence/save',
    getFence:'/fence/getFence/',

    recordList:'/record/module/file/page',//获取录音列表
    instruction:'/proxy/module/instruction/sendInstruct',//发送指令
    deleteRecord:'/record/module/file',//删除录音
};



/**
 * 修改服务器地址
 * @param {String} url 服务器地址
 */
const api  = {
    server:'http://apis.jimimax.com',//xieruizhi测试环境
    // server:'http://10.0.17.227:3000',//liujinyuan测试环境
    /**
     * 
     * @param {Object} api 添加一个地址
     */
    setApi:function(api){
        Object.assign(this,api);
    },
    /**
     * 
     * @param {String} url 服务器路径
     */
    setServer:function(url){
        const newApi = {};
        this.server = url || this.server;
        for (const key in serverUrl) {
            if (Object.prototype.hasOwnProperty.call(serverUrl,key)) {
                const item = this.server + serverUrl[key];
                newApi[key] = item;
            }
        }
        Object.assign(this,newApi);
    }
};
const share = {
    shareUrl:'http://10.0.16.126:8080',
};
api.setApi(share);
api.setServer();
export default api;
