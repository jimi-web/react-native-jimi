/*
 * @Descripttion: 
 * @version: 
 * @Author: xieruizhi
 * @Date: 2019-11-19 09:52:42
 * @LastEditors: xieruizhi
 * @LastEditTime: 2019-11-28 15:45:25
 */
import React, {Component} from 'react';
import { Jimi } from '../index';

export default class PhotoDeatil extends Component { 
    static navigationOptions = ({navigation}) => ({
        title: navigation.getParam('title'),
        header:navigation.getParam('isShow')
    });


    constructor(props){
        super(props);
    }

    render(){
        const {item,callBack} = this.props.navigation.state.params;
        return <Jimi.PhotoDeatil 
            data= {item}
            onDelete={()=>{
                callBack(item)
                //删除文件后返回上一页
                this.props.navigation.goBack();
            }}
            onChangeSreen={(value)=>{
                //当视频全屏时，去掉头部导航
                this.props.navigation.setParams({
                    isShow:value ? null : undefined
                });
            }}
            isGoBackShow={true} //全屏视频显示返回箭头
        />;
    }
}