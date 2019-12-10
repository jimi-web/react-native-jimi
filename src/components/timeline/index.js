/*
 * @Descripttion: 按钮
 * @version: 
 * @Author: liujinyuan
 * @Date: 2019-08-12 16:08:59
 * @LastEditors: liujinyuan
 * @LastEditTime: 2019-11-21 13:59:17
 */


import React, {Component} from 'react';
import {Text, View,StyleSheet,Animated,Image,TouchableOpacity,PanResponder,Dimensions} from 'react-native';
import Theme from '../themes/index';
import PropTypes from 'prop-types';
import '../../libs/time';

const {width,height} = Dimensions.get('window');
const countTime = (time) => {
    const date = new Date(time).Format('hh:mm');
    return date;
};
const zeroDay = new Date(new Date().toLocaleDateString()).getTime();  
const shaft  = [];
for (let i = 0; i <  24 * 5; i++) {
    // 计算时间
    const time = zeroDay + i * 12 * 60 * 1000;
    const newIndex = (time - zeroDay) / 12 / 60 / 1000;
    let isMainShaft =  newIndex % 5 == 0?true : false;
    let item = {
        time,
        isMainShaft,                                                                                                                                                                                                                    
        value:countTime(time),
    };
    shaft.push(item);
}
// 计算时间轴当前位置
export default class Timeline extends Component {
    static propTypes = {
        ...View.propTypes,
        scale: PropTypes.number,
        scaleMinorHeight:PropTypes.number,
        scaleMainHeight:PropTypes.number,
        shaftHeight:PropTypes.number,
        minValue:PropTypes.number,
        nowValue:PropTypes.number,
    };
    static defaultProps = {
        ...View.defaultProps,
        scaleWidth:15,
        scaleMinorHeight:14,
        scaleMainHeight:24,
        shaftHeight:44,
        minValue:new Date().getTime(),//接受一个时间错
        nowValue:new Date().getTime(),//当前进来主轴的时间

    };
    constructor(props){
        super(props);
        this.isZoom = false;//是否触发缩放
        this.startTouhes = null;//开始的触摸点
        this.endTouhes = [];//结束的触摸点
        this.nowMoveX = 0;//最小的时间刻度
        this.minValue = 0;//当前可移动的最小时间
        this.addMoveX = 0;//每次滑动的距离
        this.nowDate = new Date().getTime() + 10000;
        this.zeroDay = new Date(new Date().toLocaleDateString()).getTime();
        this.defaultScaleNumber = 120;//默认一进来加载刻度为120
        this.state = {
            shaftArr:[],
            level:60,//等级单位为分钟，当前共有5，60，240，三个等级
            moveX:0,
        };
    }
    componentDidMount(){
        const shaftArr = this.initShaft(this.state.level,this.props.nowValue);
        this.setState({
            shaftArr
        });
        this.onCountMoveX(shaftArr,this.props.nowValue,this.state.level);
    }
    /**
     * 初始化数据
     */
    initShaft = (level,nowValue) => {
        const shaft  = [];
        const day  = 1 * 60 * 60 * 1000;
        const nowDay = Math.floor(nowValue / day) * day  - level / 5 * 60 * 60 * 1000;
        this.zeroDay = nowDay;
        let index = 24 * 5;
        // console.log(this.state.shaftArr,index,222);
        // if(this.state.shaftArr.length){
        //     index = Math.ceil((this.state.shaftArr[this.state.shaftArr.length - 1].time - this.state.shaftArr[0].time)/1000 / 60 / (level / 15));
        // } 
        for (let i = 0; i <  index; i++) {
            // 计算时间
            const time = nowDay + i * level/5 * 60 * 1000;
            const newIndex = (time - nowDay)  / 60 / 1000;
            let isMainShaft =  newIndex % level == 0?true : false;
            let item = {
                time,
                isMainShaft,                                                                                                                                                                                                                    
                value:this.onCountTime(time),
            };
            shaft.push(item);
        }
        return shaft;
    }
    /**
     * 计算时间
     */
    onCountTime = (time) => {
        const date = new Date(time).Format('hh:mm');
        return date;
    };
    /**
     * 计算首次进来主轴的位置
     */
    onCountMoveX = (shaft,nowValue,level) => {
        console.log(shaft,new Date(nowValue),123456);
        const {scaleWidth} = this.props;
        const moveX = 0 - (shaft[shaft.length - 1].time - nowValue) / this.onCountPxToTime(level) - scaleWidth + width/2;
        this.minValue = moveX;
        this.setState({
            moveX
        });
    }
    /**
     * 计算每一像素代表的时间(毫秒)
     */
    onCountPxToTime = (level) => {
        return level / 5 / this.props.scaleWidth * 60 * 1000;
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
                // this.nowMoveX = gestureState.moveX;
            // gestureState.{x,y} 现在会被设置为0
            },
            onPanResponderMove: (evt, gestureState) => {
                
                let moveX = this.state.moveX - gestureState.dx / 5;
                // moveX = moveX < this.minValue?moveX:this.minValue;
                // 计算开始和结束两个点的触摸点
                if(gestureState.numberActiveTouches == 2 && evt.nativeEvent.touches.length == 2){
                    if(!this.startTouhes){
                        this.startTouhes = evt.nativeEvent.touches;
                    }
                    this.endTouhes = evt.nativeEvent.touches;
                    this.isZoom = true;
                }
                if(gestureState.numberActiveTouches == 1){
                    this.addMoveX += gestureState.dx;
                    if(this.nowDate >= this.props.minValue && gestureState.dx <= 0){
                        return;
                    }
                    // 最近一次的移动距离为gestureState.move{X,Y}
                    // 计算时间(刻度初始化时溢出一格)
                    this.nowDate = parseInt(this.state.shaftArr[this.state.shaftArr.length - 1].time - (0 - moveX - this.props.scaleWidth + width / 2) * this.onCountPxToTime(this.state.level));
                    // const index = gestureState.dx
                    // 自动添加刻度
                    let moveIndex = Math.ceil(Math.abs(gestureState.dx) / 5);//此次需要添加多少刻度
                    let arrLength = this.state.shaftArr.length - 1;  
                    for (let i = 0; i < moveIndex; i++) {
                        arrLength = this.state.shaftArr.length - 1;
                        if( gestureState.dx > 0){
                            // 右滑增加
                            const arrStart = this.state.shaftArr[0];
                            const time = arrStart.time - this.state.level / 5 * 60 * 1000;
                            const timeIndex = (this.zeroDay -  5 * (this.state.level / 5) * 60 * 1000 - time)  / 60 / 1000;
                            const item = {
                                time,
                                isMainShaft:timeIndex % this.state.level == 0?true:false,                                                                                                                                                 
                                value:this.onCountTime(time)
                            };
                            this.state.shaftArr.unshift(item);
                            
                        }else{
                            // 左滑增加
                            const arrEnd = this.state.shaftArr[arrLength];
                            const time = arrEnd.time + this.state.level / 5 * 60 * 1000;
                            const timeIndex = (time - this.zeroDay -  5 * (this.state.level / 5) * 60 * 1000)  / 60 / 1000;
                            const item = {
                                time,
                                isMainShaft:timeIndex % this.state.level == 0?true:false,                                                                                                                                                 
                                value:this.onCountTime(time)
                            };
                            this.state.shaftArr.push(item);
                            
                        }                                     
                    }
                    // console.log(this.state.shaftArr,'移动时改变数据');
                    this.state.moveX = moveX;
                    this.setState({ moveX,shaftArr:this.state.shaftArr });
                    const data = {
                        nowTime:this.nowDate,
                        shaftArr:this.state.shaftArr
                    };
                    this.props.onMove &&  this.props.onMove(data);//移动时抛出的数据
                }
            },
            onPanResponderTerminationRequest: (evt, gestureState) => true,
            onPanResponderRelease: (evt, gestureState) => {
                // console.log(this.startTouhes,this.endTouhes,'结束');
                // console.log(this.nowDate,'结束',this.isZoom);
                // 拖动结束
                if(this.addMoveX){
                    const maxX = this.nowDate + 100 * (this.state.level / 5) * 60 * 1000;
                    const minX = this.nowDate - 100 * (this.state.level / 5) * 60 * 1000;
                    const arr = [];
                    console.log(maxX,minX,123);
                    for (let i = 0; i < this.state.shaftArr.length; i++) {
                        const item = this.state.shaftArr[i];
                        if(maxX > item.time && item.time > minX){
                            arr.push(item);
                        }
                    }
                    this.setState({ shaftArr:arr });
                    this.onCountMoveX(arr,this.nowDate,this.state.level);
                    this.addMoveX = 0;
                    // 抛给外部的数据
                    const data = {
                        nowTime:this.nowDate,
                        data:arr
                    };
                    this.props.onEndTouches && this.props.onEndTouches(data); // 拖动结束事件
                }
                // 缩放结束
                if(this.isZoom){
                    // 缩放的手势中，左侧触摸点距离主轴左侧的X坐标必然小于右侧触摸点，反之如此
                    const startTouhesPoint = {
                        left:this.startTouhes[0].pageX > this.startTouhes[1].pageX? this.startTouhes[1].pageX : this.startTouhes[0].pageX,
                        right:this.startTouhes[0].pageX > this.startTouhes[1].pageX? this.startTouhes[0].pageX : this.startTouhes[1].pageX
                    };
                    const endTouhesPoint = {
                        left:this.endTouhes[0].pageX > this.endTouhes[1].pageX ?this.endTouhes[1].pageX : this.endTouhes[0].pageX,
                        right:this.endTouhes[0].pageX > this.endTouhes[1].pageX ?this.endTouhes[0].pageX : this.endTouhes[1].pageX
                    };
                    // 判断为缩
                    if(endTouhesPoint.left - startTouhesPoint.left > 5 && startTouhesPoint.right - endTouhesPoint.right > 5){
                        let level = this.state.level;
                        console.log('缩',level);
                        if(this.state.level == 5){
                            return;
                        }
                        if(this.state.level == 60){
                            level = 5;
                        }
                        if(this.state.level == 240){
                            level = 60;
                        }
                        const shaftArr = this.initShaft(level,this.nowDate);
                        this.onCountMoveX(shaftArr,this.nowDate,level);
                        this.state.level = level;
                        this.state.shaftArr = level;
                        this.setState({
                            level,
                            shaftArr
                        });
                        
                    }
                    // 判断为放
                    if(startTouhesPoint.left - endTouhesPoint.left > 5 && endTouhesPoint.right - startTouhesPoint.right > 5){
                        let level = this.state.level;
                        if(this.state.level == 240){
                            return;
                        }
                        if(this.state.level == 60){
                            level = 240;
                        }
                        if(this.state.level == 5){
                            level = 60;
                        }
                        const shaftArr = this.initShaft(level,this.nowDate);
                        this.onCountMoveX(shaftArr,this.nowDate,level);
                        this.state.level = level;
                        this.state.shaftArr = level;
                        this.setState({
                            level,
                            shaftArr
                        });
                       
                    }
                    // 归零
                    this.startTouhes = null;
                    this.endTouhes = null;
                    this.isZoom = false;
                    // 返回缩放的等级和当前缩放后的数据
                    const data = {
                        level,
                        data:shaftArr
                    };
                    this.props.onZoomTouches(data);
                }
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
    render(){
        return (
            <View {...this._panResponder.panHandlers} style={this.renderStyle()} refs={'shaftView'}>
                <View style={this.mainShaftStyle()}>
                </View>
                <View ref={'shaftElement'} style={{flexDirection:'row',position:'absolute',bottom:0,right:this.state.moveX,height:'100%'}}>
                    {
                        this.state.shaftArr.map((item,index) => {
                            return <View style={[{width:this.props.scaleWidth,textAlign:'left',alignItems:'flex-end',flexDirection:'row'}]} key={index}>
                                <View style={this.renderShaftStyle(item)}></View>
                                <Text style={{textAlign:'left',fontSize:8,color:'#ADAFAF',width:this.props.scaleWidth * 5}}>
                                    {item.isMainShaft?item.value:''}
                                </Text>
                            </View>;
                        })
                    }
                </View>
            </View>
        );
    }
    /**
     * 设置拖动条样式
     */
    renderStyle(){
        const {style,shaftHeight} = this.props;
        const styles = [{
            width:'100%',
            height:shaftHeight,
            position:'relative',
            backgroundColor:'#343837',
        }].concat(style);
        return styles;
    }
    /**
     * 设置刻度样式
     */
    renderShaftStyle(data){
        const {shaftHeight,scaleMainHeight,scaleMinorHeight,scaleWidth} = this.props;
        const top = data.isMainShaft?(shaftHeight - scaleMainHeight) / 2 : (shaftHeight - scaleMinorHeight) / 2;
        const height = data.isMainShaft?scaleMainHeight : scaleMinorHeight;
        const styles = [{
            top,
            height,
            position:'absolute',
            width:scaleWidth,
            borderLeftColor:'#7A7D7C',
            borderLeftWidth:StyleSheet.hairlineWidth,
            borderStyle:'solid'
        }];
        return styles;
    }
    /**
     * 设置主轴样式
     */
    mainShaftStyle(){
        const {mainShaftStyle} = this.props;
        const styles = [{
            backgroundColor:'#FF9135',
            position:'absolute',
            left:'50%',
            marginLeft:-1,
            height:'100%',
            width:2
        }].concat(mainShaftStyle);
        return styles;
    }

}


const styles = StyleSheet.create({
    borderLeft:{
        borderLeftColor:'#7A7D7C',
        borderLeftWidth:StyleSheet.hairlineWidth,
        borderStyle:'solid'
    }
});
