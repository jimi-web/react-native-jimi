<!--
 * @Descripttion: 
 * @version: 
 * @Author: xieruizhi
 * @Date: 2019-09-24 15:28:09
 * @LastEditors: xieruizhi
 * @LastEditTime: 2019-10-17 13:44:51
 -->

# `Toast` 提示框

## Static Methods
| Method | Params | Returns | Notes |
|---|---|---|---|
| Overlay | 无 | 无 | 继承Overlay所有静态方法 |
| show | options | 无 | 显示自定义提示框 <br> - text: 提示文字 <br>- icon: 图标（string，elem，image） <br> - duration:时间（number） |
| message | text, duration, position | 无 | 显示一个纯文本轻提示框。<br> duration 默认为 'short', position 默认为 'bottom' 。<br>默认值可通过 Toast.messageDefaultDuration 、 Toast.messageDefaultPosition 修改。 | 
| loading | text, duration, position, icon | 无 | 显示一个加载框 <br> duration 默认为 300000, position 默认为 'center' 。<br>默认值可通过 Toast.loadingDefaultDuration 、 Toast.loadingDefaultPosition 修改。 | 


## Static Props
| Prop | Type | required | Default | Note |
|---|---|---|---|---|
| messageDefaultDuration | string || number| 'short' | 无| message 函数的 duration 参数默认值。 |
| messageDefaultPosition | string  | 'bottom' | 无| message 函数的 position 参数默认值。 |
| loadingDefaultDuration | string || number | 'short' | 无| duration 函数的 duration 参数默认值。 |
| loadingDefaultPosition | string | 'center' | 无| loading 函数的 position 参数默认值。 |
| loadingDefaultText | string | '加载中...' | 无| loading 函数的 text 参数默认值。 |
| loadingDefaultIcon | string |  | 无 | loading 函数的 icon 参数默认值。 |
| loadingDefaultStyle | string | 'bottom' | 无| loading 函数的 style 参数默认值。 |

## Demo

简单用法
```
Toast.message('Toast message');

```

自定义

```
let toast=Toast.show({
    text:'Toast',
    icon: <ActivityIndicator size='large' color={'#fff'} />,
    duration:100000
});

setTimeout(()=>{
    Toast.remove(toast);
},3000);

```
