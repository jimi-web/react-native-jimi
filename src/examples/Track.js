/*
 * @Descripttion: 
 * @version: 
 * @Author: xieruizhi
 * @Date: 2019-09-10 11:02:33
 * @LastEditors: xieruizhi
 * @LastEditTime: 2019-09-10 17:30:36
 */
import React, {Component} from 'react';
import {View,StyleSheet,Text,TouchableOpacity} from 'react-native';
import {Jimi} from '../index';

export default class Track extends Component { 
    constructor(props) {
        super(props);
        this.state = {
            isBaidu:false
        };
    }

    render() {
        return <View style={{flex:1}}>
            {
                this.state.isBaidu ? 
                    <Jimi.BaiduTrack>
                
                    </Jimi.BaiduTrack>
                    :
                    <Jimi.GoogleTrack>
                
                    </Jimi.GoogleTrack>            
            }
        </View>;
   
    }
}