<!--
 * @Descripttion: 
 * @version: 
 * @Author: liujinyuan
 * @Date: 2019-12-10 17:57:42
 * @LastEditors  : liujinyuan
 * @LastEditTime : 2019-12-27 11:58:42
 -->

## RVC

## Props
| Prop | Type | required | Default | Note |
|---|---|---|---|---|
| params | Object | true | false | 接受一个对象,用于和流媒体建立连接<br/>key:String<br/>secret:'String'<br/>imei:'String' |
| topStatusIcon | RN | false | [] | 接受一个数组，数组作为RN组件，在视频页头添加状态，通过定位设置齐位置，默认上下居中。该按钮会在全屏时同步 |
| bootomStatusIcon | RN | false | null | 接受一个数组，数组作为RN组件，在视频页脚添加状态，通过定位设置齐位置，默认上下居中。该按钮会在全屏时同步 |
| LeftBootomRN | RN | false | null | 左下角底部用于展示提示信息，接收一个RN组件 |
| ErrorElement | RN | false | null | 自定义错误提示组件 |
| LoadingElement | RN | false | null | 自定义视频加载状态 |
| CenterRn | RN | false | false | 视频中间展示的信息用于展示加载状态等，接受一个RN组件，设置该组件视频本身的加载状态和错误信息会消失 |
| isSoundIcon | boolean | false | true | 是否开启声音切换功能 |
| isRecordIcon | boolean | false | true | 是否开启录制功能 |
| isTolkIcon | boolean | false | true | 是否开启对讲功能 |
| isSnapshotIcon | boolean | false | true | 是否开启截图功能 |
| isSuspendedIcon | boolean | false | true | 是否开启暂停播放功能 |
| isScreenIcon | boolean | false | true | 是否开启全屏功能 |

## Event
| Event Name | Returns | Params | Notes |
|---|---|---|---|
| onPlayReminder() | RVCPlaystatus | null |视频播放过程中返回的数据|
| onTalk() | reminder | null | 对讲过程中返回的数据 |
| onRecord() | reminder | null | 视频录制过程中返回的数据 |
| getRVCInfo | reminder | null | 视频及时返回的状态 |
| onSound() | boolean | null | 设置静音之后的回调，true为开启，false为静音 |
| onReversal() | boolean | null | 切换屏幕之后的回调，false为竖屏，true为全屏 |
| onScreen() | null | null | 点击RVC之后的回调 |
| onSnapshot() | null | null | 点击截图按钮之后的回调 |
| onPlayBack() | 回调说明:RVCPlaysBacktatus | null | 回放视频时的持续回调 |

## Function
| Function Name | Returns | Params | Notes |
|---|---|---|---|
| stop | 回调说明（RVCPlaystatus） | null | 停止RVC并回到释放SDK，一般用于退出该页面 |
| stopPlay | 回调说明（RVCPlaystatus） | null | 停止RVC继续播放 |
| startPlay | 回调说明（RVCPlaystatus） | null | 调用RVC播放 |
| initialize | 回调说明（RVCPlaystatus） | null | 初始化并播放视频 |
| sendCustomRequest | 设备回复内容 | 自定义指令 | 发送自定义指令给设备，同时会收到设备回复，可使用then回调 |
| startPlayback | null | Array:播放文件的路径 | 自动播放设备视频文件，在onPlayBack中可获得持续回调情况 |
| switchCamera | boolean | 切换摄像头的结果 | 切换摄像头回调切换之后的结果，默认传入true |

## RVCPlaystatus
| code | Notes |
|---|---|
| 0 | 未启动或未识别的状态 | 
| 1 | 正在准备播放 | 
| 2 | 开始或正在播放 | 
| 3 | 播放结束 | 
| 4 | 获取URL失败 | 
| 5 | URL无效 | 
| 6 | 打开URL失败 | 
| 7 | 打开URL超时 | 
| 8 | 播放异常或设备停止推流(会自动停止播放器) | 
| 9 | http请求超时 | 
| 10 | 域名或IP错误 | 
| 11 | http参数错误 | 
| 12 | 服务器数据解析异常 | 
| 13 | 设备回复“失败”及拒绝响应 | 
| 14 | 网络异常 | 

## RVCPlaysBacktatus
| code | Notes |
|---|---|
| undefine | 回复内容由设备端决定，一般是json字符串或字符串 | 
## Demo
 
```
/*
 * @Descripttion: 
 * @version: 
 * @Author: liujinyuan
 * @Date: 2019-12-11 14:05:24
 * @LastEditors  : liujinyuan
 * @LastEditTime : 2019-12-26 15:41:01
 */
import React, { Component } from 'react';
import { View} from 'react-native';
import { Jimi } from '../index';

export default class Record extends Component {
    static navigationOptions = ({ navigation, screenProps }) => (
        {
            title: 'RVC',
            header:navigation.state.params ? navigation.state.params.param :undefined,
        }
    );
    constructor(props){
        super(props);
        this.params = {
            key:'d0c67074f14e403d916379f6664414b2',
            secret:'feef6c9e8ff94bfa95c2fc9b56b8c52a',
            imei:'312345678912314'
        };
    }

    render(){
        return (
            <View style={{flex:1}}> 
                <Jimi.RVC params={this.params} onReversal={(data) => this.onReversal(data)} />
            </View>
        );
    }
    onReversal = (data) => {
        this.props.navigation.setParams({ param: data ? null : undefined});
    }
}


```