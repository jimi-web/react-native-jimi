/*
 * @Descripttion: 录音控制面板
 * @version: 
 * @Author: liujinyuan
 * @Date: 2019-09-17 16:06:14
 * @LastEditors: liujinyuan
 * @LastEditTime: 2020-04-18 16:32:48
 */
import React, {Component} from 'react';
import {View,TouchableOpacity,Image,Text,StyleSheet,Dimensions,ActivityIndicator} from 'react-native';
import {Theme,Icon} from '../../components/index';
import {Button,Drawer,Wheel} from '../../components/index';
import BottomToolbars from '../components/BottomToolbars';
import {Toast} from 'teaset';
const {width} = Dimensions.get('window');
export default class RecordControl extends Component {
    constructor(props){
        super(props);
        this.selectTime=null;
        this.state = {
            time:'30s',
            index:0,
        };
    }
    /**
     * 时间处理
     */
    ftmTime = (time) =>{
        console.log(time,'处理的录音')
        if(this.props.isRecording){
            return time + 's'; 
        }
        let value = this.props.insTimeArr.find(item => {
            return item.value == time;
        })
        let s = this.state.time;
        if(!value){
            value = this.props.insTimeArr[0];
        }
        
        s = value.title;
        console.log(s,'获取的title')
        return s;
    }
    render(){
        const {isOpenSelect} = this.props;
        return (
            <BottomToolbars >
                <View style={this.renderStyle()}>
                    {isOpenSelect?this.renderControl():this.renderDelete()}
                </View>
            </BottomToolbars>
        );
    }
    /**
     * 轨迹声音录制控制面板
     */
    renderControl(){
        const {recordLength,recordType,isRecording,isBeginRecord} = this.props;
        let text = '开始录音';
        let backgroundColor = isRecording?'#98BBF9':'#3479F6';
        let borderColor = isRecording?'#98BBF9':'#3479F6';
        if(recordType == 0){
            text = '持续录音';
            text = isRecording?'录音中':'开始录音';
        }else{
            text = isRecording?'关闭持续录音':'持续录音';
        }
        return <View style={styles.controlStyle}>
            <View style={styles.touchStyle}>
                <TouchableOpacity activeOpacity={1} style={{paddingRight:15}} onPress={() => {this.props.onSelect && this.props.onSelect(0);}}>
                    <Icon name={'operating_select_disable'} size={20} />
                    <Text style={{fontSize:10,color:'#979797'}}>{'选择'}</Text>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={1} style={{paddingLeft:20}} onPress={this.onSelectTimeLength}>
                    <Icon name={'recording_operating_duration'} size={21} />
                    <Text style={{fontSize:10,color:'#979797'}}>{'时长'}</Text>
                </TouchableOpacity>
            </View>
            <View style={{flex:1}}>
                {
                    isBeginRecord?
                        recordType == 0
                            ?
                            <Button  activeOpacity={isRecording?1:0} onPress={this.onRecord} titleStyle={[styles.titleStyle]} style={[styles.buttonStyle,{backgroundColor,borderColor}]} title={`${text}（${this.ftmTime(recordLength)}）`}  />
                            :
                            <Button onPress={this.onRecord} titleStyle={styles.titleStyle} style={styles.buttonStyle} title={text}  />
                        :
                        <Button  activeOpacity={1} titleStyle={styles.titleStyle} style={[styles.buttonStyle,{backgroundColor:'#98BBF9',borderColor:'#98BBF9'}]}>
                            <View style={{flex:1,flexDirection:'row',justifyContent:'center'}}>
                                <ActivityIndicator size="small" color="#fff" />
                                <Text style={{color:'#fff',marginLeft:10,fontSize:16}}>加载中...</Text>
                            </View>
                        </Button>
                }
            </View>
        </View>;
    }
    onSelectTimeLength = () => {
        const {isRecording} = this.props;
        if(isRecording || !this.props.isBeginRecord){
            return Toast.message('当前设备正在录音');
        }
        this.renderModal();
    }
   
