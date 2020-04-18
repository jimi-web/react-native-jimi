## Applet.httpApp(Sring methodName,Object params)
app基础接口的交互方式

### 参数
#### Sring methodName
app接口名称

#### Object params
app接口参数

### Demo
```
//获取小程序位置
Applet.httpApp('jm_file.getSmallAppPath',{
    onSuccess:(res)=>{
        //成功回调
    },
    onFail:()=>{
        //失败回调
    },
    onComplete:()=>{
        //完成回调
    }
});

```

## Applet.request(Object params)
发起 HTTPS 网络请求
### 参数
### Object params

属性 | 类型 |  默认值  | 必填 | 说明 | 最低版本
-|-|-|-|-|-
url | String | 无 |是 | 开发者服务器接口地址 | 无
header | Number && Object  | { <br>　'Accept': 'application/json',<br>　'Content-Type': 'application/json',<br>} |否 | 设置请求的 header，目前只支持application/x-www-form-urlencoded、application/json、multipart/form-data，当为application/json格式时，App内部以Json形式<br> 传0为application/x-www-form-urlencoded| 无
method | String | GET |否 | HTTP 请求方法 | 无
data | Object | 无 |否 | 请求的参数 | 无

### Demo

```
Applet.request({
	url:'http://172.16.0.106:7888/locator/device/info',
	method:'GET',
}).then((res)=>{
	//成功回调
}).catch((res)=>{
	//失败回调
});

```


## Applet.jmAjax(Object params)【包含设备唯一码和设备唯一码类型】
发起 HTTPS 网络请求
### 参数
### Object params

属性 | 类型 |  默认值  | 必填 | 说明 | 最低版本
-|-|-|-|-|-
url | String | 无 |是 | 开发者服务器接口地址 | 无
header | Number && Object  | { <br>　'Accept': 'application/json',<br>　'Content-Type': 'application/json',<br>} |否 | 设置请求的 header，目前只支持application/x-www-form-urlencoded、application/json、multipart/form-data，当为application/json格式时，App内部以Json形式<br> 传0为application/x-www-form-urlencoded| 无
method | String | GET |否 | HTTP 请求方法 | 无
data | Object | 无 |否 | 请求的参数 | 无
encoding | Boolean | false |否 | 是否添加设备唯一码 | 无
encodingType | Boolean | false |否 | 是否添加设备唯一码类型 | 无

### Demo

```
Applet.jmAjax({
	url:'http://172.16.0.106:7888/locator/device/info',
	method:'GET',
	encoding:true,
	encodingType:true
}).then((res)=>{
	//成功回调
}).catch((res)=>{
	//失败回调
});

```


