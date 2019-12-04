/*
 * @Descripttion: 
 * @version: 
 * @Author: xieruizhi
 * @Date: 2019-11-29 10:19:57
 * @LastEditors: xieruizhi
 * @LastEditTime: 2019-12-03 13:39:13
 */
import React,{Component} from 'react';
import Drawer from '../drawer/Drawer';
import DatePickerView from '../datePickerDialog/DatePickerView';
export default class Datepicker extends Component{
    
    constructor(props){
        super(props);
    }
    
    static openDatepicker=null;
    

    static show(option){
        //弹出框
        return  this.openDatepicker = Drawer.open(<DatePickerView 
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
        </DatePickerView>);
    }

    static hide() {
        Drawer.close(this.openDatepicker);
    }
}