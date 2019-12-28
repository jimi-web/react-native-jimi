
### 权限统一参数
属性 | 类型 |  默认值  | 必填 | 说明 | 最低版本
-|-|-|-|-|-
ask | Number | null | true | 0：查询<br/>1：申请<br/>2：跳转到设置 | 无

## Applet.getMicrophone()
获取设备麦克风权限

### DATA
成功回到

字段 | 类型  | 说明 | 最低版本
-|-|-|-
code | Number | 0：'成功'<br/>-220:未申请<br/>-221：权限已关闭<br/>-222：无控制权限 | 无 

### Demo 
```
Applet.getMicrophone(0).then((res)=>{
	//成功回调
}).catch((res)=>{
	//失败回调
});

```



