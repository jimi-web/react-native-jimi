/*
 * @Descripttion: 
 * @version: 
 * @Author: xieruizhi
 * @Date: 2019-08-19 15:17:13
 * @LastEditors: xieruizhi
 * @LastEditTime: 2019-10-22 14:24:40
 */
import React, {Component} from 'react';
import {View,TouchableOpacity,Image,Text,Slider} from 'react-native';
import PropTypes from 'prop-types';
import MapStyles from '../style/track';
import {ActionSheet} from 'teaset';
import {distance} from '../comm';
export default class Track extends Component {
    static propTypes = {
        onShowType:PropTypes.func,
        onSpeed:PropTypes.func,
        onReplay:PropTypes.func,
        onTrackShow:PropTypes.func,
        isPlay:PropTypes.bool,
        deviceInformation:PropTypes.object,
        onPullTime:PropTypes.func,
        playImg:PropTypes.object,
        onSlidingComplete:PropTypes.func,
    }

    static defaultProps = {
        isPlay:false,
        playImg:{
            play:require('../../../assets/track/play.png'),
            pause:require('../../../assets/track/pause.png')
        },
        onSlidingComplete:()=>{
            
        }
    }


    constructor(props) {
        super(props);
        this.state = {
            selectTimeType:0,//选择时间类型，0为开始时间，1为结束时间
            speedOption:{   //存放速度的配置
                speed:700,
                img:require('../../../assets/track/ratioX1.png')
            },
            showTypeText:'全部',
            playOptionImg:this.props.playImg.play,
            trackOptopn:{ //存放显示和隐藏按钮的配置
                isShow:true,
                img:require('../../../assets/track/track.png')
            }
        };
    }


    render(){
        let {deviceInformation,playImg} = this.props;
        let img = this.props.isPlay ? playImg.pause : playImg.play;
        this.state.playOptionImg = img;
        return (
            <View style={{flex:1}}>
                <View style={MapStyles.details}>
                    <View style={MapStyles.time}>
                        <Text style={MapStyles.timeText}>{deviceInformation.gpsTime ?new Date(deviceInformation.gpsTime).Format('YYYY-MM-DD hh:mm:ss'):new Date(new Date(new Date().Format('yyyy/MM/dd')+' 00:00').getTime()).Format('YYYY-MM-DD hh:mm')}</Text>
                        <TouchableOpacity activeOpacity={1} style={MapStyles.selectTimeIcon} onPress={this.onPullTime}>
                            <Image style={MapStyles.timeIcon} source={require('../../../assets/track/edit_time.png')} />
                        </TouchableOpacity>
                    </View>
                    <View style={MapStyles.speed}>
                        <Text style={[MapStyles.speedText,{marginRight:15}]}>总里程：{deviceInformation.totalDistance?distance(deviceInformation.totalDistance):0+'m' }</Text>
                        <Text style={[MapStyles.speedText,{fontSize:12}]}>|</Text>
                        <Text style={[MapStyles.speedText,{marginLeft:15}]}>时速：{deviceInformation.gpsSpeed?deviceInformation.gpsSpeed:0}km/h</Text>
                    </View>
                </View>
                <Slider
                    style={{width:'100%',height:30}}
                    maximumTrackTintColor={'#C0BDC0'}
                    minimumTrackTintColor={'#2D292D'}
                    thumbImage={require('../../../assets/track/Trajectory_Slider.png')}
                    minimumValue={0}
                    thumbTintColor={'#333033'}
                    value={this.props.progress}
                    maximumValue={this.props.totalProgress}
                    onSlidingComplete = {(value)=>{this.onSlidingComplete(value);}}
                />
                <View style={MapStyles.bottomBtn}>
                    <TouchableOpacity activeOpacity={1} onPress={this.onTrackShow}>
                        <Image style={{width:22,height:22}} source={this.state.trackOptopn.img} />
                    </TouchableOpacity>                    
                    <TouchableOpacity activeOpacity={1} onPress={this.onReplay}>
                        <Image style={{width:22,height:22}} source={require('../../../assets/track/repeat.png')} />
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={1} onPress={this.onPlay}>
                        <Image style={{width:48,height:48}} source={this.state.playOptionImg} />
                    </TouchableOpacity>   
                    <TouchableOpacity activeOpacity={1} onPress={this.onSpeed}>
                        <Image style={{width:22,height:22}} source={this.state.speedOption.img} />
                    </TouchableOpacity>    
                    <TouchableOpacity activeOpacity={1} style={MapStyles.playControllerTextStyle}  onPress={this.showType}  >
                        <Text style={{fontSize:14,color:'#5E5E5E'}}>{this.state.showTypeText}</Text>
                        <Image style={{width:5,height:8}} source={require('../../../assets/track/feather-chevron-arrow.png')} />
                    </TouchableOpacity>                                                                  
                </View>
            </View>
        );
    }

    /**
     * 下拉时间选择框
     */
    onPullTime = ()=> {
        this.props.onPullTime && this.props.onPullTime();
    }

    /**
     * 定位类型
     */
    showType = ()=> {
        let items = [
            {title: '全部', onPress: () => this.onShowType(0,'全部')},
            {title: '卫星' ,onPress: () => this.onShowType(1,'卫星')},
            {title: '基站',onPress: () => this.onShowType(2,'基站')},
            {title: 'WiFi',onPress: () => this.onShowType(3,'WiFi')},
        ];
        let cancelItem = {title: '取消'};
        ActionSheet.show(items, cancelItem);
    }

    onShowType = (val,text) =>{
        this.setState({
            showTypeText:text
        });
        this.props.onShowType && this.props.onShowType(val);
    }
    
    /**
     * 监听速度切换事件
     */
    onSpeed = () =>{
        let speed = null;
        let img = null;
        if(this.state.speedOption.speed == 700){
            speed = 100;
            img = require('../../../assets/track/ratioX2.png');
        }else if(this.state.speedOption.speed == 100){
            speed = 70;
            img = require('../../../assets/track/ratioX3.png');
        }else {
            speed = 700;
            img = require('../../../assets/track/ratioX1.png');
        }

        this.setState({
            speedOption:{
                speed:speed,
                img:img
            } 
        },()=>{
            this.props.onSpeed && this.props.onSpeed(speed);
        });
    }

    /**
     * 播放
     */
    onPlay =()=> {
        let isPlay = !this.props.isPlay ? true : false;
        let img = !this.props.isPlay ? this.props.playImg.pause : this.props.playImg.play;
        this.setState({
            playOptionImg:img
        },()=>{
            this.props.onPlay &&  this.props.onPlay(isPlay);
        });
    }

    /**
     * 重置
     */
    onReplay = () => {
        this.setState({
            playOption:{
                isPlay:true,
                img:require('../../../assets/track/pause.png')
            }
        },()=>{
            this.props.onReplay &&  this.props.onReplay();
        });
    }

    /**
     * 显示隐藏轨迹
     */
    onTrackShow = ()=>{
        let isShow = !this.state.trackOptopn.isShow ? true : false;
        let img = !this.state.trackOptopn.isShow ? require('../../../assets/track/track.png') : require('../../../assets/track/track_hide.png');
        this.setState({
            trackOptopn:{
                isShow:isShow,
                img:img
            }
        },()=>{
            this.props.onTrackShow &&  this.props.onTrackShow(isShow);
        });
    }

    
    onSlidingComplete = (progress)=> {
        if(typeof progress !== 'number'){
            return;
        }
        const currentProgress = parseInt(progress);
        this.props.onSlidingComplete && this.props.onSlidingComplete(currentProgress);        
    }
}