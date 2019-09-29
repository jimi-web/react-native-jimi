/*
 * @Descripttion: 
 * @version: 
 * @Author: xieruizhi
 * @Date: 2019-09-10 11:02:33
 * @LastEditors: liujinyuan
 * @LastEditTime: 2019-09-29 15:07:31
 */
import React, {Component} from 'react';
import {View,StyleSheet,Text,TouchableOpacity} from 'react-native';
import {Jimi,Applet} from '../index';
import {map} from '../api/index';

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

        let playImg = {
            play:require('../assets/track/ratioX1.png'),
            pause:require('../assets/track/repeat.png')
        };
        return <View style={{flex:1}}>
            {
                this.state.isBaidu ? 
                    <Jimi.BaiduTrack
                        mapTypeBtnStyle={styles.set}
                        polylineOptions = {polylineOptions}
                        playPolylineOptions = {playPolylineOptions}
                        playImg={playImg}
                    >
                        {
                            this.customItem()
                        }
                    </Jimi.BaiduTrack>
                    :
                    <Jimi.GoogleTrack
                        mapTypeBtnStyle={styles.set}
                        polylineOptions = {polylineOptions}
                        playPolylineOptions = {playPolylineOptions}
                        playImg={playImg}
                    >
                        {
                            this.customItem()
                        }
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

    /**
     * 获取数据
     * @param {Object} params  控件传过来的值，{startTime:'',endTime:'',posType:''}开始时间，结束时间，定位类型
     * @param {Function} setPoint 设置轨迹点数据的方法
     */
    getTrackPoints = (params,setPoint)=>{
        Applet.jmAjax({
            url:map.track,
            method:'GET',
            encoding:true,
            encodingType:true,
            data:params
        }).then((res)=>{
            let result = res.data;
            setPoint(result);
        });
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