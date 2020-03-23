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
    queryDeviceVideoPicFile: '/videopic/module/queryDeviceVideoPicFile',//获取视频和照片数据
    deleteDeviceVideoPicFile:'/videopic/module/deleteDeviceVideoPicFile',//删除视频和照片
    encodeUserInfo:'/sim/encodeUserInfo',//获取加密流量卡加密信息
    updateDeviceName:'/locator/updateDeviceName',//修改名称
    updateDeviceInfo:'/locator/updateDeviceInfo',//修改图标
    initLocatorInfo:'/locator/initLocatorInfo',//查询设备详情
    instructList:'/proxy/module/instruction/instructList',//获取指令列表
    userInit:'/locator/alarm/setting/init',//用户初始化
    alarmList:'/locator/alarm/setting/list',//报警列表
    enableState:'/locator/alarm/setting/enableState',//修改报警状态
    alarmMode:'/locator/alarm/setting/mode',//获取报警方式的设置信息
    setAlarmState:'/locator/alarm/setting/state'//设置报警方式状
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
        Object.assign(serverUrl,api);
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
