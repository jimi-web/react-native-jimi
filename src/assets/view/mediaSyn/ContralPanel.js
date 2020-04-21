/*
 * @Descripttion: 
 * @version: 
 * @Author: liujinyuan
 * @Date: 2020-03-10 14:38:11
 * @LastEditors: liujinyuan
 * @LastEditTime: 2020-03-16 14:24:30
 */
import React, {Component} from 'react';
import {View,Image,Text,StyleSheet,TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
import {iphoneXStyle} from '../../libs/utils';
export default class MediaContral extends Component {
    static propTypes = {
        timeConfig:PropTypes.array,//时间配置
        lensConfig:PropTypes.array,//镜头配置
    }
    static defaultProps = {
        timeConfig:[],
        lensConfig:[]
    }
    constructor(props){
        super(props);
        this.state = {
            timeConfig:this.props.timeConfig,
            lensConfig:this.props.lensConfig,
        };
    }
    render(){
        const {timeConfig,lensConfig} = this.state;
        return (
            <View style={{backgroundColor:'#fff',paddingLeft:20,paddingRight:20,paddingBottom:iphoneXStyle(0)}}>
                {
                    timeConfig.length
                        ?
                        <View>
                            <Text style={{fontSize:14,color:'#4D4D4D',paddingTop:16,paddingBottom:16}}>{'拍摄时间'}</Text>
                            <View style={{flexDirection:'row',flexWrap:'wrap'}}>
                                {
                                    timeConfig.map((item,index) => {
                                        return <TouchableOpacity onPress={this.onSelectTime.bind(this,index,item)} activeOpacity={0.6} style={[styles.configTimeStyle,{borderColor:item.status?'#3479F6':'#DBDBDB'}]} key={index}><Text style={{color:item.status?'#3479F6':'#959595'}}>{item.name}</Text></TouchableOpacity>;
                                    })
                                }
                            </View>
                        </View>
                        :
                        null
                }
                {
                    <View>
                        <Text style={{fontSize:14,color:'#4D4D4D',paddingTop:16,paddingBottom:16}}>{'摄像头'}</Text>
                        <View style={{flexDirection:'row',justifyContent:'space-around'}}>
                            {
                                lensConfig.map((item,index) => {
                                    return <TouchableOpacity onPress={this.onSelectLens.bind(this,index,item)} activeOpacity={0.6} style={[styles.configLensStyle]} key={index}>{this.renderLens(item,index)}</TouchableOpacity>;
                                })
                            }
                        </View>
                    </View>
                }
                <TouchableOpacity onPress={this.onIns} activeOpacity={0.6}>
                    <View style={{backgroundColor:'#f7f7f7',height:8}}></View>
                    <Text style={{fontSize:17,color:'#333',textAlign:'center',lineHeight:50}}>确定</Text>
                </TouchableOpacity>
            </View>
        );
    }
    /*
    * 渲染摄像头
     */
    renderLens = (item,index) => {
        console.log(item,888);
        let element = <View style={{alignItems:'center',padding:14}}>
            <Image source={item.icon[item.status]} />
            <Text style={{marginTop:4,width:'100%',color:item.status?'#3479F6':'#959595'}}>{item.name}</Text>
        </View>;
        return element;
    }
     /*
    * 选择时间
     */
     onSelectTime = (index,item) => {
         const {timeConfig} = this.state;
         timeConfig.forEach(item => {
             item.status = 0;
         });
         item.status = 1;
         timeConfig[index] = item;
         const timeList = JSON.parse(JSON.stringify(timeConfig));
         console.log(timeList,222);
         this.setState({
             timeConfig:timeList
         });
         this.props.onSelectTime && this.props.onSelectTime(data);
     }
     /*
     * 选择摄像头
      */
    onSelectLens = (index,item) => {
        const {lensConfig} = this.state;
        lensConfig.forEach(item => {
            item.status = 0;
        });
        item.status = 1;
        lensConfig[index] = item;
        const lensList = JSON.parse(JSON.stringify(lensConfig));
        console.log(lensList,222);
        this.setState({
            lensConfig:lensList
        });
        this.props.onSelectLens && this.props.onSelectLens(data);
    }
    /*
    * 点击确定
     */
     onIns = () => {
         let data = {};
         data.lens = this.state.lensConfig.find(item => {
             return item.status == 1;
         });
         data.time = this.state.timeConfig.find(item => {
             return item.status == 1;
         });
         this.props.onIns && this.props.onIns(data);
     }
}


const styles = StyleSheet.create({
    configTimeStyle:{
        width:64,
        height:32,
        justifyContent:'center',
        alignItems:'center',
        borderStyle:'solid',
        borderColor:'#DBDBDB',
        borderWidth:StyleSheet.hairlineWidth,
        margin:8,
        borderRadius:4
    },
    configLensStyle:{
        justifyContent:'center',
        alignItems:'center',
    }
});
