/*
 * @Descripttion: 
 * @version: 
 * @Author: xieruizhi
 * @Date: 2019-09-03 10:32:27
 * @LastEditors: xieruizhi
 * @LastEditTime: 2019-09-04 14:29:55
 */
import React, {Component} from 'react';
import {View,TouchableOpacity,Image} from 'react-native';
import PropTypes from 'prop-types';
import Styles from '../style/base';

export default class TrackUtils extends Component {  
    static propTypes = {
        initialRegion:PropTypes.object,//初始化中心点
        mapType: PropTypes.oneOf(['standard', 'satellite']),//地图类型
        trafficEnabled:PropTypes.bool,//是否开启路况
    }

    static defaultProps = {
        initialRegion:{
            latitude: 22.596904,
            longitude: 113.936674,
            latitudeDelta:0.0922,
            longitudeDelta: 0.0421,
        },
        mapType:'standard',
        trafficEnabled:false,
    }

    constructor(props) {
        super(props);
        this.state = {
            mapType:this.props.mapType,//地图类型
            trafficEnabled:this.props.trafficEnabled,//路况是否开启
            startMarker:null, //起点的标注
            endMarker:null, //终点的标注
            deviceMarker:null,//设备标注
        };
    }

        
    /**
     * 路况按钮
     */
    roadBtn = ()=> {
        return <TouchableOpacity style={[Styles.btn,Styles.roadBtn,this.props.roadBtnStyle]}  activeOpacity={1} onPress={() => this.setState({trafficEnabled:!this.state.trafficEnabled})}>
            <Image style={Styles.btnImg} source={this.state.trafficEnabled?require('../../../assets/map/road_active.png'):require('../../../assets/map/road.png')} />
        </TouchableOpacity>;
    }

    /**
     * 地图类型按钮
     */
    mapTypeBtn = ()=> {
        return <TouchableOpacity style={[Styles.btn,Styles.mapTypeBtn,this.props.mapTypeBtnStyle]}   activeOpacity={1} onPress={this.setMapType}>
            <Image style={Styles.btnImg} source={this.state.mapType==='standard'?require('../../../assets/map/layer.png'):require('../../../assets/map/home_icon_live-action.png')} />
        </TouchableOpacity>; 
    }
}