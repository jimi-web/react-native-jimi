/*
 * @Description: 
 * @Version: 
 * @Autor: xieruizhi
 * @Date: 2020-06-17 18:20:18
 * @LastEditors: xieruizhi
 * @LastEditTime: 2020-06-18 15:16:46
 */ 

import {httpApp} from './basic';
import {Toast} from '../components/index';
import I18n from '../language/index';
class authorization {
    /**
     * 获取授权信息
     */
    prospectus = (params)=>{
        return new Promise((resolve) => {
            httpApp('jm_oauth.prospectus',{
                appKey:params.appKey,
                onSuccess:(res)=>{
                    if(res.code == 0){
                        resolve(res.data);
                    }else{
                        Toast.message(res.message);
                    }
                },
                onFail:(err)=>{
                    Toast.message(err.message);
                }
            });
        });
    }

    /**
     * 请求授权认证（弹框）
     */
    obtainPermission = (params)=>{
        return new Promise((resolve) => {
            httpApp('jm_oauth.obtainPermission',{
                appKey:params.appKey,
                scope:params.scope,
                onSuccess:(res)=>{
                    if (res && res.isPermission && parseInt(res.isPermission) == 1) { 
                        resolve(true);
                    }else{
                        Toast.message(I18n.t('不授权将无法正确使用小程序'));
                    }
                },
                onFail:(err)=>{
                    Toast.message(err.message);
                }
            });
        });
    }

    /**
     * 获取code码
     */
    getAuthorizeCode = (params)=> {
        return new Promise((resolve) => {
            let obj = {
                ...params,
                onSuccess:(res)=>{
                    resolve(res);
                },
                onFail:(err)=>{
                    Toast.message(err.message);
                }
            }
            httpApp('jm_oauth.getAuthorizeCode',obj);  
        });   
    }

    authorizationProcess = async (params)=>{
        let prospectus = await this.prospectus(params);
        if(prospectus){
            let auth =  prospectus.split(',');
            if(auth.includes(params.scope)){ //有授权获取code码
                let getAuthorizeCode = await this.getAuthorizeCode(params);
                params.callBack && params.callBack(getAuthorizeCode);
            }else{  //无授权先请求授权弹框再获取code码
                let obtainPermission = await this.obtainPermission(params);
                if(obtainPermission){
                    let getAuthorizeCode = await this.getAuthorizeCode(params);
                    params.callBack && params.callBack(getAuthorizeCode);
                }
            } 
        }else{
            let obtainPermission = await this.obtainPermission(params);
            if(obtainPermission){
                let getAuthorizeCode = await this.getAuthorizeCode(params);
                params.callBack && params.callBack(getAuthorizeCode);
            }
        }
    }
}


const authorizationProcess = new authorization().authorizationProcess;
export {authorizationProcess};