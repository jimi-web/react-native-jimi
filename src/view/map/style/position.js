/*
 * @Descripttion: 
 * @version: 
 * @Author: xieruizhi
 * @Date: 2019-08-12 10:17:53
 * @LastEditors: xieruizhi
 * @LastEditTime: 2019-12-09 14:51:15
 */

import {StyleSheet} from 'react-native';
import {Theme} from '../../../components/index';

const MapStyles =  StyleSheet.create({
    map:{
        flex:1
    },
    phonePointBtn:{
        position:'absolute',
        left:Theme.myPositionBtnLeft,
        bottom:Theme.myPositionBtnBottom,
        width:Theme.controlBtnWidth,
        height:Theme.controlBtnHeight,
        zIndex:100,
    },
    myMarker:{
        width:Theme.myPositionWith,
        height:Theme.myPositionHeight
    },  
    infoWindow:{
        padding:15,
        paddingBottom:0,
        backgroundColor:'#fff',
        width:280,
    },
    infoWindowShadow:{
        shadowColor: '#000000',
        shadowOffset: {h: 10, w: 10},
        shadowRadius: 5,
        shadowOpacity: 0.1,
    },
    infoWindowItem:{
        flexDirection: 'row',
        paddingBottom:5,
        alignItems:'center'
    },
    infoWindowTitle:{
        color:'#666',
        fontSize:12
    },
    infoWindowItemImei:{
        justifyContent:'space-between'
    },  
    deviceStatus:{
        fontSize:16,
        color:'#000',
        paddingBottom:5
    },
    line:{
        marginLeft:5,
        marginRight:5,
        color:'#E1E1E1'
    },
    batterybg:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        width: 22, 
        height:13,
        borderWidth:1,
        borderColor:'#000',
        borderRadius:2,
        marginRight:4
    },
    batteryRight:{
        position:'absolute',
        right:-2,
        top:'50%',
        width:1,
        height:6,
        marginTop:-3,
        backgroundColor:'#000'
    }
    
});

export default MapStyles;