/*
 * @Descripttion: 
 * @version: 
 * @Author: xieruizhi
 * @Date: 2019-08-12 10:17:53
 * @LastEditors: xieruizhi
 * @LastEditTime: 2019-09-11 18:19:00
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
        width:37,
        height:37,
        zIndex:100,
    },
    myMarker:{
        width:30,
        height:30
    },  
    infoWindow:{
        padding:15,
        paddingBottom:0,
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
        paddingBottom:8,
    },
    infoWindowTitle:{
        color:'#666',
    },
    infoWindowItemImei:{
        justifyContent:'space-between'
    },  
    imei:{
        fontSize:14,
        color:'#000',
        paddingBottom:5
    },
    line:{
        marginLeft:10,
        marginRight:10,
        color:'#E1E1E1'
    },
    batterybg:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        width: 23, 
        height:13
    }
    
});

export default MapStyles;