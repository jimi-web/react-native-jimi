/*
 * @Descripttion: 按钮
 * @version: 
 * @Author: liujinyuan
 * @Date: 2019-08-12 16:08:59
 * @LastEditors  : liujinyuan
 * @LastEditTime : 2019-12-25 16:13:56
 */


import React, {Component} from 'react';
import {Text, View,StyleSheet,Image,TouchableOpacity,PanResponder,Dimensions,Animated} from 'react-native';
import PropTypes from 'prop-types';

const {width,height} = Dimensions.get('window');
// 计算时间轴当前位置
export default class Timeline extends Component {
    static propTypes = {
        ...View.propTypes,
        scale: PropTypes.number,
        scaleMinorHeight:PropTypes.number,
        scaleMainHeight:PropTypes.number,
        shaftHeight:PropTypes.number,
        minValue:PropTypes.number,
        nowTime:PropTypes.number,//首次进来的时间
        fileList:PropTypes.array,
        autoTime:PropTypes.number
    };
    static defaultProps = {
        ...View.defaultProps,
        scaleWidth:15,
        scaleMinorHeight:14,
        scaleMainHeight:24,
        shaftHeight:44,
        autoTime:0,
        minValue:new Date().getTime(),//接受一个时间错
        nowTime:new Date().getTime(),//当前进来主轴的时间
        fileList:[
            {
                startTime:new Date().getTime() - 6000000,
                endTime:new Date().getTime()
            }
        ]
    };
    constructor(props){
        super(props);
        this.isZoom = false;//是否触发缩放
        this.startTouhes = null;//开始的触摸点
        this.endTouhes = [];//结束的触摸点
        this.nowMoveX = 0;//最小的时间刻度
        this.addMoveX = 0;//每次滑动的距离
        this.nowDate = new Date().getTime() + 10000;
        this.zeroDay = new Date(new Date().toLocaleDateString()).getTime();
        this.defaultScaleNumber = 120;//默认一进来加载刻度为120
        this.state = {
            shaftArr:[],
            level:60,//等级单位为分钟，当前共有5，60，240，三个等级
            moveX:0,
            shrink:new Animated.Value(40),
            relese:new Animated.Value(10),
            opacity:new Animated.Value(0),
            releseOpacity:new Animated.Value(0),
        };
    }
    componentDidMount(){
        const shaftArr = this.initShaft(this.state.level,this.props.nowTime);
        this.setState({
            shaftArr
        });
    }
    /**
     * 初始化数据
     */
    initShaft = (level,nowTime) => {
        const shaft  = [];
        const day  = 1 * 60 * 60 * 1000;
        const nowDay = Math.floor(nowTime / day) * day  - level / 5 * 60 * 60 * 1000;
        this.zeroDay = nowDay;
        let index = 24 * 5 * 2;
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
     * 计算刻度条的位置
     */
    onCountMoveX = () => {
        const {scaleWidth,nowTime} = this.props;
        const shaft = this.state.shaftArr;
        // if(nowTime > shaft[shaft.length - 1].time || nowTime < shaft[0].time){
        //     let shaftArr = this.initShaft(this.state.level,nowTime);
        //     this.setState({
        //         shaftArr
        //     });
        // }
        const level  = this.state.level;
       
        if(!shaft.length){
            return 0;
        }
        // console.log(shaft,nowTime,'当前的时间对比');
        const moveX = 0 - (shaft[shaft.length - 1].time - nowTime) / this.onCountPxToTime(level) - scaleWidth + width/2;
        // console.log(nowTime,moveX,'当前获取的值');
        this.state.moveX = moveX;
        // console.log(moveX,'当前的的位置');
        return moveX;
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
                this.isTouch = true;
            },
            onPanResponderMove: (evt, gestureState) => {
                let moveX = this.state.moveX - gestureState.dx / 5;
                // console.log(this.state.moveX,moveX,gestureState.dx);
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
                    if(gestureState.dx == 0){
                        return;
                    }
                    if(this.nowDate > this.props.minValue && gestureState.dx < 0){
                        return;
                    }
                    // 最近一次的移动距离为gestureState.move{X,Y}
                    // 计算时间(刻度初始化时溢出一格)
                    this.nowDate = parseInt(this.state.shaftArr[this.state.shaftArr.length - 1].time - (0 - moveX - this.props.scaleWidth + width / 2) * this.onCountPxToTime(this.state.level));
                    // console.log(this.nowDate,'获取的时间');
                    // const index = gestureState.dx
                    // 自动添加刻度
                    let moveIndex = Math.ceil(Math.abs(gestureState.dx) / 5 / 15);//此次需要添加多少刻度
                    let arrLength = this.state.shaftArr.length - 1;  
                    // for (let i = 0; i < moveIndex; i++) {
                    //     arrLength = this.state.shaftArr.length - 1;
                    //     if( gestureState.dx > 0){
                    //         // 右滑增加
                    //         const arrStart = this.state.shaftArr[0];
                    //         const time = arrStart.time - this.state.level / 5 * 60 * 1000;
                    //         const timeIndex = (this.zeroDay -  5 * (this.state.level / 5) * 60 * 1000 - time)  / 60 / 1000;
                    //         const item = {
                    //             time,
                    //             isMainShaft:timeIndex % this.state.level == 0?true:false,                                                                                                                                                 
                    //             value:this.onCountTime(time)
                    //         };
                    //         this.state.shaftArr.unshift(item);
                            
                    //     }else{
                    //         // 左滑增加
                    //         const arrEnd = this.state.shaftArr[arrLength];
                    //         const time = arrEnd.time + this.state.level / 5 * 60 * 1000;
                    //         const timeIndex = (time - this.zeroDay -  5 * (this.state.level / 5) * 60 * 1000)  / 60 / 1000;
                    //         const item = {
                    //             time,
                    //             isMainShaft:timeIndex % this.state.level == 0?true:false,                                                                                                                                                 
                    //             value:this.onCountTime(time)
                    //         };
                    //         this.state.shaftArr.push(item);
                            
                    //     }                                     
                    // }
                    // console.log(this.state.shaftArr,'移动时改变数据');
                    const data = {
                        nowTime:this.nowDate,
                        shaftArr:this.state.shaftArr,
                        touchesDirection:gestureState.dx > 0 ? 'left':'right'
                    };
                    // console.log(data,'移动中的数据');
                    this.props.onTouches && this.props.onTouches(data);//移动时抛出的数据
                }
            },
            onPanResponderTerminationRequest: (evt, gestureState) => true,
            onPanResponderRelease: (evt, gestureState) => {
                // console.log(this.nowDate,'结束',this.isZoom);
                this.isTouch = false;
                if(this.addMoveX){
                    const arr = this.initShaft(this.state.level,this.nowDate);
                    // console.log(arr,'当前的数据');
                    this.setState({ shaftArr:arr });
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
                    let level = this.state.level;
                    // 判断为缩
                    if(startTouhesPoint.left - endTouhesPoint.left > 5 && endTouhesPoint.right - startTouhesPoint.right > 5){
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
                        this.state.level = level;
                        this.state.shaftArr = shaftArr;
                        // 缩的动画
                        // 放的动画
                        Animated.sequence([
                            Animated.timing(
                                this.state.releseOpacity,
                                {
                                    toValue:1,
                                    duration:100
                                }
                            ),
                            Animated.timing(
                                this.state.relese,
                                {
                                    toValue:50,
                                    duration:300
                                }
                            )
                        ]).start(() => {
                            this.setState({
                                level,
                                shaftArr
                            },() => {
                                Animated.sequence([
                                    Animated.timing(
                                        this.state.releseOpacity,
                                        {
                                            toValue:0,
                                            duration:50
                                        }
                                    ),
                                    Animated.timing(
                                        this.state.relese,
                                        {
                                            toValue:10,
                                            duration:100
                                        }
                                    )
                                ]).start();
                            });
                        });
                        
                    }
                    // 判断为放
                    if(endTouhesPoint.left - startTouhesPoint.left > 5 && startTouhesPoint.right - endTouhesPoint.right > 5){

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
                        this.state.level = level;
                        this.state.shaftArr = shaftArr;
                        Animated.sequence([
                            Animated.timing(
                                this.state.opacity,
                                {
                                    toValue:1,
                                    duration:100
                                }
                            ),
                            Animated.timing(
                                this.state.shrink,
                                {
                                    toValue:10,
                                    duration:300
                                }
                            )
                        ]).start(() => {
                            this.setState({
                                level,
                                shaftArr
                            },() => {
                                Animated.sequence([
                                    Animated.timing(
                                        this.state.opacity,
                                        {
                                            toValue:0,
                                            duration:50
                                        }
                                    ),
                                    Animated.timing(
                                        this.state.shrink,
                                        {
                                            toValue:50,
                                            duration:100
                                        }
                                    )
                                ]).start();
                            });
                        });
                        
                    }
                    // 归零
                    this.startTouhes = null;
                    this.endTouhes = null;
                    this.isZoom = false;
                    // 返回缩放的等级和当前缩放后的数据
                    const data = {
                        level:level,
                        data:this.state.shaftArr
                    };
                    this.props.onZoomTouches && this.props.onZoomTouches(data);
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
                {/* 主轴 */}
                <View style={this.mainShaftStyle()}>
                </View>
                {/* 缩放指示器 */}
                <View style={{width:'100%',height:'100%',position:'absolute'}}>
                    {/* 缩 */}
                    <View style={{width:'100%',height:'100%',position:'absolute',justifyContent:'center',alignItems:'center',flexDirection:'row'}}>
                        <Animated.View style={[{marginRight:this.state.shrink,opacity:this.state.opacity},styles.middle]}>
                            <Image source={require('../../assets/video/video_time_shrink_right.png')} />
                        </Animated.View>
                        <Animated.View style={[{marginLeft:this.state.shrink,opacity:this.state.opacity},styles.middle]}>
                            <Image source={require('../../assets/video/video_time_shrink_left.png')} />
                        </Animated.View>
                    </View>
                    {/* 放 */}
                    <View style={{width:'100%',height:'100%',position:'absolute',justifyContent:'center',alignItems:'center',flexDirection:'row'}}>
                        <Animated.View style={[{marginRight:this.state.relese,opacity:this.state.releseOpacity},styles.middle]}>
                            <Image source={require('../../assets/video/video_time_shrink_left.png')} />
                        </Animated.View>
                        <Animated.View style={[{marginLeft:this.state.relese,opacity:this.state.releseOpacity},styles.middle]}>
                            <Image source={require('../../assets/video/video_time_shrink_right.png')} />
                        </Animated.View>
                    </View>
                </View>
                {/* 刻度 */}
                <View ref={'shaftElement'} style={{flexDirection:'row',position:'absolute',bottom:0,right:this.onCountMoveX(),height:'100%'}}>
                    {/* 刻度条 */}
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
                    {/* 告警时间断 */}
                    {
                        this.state.shaftArr.length && this.props.fileList.length  ?
                            this.props.fileList.map((item,index) => {
                                const width = Math.ceil((item.endTime - item.startTime)/this.onCountPxToTime(this.state.level));
                                const right = parseInt((this.state.shaftArr[this.state.shaftArr.length - 1].time - item.endTime) / this.onCountPxToTime(this.state.level)) + this.props.scaleWidth;
                                return <View key={index} style={[{backgroundColor:'rgba(255, 145, 53, 0.4)',height:'100%',width:width,right:right,position:'absolute',zIndex:998}]}></View>;
                            })
                            :
                            null
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
            overflow:'hidden'
            
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
            width:2,
        }].concat(mainShaftStyle);
        return styles;
    }

}


const styles = StyleSheet.create({
    borderLeft:{
        borderLeftColor:'#7A7D7C',
        borderLeftWidth:StyleSheet.hairlineWidth,
        borderStyle:'solid'
    },
    arrowLeftStyle:{
        width: 0,
        height: 0,
        borderBottomColor:'transparent',
        borderTopColor:'transparent',
        borderLeftColor:'#fff',
        borderTopWidth:10,
        borderBottomWidth:10,
        borderRightWidth:10,
        borderStyle:'solid',
    },
    rectangular:{
        width:40,
        height:5,
        backgroundColor:'#fff'
    },
    middle:{
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center'
    }
});
