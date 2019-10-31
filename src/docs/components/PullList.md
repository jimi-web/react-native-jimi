<!--
 * @Descripttion: 
 * @version: 
 * @Author: xieruizhi
 * @Date: 2019-09-24 15:28:09
 * @LastEditors: xieruizhi
 * @LastEditTime: 2019-10-17 13:44:51
 -->

# `PullList` 上拉加载下拉刷新

## Props
| Prop | Type | required | Default | Note |
|---|---|---|---|---|
| RefreshControl  (RefreshControl props) | Oject | 无 | 无| 头部刷新自定义样式继承RefreshControl的属性|
| ActivityIndicator (ActivityIndicator props) | Oject | 无 | 无| 底部默认加载图标自定义样式继承ActivityIndicator的属性|
| data | Boolean| true | 无 | 同FlatList中的data属性 |
| refresStatus | Boolean| 无 | false | 是否下拉刷新状态 |
| pullUpStatus | number | 0 | false | 0:默认状态无下拉到底部 <br/> 1:数据加载中  <br/> 2:已加载全部数据 <br/> 3:加载失败|
| footerStyle | Oject | false | 无 | 底部自定义样式，可设置底部距离高度，边距之类的 |
| footerRefreshingText	 | String | false | '数据加载中，请稍后' | 自定义底部刷新中文字 |
| footerFailureText	 | String | false | '点击重新加载' | 自定义底部刷新中文字 |
| footerNoMoreDataText	 | String | false | '点击重新加载' | 自定义底部已加载全部数据文字 |
| footerEmptyDataText	 | String | false | '暂时没有相关数据' | 自定义空数据文字 |
| footerRefreshingComponent	 | Element | false | 无 | 自定义底部刷新控件 |
| footerFailureComponent	 | Element | false | 无 | 自定义底部失败控件 |
| footerNoMoreDataComponent	 | Element | false | 无 | 自定义底部已加载全部数据控件 |
| footerEmptyDataComponent	 | Element | false | 无 | 自定义空数据控件 |

## Events
| Event Name | Returns | Notes |
|---|---|---|
|onRefresh| 无 |上拉刷新监听事件 |
|onPullUp| 无 | 下拉加载监听事件 |


## Demo
```


```
