<!--
 * @Descripttion: 
 * @version: 
 * @Author: xieruizhi
 * @Date: 2019-09-24 15:28:09
 * @LastEditors: xieruizhi
 * @LastEditTime: 2019-10-14 10:20:16
 -->

# `FenceList` 围栏列表


## Props
| Prop | Type | required | Default | Note |
|---|---|---|---|---|
| routeName | String |true | 无 | 跳转添加围栏界面的路由名称|
| fenceStateImg | Object|false | 有默认值 | 跳转添加围栏界面的路由名称|

## Demo
```
import React, {Component} from 'react';
import {View} from 'react-native';
import {Jimi} from 'react-native-jimi';

export default class FenceList extends Component { 

    constructor(props) {
        super(props);
    }
    
    render() {
        return <Jimi.FenceList
            routeName={'AddFence'}
        ></Jimi.FenceList>;
    }
}

```
