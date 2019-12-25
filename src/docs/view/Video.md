<!--
 * @Descripttion: 
 * @version: 
 * @Author: xieruizhi
 * @Date: 2019-11-18 16:17:03
 * @LastEditors: xieruizhi
 * @LastEditTime: 2019-11-28 16:29:56
 -->
# `Video` 视频

## Props
| Prop | Type | required | Default | Note |
|---|---|---|---|---|
| url | String | true | false | 单张图片或者是视频的路径 |
| videoCover | String | true | false | 视频封面第一帧 |
| isGoBackShow | Boolean | false | false | 视频全屏时候是否显示箭头返回 |

## Events
| Event Name | Returns | Notes |
|---|---|---|
|onChangeSreen| true&&false，是否全屏 |视频切换全屏回调事件|
|onPlayChange| true&&false，是否播放状态 |视频播放状态回调事件|

## Demo

```
import React, {Component} from 'react';
import {Jimi} from 'react-native-jimi';

export default class Video extends Component { 

    constructor(props){
        super(props);
    }


    render(){
        return  <Jimi.Video 
                url={'file:////storage/emulated/0/JMSmallApp/2200994/869354040542244/jmPhotoListData/1568270267297.mp4'} 
                    videoCover={'file:////storage/emulated/0/JMSmallApp/2200994/869354040542244/jmPhotoListData/1568270267297.png'} 
                    onChangeSreen={(value)=>{
                        console.log(value)
                    }}
                    isGoBackShow={true}
                    onPlayChange={(value)=>{
                        console.log(value)
                    }}
    }
}


```