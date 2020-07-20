/*
 * @Description: 
 * @Version: 
 * @Autor: xieruizhi
 * @Date: 2020-07-08 11:22:32
 * @LastEditors: xieruizhi
 * @LastEditTime: 2020-07-20 15:12:06
 */ 

import React,{Component} from 'react';
import PropTypes from 'prop-types';
import {Theme,Icon} from '../../../components/index';
import {View,TouchableOpacity,Image,Text,Slider} from 'react-native';
import MapStyles from '../style/track';

 export default class MarkerController extends Component {
    
    static propTypes = {
        onSpeed:PropTypes.func,
        onReplay:PropTypes.func,
        isPlay:PropTypes.bool,
        deviceInformation:PropTypes.object,
        playImg:PropTypes.object,
        onSlidingComplete:PropTypes.func,    
        byClickMarkerInfo:PropTypes.object,//点击marker传入的设备信息
        isPanelShow:PropTypes.bool,//是否显示点击marker出现的面板
        onPanel:PropTypes.func,
    }

    static defaultProps = {
        isPlay:false,
        deviceInformation:{},
        onSpeed:()=>{},
        onReplay:()=>{},
        onSlidingComplete:()=>{}, 
        playImg:{
            play:'journey_detail_icon_play',
            pause:'journey_detail_icon_stop'
        },
        byClickMarkerInfo:{
            date:'',
            address:''
        },
        isPanelShow:false,
        onPanel:()=>{}
    }


    constructor(props){
        super(props);
        this.state = {
            speedOption:{
                text:'x1.0',
                value:700
            }
        }
        
    }


    render(){
        let {deviceInformation,byClickMarkerInfo,isPanelShow} = this.props;
        return <View style={MapStyles.markerController}>
            {
                isPanelShow?
                    <View style={[MapStyles.panel,MapStyles.info]}>
                    <TouchableOpacity style={MapStyles.iconDown} onPress={this.onPanel}>
                        <Icon  name={'location_icon_down'}  size={20} />
                    </TouchableOpacity>
                    <Text style={MapStyles.address}>{byClickMarkerInfo.address}</Text>
                    <Text style={MapStyles.date}>{new Date(byClickMarkerInfo.date).Format('YYYY-MM-DD hh:mm')}</Text>
                 </View>:null
            }
            <View style={[MapStyles.panel,MapStyles.player]}>
                <View style={MapStyles.mainInfo}>
                    <Text style={MapStyles.playDate}>{deviceInformation.gpsTime ?new Date(deviceInformation.gpsTime).Format('YYYY-MM-DD hh:mm'):new Date(new Date(new Date().Format('yyyy/MM/dd')+' 00:00').getTime()).Format('YYYY-MM-DD hh:mm')}</Text>
                    <Text style={MapStyles.speedPerHour}>时速：{deviceInformation.gpsSpeed?deviceInformation.gpsSpeed:0}km/h</Text>
                </View>
                <View style={MapStyles.Slider}>
                    <Slider
                        style={{width:'100%',height:30}}
                        maximumTrackTintColor={Theme.sliderMaximumTrackTintColor}
                        minimumTrackTintColor={Theme.sliderMinimumTrackTintColor}
                        thumbImage={require('../../../assets/track/journey_detail_slider_icon_dot.png')}
                        minimumValue={0}
                        thumbTintColor={Theme.thumbTintColor}
                        value={this.props.progress}
                        maximumValue={this.props.totalProgress}
                        onSlidingComplete = {(value)=>{this.onSlidingComplete(value);}}
                    />
                </View>
                <View style={MapStyles.operatingBtn}>
                    <TouchableOpacity style={MapStyles.iconReplay}>
                        <Icon  name={'journey_detail_icon_replay'} activeOpacity={1}  size={24} onPress={this.onReplay}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={MapStyles.iconStop} activeOpacity={1} onPress={this.onPlay}>
                        <Icon  name={this.props.isPlay?this.props.playImg.pause:this.props.playImg.play}  size={40} />
                    </TouchableOpacity>
                    <TouchableOpacity style={MapStyles.iconSpeed} activeOpacity={1} onPress={this.onSpeed}>
                        <Icon  name={'journey_detail_icon_speed'}  size={20} />
                        <Text style={MapStyles.speedText}>{this.state.speedOption.text}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>;
    }

    onSlidingComplete = (progress)=> {
        if(typeof progress !== 'number'){
            return;
        }
        const currentProgress = parseInt(progress);
        this.props.onSlidingComplete && this.props.onSlidingComplete(currentProgress);           
    }

    /**
     * 重置
     */
    onReplay = () => {
        this.props.onReplay &&  this.props.onReplay();
    }

    /**
     * 播放
     */
    onPlay =()=> {
        let isPlay = !this.props.isPlay ? true : false;
        console.log(isPlay,'asdasdasda');
        this.props.onPlay &&  this.props.onPlay(isPlay);
    }    

    /**
     * 监听速度切换事件
     */
    onSpeed = () =>{
        let value = null;
        let text = null;
        if(this.state.speedOption.value == 700){
            value = 100;
            text = 'x2.0'
        }else if(this.state.speedOption.value == 100){
            value = 70;
            text = 'x3.0'
        }else {
            value = 700;
            text = 'x1.0'
        }

        this.setState({
            speedOption:{
                value:value,
                text:text
            } 
        },()=>{
            this.props.onSpeed && this.props.onSpeed(value);
        });
    }  
    
    onPanel = ()=>{
        this.props.onPanel();
    }
 }