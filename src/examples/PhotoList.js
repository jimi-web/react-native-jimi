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

export default class PhotoList extends Component { 
    static navigationOptions = ({navigation}) => ({
        title: navigation.getParam('title'),
    });


    constructor(props){
        super(props);
    }

    render(){
        const {fileType,mediaList} = this.props.navigation.state.params;
        return <Jimi.PhotoList 
            fileType={fileType}  
            items={mediaList}
            onSelect={(list,index)=>{
                this.props.navigation.push('PhotoDeatil',{item:list[index],title:list[index].fullTimeFormat});
            }}
        />;
    }
}