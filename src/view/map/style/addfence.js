/*
 * @Descripttion: 
 * @version: 
 * @Author: xieruizhi
 * @Date: 2019-09-29 14:37:13
 * @LastEditors: xieruizhi
 * @LastEditTime: 2019-12-10 16:23:53
 */
import {StyleSheet,Dimensions} from 'react-native';
import {isIphoneX,iphoneXHeight} from '../../../libs/utils';
import Theme from '../../../components/themes/index';
const {width} = Dimensions.get('window');

const AddFenceStyles =  StyleSheet.create({
    search:{
        position:'relative',
        flexDirection:'row',
        width:width,
        height:42,
        paddingLeft:15,
        paddingRight:15,
        backgroundColor:'#fff'
    },
    searchInput:{
        flex:1,
        height:32, 
        backgroundColor: '#F7F7F7',
        borderColor: '#F7F7F7',
        borderTopRightRadius:3,
        borderBottomRightRadius:3
    },
    searchDel:{
        width:28,
        height:32,
        backgroundColor:'#F7F7F7',
        borderColor: '#F7F7F7',
        borderTopRightRadius:3,
        borderBottomRightRadius:3,
        justifyContent:'center'


    },
    map:{
        flex:1,
    },
    space:{
        height:117,
        width:width
    },  
    info:{
        position:'absolute',
        left:0,
        bottom:0,
        width:width,
        paddingLeft:15,
        paddingRight:15,
        paddingTop:18,
        paddingBottom:isIphoneX()?iphoneXHeight(18):18,
        borderTopRightRadius:14,
        borderTopLeftRadius:14,
        backgroundColor:'#fff',
        zIndex:999
    },
    infoItem:{
        flexDirection:'row',
    },
    name:{
        color:'#000',
        fontSize:16,
        marginRight:14,
        borderBottomColor:'#F7F7F7',
    },
    address:{
        color:'#666666',
        fontSize:12,
        paddingTop:10,
        paddingBottom:15,
    },
    btn:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        paddingTop:15,
        borderTopWidth:1,
        borderColor:'#F7F7F7'
    },
    leftBtn:{
        flexDirection:'row',
    },  
    alarmBtn:{
        height:30,
        justifyContent:'center',
        borderWidth:1,
        borderRadius:20,
        borderColor:'#F7F7F7',
        paddingLeft:10,
        paddingRight:10,
    },
    alarmText:{
        color:'#A3A3A3'
    },
    alarmBtnActive:{
        borderColor:Theme.alarmBtnActiveBorderColor,
        backgroundColor:Theme.alarmBtnActivegbColor,
    },
    alarmTextActive:{
        color:Theme.alarmBtnActiveBorderColor,
    },  
    save:{
        width:72,
        height:32,
        backgroundColor:Theme.buttonBackColorPrimary,
        borderRadius:15,
        justifyContent:'center',
        alignItems:'center'
    },
    zooming:{
        position:'absolute',
        top:85,
        right:20,
        height:337,
        alignItems:'center',
    },
    saveText:{
        color:Theme.buttonTextColorPrimary,
    },
    addressList:{
        position:'absolute',
        top:42,
        bottom:0,
        width:width,
        backgroundColor:'#fff',
        zIndex:1000
    },
    addressListItem:{
        padding:15,
        borderBottomWidth:1,
        borderBottomColor:'#F7F7F7'
    },
    placename:{
        fontSize:14,
        color:'#4D4D4D'
    },
    deviceLocation:{
        color:Theme.TextColorPrimary
    },
    fullAddress:{
        marginTop:5,
        fontSize:11,
        color:'#A3A3A3'        
    },
    strokeStyle:{
        width:2,
        color:Theme.circleStrokeStyle
    },
    radiusTip:{
        height:24,
        width:74,
        backgroundColor:Theme.buttonBackColorPrimary,
        borderRadius:12,
        justifyContent:'center',
        alignItems:'center'
    },
    radiusTipText:{
        color:Theme.buttonTextColorPrimary,
        fontSize:11
    },
    radiusTipLine:{
        height:10,
        width:2,
        backgroundColor:Theme.buttonBackColorPrimary,
    }
});

export default AddFenceStyles;
