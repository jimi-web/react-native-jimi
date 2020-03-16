<!--
 * @Descripttion: 
 * @version: 
 * @Author: xieruizhi
 * @Date: 2019-09-24 15:28:09
 * @LastEditors  : xieruizhi
 * @LastEditTime : 2019-12-25 14:53:59
 -->

# `Details` 详情列表


## Props
| Prop | Type | required | Default | Note |
|---|---|---|---|---|
| data | Object | true | 无 | 详情列表值，参考以下的数据格式|
| detailMarginRight| Number | false | 24 | 无右边图标的文字右边距 |
| children| Elem | false | false | 如需要添加自定义内容，可自行追加 |

## Events
| Event Name | Returns | Notes |
|---|---|---|
| onSetUpIcon | 无 |设置图标的点击事件|


## Demo
```
import React, {Component} from 'react';
import {Jimi} from 'react-native-jimi';

export default class Details extends Component { 
    
    constructor(props){
        super(props);
        this.state = {
            data:{
                deviceName:'',
                typeNum:'',
                encoding:'',
                simNo:'',
                iccid:'',
                deviceIcon:'',             
            }
        }
    }


    render(){
        return <Jimi.Details 
            data = {this.state.data}
            onSetUpIcon = {()=>{
                //跳转到设置图标界面
                this.props.navigation.push('IconTable',{activateKey:this.state.data.deviceIcon,callBack:(value)=>{
                    //设置图标后回调获取更新后的图标，重新更新数据
                    let data = this.state.data;
                    data.deviceIcon = value;
                    this.setState({
                        data
                    });
                }});
            }}
        />;
    }

    componentWillMount(){
        this.init();
    }

    /**
     * 设备详情
     */
    init = ()=>{
        Applet.jmAjax({
            url:Api.initLocatorInfo,
            method:'POST',
            encoding:true,
            encodingType:true
        }).then((res)=>{
           let data= res.data;
           data.typeNum = 'gt200'
           this.setState({
               data:{...data}
           });
        });
    }
}

```

## 数据格式

```
data:{
    deviceName:'',//设备名称
    typeNum:'',//机型
    encoding:'',//唯一码
    simNo:'',//simNo
    iccid:'',//iccid
    deviceIcon:'',   //设备图标          
}
```
