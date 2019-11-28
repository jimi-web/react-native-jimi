import React, { Component } from 'react';
import PropTypes from 'prop-types';
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
}