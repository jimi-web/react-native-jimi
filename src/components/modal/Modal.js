/*
 * @Descripttion: 
 * @version: 
 * @Author: xieruizhi
 * @Date: 2019-12-03 14:40:22
 * @LastEditors: liujinyuan
 * @LastEditTime: 2020-04-08 19:29:54
 */
import React from 'react';
import Overlay from '../overlay/overlay';
import Dialog  from '../dialog';
import Alert from '../alert';

export default class Modal extends Overlay { 

    /**
     * 对话框
     * @param {Object}} parameter 
     */
    static dialog(parameter){
        let dialog =  Overlay.add(<Dialog 
            {...parameter}
            onConfirm={()=>{
                Overlay.remove(dialog);
                parameter && parameter.onConfirm  && parameter.onConfirm();
            }}
            onCancel={()=>{
                console.log('取消');
                Overlay.remove(dialog);
                parameter && parameter.onCancel  && parameter.onCancel();
            }}
        />);
        return dialog;
    }

    /**
     * 提示框
     */
    static alert(parameter){
        let alert =  Overlay.add(<Alert 
            {...parameter}
            onConfirm={()=>{
                Overlay.remove(alert);
                parameter && parameter.onConfirm  && parameter.onConfirm();
            }}
        />);
        return alert;
    }

}