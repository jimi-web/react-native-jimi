/*
 * @Descripttion: 
 * @version: 
 * @Author: xieruizhi
 * @Date: 2019-09-10 11:02:33
 * @LastEditors: xieruizhi
 * @LastEditTime: 2019-09-12 14:05:49
 */
import React, {Component} from 'react';
import {View,StyleSheet,Text,TouchableOpacity} from 'react-native';
import {Jimi} from '../index';

export default class Track extends Component { 
    constructor(props) {
        super(props);
        this.state = {
            isBaidu:true
        };
    }

    render() {
        let polylineOptions = {
            color:'#000000',
            width:1
        };
        let playPolylineOptions = {
            color:'#cc5858',
            width:3
        };
        return <View style={{flex:1}}>
            {
                this.state.isBaidu ? 
                    <Jimi.BaiduTrack
                        customItem = {this.customItem}
                        mapTypeBtnStyle={styles.set}
                        polylineOptions = {polylineOptions}
                        playPolylineOptions = {playPolylineOptions}
                    >
                    </Jimi.BaiduTrack>
                    :
                    <Jimi.GoogleTrack
                        customItem = {this.customItem}
                        mapTypeBtnStyle={styles.set}
                        polylineOptions = {polylineOptions}
                        playPolylineOptions = {playPolylineOptions}
                    >
                    </Jimi.GoogleTrack>            
            }
        </View>;
    }

    /**
     * 在地图上自定义样式
     */
    customItem = ()=>{
        return <View style={styles.customItem}>
            <TouchableOpacity onPress={()=>{
                this.setState({
                    isBaidu:!this.state.isBaidu
                });
            }}>
                <Text>切换地图</Text>
            </TouchableOpacity>
        </View>;
    }
}

const styles =  StyleSheet.create({
    customItem:{
        position:'absolute',
        left:20,
        top:20,
        borderWidth:1,
        borderColor:'#000',
        backgroundColor:'#fff',
        padding:10
    },
    set:{
        position:'absolute',
        right:40,
        zIndex:100,
    }
});