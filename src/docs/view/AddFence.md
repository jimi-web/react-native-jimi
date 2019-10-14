<!--
 * @Descripttion: 
 * @version: 
 * @Author: xieruizhi
 * @Date: 2019-09-24 15:28:09
 * @LastEditors: xieruizhi
 * @LastEditTime: 2019-10-14 11:33:38
 -->

# `AddFence` 围栏


## Props
| Prop | Type | required | Default | Note |
|---|---|---|---|---|
| fenceId | String | false | 无 | 如果是添加围栏则不必传，编辑围栏则需要|
| strokeStyle | Object| false | 有默认属性 | 围栏圆圈边框宽和颜色设置 {width:100,color:'#3479f670'}|
| fillColor | String| false | 有默认属性 | 围栏圆圈内部填充颜色|

## Events
| Event Name | Returns | Notes |
|---|---|---|
|onSave|围栏保存|点击保存事件会回调事件|


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
