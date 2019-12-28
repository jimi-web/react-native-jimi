/*
 * @Descripttion: 
 * @version: 
 * @Author: liujinyuan
 * @Date: 2019-08-09 13:51:44
 * @LastEditors  : xieruizhi
 * @LastEditTime : 2019-12-27 18:12:06
 */
import React, {Component} from 'react';
import {View,Text,StyleSheet,SectionList,TouchableOpacity,Image} from 'react-native';
import {Button} from '../../components/index';
import {Modal} from '../../components/index';

export default class Home extends Component{
    constructor(props){
        super(props);
        this.state = {
            menuList:[{
                type:'业务组件',
                data:[{
                    title:'RVC',
                    url:'RVC'
                },{
                    title:'定位',
                    url:'Position'
                },{
                    title:'轨迹',
                    url:'Track'
                },{
                    title:'追踪',
                    url:'Trace'
                },{
                    title:'围栏',
                    url:'Fence'
                },{
                    title:'相册',
                    url:'Photo'
                },{
                    title:'录音',
                    url:'Record'
                }]
            },{
                type:'基础组件',
                data:[{
                    title:'上拉刷新下拉加载',
                    url:'PullView'
                },{
                    title:'开关',
                    url:'Switch'
                },{
                    title:'滚轮',
                    url:'GetWheel'
                },{
                    title:'弹框',
                    url:'Dialog'
                },{
                    title:'日期选择器',
                    url:'Datepicker'
                },{
                    title:'测试',
                    url:'Test'
                }]
            }]
        };
    }
    render(){
        return (
            <View style={styles.mainStyle}>
                <SectionList
                    renderItem={({ item, index, section }) =><TouchableOpacity style={styles.line} onPress={()=>this._onPress(item.url)}>
                        <Text style={{flex:1}} key={index}>{item.title}</Text>
                        <Image source={require('../../assets/nav/subordinate_arrow.png')}></Image>
                    </TouchableOpacity>}
                    renderSectionHeader={({section}) =><Text style={styles.title}>{section.type}</Text>}
                    sections={this.state.menuList}
                />
                {/* <View > */}
                {/* <Button style={styles.btn} title={'RVC'} onPress={()=>{this.props.navigation.push('RVC');}} />
                    <Button style={styles.btn} title={'定位'} onPress={()=>{this.props.navigation.push('Position');}} />
                    <Button style={styles.btn} title={'轨迹'} onPress={()=>{this.props.navigation.push('Track');}} />
                    <Button style={styles.btn} title={'追踪'} onPress={()=>{this.props.navigation.push('Trace');}} />
                    <Button style={styles.btn} title={'上拉刷新下拉加载'} onPress={()=>{this.props.navigation.push('PullView');}} />
                    <Button style={styles.btn} title={'开关'} onPress={()=>{this.props.navigation.push('Switch');}} />   
                    <Button style={styles.btn} title={'相册'} onPress={()=>{this.props.navigation.push('Photo');}} />   
                    <Button style={styles.btn} title={'滚轮'} onPress={()=>{this.props.navigation.push('GetWheel');}} />  
                    <Button style={styles.btn} title={'录音'} onPress={()=>{this.props.navigation.push('Record');}} />  
                    <Button style={styles.btn} title={'围栏'} onPress={()=>{this.props.navigation.push('Fence');}} />  
                    <Button style={styles.btn} title={'弹框'} onPress={()=>{Modal.dialog();}} />  
                    <Button style={styles.btn} title={'日期选择器'} onPress={()=>{this.props.navigation.push('Datepicker');}} />  
                    <Button style={styles.btn} title={'测试'} onPress={()=>{this.props.navigation.push('Test');}} />   */}
                    
                {/* </View> */}
            </View>
        );
    }

    _onPress = (url)=>{
        this.props.navigation.push(url);
    }
}

const styles = StyleSheet.create({
    mainStyle:{
        flex:1,
        backgroundColor:'#F7F7F7'
        // padding:20
    },
    title:{
        fontSize:16,
        color:'#333',
        padding:10,
        backgroundColor:'#F7F7F7'
    },
    line:{
        height:44,
        flexDirection:'row',
        borderBottomWidth:1,
        borderColor:'#F7F7F7',
        alignItems:'center',
        justifyContent:'space-between',
        paddingLeft:10,
        paddingRight:10,
        backgroundColor:'#fff'
    }
});