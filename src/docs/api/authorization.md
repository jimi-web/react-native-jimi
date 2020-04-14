## Applet.authorizationProcess(Object params)
监听关闭小程序的按钮

### 参数
### Object params
属性 | 类型  | 必填 | 说明 | 最低版本
-|-|-|-
appKey | String | true |小程序AppKey(开放平台获取) |无 
responseType | String| true | 响应类型，默认写code |无
scope | String | true | 应用授权作用域 |无
state | String | false | 状态信息，原样返回 |无
callBack | Function | false| 回调得到res，参数查看以下说明 |无

### Demo 

```
    Applet.authorizationProcess({
            appKey:'',
            responseType:'code',
            scope:'auth_oauth2_account',
            state:'1',
            callBack:(res)=>{
               console.log(res);
            }
    })

```


### 参数callBack的回调
Object.res

属性 | 类型  | 说明 | 最低版本
-|-|-|-
code | String | 验证身份码，一般用code去获取openId |无 
state | - | 自定义状态信息 |无 