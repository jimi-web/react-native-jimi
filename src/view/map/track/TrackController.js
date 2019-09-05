/*
 * @Descripttion: 
 * @version: 
 * @Author: xieruizhi
 * @Date: 2019-08-19 15:17:13
 * @LastEditors: xieruizhi
 * @LastEditTime: 2019-09-05 16:10:47
 */
import React, {Component} from 'react';
import {View,Platform,TouchableOpacity,Image,Text,Slider} from 'react-native';
import PropTypes from 'prop-types';
import MapStyles from '../style/track';
import {ActionSheet,Overlay,SegmentedBar,ListRow,Label} from 'teaset';
import Datepicker from '../../../components/datepicker/Datepicker';
export default class Track extends Component {
    static propTypes = {
        onConfirm:PropTypes.func,
        onBarChange:PropTypes.func,
        onShowType:PropTypes.func,
        onSpeed:PropTypes.func,
        onReplay:PropTypes.func,
        onTrackShow:PropTypes.func,
    }


    constructor(props) {
        super(props);
        this.state = {
            timeType:[{
                key:'上周',
                value:0
            },{
                key:'本周',
                value:1
            },{
                key:'昨天',
                value:2
            },{
                key:'今天',
                value:3
            }],
            activeIndex:3,
            startDate:new Date(new Date(new Date().Format('yyyy/MM/dd')+' 00:00').getTime()).Format('YYYY-MM-DD hh:mm'),//开始时间
            endDate:new Date().Format('YYYY-MM-DD hh:mm'),//开始时间
            isShowPullTime:false, //是否显示选择时间弹框
            selectTimeType:0,//选择时间类型，0为开始时间，1为结束时间
            speedOption:{   //存放速度的配置
                speed:700,
                img:require('../../../assets/track/ratioX1.png')
            },
            showTypeText:'全部',
            playOptionImg:require('../../../assets/track/play.png'),
            trackOptopn:{ //存放显示和隐藏按钮的配置
                isShow:true,
                img:require('../../../assets/track/track.png')
            }
        };
    }


    render(){
        return (
            <View style={{flex:1}}>
                <View style={MapStyles.details}>
                    <View style={MapStyles.time}>
                        <Text style={MapStyles.timeText}>2019.05.24 00:60</Text>
                        <TouchableOpacity activeOpacity={1} style={MapStyles.selectTimeIcon} onPress={()=>{
                            this.setState({
                                isShowPullTime:true
                            });
                        }}>
                            <Image style={MapStyles.timeIcon} source={require('../../../assets/track/edit_time.png')} />
                        </TouchableOpacity>
                    </View>
                    <View style={MapStyles.speed}>
                        <Text style={[MapStyles.speedText,{marginRight:15}]}>总里程：100KM</Text>
                        <Text style={[MapStyles.speedText,{fontSize:12}]}>|</Text>
                        <Text style={[MapStyles.speedText,{marginLeft:15}]}>时速：10km/h</Text>
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
                        <Text style={{fontSize:14}}>{this.state.showTypeText}</Text>
                        <Image style={{width:5,height:8}} source={require('../../../assets/track/feather-chevron-arrow.png')} />
                    </TouchableOpacity>                                                                  
                </View>
                {
                    this.state.isShowPullTime ? this.showPullTime() : null
                }
                <Datepicker onConfirm={this.datepickerOnConfirm}></Datepicker>
            </View>
        );
    }


