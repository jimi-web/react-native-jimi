<!--
 * @Descripttion: 
 * @version: 
 * @Author: xieruizhi
 * @Date: 2019-09-24 15:28:09
 * @LastEditors: xieruizhi
 * @LastEditTime: 2019-10-17 13:44:51
 -->

# `Wheel` 滚轮

## Props
| Prop | Type | required | Default | Note |
|---|---|---|---|---|
| items | array | true | 无 | 可选项列表，数组元素可以是字符串、数字或 React Native 组件。 |
| itemStyle | 同Text.style | true | 无 | 选项样式，当 items 数组元素是 React Native 组件时无效。 |
| holeStyle | 同View.style | true | 无 | 当前项窗口样式，需指定 height 属性。|
| maskStyle | 同View.style | false | 无 | 当前项上下蒙版样式。|
| holeLine | string <br> number <br> element | false | 无 | 前项窗口分隔线，可以是数字或 React Native 组件。|
| defaultIndex | number | false | 无 | 默认当前项索引值，仅在组件创建时使用一次，如不想设置 index 并维护状态，可在此属性传入初始项索引值。|

## Demo

```
import React, {Component} from 'react';
import {Circle} from  'react-native-jimi';
const {Wheel} =Circle;

export default class Test extends Component {

    constructor(props){
        super(props);
    }

    render(){
        return <Wheel
            style={{height: 200, width: 50}}
            itemStyle={{textAlign: 'center'}}
            items={[1, 2, 3, 4, 5, 6, 7, 8, 9, 0]}
        />;
    }

}
```
