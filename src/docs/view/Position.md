<!--
 * @Descripttion: 
 * @version: 
 * @Author: xieruizhi
 * @Date: 2019-09-02 14:09:39
 * @LastEditors: xieruizhi
 * @LastEditTime: 2019-10-18 13:41:05
 -->


# `Position` 地图定位

只有元素名字不一样，其他属性都相同  
`<Jimi.BaiduPosition />` 谷歌地图  
`<Jimi.GooglePosition />` 百度地图  

## Props
| Prop | Type | required | Default | Note |
|---|---|---|---|---|
|mapType|String| false | 'standard'|地图类型 <br>- standard: 标准 <br>- satellite: 卫星| 
|initialRegion|Object|false | 有默认值 |地图初始化地区 <br> {<br>　　latitude: 22.596904,<br>　　longitude:113.936674,<br>　　latitudeDelta:0.0922,<br>　　longitudeDelta:0.0421<br>} | 
|trafficEnabled|Bool|false | false|是否打开路况图层 <br>true && false| 
|isRefresh|Bool|false | true|是否刷新定位信息 <br>true && false|
|refreshTime|Number|false | 15000|定位信息更新时间|
|deviceMarkerOptions|Object|false | 有默认属性 |设备标记点属性,只有谷歌地图能自定义样式 style，百度传无效<br>{<br>　　style:{width:100,height:100},<br>　　image:require('./../../assets/map/oldMan.png')<br>}|
|mylocationOptions|Object|false | 有默认属性 |我的位置点属性,只有谷歌地图能自定义样式 style，百度传无效 <br>{ <br>　　style:{width:100,height:100},<br>　　image:require('./../../assets/map/oldMan.png')<br>}|
|ChangePositionBtn|Object|false | 有默认属性 |我的位置和自定义标记的图标设置<br>-style: 自定义样式<br>-markerImg: 自定义标记图标 <br>-myPositionImg: 自定义我的位置图标<br>{<br>style:{width:100,height:100}<br>markerImg:require('./../../assets/map/equipment.png'),<br>myPositionImg:require('./../../assets/map/old.png')<br>}|
|getData|Function|false | 使用几米圈模板接口 | 设置定位信息，具体方法写法参考下面例子|
|markerInfoWindow|Object|false | 有默认属性|自定义inforWindow属性<br>- isCustom:是否自定义(百度地图无需传)<br>- markerInfo:自定义内容<br>{<br>　　isCustom:false,<br>　　markerInfo:()=>{}<br>}|
|roadBtnStyle|Object|false | 有默认样式 |设置路况图标样式 <br> {width:100,height:100}|
|mapTypeBtnStyle|Object|false | 有默认样式 |设置地图图标样式 <br> {width:100,height:100}|
|mapControls|Function|false | 无 |设置地图其他插件元素，如Marker，Circle，Polyline 等等 |

## Events
| Event Name | Returns | Notes |
|---|---|---|
|onDeviceChange|设备信息（参考几米圈定位信息接口）|当更新设备信息时会调用|
|onMyChange|我的位置坐标|当更我的位置时会调用|

## Demo
例子一，默认定位
```
import React, {Component} from 'react';
import {View} from 'react-native';
import {Jimi} from 'react-native-jimi';
export default class Map extends Component {
    constructor(props) {
        super(props);
    }

    render(){
        return <View style={{flex:1}}>
            <Jimi.BaiduPosition/>
        </View>;  
    }	
}

```


例子二，自定义样式定位

```
import React, {Component} from 'react';
import {View,StyleSheet,Text,TouchableOpacity} from 'react-native';
import {Jimi} from 'react-native-jimi';

export default class Position extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isBaidu:true
        };
    }
    render(){
        let obj= {
            // style:styles.marker,
            image:require('../assets/map/device.png'),
        };

        let car = {
            isShow:true
        };

        let my = {
            image:require('../assets/map/trajectory_map_phone_position.png'),
        };

        let markerInfoWindow = {
            isCustom:true,
            markerInfo:this.markerInfo
        };

        return <View style={{flex:1}}>
            {
                !this.state.isBaidu ?
       
                    <Jimi.GooglePosition
                        // getMarkerPoint={this.getPoint}
                        trafficEnabled={false}
                        mapType={'standard'}
                        markerOptions={obj}
                        refreshTime = {20000}
                        ChangePositionBtn={car}
                        mylocationOptions={my}
                        customItem = {this.customItem}
                        mapTypeBtnStyle={styles.set}
                        // markerInfoWindow={markerInfoWindow}
                    >
                    </Jimi.GooglePosition>
                    :
                    <Jimi.BaiduPosition
                        // getMarkerPoint={this.getPoint}
                        trafficEnabled={false}
                        mapType={'standard'}
                        markerOptions={obj}
                        refreshTime = {15000}
                        ChangePositionBtn={car}
                        mylocationOptions={my}
                        customItem = {this.customItem}
                        mapTypeBtnStyle={styles.set}
                        // markerInfoWindow={markerInfoWindow}
                    >
                    </Jimi.BaiduPosition>
            }
        </View>;  
    }

    
    componentDidMount() {
  
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
     * 自定义infoWindow
     */
    markerInfo = ()=>{
        return <View style={{width:100,backgroundColor:'#fff'}}>
            <Text>1111111111111111</Text>
        </View>;        
    }

    /**
     * 接口自定义
     */
    getPoint=(setLocationData)=>{
        //数据模拟，接口模板
        let result = {
            'code': 0,
            'data': {
                'encodingType': 'imei',
                'encoding': '351608089944623',
                'deviceStatus': 2,
                'clientId': '350000199603207563',
                'deviceId': 'F4AB29e5-D5fa-3f37-69Db-5faEE3D61cdd',
                'deviceName': 'Eric',
                'acc': 'accacc',
                'ci': '5546',
                'direction': 90,
                'baseX': '',
                'lastAccTurnTime': '1120663607495',
                'gateId': 'd5d8BeE9-F798-b3eE-Cbed-AF9Ef4dDaC85',
                'gateTime': '960440526415',
                'gpsInfo': 1,
                'gpsMode': 1,
                'gpsSpeed': 49,
                'gpsTime': '1263511883300',
                'ica': '9875',
                'latitude': 22.5583432558,
                'longitude': 113.9065941055,
                'mcc': '',
                'mnc': '',
                'posType': 2,
                'otherPosTime': '759797411814',
                'posMethod': 2,
                'recordTime': '1309722536121',
                'hbOffOn': 1,
                'accStatus': '',
                'deviceInfo': 'Uzxdyeytr xdd krlu vcyovrnfj.',
                'ext': '',
                'fortifyStatus': '',
                'gPSSignal': '',
                'gpsStatus': 1,
                'oilEleStatus': 1,
                'powerLevel': 1,
                'batteryPowerVal': '',
                'powerValue': '',
                'powerStatus': '',
                'powerPer': '50',
                'seqNo': '',
                'time': '946994902071',
                'alarmType': '20',
                'address':'深圳市宝安区新安街道高新奇'
            },
            'msg': 'ok'
        };
        setLocationData(result.data);
    }     
}

const styles =  StyleSheet.create({
    marker:{
        width:20,
        height:20
    },
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