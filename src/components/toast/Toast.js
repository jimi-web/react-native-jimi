/*
 * @Descripttion: 
 * @version: 
 * @Author: xieruizhi
 * @Date: 2019-10-10 16:01:37
 * @LastEditors: xieruizhi
 * @LastEditTime: 2019-10-15 14:45:57
 */
import React from 'react';
import { ActivityIndicator } from 'react-native';
import PropTypes from 'prop-types';
import Overlay from '../overlay/overlay';
import ToastView from '../toast/ToastView';

export default class Toast extends Overlay {
    static messageDefaultDuration = 'short';
    static messageDefaultPosition = 'bottom';
    static loadingDefaultDuration = 30000;
    static loadingDefaultPosition = 'center';
    static loadingDefaultText = '加载中...';
    static loadingDefaultIcon = <ActivityIndicator size='large' color={'#fff'} />;
    static loadingDefaultStyle = {paddingTop:8,paddingBottom:10};


    static show(options){
        let {duration, ...others} = options && typeof options === 'object' ? options : {};    
        const overlay = Overlay.add(<ToastView {...others} />,true);
        if (typeof duration !== 'number') {
            switch (duration) {
            case 'long': duration = 3500; break;
            default: duration = 2000; break;
            }
        }
        setTimeout(()=>{
            Overlay.remove(overlay);
        },duration);

        return overlay;
    }

    static message(text, duration = this.messageDefaultDuration,position=this.messageDefaultPosition) {
        return this.show({text, duration,position});
    }

    static loading(text=this.loadingDefaultText,duration = this.loadingDefaultDuration,position=this.loadingDefaultPosition,icon=this.loadingDefaultIcon,style=this.loadingDefaultStyle){
        return this.show({text, duration,position,icon,style});
    }
}


