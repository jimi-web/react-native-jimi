/*
 * @Descripttion: 
 * @version: 
 * @Author: xieruizhi
 * @Date: 2019-11-29 10:19:57
 * @LastEditors: xieruizhi
 * @LastEditTime: 2020-06-16 14:07:07
 */
import React,{Component} from 'react';
import Drawer from '../drawer/Drawer';
import TimePickerView from '../timePicker/timePickerView';
export default class TimePicker extends Component{
    
    constructor(props){
        super(props);
    }
    
    static openDatepicker=null;
    

    static show(option){
        //弹出框
        return  this.openDatepicker = Drawer.open(<TimePickerView 
            {...option}
            onCancel={()=>{
                this.hide();
                option && option.onCancel && option.onCancel();
            }} 
            onConfirm={(value)=>{
                this.hide();
                option && option.onConfirm && option.onConfirm(value);
            }} 
        >
        </TimePickerView>);
    }

    static hide() {
        Drawer.close(this.openDatepicker);
    }
}