    /**
     * 显示时间选择器
     */
    showPullTime = ()=>{
        return <View style={MapStyles.slideModalTime}>
            <View style={MapStyles.tab}> 
                <SegmentedBar 
                    indicatorType={'customWidth'} 
                    indicatorLineColor={'#03B8A6'} 
                    indicatorLineWidth={3} 
                    indicatorWidth={26}
                    indicatorPositionPadding={-8}
                    activeIndex={this.state.activeIndex}
                    onChange={index => this.onBarChange(index)}
                >
                    {
                        this.state.timeType.map((item,index)=>{
                            return <SegmentedBar.Item title={item.key} key={'SegmentedBar'+index} titleStyle={MapStyles.titleStyle} activeTitleStyle={MapStyles.activeTitleStyle}  />;
                        })
                    }
                </SegmentedBar>
            </View>
            <View style={MapStyles.slideModalTimeContent}>
                <ListRow title={
                    <View style={MapStyles.listRow}>
                        <Text style={MapStyles.listRowTitle}>开始时间</Text>
                        <Text style={MapStyles.listRowValue}>{this.state.startDate}</Text>
                    </View>
                }  accessory='indicator'
                onPress={()=>{
                    this.isDatepickerShow(this.state.startDate,0);
                }}
                />
                <ListRow title={
                    <View style={[MapStyles.listRow]}>
                        <Text style={MapStyles.listRowTitle}>结束时间</Text>
                        <Text style={MapStyles.listRowValue}>{this.state.endDate}</Text>
                    </View>
                }  accessory='indicator'
                onPress={()=>{
                    this.isDatepickerShow(this.state.endDate,1);
                }}
                style={MapStyles.endTime}
                />
                <View style={MapStyles.btn}>
                    <TouchableOpacity activeOpacity={1} style={[MapStyles.btnItem,MapStyles.cancel]} onPress={()=>{
                        this.setState({
                            isShowPullTime:false
                        });
                    }} >
                        <Text style={[MapStyles.btnItemText]}>取消</Text>
                    </TouchableOpacity>  
                    <TouchableOpacity activeOpacity={1} style={[MapStyles.btnItem,MapStyles.confirm]}  >
                        <Text style={[MapStyles.btnItemText,{color:'#fff'}]}>确认</Text>
                    </TouchableOpacity>  
                </View>
            </View>
        </View>;
    } 

    /**
     *时间选择确定事件
     */
    datepickerOnConfirm = (value)=> {
        this.setState({
            endDate:this.state.selectTimeType ? valuee : this.state.endDate,
            startDate:this.state.selectTimeType ? value : this.state.startDate
        },()=>{
            this.props.onConfirm && this.props.onConfirm({startDate:this.state.startDate,endDate:this.state.endDate});
        });
    }

    /**
     * 选择时间类型
     * @param {String} defaultValue 选择时间默认值
     * @param {Number} selectTimeType 是开始时间还是结束时间
     */
    isDatepickerShow = (defaultValue,selectTimeType)=>{
        Datepicker.show({
            defaultValue:defaultValue
        });
        this.setState({
            selectTimeType:selectTimeType
        });
    }

    /**
     * 切换事件
     */
    onBarChange = (index) => {
        const today = new Date(new Date().Format('yyyy/MM/dd')+' 00:00').getTime();//今天0点的毫秒数
        const dayTime = 24 * 60 * 60 * 1000;//一天的毫秒
        const weekNumber = new Date().getDay()-1;//今天是本周第几天
        let startDate = new Date(today).Format('YYYY-MM-DD hh:mm');
        let endDate = new Date().Format('YYYY-MM-DD hh:mm');
        switch (index) {
        case 0:
            const startTime = today - dayTime * (weekNumber + 7);
            startDate = new Date(startTime).Format('yyyy-MM-dd hh:mm');
            const endTime = today - dayTime * weekNumber - 1000;
            endDate = new Date(endTime).Format('yyyy-MM-dd hh:mm');
            break;
        case 1:
            const startTimeWeek = today - dayTime * weekNumber;
            startDate = new Date(startTimeWeek).Format('yyyy-MM-dd hh:mm');
            break;
        case 2:
            const startTimeToday = today - dayTime;
            startDate = new Date(startTimeToday).Format('yyyy-MM-dd hh:mm');
            const endTimeDay = new Date(new Date().Format('yyyy/MM/dd')+' 00:00').getTime() - 1000;
            endDate = new Date(endTimeDay).Format('YYYY-MM-DD hh:mm');
            break;
        case 3:
            startDate = new Date(today).Format('YYYY-MM-DD hh:mm');
            endDate = new Date().Format('YYYY-MM-DD hh:mm');
            break;
        }
        
        this.setState({
            startDate:startDate,
            endDate:endDate,
            activeIndex:index
        },()=>{
            this.props.onBarChange && this.props.onBarChange({startDate:startDate,endDate:endDate});
        });
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
        let img = !this.props.isPlay ? require('../../../assets/track/pause.png') : require('../../../assets/track/play.png');
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
}