<!--
 * @Descripttion: 
 * @version: 
 * @Author: xieruizhi
 * @Date: 2019-11-18 16:17:03
 * @LastEditors: xieruizhi
 * @LastEditTime: 2019-11-28 16:09:27
 -->
# `PhotoDeatil` 图片和视频详情

## Props
| Prop | Type | required | Default | Note |
|---|---|---|---|---|
| style | Object | false | false | 主体样式，可修改底部颜色 |
| data | Object | true | false | 文件数据 |
| mediaType | String | true | 无 | 文件格式，mp4，png等等 |
| isGoBackShow | Boolean | false | false | 视频全屏时候是否显示箭头返回 |
| children | Elem | false | false | 可在组建内嵌套子级元素 |

## Events
| Event Name | Returns | Notes |
|---|---|---|
|onDelete| 无 |删除成功回调事件| 
|onSave| 无 |保存成功回调事件| 
|onChangeSreen| true&&false，是否全屏 |视频切换全屏回调事件|
|onPlayChange| true&&false，是否播放状态 |视频播放状态回调事件|

## Demo

```
import React, {Component} from 'react';
import {Jimi} from 'react-native-jimi';

export default class PhotoDeatil extends Component { 
    static navigationOptions = ({navigation}) => ({
        title: navigation.getParam('title'),
        header:navigation.getParam('isShow')
    });


    constructor(props){
        super(props);
    }

    render(){
        const {item,callBack} = this.props.navigation.state.params;
        return <Jimi.PhotoDeatil 
            data= {item}
            onDelete={()=>{
                callBack(item)
                //删除文件后返回上一页
                this.props.navigation.goBack();
            }}
            onChangeSreen={(value)=>{
                //当视频全屏时，去掉头部导航
                this.props.navigation.setParams({
                    isShow:value ? null : undefined
                });
            }}
            isGoBackShow={true} //全屏视频显示返回箭头
        />;
    }
}

```