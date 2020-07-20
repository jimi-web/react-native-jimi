/*
 * @Descripttion: 
 * @version: 
 * @Author: xieruizhi
 * @Date: 2019-09-06 15:42:52
 * @LastEditors: xieruizhi
<<<<<<< HEAD
 * @LastEditTime: 2020-07-16 16:56:59
=======
 * @LastEditTime: 2020-07-07 10:44:26
>>>>>>> d0ec6cce4bda8c6c63736d619b74440f92df8904
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
    instructionRecord:'/proxy/module/instruction/record',//获取指令最新信息
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
    setAlarmState:'/locator/alarm/setting/state',//设置报警方式状
    getIotCardUrl:'/sim/getIotCardUrl',//获取加密流量卡加密信息
};



/**
 * 修改服务器地址
 * @param {String} url 服务器地址
 */
const api  = {
    // flowUrl:'http://appsat.jimisim.com/sim-web-app/app/tqIndex?userinfo=',//测试环境
    flowUrl:'http://app.jimisim.com/app/tqIndex?userinfo=',//正式环境
    server:'http://apis.jimimax.com',//xieruizhi测试环境
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
    shareUrl:'http://apis.jimimax.com',
};
api.setApi(share);
api.setServer();
export default api;
