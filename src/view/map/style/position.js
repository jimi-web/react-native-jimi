/*
 * @Descripttion: 
 * @version: 
 * @Author: xieruizhi
 * @Date: 2019-08-12 10:17:53
 * @LastEditors: xieruizhi
 * @LastEditTime: 2019-09-04 14:17:56
 */

import {StyleSheet,Platform} from 'react-native';


const MapStyles =  StyleSheet.create({
    map:{
        flex:1
    },
    btn:{
        position:'absolute',
        right:20,
        width:35,
        height:35,
        zIndex:100,
    },
    btnImg:{
        width:'100%',
        height:'100%'
    },
    roadBtn:{
        top:20,
    },
    mapTypeBtn:{
        top:63,
    },
    phonePointBtn:{
        position:'absolute',
        left:20,
        bottom:30,
        width:35,
        height:35,
        zIndex:100,
    },
    markerImg:{
        width:23,
        height:23
    },
    infoWindow:{
        padding:15,
        backgroundColor:'#fff',
        width:260,
    },
    infoWindowShadow:{
        shadowColor: '#000000',
        shadowOffset: {h: 10, w: 10},
        shadowRadius: 5,
        shadowOpacity: 0.1,
    },
    infoWindowItem:{
        flexDirection: 'row',
        fontSize:12,
        paddingBottom:10,
    },
    infoWindowTitle:{
        color:'#333',
    },
    infoWindowValue:{
        color:'#717171',
        width:Platform.OS?170:200
    },
    imei:{
        fontSize:14,
        color:'#03B8A6'
    }
});

export default MapStyles;