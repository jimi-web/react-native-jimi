<!--
 * @Descripttion: 
 * @version: 
 * @Author: liujinyuan
 * @Date: 2020-03-17 15:14:49
 * @LastEditors: liujinyuan
 * @LastEditTime: 2020-03-17 15:25:25
 -->

# `MediaContral` 设备拍摄 

## Props
| Prop | Type | required | Default | Note |
|---|---|---|---|---|
| photoIns | string | true | Picture,ins1 | 设备拍照指令，ins1为选中的lensConfig中value值 |
| videoIns | string | true | Video,ins1,ins2 | 设备拍照指令，ins1为选中的lensConfig中value值，ins2为timeConfig中value值 |
| lensConfig | array | true | in和out摄像头 | 详情查看lensConfig |
| timeConfig | array | true | 3-10的秒数字符串 | 详情查看timeConfig |

## lensConfig
| Prop | Type | required | Note |
|---|---|---|---|---|
| value | String/Number | true | 需要发送的value值，会替换ins1 |
| name | String/Number | true | 显示的文字 |
| status | Number | true | 默认是否选中，不能多选 |
| icon | image | true | require导入的图片 |


## timeConfig
| Prop | Type | required | Note |
|---|---|---|---|---|
| value | String/Number | true | 需要发送的value值，会替换ins2 |
| name | String/Number | true | 显示的文字 |
| status | Number | true | 默认是否选中，不能多选 |


## Demo
```
import React, {Component} from 'react';
import { Jimi } from '../index';
export default class MediaSyc extends Component { 

    constructor(props){
        super(props);
    }

    render(){
        return (
            <Jimi.MediaContral/>
        );
    }

}
```