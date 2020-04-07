/*
 * @Descripttion: 
 * @version: 
 * @Author: liujinyuan
 * @Date: 2020-03-10 14:38:11
 * @LastEditors: liujinyuan
 * @LastEditTime: 2020-03-27 18:26:42
 */
import React, {Component} from 'react';
import {View,Image,TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
import Applet from '../../http/index';
import {Toast,Drawer} from '../../components/index';
import api from '../../api/index';
import ContralPanel from './ContralPanel';

export default class MediaContral extends Component {
    static propTypes = {
        timeConfig:PropTypes.array,//时间配置
        lensConfig:PropTypes.array,//镜头配置
        photoIns:PropTypes.string,
        videoIns:PropTypes.string
        
    }
    static defaultProps = {
        //in和out为内外摄像头(in和out谁代表内，谁代表外根据设备来定)
        //5s为用户选择的时间
        //拍照指令内容:Picture,in/out
        //录制指令内容Video,in/out,5s
        photoIns:'Picture,ins1',
        videoIns:'Video,ins1,ins2',
        timeConfig:[
            {
                name:'3s',
                value:'3s',
                status:1,
            },
            {
                name:'4s',
                value:'4s',
                status:0,
            },
            {
                name:'5s',
                value:'5s',
                status:0,
            },
            {
                name:'6s',
                value:'6s',
                status:0,
            },
            {
                name:'7s',
                value:'7s',
                status:0,
            },
            {
                name:'8s',
                value:'8s',
                status:0,
            },
            {
                name:'9s',
                value:'9s',
                status:0,
            },
            {
                name:'10s',
                value:'10s',
                status:0,
            },
        ],
        lensConfig:[
            {
                name:'外部摄像头',
                value:'in',
                status:0,
                icon:[require('../../assets/photo/Camera_out.png'),require('../../assets/photo/Camera_out_pre.png')]

            },
            {
                name:'内部摄像头',
                value:'out',
                status:1,
                icon:[require('../../assets/photo/Camera_inside.png'),require('../../assets/photo/Camera_inside_pre.png')]
            }
        ]
    }
    constructor(props){
        super(props);
        this.type = null;
        this.drawer = null;
    }
    render(){
        return (
            <View style={{justifyContent:'center',alignItems:'center',flex:1}}>
                <TouchableOpacity onPress={this.onContral.bind(this,'photo')} activeOpacity={0.6} style={{flex:1,justifyContent:'flex-end'}}>
                    <Image style={{marginBottom:75}} source={require('../../assets/photo/Photo.png')}></Image>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.onContral.bind(this,'video')} activeOpacity={0.6} style={{flex:1}}>
                    <Image source={require('../../assets/photo/Video.png')}></Image>
                </TouchableOpacity>
            </View>
        );
    }
    /*
    * 调用面板
     */
    onContral = (type) => {
        const {timeConfig,lensConfig} = this.props;
        this.type = type;
        if(type == 'photo'){
            this.drawer = Drawer.open(
                <View>
                    <ContralPanel lensConfig={lensConfig} onIns={(data) => this.onIns(data)}/>
                </View>
            );
        }
        if(type == 'video'){
            this.drawer = Drawer.open(
                <View>
                    <ContralPanel timeConfig={timeConfig} lensConfig={lensConfig} onIns={(data) => this.onIns(data)}/>
                </View>
            );
        }
    }
    /*
    * 选择时间
     */
    onSelectTime = (data) => {
        const {timeConfig} = this.state;
        timeConfig.forEach(item => {
            item.status = 0;
        });
        timeConfig[data.index] = data.item;
        const timeList = JSON.parse(JSON.stringify(timeConfig));
        this.setState({
            timeConfig:timeList
        });
        
    }
    /*
    * 发送指令
     */
     onIns = (data) => {
        Drawer.close(this.drawer);
         const {photoIns,videoIns} = this.props;
         let cmCode = null;
         if(this.type == 'photo'){
             cmCode = photoIns.replace('ins1',data.lens.value);
         }else{
             cmCode = videoIns.replace('ins1',data.lens.value);
             cmCode = cmCode.replace('ins2',data.time.value);
         }  
         console.log(cmCode,'codecodecodecode');
         
         let params = {
             cmdCode:cmCode,
             cmdType:0,
             cmdId:12345,
             isSync:0,
             offLineFlag:0,
             instructSetting:{isOpen:'ON'}
         };
         Applet.jmAjax({
             url:api.instruction,
             method:'POST',
             data:params,
             encoding:true,
             encodingType:true
         }).then(res => { 
             if(res.code){
                 return;
             }
             Toast.message('拍摄成功');
         });
     }
    
}
