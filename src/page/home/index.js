/*
 * @Descripttion: 
 * @version: 
 * @Author: liujinyuan
 * @Date: 2019-08-09 13:51:44
 * @LastEditors: xieruizhi
 * @LastEditTime: 2020-06-23 10:43:33
 */
import React, {Component} from 'react';
import {View,Text,StyleSheet,SectionList,TouchableOpacity,Image} from 'react-native';
import {goFlowCard} from '../../http';

export default class Home extends Component{
    constructor(props){
        super(props);
        this.state = {
            menuList:[{
                type:'业务组件',
                data:[
                    {
                        title:'远程拍摄',
                        url:'MediaContral',
                    },
                    {
                        title:'详情',
                        url:'Details'
                    },
                    {
                        title:'流量卡',
                        url:'FlowCard'
                    },
                    {
                        title:'媒体同步',
                        url:'MediaSyn'
                    },
                    {
                        title:'指令',
                        url:'Instruction'
                    },{
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
                    },{
                        title:'数据空白',
                        url:'Empty'
                    }
                ]
            },{
                type:'基础组件',
                data:[{
                    title:'按钮',
                    url:'Button'
                },{
                    title:'图标',
                    url:'Icon'
                },{
                    title:'上拉加载下拉刷新',
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
                },
                {
                    title:'底部抽屉',
                    url:'Drawer'
                },
                {
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
            </View>
        );
    }

    _onPress = (url)=>{
        if(url === 'FlowCard'){
            goFlowCard({
                onSuccess:()=>{

                },
                onFail:()=>{
                    
                }
            })
        }else{
            this.props.navigation.push(url,{I18n:I18n});
        }
    }
}

const styles = StyleSheet.create({
    mainStyle:{
        flex:1,
        backgroundColor:'#F7F7F7'
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