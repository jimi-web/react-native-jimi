<!--
 * @Descripttion: 
 * @version: 
 * @Author: xieruizhi
 * @Date: 2019-09-24 15:28:09
 * @LastEditors  : xieruizhi
 * @LastEditTime : 2019-12-25 14:53:59
 -->

# `AddFence` 围栏


## Props
| Prop | Type | required | Default | Note |
|---|---|---|---|---|
| fenceId | String | false | 无 | 如果是添加围栏则不必传，编辑围栏则需要|
| strokeStyle | Object| false | 有默认属性 | 围栏圆圈边框宽和颜色设置 {width:100,color:'#3479f6'}|
| fillColor | String| false | 有默认属性 | 围栏圆圈内部填充颜色|
|deviceMarkerOptions|Object|false | 有默认属性 |设备标记点属性,只有谷歌地图能自定义样式 style，百度传无效<br>{<br>　　style:{width:100,height:100},<br>　　image:require('./../../assets/map/oldMan.png')<br>}|
|getData|Function|false | 使用几米圈模板接口 | 设置定位信息，具体方法写法参考下面例子|
## Events
| Event Name | Returns | Notes |
|---|---|---|
|onSave|围栏保存|点击保存事件会回调事件|
|onDeviceChange|设备信息（参考几米圈定位信息接口）|当更新设备信息时会调用|

## Demo
```
import React, {Component} from 'react';
import {Jimi} from 'react-native-jimi';

export default class AddFence extends Component { 
    constructor(props) {
        super(props);
    }
    
    render() {
        let {params} = this.props.navigation.state;
        return <Jimi.BaiduAddFence
            fenceId={params?params.fenceId:''}
            onSave={()=>{
                this.props.navigation.goBack();
            }}
        ></Jimi.BaiduAddFence>;
   }
}

```

## 路由导航配置

去掉添加围栏导航的阴影

```
navigationOptions: ({ navigation }) => (
    {
        headerStyle:{
            backgroundColor:'#fff',
            borderBottomColor:'#fff',
            elevation:0
        },
    }
)

```
