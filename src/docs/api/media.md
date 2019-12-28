
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
Object.res

属性 | 类型  | 说明 | 最低版本
-|-|-|-
videoPath | String | 视频路径 |无 
videoFirstImagePath | String | 首帧图片保存的路径，“YYYY-MM-dd-HH-mm-ss”格式的png |无


## Applet.saveVideoToAlbum(String videoUrl)
保存视频到相册

### 参数
### String videoUrl
视频路径


### Demo

```
Applet.saveVideoToAlbum('test/xixi.mp4').then(()=>{
	//保存成功
	
}).catch((res)=>{
	//保存失败
});

```

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
Array.res

属性 | 类型  | 说明 | 最低版本
-|-|-|-
videoPath | String | 视频路径 |无 
videoTime | String | 视频时长 |无


