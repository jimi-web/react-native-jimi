/*
 * @Descripttion: 
 * @version: 
 * @Author: xieruizhi
 * @Date: 2019-09-03 10:33:49
 * @LastEditors: xieruizhi
 * @LastEditTime: 2019-10-22 11:52:17
 */
import {StyleSheet} from 'react-native';
const Styles =  StyleSheet.create({
    container:{
        flex:1,
    },
    btn:{
        position:'absolute',
        right:20,
        // width:37,
        // height:37,
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
    shareBtn:{
        top:108,
    },  
    deviceMarker:{
        width:37,
        height:37
    }  
});

export default Styles;