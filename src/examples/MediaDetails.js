/*
 * @Descripttion: 
 * @version: 
 * @Author: liujinyuan
 * @Date: 2020-03-31 16:02:43
 * @LastEditors: liujinyuan
 * @LastEditTime: 2020-04-01 18:04:30
 */
import React, {Component} from 'react';
import { Jimi } from '../index';
export default class MediaDetails extends Component { 

    constructor(props){
        super(props);
    }

    render(){
        const data = this.props.navigation.state.params;
        let params = {
            ...data,
            url:data.localPath,
            videoFirstImage:data.firstImage || data.localPath,
            type:data.type === 'VIDEO'?'mp4':'jpg',
        };
        return (
            <Jimi.PhotoDeatil data={params} onDelete={(item) => this.onDelete(item)} />
        );
    }

    onDelete = (item) => {
        const path = item.filePath;
        Jimi.MediaSyn.deleteFTPFile(path).then(res => {
            console.log(res,'1231231232');
        });
    }

}