/*
 * @Descripttion: 录音控制面板
 * @version: 
 * @Author: liujinyuan
 * @Date: 2019-09-17 16:06:14
 * @LastEditors: liujinyuan
 * @LastEditTime: 2019-09-18 15:30:43
 */
import React, {Component} from 'react';
import {View,Platform,TouchableOpacity,Image,Text,StyleSheet,Modal,Dimensions} from 'react-native';
import {Button} from '../../components/index';
import {Wheel} from 'teaset';
const {width} = Dimensions.get('window');
export default class RecordControl extends Component {
    constructor(props){
        super(props);
        this.state = {
            isVisible:false,
            time:'30',
            index:0
        };
    }
    render(){
        const {type} = this.props;
        console.log(type,2222);
        return (
            <View style={this.renderStyle()}>
                {type?this.renderControl():this.renderDelete()}
                {this.renderModal()}
            </View>
        );
    }
    /**
     * 轨迹声音录制控制面板
     */
    renderControl(){
        return <View style={styles.controlStyle}>
            <View style={styles.touchStyle}>
                <TouchableOpacity activeOpacity={1} style={{paddingRight:15}} onPress={() => {this.props.onSelect && this.props.onSelect(0);}}>
                    <Image source={require('../../assets/record/operating_select.png')} />
                    <Text style={{fontSize:10,color:'#979797'}}>{'选择'}</Text>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={1} style={{paddingLeft:20}} onPress={() => {this.setState({isVisible:true});}}>
                    <Image source={require('../../assets/record/recording_operating_duration.png')} />
                    <Text style={{fontSize:10,color:'#979797'}}>{'时长'}</Text>
                </TouchableOpacity>
            </View>
            <View style={{flex:1}}>
                <Button titleStyle={styles.titleStyle} style={styles.buttonStyle} title={`开始录音（${30}s）`}  />
            </View>
        </View>;
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
                <Text style={[styles.letBorder,{color:'#3479F6'}]}>{'清空'}</Text>
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
                backgroundColor:'#FBFBFB'
            }
        ].concat(style);
        return styles;
    }
    /**
     * 选择时间弹框
     */
    renderModal = () => {
        let {currentTime} = this.props;
        const time = ['30秒','1分钟','2分钟','3分钟','4分钟','5分钟','持续录音'];
        
        return <Modal
            animationType="slide"
            transparent={true}
            visible={this.state.isVisible}
        >
            <View style={styles.shadow}></View>
            <View style={styles.datepicker}>
                <View style={styles.header}>
                    <TouchableOpacity activeOpacity={1} onPress={()=>{
                        this.setState({isVisible:false});
                    }} >
                        <Text style={styles.headerText}>取消</Text>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={1} onPress={()=>{
                        this.props.onConfirm &&  this.props.onConfirm(this.state.time);
                        this.setState({
                            isShowDatepicker:false
                        });
                    }} >
                        <Text style={styles.headerText}>确定</Text>
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
            </View>
        </Modal>;
    }
    /**
     * 选中图片
     */
    onDateChange = (time,index) => {
        console.log(time,9999);
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
        backgroundColor:'#3479F6',
        borderRadius:20,
    },
    titleStyle:{
        color:'#fff',
        fontSize:16
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
        position:'absolute',
        bottom:0,
        width:width,
        zIndex:1001
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
        width: 60
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