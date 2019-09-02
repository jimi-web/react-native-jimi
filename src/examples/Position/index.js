/*
 * @Descripttion: 
 * @version: 
 * @Author: xieruizhi
 * @Date: 2019-08-12 09:30:32
 * @LastEditors: xieruizhi
 * @LastEditTime: 2019-09-02 18:27:41
 */
import React, {Component} from 'react';
import {View,StyleSheet,Text} from 'react-native';
import Position from '../../view/map/index';

export default class Map extends Component {
    constructor(props) {
        super(props);
    }
    render(){
        let obj= {
            // style:styles.marker,
            image:require('../../assets/map/icon_car.png'),
        };

        let car = {
            isShow:false
        };

        let my = {
            image:require('../../assets/map/oldMan.png'),
        };

        let markerInfoWindow = {
            isCustom:true,
            markerInfo:this.markerInfo
        };

        return <View style={{flex:1}}>
            <Position.Baidu
                getMarkerPoint={this.getPoint}
                trafficEnabled={false}
                mapType={'standard'}
                markerOperation={obj}
                refreshTime = {20000}
                ChangePositionBtn={car}
                mylocationOperation={my}
                customItem = {this.customItem}
                mapTypeBtnStyle={styles.set}
                // markerInfoWindow={markerInfoWindow}
            >
            </Position.Baidu>
        </View>;  
    }

    
    componentDidMount() {
  
    }


    /**
     * 在地图上自定义样式
     */
    customItem = ()=>{
        return <View style={styles.customItem}>
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
        let data = {
            imei:'355137100102921',
            latitude:22.54605355,
            longitude:114.02597366,
            gpsTime:'2019-08-09 10:37:42',
            otherPosTime:'2019-08-09 10:37:42',
            posType:'WIFI',
            gpsSpeed:'10',
            address:'深圳市宝安区留仙一路高新奇b栋几米物联有限公司gubuygyhiuhuihui',
            rotate:120.00,
        };
        setLocationData(data);
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
        width:50,
        height:50,
        backgroundColor:'#000' 
    },
    set:{
        position:'absolute',
        right:40,
        zIndex:100,
    }
});
