/*
 * @Descripttion: 录制等计时器组件 
 * @version: 
 * @Author: liujinyuan
 * @Date: 2019-12-24 10:06:24
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-05-09 09:21:22
 */
 
import React, { Component } from 'react';
import { View , Text} from 'react-native';
export default class RVCTimer extends Component {
    constructor(props){
        super(props);
        this.timer = null;
        this.state = {
            element:'00:00:00'
        };
    }
    componentDidMount(){
        this.renderTime();
    }
    componentWillUnmount(){
        if(this.timer){
            clearInterval(this.timer);
        }
    }
    render(){
        return (
            <View style={{flexDirection:'row',justifyContent:'center'}}>
                <Text style={{color:'#fff'}}>{this.props.title}</Text>
                <Text style={{color:'#fff'}}>{this.state.element}</Text>
            </View>
        );
    }
    renderTime = () => {
        const {status} = this.props;
        let h = 0;
        let m = 0;
        let s = 0;
        let i = 0;
        this.timer = setInterval(() => {
            if(!status){
                clearInterval(this.timer);
            }
            i++;
            
            s = i % 60;
            s = s > 9 ? s : `0${s}`;
            m = parseInt(i / 60 % 60);
            m = m > 9? m : `0${m}`;
            h = parseInt(i / 360 % 24);
            this.setState({
                element:`${h}:${m}:${s}`
            });
        },1000);
    }
}