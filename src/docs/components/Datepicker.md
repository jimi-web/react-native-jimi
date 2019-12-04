<!--
 * @Descripttion: 
 * @version: 
 * @Author: xieruizhi
 * @Date: 2019-09-24 15:28:09
 * @LastEditors: xieruizhi
 * @LastEditTime: 2019-12-02 09:38:46
 -->

# `Datepicker` 时间选择器

## Static Methods
| Method | Params | Returns | Notes |
|---|---|---|---|
| show | options | 无 | {onConfirm:()=>{},onCancel:()=>{},itemStyle:{},holeStyle:{},wheelItemStyle:{},defaultValue:'2017-12-2'} <br> - onConfirm 点击确定回调事件 - onCancel 点击取消回调事件 - itemStyle 选项样式 -   |
| hide | 无 | 无 | 关闭 |

## Demo

```
import {Circle} from  'react-native-jimi';
const {Datepicker} = Circle;
Datepicker.show();
Datepicker.hide();

```