    /**
     * 开始录音
     */
    onRecord = () => {
        const {isRecording,recordLength,recordType} = this.props;
        let data = {
            recordLength:recordLength,
            isRecording:isRecording
        };
        if(isRecording && recordType == 0){
            // return Toast.message('当前设备正在录音');
            return;
        }
        this.props.onRecord && this.props.onRecord(data);
    }
    /**
     * 渲染录音删除控制面板
     */
    renderDelete(){
        const {fileNumber} = this.props;
        return <View style={styles.controlStyle}>
            <TouchableOpacity activeOpacity={1} style={styles.deleteBtn} onPress={() => {this.props.onSelect && this.props.onSelect(1);}}>
                <Text style={[styles.letBorder,{color:'#000'}]}>{'取消'}</Text>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={1} style={styles.deleteBtn} onPress={() => {this.props.onEmpty && this.props.onEmpty();}}>
                <Text style={[styles.letBorder,{color:Theme.buttonTextColorDefault}]}>{'清空'}</Text>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={1} style={styles.deleteBtn}>
                <Text style={[styles.letBorder,{color:'#FF3535'}]} onPress={() => {this.props.onDelete && this.props.onDelete();}}>{`删除(${fileNumber})`}</Text>
            </TouchableOpacity>
        </View>;
    }
    /**
     * 渲染样式
     */
    renderStyle(){
        const {style} = this.props;
        let styles = [
            {
                flex:1,
                flexDirection:'row',
                // justifyContent:'center',
                alginContent:'center',
            }
        ].concat(style);
        return styles;
    }
    /**
     * 选择时间弹框
     */
    renderModal = () => {
        const {insTimeArr} = this.props;
        const time = [];
        insTimeArr.forEach((item,index) => {
            time.push(item.title)
            if(item.isChange){
                this.state.index = index
            }
        })
        let modal = <View style={styles.datepicker}>
            <View style={styles.header}>
                <TouchableOpacity activeOpacity={1} onPress={()=>{
                    Drawer.close(this.selectTime);
                }} >
                    <Text style={styles.headerText}>{'取消'}</Text>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={1} onPress={this.onConfirm} >
                    <Text style={styles.headerText}>{'确定'}</Text>
                </TouchableOpacity>
            </View>
            <View style={{backgroundColor:'#fff',justifyContent: 'center', alignItems: 'center'}}>
                <Wheel
                    style={styles.wheelItem}
                    itemStyle={styles.itemStyle}
                    holeStyle= {styles.holeStyle}
                    items={time}
                    index={this.state.index}
                    onChange={index => this.onDateChange(time[index],index)}
                />      
            </View>
        </View>;
        this.selectTime = Drawer.open(modal);
    }
    /**
     * 保存时间
     */
    onConfirm = () => {
        // console.log(this.state.time,'保存的时间');
        const {insTimeArr} = this.props;
        let time = insTimeArr[0].time;
        insTimeArr.forEach((item,i) => {
            item.isChange = false;
            if(item.title === this.state.time){
                time = item.value
                item.isChange = true
            }
        })
        const type = this.state.index == insTimeArr.length - 1?1:0;
        let insTimeArrs = JSON.parse(JSON.stringify(insTimeArr));
        this.props.onConfirm &&  this.props.onConfirm({type,time,insTimeArrs});
        Drawer.close(this.selectTime);
    }
    /**
     * 选中图片
     */
    onDateChange = (time,index) => {
        this.setState({
            time,
            index
        });
    }
}

const styles = StyleSheet.create({
    buttonStyle:{
        width:165,
        height:40,
        backgroundColor:Theme.buttonBackColorPrimary,
        borderRadius:20,
    },
    titleStyle:{
        color:Theme.buttonTextColorPrimary,
        fontSize:Theme.buttonFontLg
    },
    controlStyle:{
        flex:1,
        flexDirection:'row',
        justifyContent:'space-around',
        alignItems:'center'
    },
    touchStyle:{
        flexDirection:'row',
        justifyContent:'center',
        flex:1
    },
    shadow:{
        position:'absolute',
        bottom:0,
        top:0,
        width:width,
        zIndex:1000,
        backgroundColor:'#383838',
        opacity:0.8,
    },  
    datepicker:{
        // position:'absolute',
        // bottom:0,
        width:width,
        // zIndex:1001
    },
    header:{
        height: 49,
        backgroundColor:'#FCFCFC',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        paddingLeft:15,
        paddingRight:15
    },
    wheel:{
        backgroundColor: '#fff', 
        padding: 20, 
        flexDirection: 'row', 
        justifyContent: 'center'
    },
    wheelItem:{
        height: 200, 
        width: 100
    },
    itemStyle:{
        textAlign: 'center',
        fontSize:19
    },
    holeStyle:{
        height:35
    },
    letBorder:{
        borderLeftColor:'#000',
        borderLeftWidth:StyleSheet.hairlineWidth,
        borderStyle:'solid',
        width:'100%',
        textAlign:'center',
        fontSize:17
    },
    deleteBtn:{
        flex:1,
        alignItems:'center',
        justifyContent:'center'
    }
});