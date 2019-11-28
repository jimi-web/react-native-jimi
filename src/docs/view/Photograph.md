<!--
 * @Descripttion: 
 * @version: 
 * @Author: xieruizhi
 * @Date: 2019-11-18 16:15:46
 * @LastEditors: xieruizhi
 * @LastEditTime: 2019-11-28 16:15:16
 -->
# `Photograph` 图片

## Props
| Prop | Type | required | Default | Note |
|---|---|---|---|---|
| url | String | true | false | 图片路径 |
| style | Object | false | false | 主体样式 |
| children | Elem | false | false | 可在组建内嵌套子级元素 |

## Demo
```
import React, {Component} from 'react';
import {Jimi} from 'react-native-jimi';

export default class Photograph extends Component { 

    constructor(props){
        super(props);
    }


    render(){
        return <Jimi.Photograph url={'file:////storage/emulated/0/JMSmallApp/2200994/869354040542244/jmPhotoListData/1568270267297.png'} />
    }
}

```

