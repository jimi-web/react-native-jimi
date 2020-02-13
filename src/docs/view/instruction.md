<!--
 * @Descripttion:  指令基础组件文档
 * @version: 
 * @Author: liujinyuan
 * @Date: 2020-01-03 09:33:13
 * @LastEditors  : liujinyuan
 * @LastEditTime : 2020-02-13 09:53:48
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

## Events
| Event Name | Returns | Notes |
|---|---|---|
| onIns | ins | 每次操作类型的回调，返回用户修改过后组装好的参数及指令 |
| setInstruction | ins | 指令发送后的回调，返回用户修改过后组装好的参数及指令 |


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

