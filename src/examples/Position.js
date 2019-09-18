/*
 * @Descripttion: 
 * @version: 
 * @Author: xieruizhi
 * @Date: 2019-08-12 09:30:32
 * @LastEditors: xieruizhi
 * @LastEditTime: 2019-09-18 11:40:40
 */
import React, {Component} from 'react';
import {View,StyleSheet,Text,TouchableOpacity} from 'react-native';
import {Jimi} from '../index';

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
