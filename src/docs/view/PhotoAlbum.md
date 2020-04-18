<!--
 * @Descripttion: 
 * @version: 
 * @Author: xieruizhi
 * @Date: 2019-11-18 16:17:03
 * @LastEditors: xieruizhi
 * @LastEditTime: 2019-11-28 16:09:27
 -->
# `PhotoAlbum` 相册轮播

## Props
| Prop | Type | required | Default | Note |
|---|---|---|---|---|
| [PhotoDetail props...] | 无 | 无 | 无 | 继承详情的属性 |

## Demo

```
import React, {Component} from 'react';
import {Jimi} from 'react-native-jimi';

export default class PhotoAlbum extends Component { 
    static navigationOptions = ({navigation}) => ({
        title: navigation.getParam('title','照片'),
        header:navigation.getParam('isShow')
    });

    constructor(props){
        super(props);
        this.state={
            data:props.navigation.state.params.item
        }
    }

    render(){
        const {index} = this.props.navigation.state.params;
        return <Jimi.PhotoAlbum
                data={this.state.data}
                index={index}
                onIndexChanged={(index)=>{
                   let list = this.state.data[index];
                   this.upDateTitle(list.fullTimeFormat);
                }}
                onDelete={(data)=>this._onDelete(data)}
                onChangeSreen={(value)=>{
                    this.props.navigation.setParams({
                        isShow:value ? null : undefined
                    });
                }}
                isGoBackShow={true}
        />
    }

    /**
     * 更新标题
     */
    upDateTitle = (fullTimeFormat)=> {
        this.props.navigation.setParams({
            title:fullTimeFormat
        });
    }

    _onDelete = (data)=> {
        //更新数据
        const {callBack} = this.props.navigation.state.params;
        let list = this.state.data;
        let newList = list.filter(item => {
            return item.fileId?item.fileId != data.fileId:item.url != data.url //有fileId的是远程相册，url是本地相册
        });
       
        this.setState({
            data:newList
        },()=>{
            if(this.state.data.length>0){
                this.upDateTitle(data.fullTimeFormat);
            }else{
                this.props.navigation.goBack();
            }
        });
        callBack(newList);
    }

```