/*
 * @Descripttion: 
 * @version: 
 * @Author: xieruizhi
 * @Date: 2019-09-25 11:48:19
 * @LastEditors  : xieruizhi
 * @LastEditTime : 2019-12-19 18:10:11
 */
import React, {Component} from 'react';
import {Jimi} from '../index';
import {View} from 'react-native';


export default class BaiduAddFence extends Component { 
    constructor(props) {
        super(props);
        this.state = {
            isBaidu:true
        };
    }
    

    render() {
        let {params} = this.props.navigation.state;
        return  <View style={{flex:1}}>
            {
                this.state.isBaidu ? <Jimi.BaiduAddFence
                    // getData = {this.getPoint}
                    fenceId={params?params.fenceId:''}
                    onSave={()=>{
                        this.props.navigation.goBack();
                    }}
                    onDeviceChange = {(data)=>{
                        console.log(data,'设备数据');
                    }}
                    strokeStyle={{
                        width:3,
                        color:'#8bc34a'}
                    }
                    fillColor={'#8bc34a3d'}
                ></Jimi.BaiduAddFence>:<Jimi.GoogleAddFence
                    fenceId={params?params.fenceId:''}
                    onSave={()=>{
                        this.props.navigation.goBack();
                    }}
                >
                </Jimi.GoogleAddFence>
            }
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
                'deviceName': '哈哈哈哈',
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
                'latitude': 39.9093,
                'longitude': 116.3964,
                'gpsLatitude': 22.577018,
                'gpsLongitude': 113.916551,
                'mcc': '',
                'mnc': '',
                'posType': 'GPS',
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