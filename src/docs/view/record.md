<!--
 * @Descripttion: 
 * @version: 
 * @Author: liujinyuan
 * @Date: 2019-09-30 10:07:38
 * @LastEditors: liujinyuan
 * @LastEditTime: 2020-04-13 14:43:36
 -->
# `Record` 录音

## props
| Prop | Type | required | Default | Note |
|---|---|---|---|---|
| params | Object | false | {<br>pageNum: 1,<br>pageSize: 10<br>} | 请求数据的页码和每页的size |
| insTimeArr | B | false | 详情查看insTimeArr | 录音选择的时间,持续录音修改后将没有持续录音功能
| recordIns | String | false | 'LY,OFF,ins#' | 单条录音指令（ins为当前可变化的值） |
| recordStutainTrue | String | false | 'CXLY,ON,ins#' | 开启持续录音指令（ins为单断指令的值） |
| recordStutainFalse | String | false | 'CXLY,OFF#' | 关闭持续录音指令 |

## insTimeArr
| Prop | Type | Note |
|---|---|---|
| value | Number/String | 渲染对应的值 |
| title | Number/String | 渲染的文字内容 |
| isChange | Bo0lean | 是否选中 |


## Demo
```
import React, { Component } from 'react';
import { View} from 'react-native';
import { Jimi } from '../index';

export default class Record extends Component {
    constructor(props) {
        super(props);
        this.insTimeArr = insTimeArr:[
            {
                title:'30s',
                value:30,
                isChange:true
            },
            {
                title:'1分钟',
                value:60,
                isChange:false
            },
            {
                title:'2分钟',
                value:120,
                isChange:false
            },
            {
                title:'3分钟',
                value:180,
                isChange:false
            },
            {
                title:'4分钟',
                value:240,
                isChange:false
            },
            {
                title:'5分钟',
                value:300,
                isChange:false
            },
            {
                title:'持续录音',
                value:'30',
                isChange:false
            },
        ],
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <Jimi.Record insTimeArr={this.insTimeArr}></Jimi.Record>
            </View>
        );
    }
}
```
