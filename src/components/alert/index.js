/*
 * @Descripttion: 对话框
 * @version: 
 * @Author: liujinyuan
 * @Date: 2019-10-12 14:01:19
 * @LastEditors: xieruizhi
 * @LastEditTime: 2019-10-21 18:11:08
 */
import React, {Component} from 'react';
import {Text, View,StyleSheet,TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';



export default class alertView extends Component{
    static propTypes = {
        contentText:PropTypes.string,

    };
    static defaultProps = {
        contentText:'清空所有录音数据将不可恢复，是否确定？',
        onConfirm:()=>{}
    };
    constructor(props){
        super(props);
    }
    render(){
        const {contentText} = this.props;
        return (
            <View style={styles.dialogMain}>
                <View style={styles.dialogContent}>
                    <Text style={{color:'#030303',fontSize:16}}>{contentText}</Text>
                </View>
                <View style={styles.dialogButton}>
                    <TouchableOpacity activeOpacity={1} style={styles.dialogText} onPress={() => {this.props.onConfirm && this.props.onConfirm();}}>
                        <Text style={{color:'#3479F6',fontSize:17}}>{'确定'}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    dialogMain:{
        width:270,
        borderRadius:12,
        backgroundColor:'#fff',
        // borderBottomColor:'#4D4D4D',
        // borderStyle:StyleSheet.hairlineWidth,    
    },
    dialogContent:{
        width:'100%',
        justifyContent:'center',
        alignItems:'center',
        borderBottomColor:'rgba(77, 77, 77, 0.78)',
        borderBottomWidth:StyleSheet.hairlineWidth,
        borderStyle:'solid',
        paddingTop:45,
        paddingBottom:45,
        paddingRight:10,
        paddingLeft:10,
        
    },
    dialogButton:{
        flexDirection:'row',
        justifyContent:'space-between',
    },
    dialogText:{
        flex:1,
        padding:13,
        fontWeight:'bold',
        alignItems:'center',
    },
    dialogTextBorder:{
        borderRightColor:'rgba(77, 77, 77, 0.78)',
        borderRightWidth:StyleSheet.hairlineWidth,
        borderStyle:'solid',
    }
});