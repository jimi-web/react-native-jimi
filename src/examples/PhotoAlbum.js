/*
 * @Descripttion: 
 * @version: 
 * @Author: xieruizhi
 * @Date: 2019-11-19 09:52:42
 * @LastEditors: xieruizhi
 * @LastEditTime: 2019-11-28 14:46:39
 */
import React, {Component} from 'react';
import { Jimi } from '../index';

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
                onDelete={this._onDelete}
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


    _onDelete = (data)=>{
        const {callBack} = this.props.navigation.state.params;
        let list = this.state.data;
        let newList = list.filter(item => {
          return item.fileId?item.fileId != data.fileId:item.url != data.url //有fileId的是远程相册，url是本地相册
        });
        this.setState({
            data:newList
        },()=>{
            //回调到媒体列表更新数据
            callBack(this.state.data);
            if(this.state.data.length>0){
                this.upDateTitle(data.fullTimeFormat);
            }else{
                this.props.navigation.goBack();
            }
        });
    }
}