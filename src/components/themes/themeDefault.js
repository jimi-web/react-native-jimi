/*
 * @Descripttion: 默认样式表
 * @version: 
 * @Author: liujinyuan
 * @Date: 2019-08-08 15:12:32
 * @LastEditors: xieruizhi
 * @LastEditTime: 2020-07-09 14:09:33
 */
import {PixelRatio} from 'react-native';

const mainColor = '#3479F6';
//default color
const defaultColor = '#fff';
//default text color
const defaultTextColor = '#333';

//pixel size
const pixelSize = (function() {
    let pixelRatio = PixelRatio.get();
    if (pixelRatio >= 3) return 0.3333333333333333;
    else if (pixelRatio >= 2) return 0.5;
    else return 1;
})();


export default {
    //text
    fontSize:12,
    color:'red',
    modelBackground:'rgba(0,0,0,0.4)',

    // button
    buttonBorderRadius:5,

    buttonFontLg:16,
    buttonFontMd:14,
    buttonFontSm:12,
    buttonFontXs:10,

    buttonColorDefault:mainColor,
    buttonColorPrimary:'#fff',
    buttonColorDanger:'#fff',

    buttonBackColorDefault:'#fff',
    buttonBackColorPrimary:mainColor,
    buttonBackColorDanger:'#FF3535',

    buttonTextColorDefault:mainColor,
    buttonTextColorPrimary:'#fff',

    buttonBorderColorDefault:mainColor,
    buttonBorderColorPrimary:mainColor,
    buttonBorderColorDanger:'#FF3535',

    buttonBorderWidth: 1,

    //Text
    TextColorDefault:'#000',
    TextColorPrimary:mainColor,
    TextColorDanger:'#FF3535',

    //iphoneX兼容
    iphoneXBottomDefault:25,

    //Wheel
    wheelColor: defaultColor,
    wheelFontSize: 14,
    wheelTextColor: defaultTextColor,
    wheelHoleHeight: 28,
    wheelHoleLineWidth: pixelSize,
    wheelHoleLineColor: '#ccc',
    wheelMaskColor: defaultColor,
    wheelMaskOpacity: 0.4,

    //map
    //position
    deviceMarkerWith:37,
    deviceMarkerHeight:37,
    myPositionWith:32,
    myPositionHeight:32,
    myPositionBtnLeft:15,
    myPositionBtnBottom:30,
    //控件按钮
    controlBtnRight:20,
    controlBtnWidth:37,
    controlBtnHeight:37,
    roadBtnTop:20,
    mapTypeBtnTop:63,
    shareBtnTop:108,

    //trace
    infoBoxText:'#666',
    
    //track
    startEndImgWidth:20,
    startEndImgHeight:34,
    maximumTrackTintColor:'#C0BDC0',
    minimumTrackTintColor:'#2D292D',
    thumbTintColor:'#333033',
    timeTitle:'#000',
    indicatorLineColor:mainColor,
    indicatorLineWidth:3,

    //fenceList
    fenceItemPadding:15,
    fenceTitleColor:'#4D4D4D',
    fenceTitleSize:16,
    fenceAddressColor:'#A3A3A3',
    fenceAddressSize:12,

    //addFence
    circleFillColor:'#3479f61a',
    circleStrokeStyle:mainColor,
    alarmBtnActiveBorderColor:'#FEA22D',
    alarmBtnActivegbColor:'rgba(254, 162, 45, 0.1)',
    
    //record
    recordUploadTimeTextColor:'#4D4D4D',
    recordUploadTimeTextSize:16,
    recordTimeTextColor:'#000',
    recordTimeTextSize:15,
    recordTypeTextSize:11,
    recordTypeTextDefaultColor:'#A3A3A3',
    recordTypeTextPrimaryColor:'#3479F6',
    recordItemHeight:70,

    //Switch
    switchActiveColor:'#4BD865',
    switchDefaultColor:defaultColor,

    //iconTable
    iconActiveBgColor:mainColor,

    // 
    sliderMaximumTrackTintColor:'#E8ECF5',
    sliderMinimumTrackTintColor:mainColor
};