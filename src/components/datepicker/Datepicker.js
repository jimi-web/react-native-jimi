/*
 * @Descripttion: 
 * @version: 
 * @Author: xieruizhi
 * @Date: 2019-08-21 15:20:39
 * @LastEditors: xieruizhi
 * @LastEditTime: 2019-09-02 11:50:21
 */
import React, {Component} from 'react';
import {View,Text,TouchableOpacity,StyleSheet,Dimensions,DeviceEventEmitter,Animated} from 'react-native';
import {Theme, Wheel,Overlay} from 'teaset';
import PropTypes from 'prop-types';
import '../../libs/time';

const {width} = Dimensions.get('window');
let showSelectTime = null;
let selectDate = new Date();
let daysCounts = [
    [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
    [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
];//每个月的日子总数
let getDay = [];
export default class Datepicker {
    static finalResult = new Date().Format('YYYY-MM-DD hh:mm:ss')

    /**
     * 是否闰年
     * @param {String} year 
     */
    static isLeapYear(year) {
        return year % 4 == 0 && (year % 100 != 0 || year % 400 == 0);
    }

    static onDateChange =(year, month, day,hour,min)=> {
        let date = new Date();
        date.setFullYear(year);

        let daysCount = daysCounts[this.isLeapYear(year) ? 1 : 0][month];
        if (day > daysCount) {
            day = daysCount;
        }
        getDay = [];
        for (let i = 1; i <= daysCount; ++i) getDay.push(i);
        console.log(getDay);
        
        date.setMonth(month);
        date.setDate(day);
        date.setHours(hour);
        date.setMinutes(min);
        selectDate = date;

        this.finalResult = new Date(selectDate).Format('YYYY-MM-DD hh:mm:ss');
    }

    /**
     * 显示时间
     * @param {Object} params ，date：时间，onCancel：取消，onConfirm：确定
     */
 static show = (params={}) =>{
     //给滚轮添加区间
     let years = [];
     for (let i = 1970; i <= 2100; ++i) years.push(i);
     let months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
     let hours = [];
     for (let i = 0; i <= 24; ++i) hours.push(i);
     let mins = [];
     for (let i = 0; i <= 60; ++i) mins.push(i);
    
     //获取当前默认
     selectDate = params.date ? new Date(params.date) : new Date();
     let year = selectDate.getFullYear(), 
         month = selectDate.getMonth(), 
         day = selectDate.getDate(),
         hour = selectDate.getHours(),
         min =selectDate.getMinutes();
     getDay = [];
     let daysCount = daysCounts[this.isLeapYear(year) ? 1 : 0][month];
     for (let i = 1; i <= daysCount; ++i) getDay.push(i);
     let overlayView = <Overlay.View side='bottom' modal={false}>
         <View style={styles.datepicker}>
             <View style={styles.header}>
                 <TouchableOpacity activeOpacity={1} onPress={()=>{
                     this.hide();
                     params.onCancel && params.onCancel();
                 }} >
                     <Text style={styles.headerText}>取消</Text>
                 </TouchableOpacity>
                 <Text style={{color:'#000',fontSize:17}}>选择时间</Text>
                 <TouchableOpacity activeOpacity={1} onPress={()=>{
                     this.hide();
                     params.onConfirm && params.onConfirm(this.finalResult);
                 }} >
                     <Text style={styles.headerText}>确定</Text>
                 </TouchableOpacity>
             </View>
             <View style={styles.wheel} >
                 <Wheel
                     style={styles.wheelItem}
                     itemStyle={styles.itemStyle}
                     holeStyle= {styles.holeStyle}
                     items={years}
                     index={years.indexOf(year)}
                     onChange={index => this.onDateChange(years[index], month, day,hour,min)}
                 />
                 <Wheel
                     style={styles.wheelItem}
                     itemStyle={styles.itemStyle}
                     holeStyle= {styles.holeStyle}
                     items={months}
                     index={months.indexOf(month + 1)}
                     onChange={index => this.onDateChange(year, months[index] - 1, day,hour,min)}
                 />
                 <Wheel
                     style={styles.wheelItem}
                     itemStyle={styles.itemStyle}
                     holeStyle= {styles.holeStyle}
                     items={getDay}
                     index={getDay.indexOf(day)}
                     onChange={index => this.onDateChange(year, month, getDay[index],hour,min)}
                 />
                 <Wheel
                     style={styles.wheelItem}
                     itemStyle={styles.itemStyle}
                     holeStyle= {styles.holeStyle}
                     items={hours}
                     index={hours.indexOf(hour)}
                     onChange={index => this.onDateChange(year, month, day,hours[index],min)}
                 />
                 <Wheel
                     style={styles.wheelItem}
                     itemStyle={styles.itemStyle}
                     holeStyle= {styles.holeStyle}
                     items={mins}
                     index={mins.indexOf(min)}
                     onChange={index => this.onDateChange(year, month, day,hour,mins[index])}
                 />                    
             </View>
         </View>
            
     </Overlay.View>;
     showSelectTime = Overlay.show(overlayView);
 };

 /**
  * 数组截图
  */
 //  static Arrslice(min,max,arr) {
 //      let getArr = max ? arr.slice(arr.indexOf(min),arr.indexOf(max)+1) : arr.slice(arr.indexOf(min));
 //      return getArr;
 //  }

 static hide(){
     Overlay.hide(showSelectTime);
 }
 
}
const styles = StyleSheet.create({
    datepicker:{
        position:'absolute',
        bottom:0,
        width:width
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
        backgroundColor: Theme.defaultColor, 
        padding: 20, 
        flexDirection: 'row', 
        justifyContent: 'center'
    },
    wheelItem:{
        height: 200, 
        width: 60
    },
    headerText:{
        color:'#03B8A6',
        fontSize:18
    },
    itemStyle:{
        textAlign: 'center',
        fontSize:19
    },
    holeStyle:{
        height:35,
        // fontSize:23,
        // color:'#03B8A6'
    },
    overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0)',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        color:'#fff',
    },
});