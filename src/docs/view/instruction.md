<!--
 * @Descripttion: 
 * @version: 
 * @Author: liujinyuan
 * @Date: 2020-01-03 09:33:13
 * @LastEditors: liujinyuan
 * @LastEditTime: 2020-01-03 11:49:34
 -->
# 指令

## Props
| Prop | Type | required | Default | Note |
|---|---|---|---|---|
| instructionArray | Array | true | null | 渲染指令的数据，详情渲染规则查看data |

## Data
| key | Type | Notes |
|---|---|---|
| instruction | String | 指令内容，当前指令为动态渲染请用#号开头进行对应 |
| id | String/Number | 指令唯一标识符 |
| title | Boolean/String | 当前文字顶部的标题，只有为false时才不会显示标题 |
| type | String | 指令渲染的类型，详情查看类型表 |
| data | * | 渲染该指令类型的数据，数据格式需根据指令类型对应 |
| value | * | 当前指令代表的值，和指令的#对应，进行指令内容关联 |

## Events
| Event Name | Returns | Notes |
|---|---|---|
| onChangeSwitch | false | 类型为Switch的子组件回调 |


## DataType

#### `switch` => Object
```
该类型接收一个对象
```
| Key | Type | Notes |
|---|---|---|
| text | String | 左侧的文字 |
| viceText | String | 左侧底部的副标题，多用于解释主标题 |
| value | Boolean | 右侧的开关 |

#### `select` => Array
```
该类型接收一个数组
```
| Key | Type | Notes |
|---|---|---|
| text | String | 左侧的文字 |
| viceText | String | 左侧底部的副标题，多用于解释主标题 |
| value | Boolean | 右侧的开关 |

#### `element` => element
```
该Type为element时接收一个RN组件
```

