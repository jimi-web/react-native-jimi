## Applet.httpClose()
退出小程序

## Applet.httpExit(Function callback)
监听关闭小程序的按钮

### 参数
### Function callback
关闭小程序按钮回调操作


### Demo 

```
Applet.httpExit(()=>{
	//关闭小程序之前做的操作，做完之后手动退出小程序
	Applet.httpClose()；
});

```