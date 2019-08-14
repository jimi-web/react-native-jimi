/*
 * @Descripttion: 
 * @version: 
 * @Author: xieruizhi
 * @Date: 2019-08-12 10:17:53
 * @LastEditors: xieruizhi
 * @LastEditTime: 2019-08-14 14:07:42
 */

import {StyleSheet,Platform} from 'react-native';


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
        width:25,
        height:25
    },
    infoWindow:{
        backgroundColor:'#fff',
        paddingLeft:10,
        width:250
    },
    infoWindowItem:{
        flexDirection: 'row',
        fontSize:12,
        paddingBottom:10
    },
    infoWindowTitle:{
        color:'#333'
    },
    infoWindowValue:{
        color:'#717171',
        width:Platform.OS?180:200
    }
});

export default MapStyles;