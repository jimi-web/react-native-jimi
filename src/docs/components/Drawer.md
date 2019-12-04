<!--
 * @Descripttion: 
 * @version: 
 * @Author: xieruizhi
 * @Date: 2019-09-24 15:28:09
 * @LastEditors: xieruizhi
 * @LastEditTime: 2019-11-29 09:57:28
 -->

# `Drawer` 底部抽屉

## Static Methods
| Method | Params | Returns | Notes |
|---|---|---|---|
| Overlay | 无 | 无 | 继承Overlay所有静态方法 |
| open | options | 无 | 打开底部抽屉 <br>- view: 抽屉内部视图内容 <br> - friction: 弹出速度控制 |
| close | 无 | 无 | 关闭 |

## Demo

```
import {Circle} from  'react-native-jimi';
const {Drawer} =Circle;
//弹出框
let open = Drawer.open(<View style={{width:200,height:300,backgroundColor:'#fff'}}><Text>哈哈哈哈哈哈哈哈</Text></View>);

//移除
Drawer.close(open);

```
