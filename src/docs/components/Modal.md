<!--
 * @Descripttion: 
 * @version: 
 * @Author: xieruizhi
 * @Date: 2019-09-24 15:28:09
 * @LastEditors: xieruizhi
 * @LastEditTime: 2019-12-03 15:51:24
 -->

# `Modal` 模态框(包括对话框,弹出框)

## Static Methods
| Method | Params | Returns | Notes |
|---|---|---|---|
| dialog | {contentText,onConfirm,onCancel} | 无 | - contentText 对话内容 <br> - onConfirm 确认回调 onCancel 取消回调 |


## Demo

```
import {Circle} from  'react-native-jimi';
const {Modal} =Circle;
Modal.dialog({
   contentText:'是否删除',
   onConfirm:()=>{},
   onCancel:()=>{},
});

```
