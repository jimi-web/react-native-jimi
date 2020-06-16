/*
 * @Descripttion: 
 * @version: 
 * @Author: xieruizhi
 * @Date: 2019-08-21 15:20:39
 * @LastEditors: xieruizhi
 * @LastEditTime: 2020-06-16 14:50:24
 */
import React, {Component} from 'react';
import {View,Text,TouchableOpacity,StyleSheet,Dimensions} from 'react-native';
import {Wheel} from 'teaset';
import '../../libs/time';
import Theme from '../themes/index';
import PropTypes from 'prop-types';
const {width} = Dimensions.get('window');

export default class timePickerView extends Component {
    static propTypes = {
        onConfirm:PropTypes.func,
        itemStyle:PropTypes.object,
        holeStyle:PropTypes.object,
        wheelItemStyle:PropTypes.object,
        onCancel:PropTypes.func,
        defaultValue:PropTypes.string
    }

    static defaultProps = {
        onConfirm:()=>{},
        onCancel:()=>{},
        itemStyle:{},
        holeStyle:{},
        wheelItemStyle:{}
    }

    constructor(props) {
        super(props);
        this.hours = [];
        this.hoursNum = 0;
        this.minNum = 0;
        for (let i = 1; i <= 23; ++i){
            this.hoursNum = i<10 ? '0'+i :i;
            this.hours.push(this.hoursNum.toString());
        } 
        this.mins = [];
        for (let i = 0; i <= 59; ++i){
            this.minNum = i<10 ? '0'+i:i;
            this.mins.push(this.minNum.toString());
         }
        this.state ={
            defaultValue:this.props.defaultValue ? this.props.defaultValue : new Date().Format('hh:mm'),
            finalResult:this.props.defaultValue ? this.props.defaultValue : new Date().Format('h:mm'),//最后结果
        };
    }


    render() {
        let { defaultValue } = this.state;
        let hour = defaultValue.split(':')[0],
            min = defaultValue.split(':')[1].toString();
        return  <View style={styles.datepicker}>
            <View style={styles.header}>
                <TouchableOpacity activeOpacity={1} onPress={()=>{
                    this.props.onCancel &&  this.props.onCancel();
                }} >
                    <Text style={styles.headerText}>{I18n.t('取消')}</Text>
                </TouchableOpacity>
                <Text style={{color:'#000',fontSize:17}}>{I18n.t('选择时间')}</Text>
                <TouchableOpacity activeOpacity={1} onPress={()=>{
                    this.props.onConfirm &&  this.props.onConfirm(this.state.finalResult);
                }} >
                    <Text style={styles.headerText}>{I18n.t('确定')}</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.wheel} >
                <Wheel
                    style={[styles.wheelItem,{...this.props.wheelItemStyle}]}
                    itemStyle= {[styles.itemStyle,{...this.props.itemStyle}]}
                    holeStyle=  {[styles.holeStyle,{...this.props.holeStyle}]}
                    items={this.hours}
                    index={this.hours.indexOf(hour)}
                    onChange={index => this.onDateChange(this.hours[index],min)}
                />
                <Wheel
                    style={styles.wheelItem}
                    itemStyle={styles.itemStyle}
                    holeStyle= {styles.holeStyle}
                    items={this.mins}
                    index={this.mins.indexOf(min)}
                    onChange={index => this.onDateChange(hour,this.mins[index])}
                />                    
            </View>
        </View>;
    }


    onDateChange =(hour,min)=> {
        this.setState ({
            defaultValue:hour+':'+min,
            finalResult: hour+':'+min
        });        
    }
}


const styles = StyleSheet.create({
    datepicker:{
        width:width,
        backgroundColor:'red'
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
    headerText:{
        color:Theme.TextColorPrimary,
        fontSize:18
    },
    itemStyle:{
        textAlign: 'center',
        fontSize:19
    },
    holeStyle:{
        height:35,
    },
});