/*
 * @Descripttion: 
 * @version: 
 * @Author: xieruizhi
 * @Date: 2019-08-21 15:20:39
 * @LastEditors: xieruizhi
 * @LastEditTime: 2020-05-12 16:51:32
 */
import React, {Component} from 'react';
import {View,Text,TouchableOpacity,StyleSheet,Dimensions} from 'react-native';
import {Wheel} from 'teaset';
import '../../libs/time';
import Theme from '../themes/index';
import PropTypes from 'prop-types';
const {width} = Dimensions.get('window');

export default class Datepicker extends Component {
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
        this.years = [];
        for (let i = 1970; i <= 2100; ++i) this.years.push(i);
        this.months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
        this.daysCounts = [
            [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
            [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
        ];
        this.hours = [];
        for (let i = 0; i <= 23; ++i) this.hours.push(i);
        this.mins = [];
        for (let i = 0; i <= 59; ++i) this.mins.push(i);
        

        this.state ={
            defaultValue:this.props.defaultValue ? new Date(this.props.defaultValue.replace(/-/g,'/')): new Date(),
            finalResult:this.props.defaultValue ? new Date(this.props.defaultValue.replace(/-/g,'/')).Format('YYYY-MM-DD hh:mm'):new Date().Format('YYYY-MM-DD hh:mm'),//最后结果
        };
    }


    render() {
        let { defaultValue } = this.state;
        let year = defaultValue.getFullYear(), 
            month = defaultValue.getMonth(), 
            day = defaultValue.getDate(),
            hour = defaultValue.getHours(),
            min =defaultValue.getMinutes();
        let daysCount = this.daysCounts[this.isLeapYear(year) ? 1 : 0][month];
        let days = [];
        for (let i = 1; i <= daysCount; ++i) days.push(i);   

        return  <View style={styles.datepicker}>
            <View style={styles.header}>
                <TouchableOpacity activeOpacity={1} onPress={()=>{
                    this.props.onCancel &&  this.props.onCancel();
                }} >
                    <Text style={styles.headerText}>取消</Text>
                </TouchableOpacity>
                <Text style={{color:'#000',fontSize:17}}>选择时间</Text>
                <TouchableOpacity activeOpacity={1} onPress={()=>{
                    this.props.onConfirm &&  this.props.onConfirm(this.state.finalResult);
                }} >
                    <Text style={styles.headerText}>确定</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.wheel} >
                <Wheel
                    style={[styles.wheelItem,{...this.props.wheelItemStyle}]}
                    itemStyle= {[styles.itemStyle,{...this.props.itemStyle}]}
                    holeStyle= {[styles.holeStyle,{...this.props.holeStyle}]}
                    items={this.years}
                    index={this.years.indexOf(year)}
                    onChange={index => this.onDateChange(this.years[index], month, day,hour,min)}
                />
                <Wheel
                    style={[styles.wheelItem,{...this.props.wheelItemStyle}]}
                    itemStyle= {[styles.itemStyle,{...this.props.itemStyle}]}
                    holeStyle=  {[styles.holeStyle,{...this.props.holeStyle}]}
                    items={this.months}
                    index={this.months.indexOf(month + 1)}
                    onChange={index => this.onDateChange(year, this.months[index] - 1, day,hour,min)}
                />
                <Wheel
                    style={[styles.wheelItem,{...this.props.wheelItemStyle}]}
                    itemStyle= {[styles.itemStyle,{...this.props.itemStyle}]}
                    holeStyle=  {[styles.holeStyle,{...this.props.holeStyle}]}
                    items={days}
                    index={days.indexOf(day)}
                    onChange={index => this.onDateChange(year, month, days[index],hour,min)}
                />
                <Wheel
                    style={[styles.wheelItem,{...this.props.wheelItemStyle}]}
                    itemStyle= {[styles.itemStyle,{...this.props.itemStyle}]}
                    holeStyle=  {[styles.holeStyle,{...this.props.holeStyle}]}
                    items={this.hours}
                    index={this.hours.indexOf(hour)}
                    onChange={index => this.onDateChange(year, month, day,this.hours[index],min)}
                />
                <Wheel
                    style={styles.wheelItem}
                    itemStyle={styles.itemStyle}
                    holeStyle= {styles.holeStyle}
                    items={this.mins}
                    index={this.mins.indexOf(min)}
                    onChange={index => this.onDateChange(year, month, day,hour,this.mins[index])}
                />                    
            </View>
        </View>;
    }

  
    /**
     * 是否闰年
     * @param {String} year 
     */
    isLeapYear(year) {
        return year % 4 == 0 && (year % 100 != 0 || year % 400 == 0);
    }

    onDateChange =(year, month, day,hour,min)=> {
        let date = new Date();
        date.setFullYear(year);

        let daysCount = this.daysCounts[this.isLeapYear(year) ? 1 : 0][month];
        if (day > daysCount) {
            day = daysCount;
        }

        date.setMonth(month);
        date.setDate(day);
        date.setHours(hour);
        date.setMinutes(min);
        this.setState ({
            defaultValue:date,
            finalResult: new Date(date).Format('YYYY-MM-DD hh:mm')
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