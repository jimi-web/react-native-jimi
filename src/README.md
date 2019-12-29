<!--
 * @Descripttion: 
 * @version: 
 * @Author: liujinyuan
 * @Date: 2019-08-26 16:48:01
 * @LastEditors  : xieruizhi
 * @LastEditTime : 2019-12-29 15:16:37
 -->
# 几米圈标准小程序

## 描述
```
此项目为几米圈对几米小程序业务封装的标准化组件，其中包括定位，轨迹，追踪，录音，围栏等。
组件中包括业务功能和几米圈标准化接口，只适用于所有几米圈小程序开发者。
使用此组件能够实现快速开发，集成，迅速构建出一个具有功能性的小程序。
```

## 安装
```
1. npm install react-native-jimi --save

2. yarn add react-native-jimi
```



## 模块依赖
```bash
# 请安装模块依赖
1. "react": "16.6.3",
2. "react-native": "0.58.6"
3. "teaset": "^0.7.0"
4. "react-native-maps": "0.24.0"
5. "react-native-baidu-map-jm": "1.2.0"
6. "react-native-shadow": "1.2.2",
7. "react-native-svg": "9.3.7",
8. "react-navigation": "3.6.1",
9. "react-native-fs": "2.13.3",
10."prop-types": "15.7.2",
11."react-native-gesture-handler": "1.3.0",
12."react-native-photoview-jm": "1.0.22",
13."react-native-video": "5.0.2",
```

## 组件
# 业务组件
[`<Jimi.BaiduPosition />`定位](http://172.16.0.101:3000/jmax/react-native-jimi/src/master/src/docs/view/Position.md)<br>

[`<Jimi.BaiduTrack />`轨迹](http://172.16.0.101:3000/jmax/react-native-jimi/src/master/src/docs/view/Track.md)<br>

[`<Jimi.BaiduTrace />`追踪](http://172.16.0.101:3000/jmax/react-native-jimi/src/master/src/docs/view/Trace.md)<br>

[`<Jimi.BaiduFenceList />`围栏列表](http://172.16.0.101:3000/jmax/react-native-jimi/src/master/src/docs/view/FenceList.md)<br>

[`<Jimi.BaiduAddFence />`添加围栏](http://172.16.0.101:3000/jmax/react-native-jimi/src/master/src/docs/view/AddFence.md)<br>

[`<Jimi.Share />`分享](http://172.16.0.101:3000/jmax/react-native-jimi/src/master/src/docs/view/Share.md)<br>

[`<Jimi.Record />`录音](http://172.16.0.101:3000/jmax/react-native-jimi/src/master/src/docs/view/Record.md)<br>

[`<Jimi.Photo />`相册文件夹](http://172.16.0.101:3000/jmax/react-native-jimi/src/master/src/docs/view/Photo.md)<br>

[`<Jimi.PhotoList />`相册列表](http://172.16.0.101:3000/jmax/react-native-jimi/src/master/src/docs/view/PhotoList.md)<br>

[`<Jimi.PhotoDeatil  />`图片和视频详情](http://172.16.0.101:3000/jmax/react-native-jimi/src/master/src/docs/view/PhotoDeatil.md)<br>

[`<Jimi.Photograph  />`图片](http://172.16.0.101:3000/jmax/react-native-jimi/src/master/src/docs/view/Photograph.md)<br>

[`<Jimi.Video />`视频](http://172.16.0.101:3000/jmax/react-native-jimi/src/master/src/docs/view/Video.md)<br>

[`<Jimi.Video />`RVC(实时视频)](http://172.16.0.101:3000/jmax/react-native-jimi/src/master/src/docs/view/RVC.md)<br>

[`<Jimi.Video />`数据空白](http://172.16.0.101:3000/jmax/react-native-jimi/src/master/src/docs/view/Empty.md)<br>

# 基础组件

[`<Circle.Toast />`提示](http://172.16.0.101:3000/jmax/react-native-jimi/src/master/src/docs/components/Toast.md)<br>

[`<Circle.PullList />`上拉加载下拉刷新](http://172.16.0.101:3000/jmax/react-native-jimi/src/master/src/docs/components/PullList.md)<br>

[`<Circle.Switch />`开关](http://172.16.0.101:3000/jmax/react-native-jimi/src/master/src/docs/components/Switch.md)<br>

[`<Circle.Drawer />`底部抽屉](http://172.16.0.101:3000/jmax/react-native-jimi/src/master/src/docs/components/Drawer.md)<br>

[`<Circle.Wheel />`滚轮](http://172.16.0.101:3000/jmax/react-native-jimi/src/master/src/docs/components/Wheel.md)<br>

[`<Circle.Modal />`弹框](http://172.16.0.101:3000/jmax/react-native-jimi/src/master/src/docs/components/Modal.md)

[`<Circle.Icon />`图标](http://172.16.0.101:3000/jmax/react-native-jimi/src/master/src/docs/components/Icon.md)

[`<Circle.Button />`按钮](http://172.16.0.101:3000/jmax/react-native-jimi/src/master/src/docs/components/Button.md)

[`<Circle.Datepicker />`日历选择器](http://172.16.0.101:3000/jmax/react-native-jimi/src/master/src/docs/components/Datepicker.md)
<br>

## 方法
[`<Api />` 接口](http://172.16.0.101:3000/jmax/react-native-jimi/src/master/src/docs/view/Api.md)<br>




## 日志
###版本:'1.1.6'
1. 分享弹出框新增动画效果

###版本:'1.3.8'
1. 新增Modal组件,将对话框,提示框,输入框等集合在此,以便调用
2. 新增滚轮,底部抽屉,提示,时间选择器,上拉刷新下拉加载,开关,相册,无数据组件
3. button组件新增可传入子元素
4. 追踪业务组件将设备和我的位置轨迹线改为设备运动中的轨迹线
5. 录音选择时间的弹出框改为使用底部抽屉,提示对话框改为已封装的Modal.dialog,wheel已换成自己封装的,新增发送指令加载中的按钮
6. 定位组件新增电量百分比
7. 围栏列表组件提示对话框改为已封装的Modal.dialog
8. 覆盖物组件overlay.js新增show方法,OverlayView.js修改了主体内容样式
9. 围栏业务组件和录音业务组建为空时候使用Empty无数据组件

###版本:'1.4.4'
1. 重新绘制首页界面
2. 新增基础api的文档
3. 新增空白页组件和图标组件文档、例子
4. 新增提示框，修改弹框的例子
5. 优化button组件,让其继承TouchableOpacity参数，新增其文档
6. 新增底部抽屉组件例子
7. 添加麦克风权限接口
8. 添加RVC业务组件及相关文档和实例
9. 优化toast不能自定义位置问题,与样式问题
