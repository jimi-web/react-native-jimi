<!--
 * @Descripttion: 
 * @version: 
 * @Author: xieruizhi
 * @Date: 2019-09-18 14:31:34
 * @LastEditors: xieruizhi
 * @LastEditTime: 2020-07-20 10:31:37
 -->

# `Track` 地图轨迹

## Props
| Prop | Type | required | Default | Note |
|---|---|---|---|---|
|mapType|String| false | 'standard'|地图类型 <br>- standard: 标准 <br>- satellite: 卫星| 
|initialRegion|Object|false | 有默认值 |地图初始化地区 <br> {<br>　　latitude: 22.596904,<br>　　longitude:113.936674,<br>　　latitudeDelta:0.0922,<br>　　longitudeDelta:0.0421<br>} |
|trafficEnabled|Bool|false | false|是否打开路况图层 <br>true && false| 
|startMarkerOptions|Object|false | 有默认属性 |起点标记,只有谷歌地图能自定义样式 style，百度传无效<br>{<br>　　style:{width:100,height:100},<br>　　image:require('./../../assets/map/oldMan.png')<br>}|
|endMarkerOptions|Object|false | 有默认属性 |终点标记,只有谷歌地图能自定义样式 style，百度传无效<br>{<br>　　style:{width:100,height:100},<br>　　image:require('./../../assets/map/oldMan.png')<br>}|
|deviceMarkerOptions|Object|false | 有默认属性 |设备标记,只有谷歌地图能自定义样式 style，百度传无效<br>{<br>　　style:{width:100,height:100},<br>　　image:require('./../../assets/map/oldMan.png')<br>}|
|dimDd|Number| false | 7 |两时间最长的间隔天数 | 
|polylineOptions|Object|false | 有默认属性| 整条轨迹的属性<br>　{<br>　　width:2, //线宽<br>　　color:'#50AE6F' //线颜色<br>}|
|playPolylineOptions|Object|false | 有默认属性| 播放的轨迹的属性<br>　{<br>　　width:2, //线宽<br>　　color:'#50AE6F' //线颜色<br>}|
|getData|Function|false | 使用几米圈模板接口 | 轨迹点数据传入，具体方法写法参考下面例子|
|playImg|Object|false | 有默认属性 |播放图标的改变,<br>{<br>　　play:require('../../../assets/track/play.png') //播放图标,<br>　　pause:require('../../../assets/track/pause.png') //暂停图标<br>}|
|roadBtnOptions|Object|false | 有默认样式 |设置路况图标图标和样式 <br> - image:{on:'map_road-condition_on',off:'map_road-condition_off'} <br> - style:{} |
|mapTypeBtnOptions|Object|false | 有默认样式 |设置地图图标和样式 <br> - image:{on:'map_cutover_off',off:'map_cutover_on'} <br> - style:{}|
|startDate|String,Number |false | 默认当天| 开始时间| 
|endDate|String,Number |false | 默认当天| 结束时间| 
|controllerType|Number |false | 默认为0| 轨迹：0，打点：1| 


## Demo
例子一，默认轨迹
```
import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import {Jimi} from 'react-native-jimi';

export default class Track extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Jimi.BaiduTrack></Jimi.BaiduTrack>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});

```
例子二，自定义的轨迹

```
import React, {Component} from 'react';
import {View,StyleSheet,Text,TouchableOpacity} from 'react-native';
import {Jimi,Applet} from 'react-native-jimi';
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
                        getTrackPoints ={this.getTrackPoints}
                        customItem = {this.customItem}
                        mapTypeBtnStyle={styles.set}
                        polylineOptions = {polylineOptions}
                        playPolylineOptions = {playPolylineOptions}
                        playImg={playImg}
                    >
                    </Jimi.BaiduTrack>
                    :
                    <Jimi.GoogleTrack
                        customItem = {this.customItem}
                        mapTypeBtnStyle={styles.set}
                        polylineOptions = {polylineOptions}
                        playPolylineOptions = {playPolylineOptions}
                        playImg={playImg}
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

```