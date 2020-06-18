<!--
 * @Descripttion:  指令基础组件文档
 * @version: 
 * @Author: liujinyuan
 * @Date: 2020-01-03 09:33:13
 * @LastEditors: liujinyuan
 * @LastEditTime: 2020-06-18 14:25:12
 -->
# 指令

## Props
| Prop | Type | required | Default | Note |
|---|---|---|---|---|
| instructionArray | Array | true | null | 渲染指令的数据，详情渲染规则查看data |
| instruction | String | true | null | 指令类型，该文中动态数据会被insID对应的value替换 |
| isButton | Boolean |  | false | 开启之后在底部会出现第一个确认按钮，当该按钮出现，此页面所有操作除该按钮外都不会发送指令给服务器 |

## Data
| Prop | Type | required  | Note |
|---|---|---|---|
| type | String | true | 指令渲染的类型，详情查看类型表 |
| content | * | true | 渲染该指令类型的数据，数据格式需根据指令类型对应 |
| value | * | false | 当前形态的默认值,该值的类型根据形态来确定 |
| border | boolean | false | 设置当前item底部是否需要border，border样式根据baseStyle样式调整 |
| insID | String | false | 对应的指令内容，会用insValue值对该指令替换进行发送 |
| insValue | String | false | 该参数为当前指令中存在动态数据的默认值，改值会通过insID替换指令中对应的参数 |
| insSymmetry | boolean | false | 该参数用于对开关等需要固定值形态的值进行替换的规则 |
| style | object | false | 该值用于自定义组件样式 |
| hint | string | false | 改值用于在验证组件值不合格的情况下抛给用户的提示，默认为：'您当前输入的格式有误！' |
| contral | Number/Array | false | 该参数用于此组件被哪个组件所控制,当该类型为Array时可声明该类型被多个控制，Array中必须为Number |
| contralValue | Number/String/Array | false | 设置该参数后，会被contral该组件的的控制器组件中的值所控制，只有等于控制器中的value才会显示。</br>当该参数为Array时，会根据下标一一对应contral中控制器的值。当然Array中也可以通过设置Array来声明一个控制器对应多个值的控制</br>当类型为Array时，若对应下标为undefined或设置*时，会跟随contral的值来控制 |

## Events
| Event Name | Returns | Notes |
|---|---|---|
| onIns | ins | 每次操作类型的回调，返回用户修改过后组装好的参数及指令 |
| setInstruction | ins | 指令发送后的回调，返回用户修改过后组装好的参数及指令 |

## Function => 挂在在ins上的静态方法
| Function Name | Returns | Notes |
|---|---|---|
| ftmInternation | ins | 将指令配置格式化成当前语言的国际文字 |


## DataType

#### `switch` 
```
value => Boolean 该value接收一个boolean
content => Object 该content接收一个object
```

| Key | Type | Notes |
|---|---|---|
| text | String | 左侧的文字 |
| viceText | String | 左侧底部的副标题，多用于解释主标题 |
| value | Boolean | 右侧的开关显示的值 |


#### `select`
```
value => String/Number 该value接收的值需和content中value值对应，并且只有一个
content => Object 该content接收一个Array
```
| Key | Type | Notes |
|---|---|---|
| text | String | 左侧的文字 |
| viceText | String | 左侧底部的副标题，多用于解释主标题 |
| value | Boolean | 选择当前项的值，改值会映射到该类型对应的insID当中 |


#### `multiSelect`
```
value => Array 该value接收一个数组，数组中的值需和content.multiArr的值对应。例：['$1','$2']
content => Object 该content接收一个object
```

| Key | Type | Notes |
|---|---|---|
| symbol | String | 多项参数的分隔符，根据指令进行设置 |
| isMust | Boolean | 该参数是否可以为空，不填则可为空 |
| multiArr | Array | 该多项选择的内容，和select的参数一致 |


#### `input`
```
value => String 该Value接受的值为任意字符串，该值会作为input的默认值显示
content => Object 该content接收一个object
```

| Key | Type | Notes |
|---|---|---|
| placeholder | String | 当input为空时的提示字符 |
| type | String | Input的类型，默认为text |
| text | String | 该Input的标题 |
| rule | String | 该input的验证规则，如规则不对将会在内部进行提示格式错误而不进行数据变动 |
| keyboardType | String | 该值用于生命input弹出键盘类型，详情查看RN文档 |


