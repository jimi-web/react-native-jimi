<!--
 * @Descripttion: 
 * @version: 
 * @Author: xieruizhi
 * @Date: 2019-09-24 15:28:09
 * @LastEditors: xieruizhi
 * @LastEditTime: 2019-09-24 16:18:43
 -->

# `Trace` 地图追踪

## Props
| Prop | Type | required | Default | Note |
|---|---|---|---|---|
|[Position props...](http://172.16.0.101:3000/jmax/react-native-jimi/src/master/src/docs/view/Position.md)|无|无|无|继承定位的属性，除了mapControls，onDeviceChange，onMyChange，ChangePositionBtn不可设置|
|polylineOptions|Object|false | 有默认属性| 整条轨迹的属性<br>　{<br>　　width:2, //线宽<br>　　color:'#50AE6F' //线颜色<br>}|
|checkedTitle|String|false | 有默认属性| 分享弹出框【我已阅读并同意】后的文件名|
|routerName|String|false | 有默认属性| 分享弹出框点击【我已阅读并同意】后的文件名跳转的路由名|
|shareUrl|String|false | 有默认属性| 分享的地址 |
|shareTitle |String|false | 有默认属性| 分享的标题 |
|shareText |String|false | 有默认属性| 分享的文字 |
## Demo
```
import React, {Component} from 'react';
import {View} from 'react-native';
import {Jimi} from 'react-native-jimi';


export default class Track extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isBaidu:false
        };
    }
    
    render() {
        let playPolylineOptions = {
            color:'#1027cc',
            width:3
        };
        return <View style={{flex:1}}>
            {
                this.state.isBaidu ?
                    <Jimi.BaiduTrace 
                        playPolylineOptions={playPolylineOptions}
                    ></Jimi.BaiduTrace>
                    :
                    <Jimi.GoogleTrace 
                        playPolylineOptions={playPolylineOptions}
                    ></Jimi.GoogleTrace>}
        </View>;
    } 
}

```
