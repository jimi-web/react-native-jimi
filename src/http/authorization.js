
import {httpApp} from './basic';
import {Toast} from '../components/index';

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
                onFail:()=>{
                    Toast.message('内部服务器异常');
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
                        Toast.message('不授权将无法正确使用小程序！');
                    }
                },
                onFail:()=>{
                    Toast.message('内部服务器异常');
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
                onFail:(res)=>{
                    Toast.message('内部服务器异常');
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