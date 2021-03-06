<!--
 * @Descripttion: 
 * @version: 
 * @Author: liujinyuan
 * @Date: 2019-08-26 16:48:01
 * @LastEditors: xieruizhi
 * @LastEditTime: 2020-06-23 10:43:42
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
"node-forge": "0.9.1",
"prop-types": "15.7.2",
"react": "16.6.3",
"react-native": "0.58.6",
"react-native-baidu-map-jm": "1.3.1",
"react-native-fs": "2.13.3",
"react-native-ftp-jm": "^1.0.4",
"react-native-gesture-handler": "1.3.0",
"react-native-maps": "0.24.0",
"react-native-orientation": "3.1.3",
"react-native-photoview-jm": "1.0.24",
"react-native-rtmp-player-jm": "1.1.4",
"react-native-shadow": "1.2.2",
"react-native-svg": "9.3.7",
"react-native-swiper": "1.5.14",
"react-native-video": "5.0.2",
"react-navigation": "3.6.1",
"react-redux": "6.0.1",
"redux": "4.0.1",
"redux-thunk": "2.3.0",
"teaset": "0.6.3"
```

## 组件
# 业务组件
[`<Jimi.BaiduPosition />`定位](http://10.0.10.85/cp/frontend/jmax_rn_standard/blob/master/src/docs/view/Position.md)<br>

[`<Jimi.BaiduTrack />`轨迹](http://10.0.10.85/cp/frontend/jmax_rn_standard/blob/master/src/docs/view/Track.md)<br>

[`<Jimi.BaiduTrace />`追踪](http://10.0.10.85/cp/frontend/jmax_rn_standard/blob/master/src/docs/view/Trace.md)<br>

[`<Jimi.BaiduFenceList />`围栏列表](http://10.0.10.85/cp/frontend/jmax_rn_standard/blob/master/src/docs/view/FenceList.md)<br>

[`<Jimi.BaiduAddFence />`添加围栏](http://10.0.10.85/cp/frontend/jmax_rn_standard/blob/master/src/docs/view/AddFence.md)<br>

[`<Jimi.Share />`分享](http://10.0.10.85/cp/frontend/jmax_rn_standard/blob/master/src/docs/view/Share.md)<br>

[`<Jimi.Record />`录音](http://10.0.10.85/cp/frontend/jmax_rn_standard/blob/master/src/docs/view/Record.md)<br>

[`<Jimi.Photo />`相册文件夹](http://10.0.10.85/cp/frontend/jmax_rn_standard/blob/master/src/docs/view/Photo.md)<br>

[`<Jimi.PhotoAlbum />`相册轮播](http://10.0.10.85/cp/frontend/jmax_rn_standard/blob/master/src/docs/view/PhotoAlbum.md)<br>

[`<Jimi.PhotoList />`相册列表](http://10.0.10.85/cp/frontend/jmax_rn_standard/blob/master/src/docs/view/PhotoList.md)<br>

[`<Jimi.PhotoDeatil  />`图片和视频详情](http://10.0.10.85/cp/frontend/jmax_rn_standard/blob/master/src/docs/view/PhotoDeatil.md)<br>

[`<Jimi.Photograph  />`图片](http://10.0.10.85/cp/frontend/jmax_rn_standard/blob/master/src/docs/view/Photograph.md)<br>

[`<Jimi.Video />`视频](http://10.0.10.85/cp/frontend/jmax_rn_standard/blob/master/src/docs/view/Video.md)<br>

[`<Jimi.RVC />`RVC(实时视频)](http://10.0.10.85/cp/frontend/jmax_rn_standard/blob/master/src/docs/view/RVC.md)<br>

[`<Jimi.Empty />`数据空白](http://10.0.10.85/cp/frontend/jmax_rn_standard/blob/master/src/docs/view/Empty.md)<br>

[`<Jimi.Details />`设备详情](http://10.0.10.85/cp/frontend/jmax_rn_standard/blob/master/src/docs/view/Details.md)<br>

[`<Jimi.IconLibrary />`图标库](http://10.0.10.85/cp/frontend/jmax_rn_standard/blob/master/src/docs/view/IconLibrary.md)<br>


# 基础组件

[`<Circle.Toast />`提示](http://10.0.10.85/cp/frontend/jmax_rn_standard/blob/master/src/docs/components/Toast.md)<br>

[`<Circle.PullList />`上拉加载下拉刷新（无分组列表）](http://10.0.10.85/cp/frontend/jmax_rn_standard/blob/master/src/docs/components/PullList.md)<br>

[`<Circle.GroupList />`上拉加载下拉刷新（分组列表）](http://10.0.10.85/cp/frontend/jmax_rn_standard/blob/master/src/docs/components/GroupList.md)<br>

[`<Circle.Switch />`开关](http://10.0.10.85/cp/frontend/jmax_rn_standard/blob/master/src/docs/components/Switch.md)<br>

[`<Circle.Drawer />`底部抽屉](http://10.0.10.85/cp/frontend/jmax_rn_standard/blob/master/src/docs/components/Drawer.md)<br>

[`<Circle.Wheel />`滚轮](http://10.0.10.85/cp/frontend/jmax_rn_standard/blob/master/src/docs/components/Wheel.md)<br>

[`<Circle.Modal />`弹框](http://10.0.10.85/cp/frontend/jmax_rn_standard/blob/master/src/docs/components/Modal.md)

[`<Circle.Icon />`图标](http://10.0.10.85/cp/frontend/jmax_rn_standard/blob/master/src/docs/components/Icon.md)

[`<Circle.Button />`按钮](http://10.0.10.85/cp/frontend/jmax_rn_standard/blob/master/src/docs/components/Button.md)

[`<Circle.Datepicker />`日历选择器](http://10.0.10.85/cp/frontend/jmax_rn_standard/blob/master/src/docs/components/Datepicker.md)
<br>

## 方法
[`<Api />` 接口](http://172.16.0.101:3000/jmax/react-native-jimi/src/master/src/docs/view/Api.md)<br>




## 日志
###版本:'1.1.6'
1. 分享弹出框新增动画效果

###版本:'1.3.8'
1. 新增Modal组件,将对话框,提示框,输入框等集合在此,以便调用
2. 新增滚轮,底部抽屉,提示,时间选择器,上拉加载下拉刷新,开关,相册,无数据组件
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
10. 使用字体图标替换掉所有的图片


###版本:'1.4.5'
1. 新增指令配置功能，根据组件生成指令
2. RVC新增摄像头切换功能
3. 新增媒体同步组件
4. 添加WIFI相关接口
5. 新增相册组件
6. 新增详情和设备图标组件
7. 新增远程拍摄组件
8. 新增流量卡公共方法
9. 定位新增电源充电状态，电量，电压配置项
10. 修改RVC退出及切换后台功能
11. 修改android录音退出后台继续播放的问题
12. 修改录音记录储存位置由本地变成服务器
13. 修改录音配置指令传参类型
14. 添加录音配置值单位
15. 添加录音类型

