## Applet.getSmallAppPath()
获取小程序位置

### Demo

```
Applet.getSmallAppPath().then((res)=>{
	//成功回调
}).catch(()=>{
	//失败回调
});

```

### 成功参数
Object res

属性 | 类型  | 说明 | 最低版本
-|-|-|-
filePath  | String | 小程序位置路径 |无 



## Applet.createFolder(String url)
创建文件夹

### 参数
### String url
创建文件夹的路径

### Demo

```
//先获取小程序位置
Applet.getSmallAppPath().then((res)=>{
	let url = res.filePath+'/test/'; //拼接地址
	Applet.createFolder(url).then((res)=>{
		//成功回调
	}).catch((res)=>{
		//失败回调
	});
}).catch(()=>{
	//失败回调
});

```

## Applet.createTheFolder(String fileName)
当前创建路径已固定无法自定义，只能自定义文件夹名，设计到多级使用/分隔，例如可传 'project/test'

### 参数
### String fileName
指定小程序路径的文件夹名称

### Demo
```
Applet.createTheFolder('test').then((filePath)=>{
		//成功回调
	}).catch((res)=>{
		//失败回调
	});
```


### 成功参数


属性 | 类型  | 说明 | 最低版本
-|-|-|-
filePath  | String | 文件路径 |无 


## Applet.getFileList(String fileName)
获取指定的设备唯一码下的文件夹下的数据

### 参数
### String fileName
指定小程序路径的文件夹名称

### Demo

```
Applet.getFileList('test').then((res)=>{
	//成功回调
	
}).catch((res)=>{
	//失败回调
});

```

### 成功参数
Object res

属性 | 类型  | 说明 | 最低版本
-|-|-|-
filePath  | String | 文件夹路径 |无 
fileList  | Array | 文件数组 |无

## Applet.fileDelete(Array urlArray || String urlArray)
批量删除文件


### 参数
### Array urlArray || String urlArray
可以是文件地址数组[test/xixi.png,test/xixi.png,test/xixi.png],也可以是逗号分隔的字符串,例如'test/xixi.png,test/xixi.png,test/xixi.png'


### Demo

```
Applet.fileDelete(['test/xixi.png','test/hahah.png']).then(()=>{
	//删除成功
	
}).catch((res)=>{
	//删除失败
});

```


## Applet.saveToAlbum(String url)
保存图片到相册

### 参数
### String url
图片位置路径


### Demo

```
Applet.saveToAlbum(['test/xixi.png').then(()=>{
	//保存成功
	
}).catch((res)=>{
	//保存失败
});

```


## Applet.saveVideoToAlbum(String url)
保存视频到相册

### 参数
### String videoUrl
视频位置路径


### Demo

```
Applet.saveVideoToAlbum(['test/xixi.mp4').then(()=>{
	//保存成功
	
}).catch((res)=>{
	//保存失败
});

```


### 文件接口所有失败参数
Object res

属性 | 返回  | 说明 | 最低版本
-|-|-|-
code | -10 | 读写权限未申请 |无 
code | -11	 | 读写权限被拒绝 |无
code | -12 | 无控制权限 |无 
code | -13 | 文件不存在 |无
code | -14 | 文件夹不存在 |无
code | -15 | 路径异常(路径非法或操作不可操作的路径) |无






