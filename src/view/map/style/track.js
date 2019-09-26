/*
 * @Descripttion: 
 * @version: 
 * @Author: xieruizhi
 * @Date: 2019-08-19 14:41:43
 * @LastEditors: xieruizhi
 * @LastEditTime: 2019-09-25 10:55:02
 */
import {StyleSheet,Dimensions} from 'react-native';
import themes from '../../../components/themes';
const {width} = Dimensions.get('window');
import {isIphoneX,iphoneXHeight} from '../../../libs/utils';

const MapStyles =  StyleSheet.create({
    map:{
        backgroundColor:'red'
    },
    bottomContent:{
        width:width,
        height:isIphoneX() ? iphoneXHeight(180):180,
        backgroundColor:'#FFF'
    },
    details:{
        height:65,
        paddingTop:11,
        paddingLeft:15,
        paddingRight:15
    },
    time:{
        flex:1,
        flexDirection:'row',
        marginBottom:15
    },
    timeText:{
        fontSize:18,
        color:'#000000',
    },
    selectTimeIcon:{
        paddingLeft:20,
        paddingRight:20,
    },  
    timeIcon:{
        width:20,
        height:20 
    },
    speed:{
        flex:1,
        flexDirection:'row',   
    },
    speedText:{
        color:'#838383',
        fontSize:13  
    },
    bottomBtn:{
        flex:1,
        flexDirection:'row',
        justifyContent:'space-around',
        alignItems:'center',
        marginTop:-15,
        paddingLeft:10,
    },
    playControllerTextStyle:{
        flexDirection:'row',
        alignItems:'center',
    },
    locateMode:{
        width:width,
        height:250,
        backgroundColor:'#fff'
    },
    locateModeSelect:{
        width:width,
        height:48,
        borderBottomWidth:1,
        borderBottomColor:'#DBDBDB',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center'
    },
    locateModeSelectText:{
        fontSize:17,
        color:'#000'
    },
    locateModeSpace:{
        height:5,
        backgroundColor:'#E3E3E3'
    },
    slideModalTime:{
        position:'absolute',
        bottom:0,
        width:width,
        height:isIphoneX() ? iphoneXHeight(255):255,
        justifyContent:'center',
    },
    tab:{
        position:'absolute',
        width:326,
        height:46,
        top:0,
        left:'50%',
        marginLeft:-163,
        backgroundColor:'#fff',
        borderRadius:4,
        zIndex:1000,
        justifyContent:'center',
        alignItems:'center',
    },
    slideModalTimeContent:{
        width:width,
        height:isIphoneX() ? iphoneXHeight(232):232,
        backgroundColor:'#FFF',
        marginTop:23,
        paddingLeft:37,
        paddingRight:37,
        paddingTop:43
    },
    titleStyle:{
        fontSize:16,
        color:'#6B6B6B'
    },
    activeTitleStyle:{
        fontSize:16,
        color:themes.TextColorPrimary
    },
    listRow:{
        flexDirection:'row',
        alignItems:'center'  
    },
    listRowTitle:{
        fontSize:16,
        color:'#CFCFCF',
        marginRight:15
    },
    listRowValue:{
        fontSize:16
    },
    endTime:{
        marginTop:10
    },
    showType:{
        fontSize:12
    },
    btn:{
        flexDirection:'row',
        justifyContent: 'space-between',
        marginTop:28
    },
    btnItem:{
        width:128,
        height:38,
        borderRadius:19
    },
    cancel:{
        backgroundColor:'#fff',       
    },
    confirm:{
        color:'#fff',
        backgroundColor:themes.buttonBackColorPrimary      
    },
    btnItemText:{
        fontSize:16,
        textAlign:'center',
        lineHeight:38
    },
    selectTime:{
        position:'absolute',
        bottom:0,
        width:width
    },
    startEndImg :{
        width:20,
        height:34
    }
    
});

export default MapStyles;