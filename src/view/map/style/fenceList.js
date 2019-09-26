/*
 * @Descripttion: 
 * @version: 
 * @Author: xieruizhi
 * @Date: 2019-09-25 16:02:08
 * @LastEditors: xieruizhi
 * @LastEditTime: 2019-09-25 17:25:23
 */
import {StyleSheet} from 'react-native';
const FenceStyles =  StyleSheet.create({
    line:{
        flexDirection:'row',
        marginLeft:15,
        marginRight:15,
        paddingTop:15,
        paddingBottom:15,
        alignItems:'center',
        borderBottomWidth:1,
        borderColor:'#F7F7F7'
    },
    icon:{
        width:26,
        height:24
    },
    title:{
        flexDirection:'row',
        justifyContent:'space-between'
    },
    info:{
        flex:1,
        marginLeft:8,

    },
    name:{
        color:'#4D4D4D',
        fontSize:16
    },
    text:{
        color:'#A3A3A3',
        fontSize:12
    },
    address:{
        marginTop:5
    } 
});

export default FenceStyles;