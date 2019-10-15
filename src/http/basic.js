/*
 * @Descripttion: 与几米圈app基础通讯服务，对接基本api，不涉及数据转换，逻辑处理，除业务模块外，不建议任何页面调用
 * @version: 1.0.0
 * @Author: liujinyuan
 * @Date: 2019-08-05 17:08:05
 * @LastEditors: xieruizhi
 * @LastEditTime: 2019-10-14 14:03:26
 */

import {
    NativeModules,
    NativeEventEmitter
} from 'react-native';
// 初始化几米圈方法
const {
    JMRNEngineManager
} = NativeModules;
const jmRNEngineManagerListener = new NativeEventEmitter(JMRNEngineManager);


//基础事件回调
jmRNEngineManagerListener.addListener(JMRNEngineManager.kRNSendJSEventMethod, (reminder) => {
    let obj = JSON.parse(reminder);
    let methods = obj.callback.split('.');
    //蓝牙特殊处理回调
    if (methods[0] === 'jmDeviceBlueCallback') {
        methods[1] = 'onCallBack';
    }

    try {
        this[methods[0]][methods[1]](obj.data);
    } catch (error) {
        console.log(error);
    }
});

//实时视频状态监听事件
jmRNEngineManagerListener.addListener(JMRNEngineManager.kRNSendJSCameraState, (reminder) => {
    let obj = getObject(reminder);
    this[obj.callback](obj.data);
});


//实时视频信息监听事件
jmRNEngineManagerListener.addListener(JMRNEngineManager.kRNSendJSCameraInfo, (reminder) => {
    let obj = getObject(reminder);
    this[obj.callback](obj.data);
});

/**
 * 区分ios和安卓返回的数据转为对象
 * @param  {object} data 需要被转换的字符串
 */
export const getObject = (data)=> {
    if(!data){
        return null;
    }
    var obj = typeof data === 'string'?JSON.parse(data):data;
    return obj;
};

export const guids = () => {
    const S4 = () => {
        return ((1 + Math.random()) * 0x10000 | 0).toString(16).substring(1);
    };
    return (
        S4() +
        S4() +
        '-' +
        S4() +
        '-' +
        S4() +
        '-' +
        S4() +
        '-' +
        S4()
    );
};

/**
 * 请求APP统一方法
 * @param {String} url 请求方法名字
 * @param {Object} params 传参
 */
export const httpApp = (url, params) => {
    // console.log(params);
    
    // 生成回调的名称，同一页面不能出现两个相同的回调名，因此回调名采用uuid
    const callbackName = guids();

    // 生成回调的名称，同一页面不能出现两个相同的回调名，因此回调名采用Symbol
    // const callbackName = Symbol().toString();
    //请求成功、请求失败、请求完成、上传进度变化、上传中、上传完成
    const funName = ['onSuccess', 'onFail', 'onComplete', 'onProgressUpdate', 'onStatue', 'onDone', 'onWillClosePage'];

    let obj = {};
    //判断是否方法类型，是则变成字符串
    for (let key in params) {
        if (typeof params[key] == 'function') {
            obj[key] = `${callbackName}.` + key;
        } else {
            obj[key] = params[key];
        }
    }

    const bodyJson = JSON.stringify(obj);
    if(url === 'jm_media_playAudio'){
        // console.log(url,bodyJson);
    }
    console.log(bodyJson,'给app传数据');
    JMRNEngineManager.requestMethod(url, bodyJson);

    // 定义回调
    let callName = {};
    for (let i = 0; i < funName.length; i++) {
        Object.assign(callName, {
            [funName[i]]: (res) => {
                let data = '';
                if(funName[i]!='onFail'){
                    data = getObject(res);
                }
                console.log(data,'app给小程序传数据');
                params[funName[i]](data);
            }
        });
    }
    this[callbackName] = callName;
};

/**
 * 特殊接口获取参数方法(未测试)
 * @param {String} url 请求地址
 * @param {Object} params 传参
 */
const getParams = (url, params) => {
    const body = {
        command: url,
    };
    if (params.data) {
        body.data = params.data;
    }
    return body;
};

/**
 * 其他特殊的接口的通用方法，比如wifi，蓝牙等等(未测试)
 * @param {String} url 请求地址
 * @param {Object} params 传参
 */
const otherInterface = (url, params) => {
    const body = getParams(url, params);
    const bodyJson = JSON.stringify(body);
    JMRNEngineManager.requestMethod(params.url, bodyJson);
    this[params.name] = (res) => {
        let obj = getObject(res);
        params.callback && params.callback(obj);
    };
};


/**
 * 蓝牙请求方法(未测试)
 * @param {String} url 请求地址
 * @param {Object} params 传参
 */
export const httpBlue = (url, params) => {
    let data = {
        ...params
    };
    data.url = 'jm_dev_blue.command';
    data.name = 'jmDeviceBlueCallback';
    otherInterface(url, params);
};

/**
 * wifi请求方法(未测试)
 * @param {String} url 请求地址
 * @param {Object} params 传参
 */
export const httpWifi = (url, params) => {
    let data = {
        ...params
    };
    data.url = 'jm_dev_wifi.command';
    data.name = 'jmDeviceWifiCallback';
    otherInterface(url, params);
};

/**
 * webSocket请求方法(未测试)
 * @param {String} url 请求地址
 * @param {Object} params 传参
 */
export const httpWs = (url, params) => {
    let data = {
        ...params
    };
    data.url = 'jm_webSocket.command';
    data.name = 'jmWebSocketCallback';
    otherInterface(url, params);
};


/**
 * 实时视频状态回调
 * @param {String} url 请求地址
 * @param {Object} params 传参
 */
export const httpCameraState = (url, params) => {
    let data = {
        ...params
    };
    data.url = 'jm_player.command';
    data.name = 'getCameraState';
    otherInterface(url, params);
};

/**
 * 实时视频信息回调
 * @param {String} url 请求地址
 * @param {Object} params 传参
 */
export const httpCameraInfo = (url, params) => {
    let data = {
        ...params
    };
    data.url = 'jm_player.command';
    data.name = 'getCameraInfo';
    otherInterface(url, params);
};


/**
 * 关闭小程序
 */
export const httpClose = () => {
    JMRNEngineManager.goExit();
};
