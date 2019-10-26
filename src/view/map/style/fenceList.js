/*
 * @Descripttion: 
 * @version: 
 * @Author: xieruizhi
 * @Date: 2019-09-25 16:02:08
 * @LastEditors: xieruizhi
 * @LastEditTime: 2019-10-14 09:39:59
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
        flex:1,
        flexDirection:'row',
        justifyContent:'space-between',
    },
    info:{
        flex:1,
        marginLeft:8,
    },
    name:{
        flex:1,
        color:'#4D4D4D',
        fontSize:16,
        flexWrap:'wrap'
    },
    text:{
        color:'#A3A3A3',
        fontSize:12,
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
        marginLeft:50,
        marginRight:50
    },
    btnItem:{
        flexDirection:'row',
        justifyContent:'space-between',
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
        height:isIphoneX()? iphoneXHeight(80):80
    },
    btnItemText:{
        fontSize:17
    },
    allSelectText:{
        color:Theme.TextColorPrimary
    },
    btnItemLine:{
        color:'rgba(0, 0, 0, 0.1)'
    }
});

export default FenceStyles;