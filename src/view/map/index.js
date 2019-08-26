/*
 * @Descripttion: 
 * @version: 
 * @Author: xieruizhi
 * @Date: 2019-08-12 09:30:32
 * @LastEditors: liujinyuan
 * @LastEditTime: 2019-08-26 15:48:14
 */
import React, {Component} from 'react';
import {View,StyleSheet,Text} from 'react-native';
import TopView from '../../components/overlay/TopView';
import Position from './google/position';
// import Position from './baidu/position';
export default class Map extends Component {
    constructor(props) {
        super(props);
    }
    
    render(){
        let obj= {
            // style:styles.marker,
            image:require('../../assets/map/oldMan.png'),
        };

        let car = {
            markerImg:require('../../assets/map/oldMan.png'),
            positionImg:require('../../assets/map/oldMan.png')
        };

        let my = {
            image:require('../../assets/map/oldMan.png'),
        };

        let markerInfoWindow = {
            isCustom:true,
            markerInfo:this.markerInfo
        };

        return (
            <View style={{flex:1}}>
                <Position
                    getMarkerPoint={this.getPoint}
                    trafficEnabled={true}
                    mapType={'standard'}
                    markerOperation={obj}
                    refreshTime = {20000}
                    ChangePositionBtn={car}
                    mylocationOperation={my}
                    customItem = {this.customItem}
                    mapTypeBtnStyle={styles.set}
                    markerInfoWindow={markerInfoWindow}
                >  
                </Position>
            </View>  
        );
    }

    componentDidMount() {
        // let overView = <View><Text>asdasdasdasd</Text></View>;
        // TopView.add(overView);
    }

    _children = ()=>{
        return <View>
            <Text>dasdasdasdasd</Text>
        </View>;
    }

    /**
     * 在地图上自定义样式
     */
    customItem = ()=>{
        return <View style={styles.customItem}>

        </View>;
    }

    /**
     * 
     */
    markerInfo = ()=>{
        return <View>
            <Text>1111111111111111</Text>
        </View>;        
    }

    getPoint=(callBack)=>{

        callBack({
            imei:'355137100102921',
            latitude:22.54605355,
            longitude:114.02597366,
            gpsTime:'2019-08-09 10:37:42',
            otherPosTime:'2019-08-09 10:37:42',
            posType:'WIFI',
            gpsSpeed:'10',
            address:'深圳市宝安区留仙一路高新奇b栋几米物联有限公司gubuygyhiuhuihui'
        });
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
