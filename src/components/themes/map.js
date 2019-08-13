/*
 * @Descripttion: 
 * @version: 
 * @Author: xieruizhi
 * @Date: 2019-08-12 10:17:53
 * @LastEditors: xieruizhi
 * @LastEditTime: 2019-08-12 16:45:34
 */

import {StyleSheet} from 'react-native';

const MapStyles =  StyleSheet.create({
    map:{
        flex:1
    },
    btn:{
        position:'absolute',
        right:20,
        zIndex:100,
    },
    btnImg:{
        width:35,
        height:35
    },
    roadBtn:{
        top:30
    },
    MapTypeBtn:{
        top:75
    },
    phonePointBtn:{
        position:'absolute',
        left:20,
        bottom:30,
        zIndex:100
    },
    markerImg:{
        width:20,
        height:20
    }
});

export default MapStyles;