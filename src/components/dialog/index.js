/*
 * @Descripttion: 对话框
 * @version: 
 * @Author: liujinyuan
 * @Date: 2019-10-12 14:01:19
 * @LastEditors: xieruizhi
 * @LastEditTime: 2020-06-04 11:42:41
 */
import React, {Component} from 'react';
import {Text, View,StyleSheet,TouchableOpacity} from 'react-native';
import Theme from '../themes/index';
import PropTypes from 'prop-types';

export default class Dialog extends Component{
    static propTypes = {
        contentText:PropTypes.string,

    };
    static defaultProps = {
        contentText:'是否删除?'
    };
    constructor(props){
        super(props);
    }
    render(){
        const {contentText} = this.props;
        return (
            <View style={styles.dialogMain}>
                <View style={styles.dialogContent}>
                    <Text style={{color:'#030303',fontSize:16,lineHeight:18}}>{contentText}</Text>
                </View>
                <View style={styles.dialogButton}>
                    <TouchableOpacity activeOpacity={1} style={[styles.dialogText,styles.dialogTextBorder]} onPress={() => {this.props.onCancel && this.props.onCancel();}}>
                        <Text style={{color:Theme.buttonBorderColorPrimary,fontSize:17}}>{I18n.t('取消')}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={1} style={styles.dialogText} onPress={() => {this.props.onConfirm && this.props.onConfirm();}}>
                        <Text style={{color:Theme.buttonBorderColorPrimary,fontSize:17}}>{I18n.t('确定')}</Text>
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