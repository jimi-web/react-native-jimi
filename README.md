<!--
 * @Descripttion: 
 * @version: 
 * @Author: liujinyuan
 * @Date: 2019-08-26 16:48:01
 * @LastEditors: liujinyuan
 * @LastEditTime: 2019-10-29 09:04:35
 -->
# 几米圈标准小程序

## 描述
```
几米前端组件库设计文档
```

## 总结构设计
- src
    - api                   * api中心，存放公共api接口，可通过暴露出来的方法进行修改
    - assets                * 图片文件，静态资源文件
    - components            * 基础组件
    - docs                  * 文档
    - examples              * 使用例子
    - http                  * 基础通讯服务
    - language              * 国际化中心
    - libs                  * 公共函数
    - page                  * 例子入口
    - router                * 路由
    - store                 * 仓库
    - view                  * 业务模块
    - App.js                * 输出
    - index.js              * npm打包中心
    - package.js            * 打包配置

## 注意事项
1. 业务组件包括src所有内容。
2. 基础组件和通讯接口不掺杂任何业务和任何依赖，可以作为一个独立的模块进行发布，并且其中文档和例子，均作为独立的内容。
3. 业务组件外部引入基础组件或通讯接口都在导出中心导出


## 业务组件
- view
    - components            * 带依赖组件
    - map                   * 地图
    - photo                 * 相册
    - record                * 录音
    - baseStyle             * 业务模块公共样式
    - index.js              * 集成导出

### components
带依赖的业务公共组件，此组件为公共业务封装，例如：底部盒子。因具有依赖性，不加入到基础组件。

### baseStyle.js
业务公共样式分发中心，此文件继承基础组件Themes中的主题样式进行分发。例如：主题色。并暴露修改入口，可对此公共样式进行单独修改。
公共样式包括但不仅限于：主题色  主要字体  提示字体  主要背景色  主要边框颜色




## 基础组件
- components
    - index.js              * 集成导出中心
    - button                * button组件
    - datepicker            * 时间选择器
    - dialog                * 对话框
    - modal                 * 模态框
    - overlay               * 弹出层
    - popUpBox              * 输入框
    - slider                * 进度条
    - themes                * 样式
    - toast                 * 提示

### overlay

##### TopView
1. 顶层组件，所有弹出层皆有此组件分发，此组件会挂在在APP当中。在不进行设置时，此组件只是一个简单的<View>,继承父盒子的宽高。
2. 此组件建立一个elements组件数组，所有通过此组件展示的组件都会返回一个key，通过该key可以删除和修改。
3. elements弹出层目前可同时存在二个或多个。

##### overlay.js
1. 此js作为模态框的分发，不同形态和类型的模态框都通过该文件加入到TopView中。
2. 该文件不作任何逻辑处理，目前有且只能删除一个模态框。

##### overlayView
1. 此组件作为弹出层组件，默认会有一个黑色且透明度为0.4的背景，以及100毫秒从0透明度变成n透明度的动画。
2. 该组件作为所有弹出层的父级组件，基础此组件的属性和方法。

##### 静态方法
1. 所有弹出层组件必须包含一个show方法和一个hide方法，通过该方法可以直接对弹出层进行显示和隐藏。
2. 静态方法在组件销毁后，必须销毁该方法。


### 非overlay
1. 不属于弹出层的组件直接进行单独处理，不设置统一入口。


### themes（公共样式提取）
1. 此js通过index中创建的Theme对象进行样式分发，默认分发themDefault中的默认样式。
2. 暴露set方法对该分发出去的对象中的样式进行修改，传值为Object。


### docs
基础组件文档


## 通讯接口

- http
    - basic.js                 底层通讯
    - business.js              封装通讯，进行数据处理并返回
    - file.js                  文件相关通讯
    - media.js                 媒体相关通讯
    - httpInfo.js              错误code
    - index.js                 集成导出

### basic.js
底层通讯，对app事件进行监听，封装统一请求方法和格式，不对数据进行任何处理。