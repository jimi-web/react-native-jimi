/*
 * @Descripttion: 
 * @version: 
 * @Author: liujinyuan
 * @Date: 2020-01-08 17:02:08
 * @LastEditors: liujinyuan
 * @LastEditTime: 2020-04-13 17:27:10
 */
import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    PanResponder
} from 'react-native';
import {Icon} from '../../components';
const { width } = Dimensions.get('window');

export default class InsStep extends Component {
    constructor(props) {
        super(props);
        this.width = width * 0.8;
        this.startX = 0;
        this.index = 0;
        this.i = this.props.data.content.stepValue.findIndex(item => {return item.value == this.props.data.value;});
        this.state = {
            moveX:this.width / (this.props.data.content.stepValue.length - 1) * this.i
        };
    }


    componentWillMount(){
        this._panResponder = PanResponder.create({
            // 要求成为响应者：
            onStartShouldSetPanResponder: (evt, gestureState) => true,
            onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
            onMoveShouldSetPanResponder: (evt, gestureState) => true,
            onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
    
            onPanResponderGrant: (evt, gestureState) => {
                // 开始手势操作。给用户一些视觉反馈，让他们知道发生了什么事情！
            },
            onPanResponderMove: (evt, gestureState) => {
                let moveX = gestureState.moveX;
                if(moveX < this.startX){
                    moveX = 0;
                }
                if(moveX > this.width + 10){
                    moveX = this.width;
                }
                this.setState({
                    moveX
                });
            },
            onPanResponderTerminationRequest: (evt, gestureState) => true,
            onPanResponderRelease: (evt, gestureState) => {
                let moveX = gestureState.moveX;
                const {content} = this.props.data;
                const itemWidth = this.width / (content.stepValue.length - 1);
                this.index = 0;
                // 计算和当前滑动距离最近的index
                for (let i = 1; i < content.stepValue.length; i++) {
                    const x = i * itemWidth;
                    this.index = Math.abs(moveX - this.index * itemWidth) >  Math.abs(moveX - x)?i : this.index;
                }
                let dx = this.index * itemWidth;
                let timer = setInterval(() => {
                    if(dx > moveX){
                        moveX += 1;
                        if(moveX >= dx){
                            moveX = dx;
                            clearInterval(timer);
                        }
                    }else{
                        moveX -= 1;
                        if(moveX <= dx){
                            moveX = dx;
                            clearInterval(timer);
                        }
                    }
                    this.setState({
                        moveX
                    });
                }, 10);
                const {data,index} = this.props;
                data.value = content.stepValue[this.index].value;
                data.insValue = content.stepValue[this.index].value;
                this.props.onEndTouches && this.props.onEndTouches(data,index);
                
            },
            onPanResponderTerminate: (evt, gestureState) => {
            // 另一个组件已经成为了新的响应者，所以当前手势将被取消。
                    
            },
            onShouldBlockNativeResponder: (evt, gestureState) => {
            // 返回一个布尔值，决定当前组件是否应该阻止原生组件成为JS响应者
            // 默认返回true。目前暂时只支持android。
                return true;
            },
        });
    }

    render() {
        console.log(this.i);
        const {content} = this.props.data;
        return (
            <View style={this.renderStyle()}>
                <View style={{position:'relative',width:'80%',height:40,justifyContent:'space-between',alginItems:'end',flexDirection:'row'}}>
                    {
                        content.stepValue.map((item,index) => {
                            return <Text style={{lineHeight:40}} key={index}>{item.text}</Text>;
                        })
                    }
                </View>
                <View {...this._panResponder.panHandlers} style={{position:'relative',width:'90%',height:40,justifyContent:'space-between',alginItems:'center',flexDirection:'row'}}>
                    <View style={{width:'100%',height:2,backgroundColor:'#c7c7c7',position:'absolute',top:19,left:0}}></View>
                    {
                        content.stepValue.map((item,index) => {
                            return <View key={index}>{
                                this.renderElement(item,index)
                            }</View>;
                        })
                    }
                    <Icon style={{position:'absolute',left:this.state.moveX - 5,top:13}} name={'recording_list_play_slider'} />
                </View>
            </View>
        );
    }
    /*
    *渲染样式
     */
    renderStyle = () => {
        const {style} = this.props;
        const styles = [{
            height:80,
            backgroundColor:'#fff',
            width:'100%'

        }].concat(style);
        return styles;


    }
    /*
    *渲染元素
     */
    renderElement = (item,index) => {
        let element = null;
        element = <View style={{position:'relative',top:19}}>
            <View style={{height:7,width:2,position:'absolute',left:0,top:-3,backgroundColor:'#c7c7c7'}}></View>
        </View>;
        return element;
    }
}
