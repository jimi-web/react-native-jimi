<!--
 * @Descripttion: 
 * @version: 
 * @Author: xieruizhi
 * @Date: 2019-09-24 15:28:09
 * @LastEditors: xieruizhi
 * @LastEditTime: 2019-10-17 10:12:11
 -->

# `Share` 分享

## Props
| Prop | Type | required | Default | Note |
|---|---|---|---|---|
|checkedTitle|String|false | 有默认属性| 分享弹出框【我已阅读并同意】后的文件名|
|routerName|String|false | 有默认属性| 分享弹出框点击【我已阅读并同意】后的文件名跳转的路由名|
|shareUrl|String|false | 有默认属性| 分享的地址 |
|shareTitle |String|false | 有默认属性| 分享的标题 |
|shareText |String|false | 有默认属性| 分享的文字 |
|token |String|false | 有默认属性| 身份校验的token |
## Demo
```
import React, {Component} from 'react';
import {Jimi} from 'react-native-jimi';

export default class Share extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        Jimi.Share.show(); //显示分享弹出框
    }

    render() {
        return <Jimi.Share />;

    }
}

```
