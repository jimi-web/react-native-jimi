/*
 * @Descripttion: 
 * @version: 
 * @Author: xieruizhi
 * @Date: 2019-12-03 14:40:22
 * @LastEditors  : xieruizhi
 * @LastEditTime : 2019-12-28 11:45:53
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