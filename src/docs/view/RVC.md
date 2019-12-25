<!--
 * @Descripttion: 
 * @version: 
 * @Author: liujinyuan
 * @Date: 2019-12-10 17:57:42
 * @LastEditors: liujinyuan
 * @LastEditTime: 2019-12-11 14:04:23
 -->

## RVC

## Props
| Prop | Type | required | Default | Note |
|---|---|---|---|---|
| topStatusIcon | RN | false | ull | 顶部设备状态展示，接收一个RN组件，位置需设置定位 |
| bootomStatusIcon | RN | false | null | 底部设备状态展示，接收一个RN组件，位置需设置定位 |
| leftBootomRN | RN | false | false | 左下角底部用于展示提示信息，接收一个RN组件 |
| centerRn | RN | false | false | 视频中间展示的信息用于展示加载状态等，接受一个RN组件 |
| isSoundIcon | boolean | false | true | 是否开启声音切换功能 |
| isRecordIcon | boolean | false | true | 是否开启录制功能 |
| isTolkIcon | boolean | false | true | 是否开启对讲功能 |
| isSnapshotIcon | boolean | false | true | 是否开启截图功能 |
| isSuspendedIcon | boolean | false | true | 是否开启暂停播放功能 |
| isScreenIcon | boolean | false | true | 是否开启全屏功能 |
| isBackVideo | boolean | false | false | 是否开启回放功能 |

## Event
| Event Name | Returns | Params | Notes |
|---|---|---|---|
| initialize() | Boolean | <br/>appkey（String）：appkey<br />secret（String）:RVC标识<br />imei（String）:设备imei |初始化RTMP|
| deInitialize() | Boolean | null | 释放RTMP |
| onStop() | null | null | 停止内部所有功能，网络请求，对讲，数据 |
| startPlayLive() | RVCStatus | sound（Boolean）：是否开启live声音，默认（isSound） | 开始播放实时视频，本质上播放视频不会开启音频 |
| stopPlayLive() | null | null | 停止播放视频 |
| startTalk() | RVCStatus | null | 开始对讲 |
| stopTalk() | RVCStatus | null | 停止对讲 |
| snapshot() | RVCStatus | null | 截图 |
| startRecord() | RVCStatus | null | 开始录制 |
| stopRecord() | RVCStatus | null | 停止录制 |
| onSound() | RVCStatus | sound（boolean）：是否开启声音 | 声音切换回调，返回boolean |


## RVCstatus
| code | Notes | 
|---|---|

## Demo
 
```


```