/*
 * @Descripttion: 
 * @version: 
 * @Author: xieruizhi
 * @Date: 2019-09-03 10:33:49
 * @LastEditors: xieruizhi
 * @LastEditTime: 2019-12-09 15:12:57
 */
import {StyleSheet} from 'react-native';
import {Theme} from '../../../components/index';

const Styles =  StyleSheet.create({
    container:{
        flex:1,
    },
    btn:{
        position:'absolute',
        right:Theme.controlBtnRight,
        width:Theme.controlBtnWidth,
        height:Theme.controlBtnHeight,
        zIndex:100,
    },
    btnImg:{
        width:'100%',
        height:'100%'
    },
    roadBtn:{
        top:Theme.roadBtnTop,
    },
    mapTypeBtn:{
        top:Theme.mapTypeBtnTop,
    }, 
    shareBtn:{
        top:Theme.shareBtnTop,
    },  
    deviceMarker:{
        width:Theme.deviceMarkerWith,
        height:Theme.deviceMarkerHeight
    },
    
});

export default Styles;