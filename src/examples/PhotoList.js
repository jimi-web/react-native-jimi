/*
 * @Descripttion: 
 * @version: 
 * @Author: xieruizhi
 * @Date: 2019-11-19 09:52:42
 * @LastEditors: xieruizhi
 * @LastEditTime: 2019-11-28 14:47:25
 */
import React, {Component} from 'react';
import { Jimi } from '../index';
import { View } from 'react-native';

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