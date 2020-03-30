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
                        this.props.navigation.push('PhotoAlbum',{item:list,title:list[index].fullTimeFormat,index:index,callBack:(data)=>{
                            this.longPhotoList.upDate(data);
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
                    this.props.navigation.push('PhotoAlbum',{item:list,index:index,callBack:(data)=>{
                        this.setState({
                            mediaList:newList
                        });
                    }});
            }}
            />} 
        </View> ;
        
      
    }
}