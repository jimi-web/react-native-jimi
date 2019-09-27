/*
 * @Descripttion: 
 * @version: 
 * @Author: xieruizhi
 * @Date: 2019-08-19 14:41:43
 * @LastEditors: xieruizhi
 * @LastEditTime: 2019-09-26 16:24:38
 */
import {StyleSheet,Dimensions} from 'react-native';
const {width} = Dimensions.get('window');

const MapStyles =  StyleSheet.create({
    box:{
        position:'absolute',
        bottom:0,
        width:width,
        backgroundColor:'#fff',
        borderTopLeftRadius:14,
        borderTopRightRadius:14,
        zIndex:9999
    },
    navigation:{
        position:'absolute',
        top:-24,
        right:10,
        width:48,
        height:48
    },
    pullUp:{
        width:50,
        height:22,
        paddingTop:3,
        alignItems:'center',
    },
    information:{
        padding:20,
        paddingTop:0,
    },
    item:{
        marginBottom:10
    },
    title:{
        color:'#000',
        fontSize:16
    },
    text:{
        color:'#666'
    },
    state:{
        flexDirection:'row'
    },
    line:{
        marginLeft:10,
        marginRight:10,
        color:'#666',
    },
    whitespace:{
        width:width
    }
});

export default MapStyles;