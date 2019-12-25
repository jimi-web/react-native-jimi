/*
 * @Descripttion: 
 * @version: 
 * @Author: xieruizhi
 * @Date: 2019-12-03 14:40:22
 * @LastEditors: xieruizhi
 * @LastEditTime: 2019-12-03 15:46:54
 */
import React from 'react';
import Overlay from '../overlay/overlay';
import Dialog  from '../dialog';

export default class Modal extends Overlay { 

    //对话框
    static dialog(parameter){
        let dialog =  Overlay.add(<Dialog 
            {...parameter}
            onConfirm={()=>{
                Overlay.remove(dialog);
                parameter && parameter.onConfirm  && parameter.onConfirm();
            }}
            onCancel={()=>{
                Overlay.remove(dialog);
                parameter && parameter.onCancel  && parameter.onCancel();
            }}
        />);
        return dialog;
    }
}