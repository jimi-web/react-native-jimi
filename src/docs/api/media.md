
## Applet.getVideoFirstImage(String videoPaths)
获取视频第一帧,仅ios需要


### 参数
### String videoPaths
视频路径，多个用","拼接，比如"123.pm4,456.mp4"


### Demo 

```
Applet.getVideoFirstImage('test/video.mp4').then((res)=>{
	//成功回调
}).catch((res)=>{
	//失败回调
});

```

### 成功参数
Object res

属性 | 类型  | 说明 | 最低版本
-|-|-|-
videoPath | String | 视频路径 |无 
videoFirstImagePath | String | 首帧图片保存的路径，“YYYY-MM-dd-HH-mm-ss”格式的png |无


## Applet.getVideoTime(String videoPaths)
获取视频时长

### 参数
### String videoPaths
视频路径，多个用","拼接，比如"123.pm4,456.mp4"

### Demo

```
Applet.getVideoTime('test/xixi.mp4，test/hahahaha.mp4').then((res)=>{
	//保存成功
	
}).catch((res)=>{
	//保存失败
});

```

### 成功参数
Object res

属性 | 类型  | 说明 | 最低版本
-|-|-|-
videoPath | String | 视频路径 |无 
videoTime | String | 视频时长 |无




## Applet.playAudio(String url)
播放音频

### 参数
### String url
音频路径

### Demo

```
Applet.playAudio('test/xixi.mp4').then((res)=>{
	//播放成功
	
}).catch((res)=>{
	//播放失败
});

```



## Applet.stopAudio(String url)
暂停音频

### 参数
### String url
音频路径

### Demo

```
Applet.stopAudio('test/xixi.mp4').then((res)=>{
	//暂停成功
	
}).catch((res)=>{
	//暂停失败
});

```


## Applet.changeSreenDirection(String orientation)
改变屏幕方向

### 参数
### String orientation
landscapeRight:右横向，landscapeLeft:左横向；portrait:竖屏

### Demo

```
Applet.changeSreenDirection('landscapeRight').then((res)=>{
	//成功
	
}).catch((res)=>{
	//失败
});

```





