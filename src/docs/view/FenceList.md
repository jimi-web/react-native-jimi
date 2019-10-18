<!--
 * @Descripttion: 
 * @version: 
 * @Author: xieruizhi
 * @Date: 2019-09-24 15:28:09
 * @LastEditors: xieruizhi
 * @LastEditTime: 2019-10-17 17:17:23
 -->

# `FenceList` 围栏列表

添加围栏列表组件，需要自己增加添加围栏组件使用
[`<Jimi.BaiduAddFence />`添加和编辑围栏](http://172.16.0.101:3000/jmax/react-native-jimi/src/master/src/docs/view/AddFence.md)<br>

## Props
| Prop | Type | required | Default | Note |
|---|---|---|---|---|
| fenceStateImg | Object|false | 有默认值 | 围栏状态图标 {in:require('../../../../assets/fence/fence_list_enter.png'),<br/>out:require('../../../../assets/fence/fence_list_out.png'),<br/>all:require('../../../../assets/fence/fence_list_turnover.png')}|
|getData|Function |false | 使用几米圈模板接口 | 围栏列表数据 |
## Events
| Event Name | Returns | Notes |
|---|---|---|
|onAddEditFence|某个围栏信息|点击添加围栏或者编辑围栏事件|


## Demo
```
import React, {Component} from 'react';
import {View} from 'react-native';
import {Jimi,Applet} from 'react-native-jimi';

export default class FenceList extends Component { 

    constructor(props) {
        super(props);
    }
    
    render() {
        return <Jimi.FenceList
            getData = {this.getList}
            onAddEditFence={(data)=>{
                let obj = data ? {fenceId:data.fenceId} : null;
                this.props.navigation.push('AddFence',obj);
            }}
        ></Jimi.FenceList>;
    }


    getList =(setData) =>{
        Applet.jmAjax({
            url:api.fenceList,
            method:'GET',
            encoding:true,
            encodingType:true
        }).then((res)=>{
            setData(res);
        });
    }
}
```
