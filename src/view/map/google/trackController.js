/*
 * @Descripttion: 
 * @version: 
 * @Author: xieruizhi
 * @Date: 2019-08-19 15:17:13
 * @LastEditors: xieruizhi
 * @LastEditTime: 2019-09-02 11:50:56
 */
import React, {Component} from 'react';
import {View,Platform,TouchableOpacity,Image,Text,Slider} from 'react-native';
// import { SlideModal,Tab } from 'beeshell';

import MapStyles from '../style/track';
import {ActionSheet,Overlay,SegmentedBar,ListRow,Label} from 'teaset';
import Datepicker from '../../../components/datepicker/Datepicker';
let showPullTime = null;
let showSelectTime = null;
export default class Track extends Component {

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
            activeIndex:3
        };

    }

    componentDidMount() {
        
    }

    render(){
        return (
            <View style={{flex:1}}>
                <View style={MapStyles.details}>
                    <View style={MapStyles.time}>
                        <Text style={MapStyles.timeText}>2019.05.24 00:60</Text>
                        <TouchableOpacity activeOpacity={1} style={MapStyles.timeIcon} onPress={this.showPullTime}>
                            <Image  source={require('../../../assets/track/edit_time.png')} />
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
                />
                <View style={MapStyles.bottomBtn}>
                    <TouchableOpacity activeOpacity={1} >
                        <Image style={{width:22,height:22}} source={require('../../../assets/track/track.png')} />
                    </TouchableOpacity>                    
                    <TouchableOpacity activeOpacity={1} >
                        <Image style={{width:22,height:22}} source={require('../../../assets/track/repeat.png')} />
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={1} >
                        <Image style={{width:48,height:48}} source={require('../../../assets/track/play.png')} />
                    </TouchableOpacity>   
                    <TouchableOpacity activeOpacity={1} >
                        <Image style={{width:22,height:22}} source={require('../../../assets/track/ratioX1.png')} />
                    </TouchableOpacity>    
                    <TouchableOpacity activeOpacity={1} style={MapStyles.playControllerTextStyle}  onPress={this.showType}  >
                        <Text style={{fontSize:14}}>全部</Text>
                        <Image style={{width:5,height:8}} source={require('../../../assets/track/feather-chevron-arrow.png')} />
                    </TouchableOpacity>                                                                  
                </View>
            </View>
        );
    }

    /**
     * 定位类型
     */
    showType = ()=> {
        let items = [
            {title: '全部', onPress: () => alert('Hello')},
            {title: '卫星'},
            {title: '基站'},
            {title: 'WiFi'},
        ];
        let cancelItem = {title: '取消'};
        ActionSheet.show(items, cancelItem);
    }

    /**
     * 显示时间选择器
     */
    showPullTime = ()=>{
        let overlayView = <Overlay.View side='bottom' modal={false}>
            <View style={MapStyles.slideModalTime}>
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
                                return <SegmentedBar.Item title={item.key} titleStyle={MapStyles.titleStyle} activeTitleStyle={MapStyles.activeTitleStyle}  />;
                            })
                        }
                    </SegmentedBar>
                </View>
                <View style={MapStyles.slideModalTimeContent}>
                    <ListRow title={
                        <View style={MapStyles.listRow}>
                            <Text style={MapStyles.listRowTitle}>开始时间</Text>
                            <Text style={MapStyles.listRowValue}>2018.05.14 08:00:00</Text>
                        </View>
                    }  accessory='indicator'
                    onPress={()=>{
                        Datepicker.show({
                            onConfirm:(res)=>{
                                console.log(res);
                                console.log('结果');
                            }
                        });
                    }}
                    />
                    <ListRow title={
                        <View style={[MapStyles.listRow]}>
                            <Text style={MapStyles.listRowTitle}>结束时间</Text>
                            <Text style={MapStyles.listRowValue}>2018.05.14 08:00:00</Text>
                        </View>
                    }  accessory='indicator'
                    style={MapStyles.endTime}
                    />
                    <View style={MapStyles.btn}>
                        <TouchableOpacity activeOpacity={1} style={[MapStyles.btnItem,MapStyles.cancel]} onPress={()=>{
                            Overlay.hide(showPullTime);
                        }} >
                            <Text style={[MapStyles.btnItemText]}>取消</Text>
                        </TouchableOpacity>  
                        <TouchableOpacity activeOpacity={1} style={[MapStyles.btnItem,MapStyles.confirm]}  >
                            <Text style={[MapStyles.btnItemText,{color:'#fff'}]}>确认</Text>
                        </TouchableOpacity>  
                    </View>
                </View>
            </View>
        </Overlay.View>
          ;
        showPullTime = Overlay.show(overlayView);
    } 

    /**
     * 切换事件
     */
    onBarChange = (index)=>{
        // let getDate = this.getDates(new Date('2019-8-10'));
        // console.log(getDate);
        
    
        // console.log(getDate.indexOf(getDate[3]));
        // console.log(getDate.slice(0,getDate.indexOf(getDate[3])));
    }

    /**
     * 获取本周
     */
    getDates = (currentTime) =>{
        var currentDate = new Date(currentTime);
        var timesStamp = currentDate.getTime();
        var currenDay = currentDate.getDay();
        var dates = [];
        for (var i = 0; i < 7; i++) {
            dates.push(new Date(timesStamp + 24 * 60 * 60 * 1000 * (i - (currenDay + 6) % 7)).toLocaleDateString().replace(/\//g, '-'));
        }
        return dates;
    }





}