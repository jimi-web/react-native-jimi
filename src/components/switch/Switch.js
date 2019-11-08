import React,{Component} from 'react';
import {View,Text,StyleSheet,TouchableOpacity,Animated} from 'react-native';
import PropTypes from 'prop-types';

export default class Switch  extends Component {

    static propTypes = {
        value: PropTypes.bool,
        style:PropTypes.object,
        activeColor:PropTypes.string,
        defaultColor:PropTypes.string,
        disabled: PropTypes.bool,
        onValueChange: PropTypes.func,
    }

    static defaultProps = {
        style:{},
        value: false,
        activeColor: '#4BD865',//打开状态颜色
        defaultColor: '#fff',//关闭状态颜色
        disabled:false,
        onValueChange:()=>{}
    }

    constructor(props) {
        super(props);
        this.state ={
            value:props.value,
            backgroundColor: new Animated.Value(props.value ? 75 : -75),
            width: new Animated.Value(props.value ? 75 : -75),
            height: new Animated.Value(props.value ? 75 : -75),
            left:new Animated.Value(props.value ? 75 : -75),
            borderWidth:new Animated.Value(props.value ? 75 : -75),
            switchWith:50,
            switchHeight:30
        };
    }

    animateSwitch(value, cb = () => {}) {
        Animated.parallel([
            Animated.spring(this.state.width, {
                toValue: value ? 75 : -75,
                duration: 500
            }),
            Animated.spring(this.state.height, {
                toValue: value ? 75 : -75,
                duration: 500
            }),
            Animated.spring(this.state.left, {
                toValue: value ? 75 : -75,
                duration: 500
            }),
            Animated.spring(this.state.borderWidth, {
                toValue: value ? 75 : -75,
                duration: 500
            })
        ]).start(cb);
    }


    render(){
        const widthAnimation = this.state.width.interpolate({
            inputRange: [-75, 75],
            outputRange: [this.state.switchWith, 0]
        });

        const heightAnimation = this.state.height.interpolate({
            inputRange: [-75, 75],
            outputRange: [this.state.switchHeight,0]
        });


        const leftAnimation = this.state.left.interpolate({
            inputRange: [-75, 75],
            outputRange: [1,this.state.switchWith-(this.state.switchHeight-2)-1]
        });

        const borderWidthAnimation = this.state.borderWidth.interpolate({
            inputRange: [-75, 75],
            outputRange: [1,0]
        });

        return <TouchableOpacity activeOpacity={1} onPress={this.onSwitch}>
            <View style={[styles.container,{backgroundColor:this.props.activeColor,...this.props.style}]} onLayout={this._onLayout}>
                <Animated.View style={[styles.containerBtn, {
                    width:widthAnimation,
                    height:heightAnimation,
                    borderWidth:borderWidthAnimation,
                    backgroundColor:this.props.defaultColor
                }]}>

                </Animated.View >
                <Animated.View style={[styles.circle,{
                    width:this.state.switchHeight-2,
                    height:this.state.switchHeight-2,
                    borderRadius:this.state.switchHeight-2,
                    left:leftAnimation
                }]}>
                    <TouchableOpacity onPress={this.onSwitch}></TouchableOpacity>
                </Animated.View>
            </View>
        </TouchableOpacity>;
    }

    onSwitch = ()=>{
        if(!this.props.disabled){
            this.animateSwitch(!this.state.value,()=>[
                this.setState({
                    value:!this.state.value
                },()=>{
                    this.props.onValueChange(this.state.value);
                })
            ]);
        }
    }

    _onLayout =(e)=>{
        let data = e.nativeEvent.layout;
        this.setState({
            switchHeight:data.height,
            switchWith:data.width
        });
    }
    
}

const styles = StyleSheet.create({
    container:{
        position:'relative',
        width: 50,
        height: 30,
        borderRadius: 30,
        justifyContent:'center',
    },
    containerBtn:{
        position:'absolute',
        right:0,
        width: 0,
        height: 28,
        borderRadius: 30,
        borderWidth:1,
        borderColor:'#ECECEC'
    },
    circle:{
        position:'absolute',
        left:1,
        backgroundColor:'#fff',
        shadowColor:'#000000',
        shadowOffset:{w:8,h:2},
        shadowOpacity:0.1,
        shadowRadius:4,
        elevation: 2,
    }
});