/*
 * @Descripttion: 
 * @version: 
 * @Author: liujinyuan
 * @Date: 2019-09-12 11:40:33
 * @LastEditors: liujinyuan
 * @LastEditTime: 2019-09-18 15:30:19
 */
import React, {Component} from 'react';
import {View,Text,StyleSheet,Image,FlatList,Slider} from 'react-native';
import RecordControl from './RecordControl';
import PropTypes from 'prop-types';

export default class Record extends Component{
    constructor(props){
        super(props);
        this.state = {
            isOpenSelect:1,//是否开启选择
            changeFileLength:0,
            data:[
                {
                    row:0,
                    zIndex:9999,
                },
                {
                    row:1,
                    zIndex:9998,
                    type:1
                },
                {
                    row:1,
                    zIndex:9997,
                    type:2
                },
                {
                    row:1,
                    zIndex:9996,
                    type:3
                },
                {
                    row:0,
                    zIndex:9999
                },
                {
                    row:1,
                    zIndex:9995,
                    type:4
                },
                {
                    row:1,
                    zIndex:9994,
                    type:0
                },
                {
                    row:1,
                    zIndex:9997,
                    type:5
                },
                {
                    row:1,
                    zIndex:9998,
                    type:5
                },
                {
                    row:0,
                    zIndex:9999,
                    type:5
                },
                {
                    row:1,
                    zIndex:9999
                },
                {
                    row:1,
                    zIndex:9999
                },
                {
                    row:1,
                    zIndex:9999
                },
                {
                    row:1,
                    zIndex:9999
                },
                {
                    row:1,
                    zIndex:9999
                },
            ]
        };
    }

    render(){
        return (
            <View style={{backgroundColor:'#f7f7f7',flex:1}}>
                <FlatList
                    data = {this.state.data}
                    renderItem={this.renderItem}
                />
                <View style={{height:55,width:'100%'}}>
                    <RecordControl
                        type={this.state.isOpenSelect}
                        fileNumber={this.state.changeFileLength}
                        onSelect = {(type) => {this.onSelect(type);}}
                        onEmpty = {() => {this.onEmpty();}}
                        onEmpty = {() => {this.onDelete();}}
                    />
                </View>

            </View>
        );
    }
    /**
     * 删除
     */
    onDelete = () => {
        //
    }
    /**
     * 清空
     */
    onEmpty = () => {
        //
    }
    /**
     * 
     */
    onSelect = (type) => {
        console.log('触发？？、',type);
        this.setState({
            isOpenSelect:type
        });
    }
    /**
     * 
     * @param {Object} data 当前行数据
     */
    renderItem = (data) => {
        const item = data.item;
        let view = null;
        if(item.row == 0){
            view = <View style={styles.titleStyle}>
                <Text>{'今天'}</Text>
            </View>;
        }else{
            view = <View style={{...styles.mainStyle,zIndex:item.zIndex}}>
                <View style={styles.contentStyle}>
                    <View>
                        {this.renderRecordImage(item.type)}
                    </View>
                    <View style={{paddingLeft:10,flex:1}}>
                        <Text style={{color:'#4D4D4D',fontSize:16 }}>
                            {'14:35:20'}
                        </Text>
                        <View style={{flexDirection:'row',justifyContent:'space-between',marginTop:10,}}>
                            {this.renderRecordType(item)}
                            <Text style={{color:'#000',fontSize:15}}>{'00:02:03'}</Text>
                        </View>
                    </View>
                </View>
                <View style={{...styles.bottomBorder,width:'50%',height:1,position:'absolute',bottom:0,left:15}}>
                    
                </View>
                {/* <View style={{position:'absolute',bottom:0,height:5,width:5,left:15,backgroundColor:'red',borderRadius:10,marginTop:5}}>
                    
                </View> */}
            </View>;
        }
        // console.log(view,item.row);
        return view;
         
    }
    /**
     * 
     * @param {number} type 根据类型生成不同的状态图,同图片状态
     */
    renderRecordImage(status){
        let img;
        switch (status) {
        case 0:
            img = require('../../assets/record/recording_list_undownload.png');
            break;
        case 1:
            img = require('../../assets/record/recording_list_downloading.png');
            break;
        case 2:
            img = require('../../assets/record/recording_list_downloaded.png');
            break;
        case 3:
            img = require('../../assets/record/recording_list_playing.gif');
            break;
        case 4:
            img = require('../../assets/record/checkbox_nor.png');
            break;
        case 5:
            img = require('../../assets/record/checkbox_pre.png');
            break;
        default:
            img = require('../../assets/record/recording_list_undownload.png');
            break;
        }
        return <Image source={img} />;
    }
    /**
     * 
     * @param {*} type 根据状态类型生成不同的文字
     */
    renderRecordType(item){
        let text;
        let textColor = '#A3A3A3';
        switch (item.type) {
        case 0:
            text = '震动录音';
            break;
        case 1:
            text = '震动录音';
            break;
        case 2:
            text = '下载中…';
            textColor = '#3479F6';
            break;
        case 3:
            text = '震动录音';
            break;
        case 4:
            text = '震动录音';
            break;
        case 5:
            text = '震动录音';
            break;
        default:
            text = '震动录音';
            break;
        }
        return <Text style={{color:textColor,fontSize:11}}>{text}</Text>;
    }

}


const styles = StyleSheet.create({
    titleStyle:{
        fontSize:12,
        height:30,
        justifyContent:'center',
        paddingLeft:15,
        paddingRight:15
    },
    mainStyle:{
        position:'relative',
        paddingLeft:15,
        paddingRight:15,
        backgroundColor:'#fff',
        
    },
    contentStyle:{
        flexDirection:'row',
        alignItems:'center',
        height:70,
        borderBottomColor:'#f7f7f7',
        borderBottomWidth:StyleSheet.hairlineWidth,
        borderStyle:'solid',
    },
    bottomBorder:{
        borderBottomColor:'#3479F6',
        borderBottomWidth:StyleSheet.hairlineWidth,
        borderStyle:'solid',
    }
});
