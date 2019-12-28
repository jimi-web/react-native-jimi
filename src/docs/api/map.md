
## Applet.httpLocationGet(String type)
获取当前手机位置

### 参数
### String type
定位数据类型，WGS84、BD09、GCJ02、GCJ02_BD09，若权限未从未申请，App会自动请求权限，其他异常返回错误码

### Demo 

```
Applet.httpLocationGet('WGS84').then((res)=>{
	//成功回调
}).catch((res)=>{
	//失败回调
});

```
### 成功参数
Object.res

属性 | 类型  | 说明 | 最低版本
-|-|-|-
lat | String | 经度 |无 
lng | String | 纬度 |无

### 失败参数
Object.res

属性 | 返回  | 说明 | 最低版本
-|-|-|-
code | -200 | gps未打开 |无 
code | -201 | 权限未申请(此接口一般不会有) |无
code | -202 | 权限已关闭(被拒绝) |无 
code | -203 | 无控制权限(应用受限) |无
code | -204 | 定位失败 |无