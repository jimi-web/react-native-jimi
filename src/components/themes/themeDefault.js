/*
 * @Descripttion: 默认样式表
 * @version: 
 * @Author: liujinyuan
 * @Date: 2019-08-08 15:12:32
 * @LastEditors: xieruizhi
 * @LastEditTime: 2019-10-14 10:05:42
 */


const mainColor = '#3479F6';
//default color
const defaultColor = '#fff';
//default text color
const defaultTextColor = '#333';
export default {
    //text
    fontSize:12,
    color:'red',
    modelBackground:'rgba(0,0,0,0.4)',

    // button
    buttonBorderRadius:5,

    buttonFontMd:14,
    buttonFontSm:12,
    buttonFontXs:10,

    buttonColorDefault:mainColor,
    buttonColorPrimary:'#fff',
    buttonColorDanger:'#fff',

    buttonBackColorDefault:'#fff',
    buttonBackColorPrimary:mainColor,
    buttonBackColorDanger:'#FF3535',

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
    wheelHoleLineWidth: 1,
    wheelHoleLineColor: '#ccc',
    wheelMaskColor: defaultColor,
    wheelMaskOpacity: 0.4,
};