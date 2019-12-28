# `Empty` 数据为空

## Props
| Prop | Type | required | Default | Note |
|---|---|---|---|---|
|imgStyle|Object |false | 有默认属性| 图片样式  <br>    ```imgStyle:{ position:'absolute', top:'50%',left:'50%', width:280,height:218,marginLeft:-140, marginTop:-163}``` |

## Events
| Event Name | Returns | Notes |
|---|---|---|
| onPress | 无 | 该界面点击事件 |

## Demo
```
import React, {Component} from 'react';
import {Jimi} from 'react-native-jimi';

export default class Empty extends Component {
    constructor(props) {
        super(props);
    }


    render() {
        return <Jimi.Empty />;
    }
}
```