#### `modelSelect`
```
value => String 该value接收的值需和content中value值对应，并且只有一个
content => Object 该content接收一个Object
```

| Key | Type | Notes |
|---|---|---|
| text | String | 该选择框的标题 |
| modelType | Custom/Datepicker | 若为Custom需自己自定modelData，若为Datepicker则为时间选择器 |
| modelData | Array | 该内容参数和selec一致 |



#### `step`
```
该类型会构建一个滑动的选择器
value => String/number 该value接收的值需和content中value值对应，并且只有一个
content => Object 该content接收一个Object
```

| Key | Type | Notes |
|---|---|---|
| text | String | 该选择器的标题 |
| stepValue | Array | 该内容参数和select一致 |

#### `arrowButton` => Object
```
该组件用于页面跳转，不绑定指令
content => Object 该content接收一个Object
```
| Key | Type | Notes |
|---|---|---|
| text | String | 该按钮的左侧标题 |
| viceText | String | 左侧底部的副标题，多用于解释主标题 |
| img | String | 该标题左侧用于提示用户的图片，为服务器图片路径 |
| id | String | 跳转页面需要渲染的指令内容，通过该指令ID来渲染不同的内容 |


#### `title` => String/Number
```
该类型接收一个字符串或者数字并不能绑定指令
content => String 该content接收一个String
```

#### `element` => element
```
该Type为element时data接收一个RN组件
```
## `Demo`
```
import React, { Component } from 'react';
import {View,Text,ScrollView} from 'react-native';
import { Jimi } from '../index';
export default class Instruction extends Component {

    constructor(props){
        super(props);
        this.data =[
            { 
                type:'title',
                content:'标题',
            },
            {
                type:'switch',
                content:{
                    text:'低电告警',
                    viceText:'电量过少时会触发报警',
                },
                value:false,
                border:true,
                insID:'ins1',
                insSymmetry:{true:0,false:1},
                insValue:1
            },
            {
                type:'arrowButton',
                content:{
                    text:'震动报警',
                    viceText:'震动时报警',
                    value:'震动报警开',
                    id:'1',
                    img:'https://facebook.github.io/react-native/img/tiny_logo.png'
                },
                border:true
            },
            {
                type:'select',
                content:[
                    {
                        text:'选择1',
                        value:'#1',
                        
                    },
                    {
                        text:'选择1',
                        value:'#2',
                    },
                    {
                        text:'选择1',
                        value:'#3'
                    },
                ],
                value:'#1',
                border:true,
                insID:'ins2',
                insValue:'#1',
            },
            {
                type:'multiSelect',
                content:{
                    symbol:'|',
                    isMust:true,
                    multiArr:[
                        {
                            text:'多选1',
                            value:'$1',
                        },
                        {
                            text:'多选2',
                            value:'$2',
                        },
                        {
                            text:'多选3',
                            value:'$3',
                        },
                    ],
                },
                value:['$1','$2'],
                border:true,
                insID:'ins3',
                insValue:'$1|$2',
            },
            {
                type:'input',
                content:{
                    placeholder:'请输入',
                    type:'',
                    text:'报警时间',
                    rule:/^[0-9]*[1-9][0-9]*$/
                },
                value:'6',
                border:true,
                insID:'ins4',
                insValue:'6',
            },
            {
                type:'modelSelect',
                content:{
                    text:'移动侦测',
                    modelType:'Custom',
                    modelData:[
                        {
                            text:'5s',
                            value:5
                        },
                        {
                            text:'10s',
                            value:10
                        },
                        {
                            text:'15s',
                            value:15
                        },
                        {
                            text:'20s',
                            value:20
                        },
                    ]
                },
                value:'15s',
                border:true,
                insID:'ins5',
                insValue:'5',
            },
            {
                type:'step',
                content:{
                    text:'灵敏度',
                    stepValue:[
                        {
                            text:'低',
                            value:0
                        },
                        {
                            text:'中',
                            value:1
                        },
                        {
                            text:'高',
                            value:2
                        },
                    ]
                },
                value:2,
                insID:'ins6',
                insValue:2,
                border:true,
            },
        ];
    }
    render(){
        return (
            <Jimi.Instruction instructionArr={this.data} onArrowButton={(data) => onArrowButton()}></Jimi.Instruction>
        );
    }
    onArrowButton = (data) => {
        this.porps.navigation.push({
            url:'instruction',
            params:data
        });
    }
}
```
