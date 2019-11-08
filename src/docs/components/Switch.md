<!--
 * @Descripttion: 
 * @version: 
 * @Author: xieruizhi
 * @Date: 2019-09-24 15:28:09
 * @LastEditors: xieruizhi
 * @LastEditTime: 2019-10-17 13:44:51
 -->

# `Switch` 开关

## Props
| Prop | Type | required | Default | Note |
|---|---|---|---|---|
| style  | ViewStyle | false | 无| 容器样式 |
| value  | Boolean | false | false | 状态值 |
| disabled  | Boolean | false | false| 是否可以切换状态 |
| activeColor  | String | false | '#4BD865' | 打开状态颜色 |
| defaultColor  | String | false | '#fff' | 关闭状态颜色 |

## Events
| Event Name | Returns | Notes |
|---|---|---|
|onValueChange| 返回状态值（true or false） |值变化回调 |

## Demo
```
import React,{Component} from 'react';
import {Circle} from  'react-native-jimi';

const {Switch} =Circle;

export default class SwitchTest  extends Component {

    constructor(props) {
        super(props);
    }


    render(){
        return <Switch value={true} onChange={(value)=>{
            console.log(value);
                
        }}  style={{
            width:80,height:40,
        }}></Switch>;

    }
}

```