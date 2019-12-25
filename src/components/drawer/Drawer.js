/*
 * @Descripttion: 
 * @version: 
 * @Author: xieruizhi
 * @Date: 2019-11-11 14:14:04
 * @LastEditors: xieruizhi
 * @LastEditTime: 2019-12-02 10:42:38
 */
import React, { Component } from 'react';
import Overlay from '../overlay/overlay';
import OverlayPullView from '../overlay/OverlayPullView';


export default class Drawer extends Overlay {
    static open =(view,friction=12)=>{
        let key = super.show(
            <OverlayPullView side={'bottom'} friction={friction} ref={v => drawer = v} onPress={() => super.remove(key)}>
                {view}
            </OverlayPullView>
        );
        return key;
    }
    
    static close =(key)=>{
        super.remove(key);
    }
}