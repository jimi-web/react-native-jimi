<!--
 * @Descripttion: 
 * @version: 
 * @Author: xieruizhi
 * @Date: 2019-09-24 15:28:09
 * @LastEditors  : xieruizhi
 * @LastEditTime : 2019-12-28 14:05:27
 -->

# `Button` 按钮

## Props
| Prop | Type | required | Default | Note |
|---|---|---|---|---|
| [TouchableOpacity props...](https://reactnative.cn/docs/0.58/touchableopacity/)| 无 | 无 | 无 | 继承TouchableOpacity的所有属性 |
| type | String | true | default | 类型 'default', 'primary', 'danger' |
| size | String | true | md | 大小 'md', 'sm', 'xs' |
| title | Elem || String || Number | 内容 |
| titleStyle | Object | false | 18 | 内容样式 |


## Demo

```
import React, {Component} from 'react';
import {Circle} from  'react-native-jimi';
const { Button }  = Circle;

export default class ButtonExample extends Component { 
    
    constructor(props){
        super(props);
    }


    render(){
        return <View>
            <Button title={'Default'} style={styles.btn}></Button>
            <Button title={'Primary'} type={'primary'} style={styles.btn}></Button>
            <Button title={'Danger'} type={'danger'} style={styles.btn}></Button>

            <Button title={'Default'} style={styles.btn} size={'sm'}></Button>
            <Button title={'Primary'} type={'primary'} style={styles.btn} size={'sm'}></Button>
            <Button title={'Danger'} type={'danger'} style={styles.btn} size={'sm'}></Button>

            <Button title={'Default'} style={styles.btn} size={'xs'}></Button>
            <Button title={'Primary'} type={'primary'} style={styles.btn} size={'xs'}></Button>
            <Button title={'Danger'} type={'danger'} style={styles.btn} size={'xs'}></Button>
        </View>;
    }
}

const styles = StyleSheet.create({
    btn:{
        margin:10
    }
});
```
