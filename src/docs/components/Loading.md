<!--
 * @Descripttion: 
 * @version: 
 * @Author: xieruizhi
 * @Date: 2019-09-24 15:28:09
 * @LastEditors: xieruizhi
 * @LastEditTime: 2019-10-17 13:44:51
 -->

# `Loading` 加载

## Props
| Prop | Type | required | Default | Note |
|---|---|---|---|---|
| show | 无| 无 | 无| 显示loading |
| hide | 无 | 无 | 无| 隐藏loading |


## Demo

将加载框导入App.js里，设置全局，因所有业务组件均用到该组件

```

import {Circle} from  'react-native-jimi';

Circle.Loading.show();//显示
Circle.Loading.hide();//隐藏

```
