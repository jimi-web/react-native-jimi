<!--
 * @Descripttion: 
 * @version: 
 * @Author: xieruizhi
 * @Date: 2019-11-18 16:15:46
 * @LastEditors: xieruizhi
 * @LastEditTime: 2019-11-28 14:31:40
 -->
# `Photo` 相册分类

## Props
| Prop | Type | required | Default | Note |
|---|---|---|---|---|
| photosEmptyImg | image | false | 有 | 相片为空时候的空位图 |
| videoEmptyImg | image | false | 有 | 视频为空时候的空位图 |
| videoType | array[String] | false | ['mp4','3gp','avi','mov'] | 支持的视频类型 |


## Events
| Event Name | Returns | Notes |
|---|---|---|
|onSelect| 点击文件夹的类型的所有数据 |点击文件夹事件|

## Method
| Method | Params | Returns | Notes |
|---|---|---|---|
|upDate|无|无|文件夹内数据更新|


## Demo
```
import React, {Component} from 'react';
import {Jimi} from 'react-native-jimi';

export default class Photo extends Component { 

    constructor(props){
        super(props);
    }

    componentWillMount(){
        this.willFocusSubscription = this.props.navigation.addListener(
            'willFocus',
            obj => {
                //路由快回到焦点时候更新数据
                this.photo.upDate();
            }
        );
    }

    componentWillUnmount(){
        this.willFocusSubscription.remove();
    }

    render(){
        return <Jimi.Photo onSelect={(data)=>{
            this.props.navigation.push('PhotoList',{type:data.type,mediaList:data.mediaList,title:data.title});}}
        ref={(e)=>this.photo =e} />;
    }
}
```

