/*
 * @Descripttion: 
 * @version: 
 * @Author: xieruizhi
 * @Date: 2019-10-10 16:01:37
 * @LastEditors  : xieruizhi
 * @LastEditTime : 2019-12-29 15:13:08
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
    static loadingDefaultStyle = {paddingLeft:25,paddingRight:25,paddingTop:15,paddingBottom:15};


    static show(options){
        let {duration, ...others} = options && typeof options === 'object' ? options : {};
        let toastStyle = {
            paddingLeft: 40,
            paddingRight: 40,
            paddingTop: 100,
            paddingBottom: 80,
            justifyContent: options.position === 'top' ? 'flex-start' : (options.position === 'bottom' ? 'flex-end' : 'center'),
            alignItems: 'center',
        }
        const overlay = Overlay.add(<ToastView {...others} />,{opacity:0,style:toastStyle});
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


