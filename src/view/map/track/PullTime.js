/*
 * @Descripttion: 
 * @version: 
 * @Author: xieruizhi
 * @Date: 2019-09-16 09:59:51
 * @LastEditors: xieruizhi
 * @LastEditTime: 2019-09-19 15:17:51
 */
import React, {Component} from 'react';
import {View,TouchableOpacity,Text,DeviceEventEmitter} from 'react-native';
import PropTypes from 'prop-types';
import {BoxShadow} from 'react-native-shadow';
import MapStyles from '../style/track';
import themes from '../../../components/themes';
import {SegmentedBar,ListRow,Toast} from 'teaset';
import Datepicker from '../../../components/datepicker/Datepicker';

export default class PullTime extends Component {
    static propTypes = {
        onConfirm:PropTypes.func,
        dimDd:PropTypes.number,//两个时间相隔天数
    }

    static defaultProps = {
        dimDd:7,
        startDate:new Date(new Date(new Date().Format('yyyy/MM/dd')+' 00:00').getTime()).Format('YYYY-MM-DD hh:mm'),
        endDate:new Date().Format('YYYY-MM-DD hh:mm'),//开始时间
    }

    static show() {
        let isShow = true;
        DeviceEventEmitter.emit('jmPullTime',isShow);
    }

    static hide() {
        let isShow = false;
        DeviceEventEmitter.emit('jmPullTime',isShow);
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
            startDate:this.props.startDate,//开始时间
            endDate:this.props.endDate,//开始时间
            selectTimeType:0,//选择时间类型，0为开始时间，1为结束时间
            isShowPullTime:false
        };
    }

    componentDidMount() {
        DeviceEventEmitter.addListener('jmPullTime', isShow=>{
            this.setState({
                isShowPullTime:isShow,
            });
        });
    }

    componentWillUnmount() {
        DeviceEventEmitter.removeAllListeners('jmPullTime');
    }

    render() {
        return <View>
            {this.state.isShowPullTime ?
                <View style={MapStyles.slideModalTime}>
                    <BoxShadow setting={tabOp} >
                        <View style={MapStyles.tab}> 
                            <SegmentedBar 
                                indicatorType={'customWidth'} 
                                indicatorLineColor={themes.TextColorPrimary} 
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
                    </BoxShadow>
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
                            <BoxShadow setting={shadowOpt} >
                                <TouchableOpacity activeOpacity={1} style={[MapStyles.btnItem,MapStyles.cancel]} onPress={()=>{
                                    this.setState({
                                        isShowPullTime:false
                                    });
                                }} >
                              
                                    <Text style={[MapStyles.btnItemText]}>取消</Text>  
                                
                               
                                </TouchableOpacity>  
                            </BoxShadow>
                            <TouchableOpacity activeOpacity={1} style={[MapStyles.btnItem,MapStyles.confirm]} onPress={this.onConfirm} >
                                <Text style={[MapStyles.btnItemText,{color:'#fff'}]}>确认</Text>
                            </TouchableOpacity>  
                        </View>
                    </View>
                    <Datepicker onConfirm={this.datepickerOnConfirm}></Datepicker>
                </View>:null
            }
        </View>;
    } 




    /**
     * 确定监听事件
     */
    onConfirm = ()=> {
        this.setState({
            isShowPullTime:false
        });
        this.props.onConfirm && this.props.onConfirm({startDate:this.state.startDate,endDate:this.state.endDate});
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
        });
    }

    /**
     *时间选择确定事件
     */
    datepickerOnConfirm = (value)=> {
        //不允许选择未来的日期
        let atPresent = new Date();
        let getTime = new Date(value);
        if(getTime>atPresent){
            Toast.message('选择的时间不能大于当前时间');
            return;
        }

        //获取时间
        let st=this.state.selectTimeType ? this.state.startDate : value;
        let et=this.state.selectTimeType ? value : this.state.endDate;
        //对时间进行对比
        let stdt=new Date(st.replace(/-/g,'/'));
        let etdt=new Date(et.replace(/-/g,'/'));
       
        
        //开始时间和结束时间差校验
        if(stdt>etdt){
            Toast.message('开始时间不能大于结束时间');
            return;
        }
        
        //相隔时间校验
        if(parseInt((etdt-stdt)/ (1000 * 60 * 60 * 24))>this.props.dimDd){
            Toast.message('选择的时间只允许在'+this.props.dimDd+'天之内');
            return;
        }

      
        //设置时间到回调提供外部调用
        this.setState({
            endDate:et,
            startDate:st
        });
    }
}

const shadowOpt = {
    width:128,
    height:38,
    color:'#e0e0e0',
    border:15,
    radius:19,
    opacity:0.3,
    x:0,
    y:0,
    style:{marginVertical:0}
};

const tabOp = {
    width:326,
    height:46,
    color:'#e0e0e0',
    border:6,
    radius:4,
    opacity:0.5,
    x:0,
    y:0,
    style:{marginVertical:0, position:'absolute',top:0,left:'50%',marginLeft:-163,zIndex:999}
};
