<!--
 * @Descripttion: 
 * @version: 
 * @Author: xieruizhi
 * @Date: 2019-11-18 16:17:03
 * @LastEditors: xieruizhi
 * @LastEditTime: 2019-11-28 15:30:32
 -->
# `PhotoList` 相册列表

## Props
| Prop | Type | required | Default | Note |
|---|---|---|---|---|
| items | array | false | 有 | 相册列表数据(仅本地相册可用) |
| fileType | number | true | 无 | 文件类型，0为本地相册，1为远程相册 |
| videoType | array[String] | false | ['mp4','3gp','avi','mov'] | 支持的视频类型 |

## Events
| Event Name | Returns | Notes |
|---|---|---|
|onSelect| 图片类型的所有图片，图片位置（list，index） |点击图片| 
|onLongPhotoListChange| 远程相册列表 |监听远程相册数据改变时间(仅远程相册可用)| 

## Demo
```
import React, {Component} from 'react';
import {Jimi} from 'react-native-jimi';

export default class PhotoList extends Component { 
    static navigationOptions = ({navigation}) => ({
        title: navigation.getParam('title'),
    });


    constructor(props){
        super(props);
        this.state = {
            mediaList:this.props.navigation.state.params.mediaList,
            longPhotoList:null
        }
    }

    render(){
        const {fileType} = this.props.navigation.state.params;
        return <View style={{flex:1}}>
                {
                    fileType?
                    <Jimi.LongPhotoList 
                    ref={(e)=>this.longPhotoList =e}
                    onSelect={(list,index)=>{
                        this.props.navigation.push('PhotoDeatil',{item:list[index],title:list[index].fullTimeFormat,callBack:(data)=>{
                            let longPhotoList = this.state.longPhotoList;
                            let newList = longPhotoList.filter(item => item.fileId != data.fileId);
                            this.longPhotoList.upDate(newList);
                        }});
                    }}
                    onLongPhotoListChange = {(list)=>{
                        //赋值
                        this.setState({
                            longPhotoList:list
                        });
                    }}
            /> :
            <Jimi.LocalPhotoList 
                items={this.state.mediaList}
                onSelect={(list,index)=>{
                    this.props.navigation.push('PhotoDeatil',{item:list[index],title:list[index].fullTimeFormat,callBack:(data)=>{
                        let mediaList = this.state.mediaList;
                        let newList = mediaList.filter(item => item.url != data.url );
                        this.setState({
                            mediaList:newList
                        });
                    }});
            }}
            />} 
        </View> ;
    }
}

```
## 数据格式

```
items:[{
    time: 1568270267297,//时间戳
    type: "mp4",//文件格式
    url: "file:////storage/emulated/0/JMSmallApp/2200994/869354040542244/jmPhotoListData/1568270267297.mp4",//文件路径
    videoTime: "11",//视频时长，单位是秒
}]
```


    