/*
 * @Descripttion: 
 * @version: 
 * @Author: xieruizhi
 * @Date: 2019-09-25 16:02:08
 * @LastEditors: xieruizhi
 * @LastEditTime: 2019-09-26 17:53:53
 */
import {StyleSheet,Dimensions} from 'react-native';
const {width} = Dimensions.get('window');
import Theme from '../../../components/themes/index';
import {isIphoneX,iphoneXHeight} from '../../../libs/utils';
const FenceStyles =  StyleSheet.create({
    line:{
        flex:1,
        flexDirection:'row',
        padding:15,
        alignItems:'center',
        borderBottomWidth:1,
        borderColor:'#F7F7F7',
        backgroundColor:'#fff'
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
    },
    empty:{
        position:'absolute',
        top:'50%',
        left:'50%',
        width:280,
        height:218,
        marginLeft:-140,
        marginTop:-163
    },
    emptyText:{
        marginTop:30,
        fontSize:16,
        color:'#979797',
        textAlign:'center'
    },
    btn:{
        flexDirection:'row',
        justifyContent:'space-between',
        marginLeft:50,
        marginRight:50
    },
    add:{
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        width:205,
        height:38,
        backgroundColor:Theme.buttonBackColorPrimary,
        borderRadius:20
    },
    addText:{
        marginLeft:10,
        color:'#fff',
        fontSize:16
    },
    space:{
        width:width,
        height:isIphoneX()? iphoneXHeight(70):70
    }
});

export default FenceStyles;