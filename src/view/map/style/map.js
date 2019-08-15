/*
 * @Descripttion: 
 * @version: 
 * @Author: xieruizhi
 * @Date: 2019-08-12 10:17:53
 * @LastEditors: xieruizhi
 * @LastEditTime: 2019-08-15 14:28:50
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
    mapTypeBtn:{
        top:75
    },
    phonePointBtn:{
        position:'absolute',
        left:20,
        bottom:30,
        zIndex:100
    },
    markerImg:{
        width:23,
        height:23
    },
    infoWindow:{
        paddingTop:10,
        backgroundColor:'#fff',
        paddingLeft:10,
        width:250,
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
        width:Platform.OS?180:200
    },
    imei:{
        fontSize:14,
        color:'#03B8A6'
    }
});

export default MapStyles;