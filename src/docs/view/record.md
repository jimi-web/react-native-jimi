<!--
 * @Descripttion: 
 * @version: 
 * @Author: liujinyuan
 * @Date: 2019-09-30 10:07:38
 * @LastEditors: liujinyuan
 * @LastEditTime: 2019-09-30 11:37:18
 -->
# `Record` 录音

## props
| Prop | Type | required | Default | Note |
|---|---|---|---|---|
| params | Object | false | {<br>pageNum: 1,<br>pageSize: 10<br>} | 请求数据的页码和每页的size |
| insTimeArr | Array | false | ['30s','1分钟','2分钟','3分钟','4分钟','5分钟','持续录音'] | 录音选择的时间,持续录音修改后将没有持续录音功能
| insSutainTime | Number | false | 30 | 持续录音每段录音时间 |
| recordIns | String | false | 'LY,OFF,ins#' | 单条录音指令（ins为当前可变化的值） |
| recordStutainTrue | String | false | 'CXLY,ON,ins#' | 开启持续录音指令（ins为单断指令的值） |
| recordStutainFalse | String | false | 'CXLY,OFF#' | 关闭持续录音指令 |

## Demo
```
import React, { Component } from 'react';
import { View} from 'react-native';
import { Jimi } from '../index';

export default class Record extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <Jimi.Record></Jimi.Record>
            </View>
        );
    }
}
```
