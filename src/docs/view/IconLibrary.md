<!--
 * @Descripttion: 
 * @version: 
 * @Author: xieruizhi
 * @Date: 2019-09-24 15:28:09
 * @LastEditors  : xieruizhi
 * @LastEditTime : 2019-12-25 14:53:59
 -->

# `IconLibrary` 图标库


## Props
| Prop | Type | required | Default | Note |
|---|---|---|---|---|
| iconSize | Number | false | 40 | 图标大小 |
| iconDefault| object | false | { color:'#888',bgColor:'#F7F7F7'} | 图标默认颜色 |
| iconActive| object | false | { color:''#fff'',bgColor:'#F7F7F7'} | 图标激活颜色 |
| activateKey| String | false | 'car | 默认的激活图标key |

## Events
| Event Name | Returns | Notes |
|---|---|---|
| onSaveCallBack | 保存的图标 |保存图标成功后的回调|


## Demo
```
import React, {Component} from 'react';
import {Jimi} from 'react-native-jimi';

export default class IconLibrary extends Component { 

    constructor(props) {
        super(props);
        this.state = {
            iconArray:[{

            }]
        };
    }

    render() {
        let {activateKey,callBack} = this.props.navigation.state.params;
        return <View style={Styles.container}>
            <Jimi.IconLibrary
                activateKey={activateKey}
                onSaveCallBack={(value)=>{
                    callBack(value);
                    this.props.navigation.goBack()
                }}
            />
        </View>
    }
}

const Styles = StyleSheet.create({
    container:{
        flex:1
    }
});

```
