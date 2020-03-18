/*
 * @Descripttion: 
 * @version: 
 * @Author: liujinyuan
 * @Date: 2020-03-10 14:38:11
 * @LastEditors: liujinyuan
 * @LastEditTime: 2020-03-18 11:19:19
 */
import React, {Component} from 'react';
import {View,Image,Text,StyleSheet,TouchableOpacity,Dimensions,NativeModules,NativeEventEmitter,ImageBackground,ScrollView,FlatList, Platform} from 'react-native';
import PropTypes from 'prop-types';
import Applet from '../../http/index';
import {Toast,Modal} from '../../components/index';
import baseStyle from '../baseStyle';
import 'react-native-ftp-jm';
import { Checkbox } from 'teaset';
const { JMFTPSyncFileManager,JMUDPScoketManager} = NativeModules;
import {sginMd5,dateConversion,isIphoneX,iphoneXHeight} from '../../libs/utils';
import api from '../../api/index';
import PhotoListTitle from '../photo/photoList/PhotoListTitle';
const imgWith = Dimensions.get('window').width;
const JMUDPScoket = new NativeEventEmitter(JMUDPScoketManager);
import BottomToolbars from '../components/BottomToolbars';
export default class MediaSyn extends Component {
    static propTypes = {
        config:PropTypes.object,
        subPath:PropTypes.string
    }
    static defaultProps = {
        config:{
            baseUrl:'192.17.1.227',
            mode:'passive',
            port:1245679,
            account:'jimitest',
            password:'jimi123'
        },
        subPath:''
    }
    constructor(props){
        super(props);
        this.state = {
            isConnect:true,//当前设备是否连接
            isEdit:false,
            connectText:'正在连接',
            fileChecked:[],//选中的文件
            fileList:[
                {
                    type:'title',
                    time:new Date().getTime()
                },
                {
                    fileName:'1',
                    fileSize:2000,
                    filePath:'',
                    checkbox:false
                },
                {
                    fileName:'2',
                    fileSize:2000,
                    filePath:'',
                    checkbox:false
                },
                {
                    fileName:'3',
                    fileSize:2000,
                    filePath:'',
                    checkbox:false
                },
                {
                    fileName:'4',
                    fileSize:2000,
                    filePath:'',
                    checkbox:false
                },
                {
                    fileName:'5',
                    fileSize:2000,
                    filePath:'',
                    checkbox:false
                },
                {
                    fileName:'5',
                    fileSize:2000,
                    filePath:'',
                    checkbox:false
                },
                {
                    fileName:'5',
                    fileSize:2000,
                    filePath:'',
                    checkbox:false
                },
                {
                    type:'title',
                    time:new Date().getTime()
                },
                {
                    fileName:'1',
                    fileSize:2000,
                    filePath:'',
                    checkbox:false
                },
                {
                    fileName:'2',
                    fileSize:2000,
                    filePath:'',
                    checkbox:false
                },
                {
                    fileName:'3',
                    fileSize:2000,
                    filePath:'',
                    checkbox:false
                },
                {
                    fileName:'4',
                    fileSize:2000,
                    filePath:'',
                    checkbox:false
                },
                {
                    fileName:'5',
                    fileSize:2000,
                    filePath:'',
                    checkbox:false
                },
                {
                    fileName:'5',
                    fileSize:2000,
                    filePath:'',
                    checkbox:false
                },
                {
                    fileName:'5',
                    fileSize:2000,
                    filePath:'',
                    checkbox:false
                }
            ],
        };
    }
    componentDidMount(){
        Applet.createTheFolder('mediaFile').then(res => {
            this.localUrl = res;
        });
        this.onDeviceMifi();
        this.getSocketMessage();
    }
    
    render() {
        const fileLength = this.state.fileChecked;
        return (
            <View style={{flex:1,backgroundColor:'#303030'}}>
                {
                    this.state.isConnect
                        ?
                        <ScrollView style={{flex:1,backgroundColor:'#fff'}}>
                            <View style={{flexDirection:'row',flexWrap: 'wrap'}}>
                                {
                                    this.state.fileList.map((item,index) => {
                                        return <View key={index}>
                                            {this.renderItem(item,index)}
                                        </View>;
                                    })
                                }
                            </View>
                        </ScrollView>
                            
                        :
                        this.renderLoading()
                }
               
                {
                    this.state.isConnect
                        ?
                        this.state.isEdit ? 
                            <BottomToolbars>
                                <View style={Styles.bottomToolbars}>
                                    <TouchableOpacity style={Styles.bottomToolbarsBtn} onPress={()=>{this.setState({isEdit:false});}}><Text style={[Styles.bottomToolbarsText,{color:'#000'}]}>{fileLength>0?'取消（'+fileLength+'）':'取消'}</Text></TouchableOpacity>
                                    <TouchableOpacity activeOpacity={fileLength>0?0:1} style={Styles.bottomToolbarsBtn} onPress={this.save}><Text style={[Styles.bottomToolbarsText,{color:fileLength>0?'#3479F6':'#e1e1e1'}]}>保存至本地</Text></TouchableOpacity>
                                    <TouchableOpacity activeOpacity={fileLength>0?0:1} style={Styles.bottomToolbarsBtn} onPress={this.delete}><Text style={[Styles.bottomToolbarsText,{color:fileLength>0?'#FF3535':'#e1e1e1'}]}> 删除</Text></TouchableOpacity>
                                </View>
                            </BottomToolbars>
                            :
                            <TouchableOpacity style={Styles.edit} onPress={()=>this.setState({isEdit:true})}>
                                <Image source={require('../../assets/photo/photo_list_management.png')}></Image>
                            </TouchableOpacity>
                        :
                        null
                }
            </View>
        );
        
    }
    /*
    *渲染加载时的页面
     */
    renderLoading(){
        const element = 
        <View style={{flex:1}}>
            <View style={{backgroundColor:'rgba(254, 116, 45, 0.2)',height:32}}>
                <Text style={{color:'#FE742D',lineHeight:32,paddingLeft:10}}>同步前请先链接设备的wifi热点</Text>
            </View>
            <View style={{flex:6,alignItems:'center',justifyContent: 'center'}}>
                <ImageBackground style={{width:268,height:280,alignItems:'center'}} source={require('../../assets/media/Connect_pic.png')}>
                    <Text style={{color:'#fff',marginTop:50}}>{this.state.connectText}</Text>
                    <Image style={{marginTop:30}} source={require('../../assets/media/Connect_WiFi.gif')} />
                </ImageBackground>
            </View>
            <View style={{flex:3,alignItems:'center'}}>
                <View style={{flexDirection:'row',paddingTop:60}}>
                    <Text style={{fontSize:15,color:'#fff'}}>WIFI名称：</Text>
                    <Text style={{fontSize:15,color:'#fff'}}>131654798798</Text>
                </View>
                <View style={{flexDirection:'row',paddingTop:30}}>
                    <Text style={{fontSize:15,color:'#fff'}}>WIFI密码：</Text>
                    <Text style={{fontSize:15,color:'#fff'}}>131654798798</Text>
                </View>
            </View>
        </View>;
        return element;
    }
    /*
    * 渲染加载后的页面
     */
    renderItem = (item,index) => {
        const {isEdit} = this.state;
        let element = null;
        if(item.type == 'title'){
            element = <View style={{width:imgWith,paddingTop:10,paddingBottom:10,justifyContent:'space-around'}}>
                <Text>{item.time}</Text>
                {
                    isEdit?
                        <Checkbox 
                            onChange={this.onSelect}
                            checked={item.checked}
                            style={Styles.checkbox}
                            checkedIcon={<Image style={{width: 21, height: 21, }} source={require('../../assets/photo/checkbox_pre.png')} />}
                            uncheckedIcon={<Image style={{width: 21, height: 21,}} source={require('../../assets/photo/checkbox_nor.png')} />}
                        />
                        :
                        null
                }
            </View>;
        }else{
            element = <View style={[Styles.img,{marginRight:index+1%4===0?0:1}]}>
                <TouchableOpacity style={Styles.imgTouch} activeOpacity={1} onPress={this.onSelect.bind(item,index)} >
                    <ImageBackground style={{position:'relative',width:'100%',height:'100%',backgroundColor:'#ccc'}}>
                        {/* <Text style={Styles.videoTime}>{item.fileName}</Text> */}
                        {
                            isEdit?
                                <Checkbox 
                                    onChange={this.onSelect}
                                    checked={item.checked}
                                    style={Styles.checkbox}
                                    checkedIcon={<Image style={{width: 21, height: 21, }} source={require('../../assets/photo/checkbox_pre.png')} />}
                                    uncheckedIcon={<Image style={{width: 21, height: 21,}} source={require('../../assets/photo/checkbox_nor.png')} />}
                                />
                                :
                                null
                        }
                                
                    </ImageBackground>
                </TouchableOpacity>
            </View>;
        }
        
        return element;
    }
    /*
    * 选择图片或视频
     */
     onSelect = (item,index) => {
         item.checked = !item.checked;
         this.state.fileList[index] = item;
         const fileList = JSON.parse(JSON.stringify(this.state.fileList));
         const fileChecked = fileList.find(item => {
             return item.checked === true;
         });
         this.setState({
             fileList,
             fileChecked
         });
     }
     /**
     * 数据格式化
     * @param {Array} list 
     */
    dataStructure = (list,exists)=>{
        //先升序
        list.sort((a, b)=> {
            return this.dateToTime(b.fullTime)>this.dateToTime(a.fullTime) ? 1 : -1;
        });
        //在设置索引
        list.forEach((item,index)=>{item.index=index;});
        
        //根据时间分组
        let classifyData = [];
        for (let key of list) {
            if(!classifyData[key.date]) {
                let arr = [];
                arr.push(key);
                classifyData[key.date] = arr;
            }else {
                classifyData[key.date].push(key);
            } 
        }
        return classifyData;
    }
     /*
    * 开启设备wifi热点
     */
     onDeviceMifi = () => {
         let data = {
             cmdCode:'WIFI,ON',
             cmdType:0,
             cmdId:12345,
             isSync:0,
             offLineFlag:0,
             instructSetting:{isOpen:'ON'}
         };
         //  let sectet = '695c1a459c1911e7bedb00219b9a2ef3';
         //  let sign = `${sectet}method${data[method]}instruct${data[instruct]}imei${data[imei]}app_key${data[app_key]}accessToken${data[accessToken]}`;
         //  console.log(data.sign,2312312);
         Applet.jmAjax({
             url:api.instruction,
             method:'POST',
             data:data,
             encoding:'357730090466120',
             encodingType:true
         }).then(res => { 
             console.log(res,'结果');
             if(Platform.OS === 'ios'){
                 Modal.dialog({
                     contentText:'是否跳转到设置连接WIFI',
                     onConfirm:()=>{
                         Applet.skipSetWifi();
                     },
                 });
             }
             this.onConfigSocket();
             
         });
     }
     /*
    * 配置socket参数
     */
     onConfigSocket = () => {
         JMUDPScoketManager.configUDPSocket('255.255.255.255',1712,5000).then(res => {
             console.log(res,'socket连接后的值');
             this.sendSocket();
         })
             .catch(res => {
                 console.log(res,'配置socket参数失败');
             });
     }
     /*
     *发送socket指令
      */
    sendSocket = () => {
        JMUDPScoketManager.send('jimi',1).then(res => {
            console.log(res,'发送socket指令的值');
            
            
        });
    }
    /*
    *   接受scoket
     */
     getSocketMessage = () => {
         JMUDPScoket.addListener('listeningUDPScoketCellBack',(reminder) => {
             const data = JSON.parse(reminder);
             if(data.code == 1){
                 this.onConnect(data);
                 JMUDPScoket.closeSocket();
             }
         });
     }
    /**
     * 连接设备
     */
    onConnect = (data) => {
        Applet.getWifiStatus.then(res => {
            JMFTPSyncFileManager.configFtpSyncFile(data)
                .then(res => {
                    JMFTPSyncFileManager.connectFTP().then(res => {
                        this.setState({
                            isConnect:true
                        });
                    });

                })
                .catch(() => {
                    Toast.message('连接错误');
                });
        });
    }
    /**
     * 查看图片
     */
    onPhoto = () => {
        //
    }
    /**
     * 查看视频 
     */
    onVideo = () => {
        //
    }
    /**
     * 关闭连接
     */
    onClose = () => {
        if(!isConnect){
            return false;
        }
        JMFTPSyncFileManager.closeFTP();
    }
    /**
     * 获取指定文件夹下的文件
     */
    onFindFiles = () => {
        JMFTPSyncFileManager.findFTPFlies({subPath:this.props.subPath}).then(res => {
            const data = res.body;
            this.downFTPfile(data,0);
        })
            .catch(() => {
                Toast.message('下载失败');
            });
    }
    /**
     * 下载指定文件
     */
    downFTPfile = (array,index) => {
        const data = {
            url:array[index].filePath,
            locaUrl:this.locaUrl,
            fileName:array.fileName,
            tag:index
        };
        JMFTPSyncFileManager.downFTPfile(data).then(res => {
            if(index === array.length){
                return Toast('同步完成');
            }
            this.downFTPfile(array,index + 1);
        });
    }
    
}



const Styles = StyleSheet.create({
    img:{
        position:'relative',
        width: imgWith/4-1,
        height: imgWith/4-1,
        backgroundColor:'#000',
        marginTop:1
    },
    imgTouch:{
        width:'100%',
        height:'100%',
    },
    checkbox:{
        position:'absolute',
        bottom:6,
        right:6
    },
    videoTime:{
        position:'absolute',
        bottom:3,
        right:6,
        color:'#fff'
    },
    content:{
        position:'relative',
        flex:1,
        backgroundColor:'#F7F7F7',
    },
    edit:{
        position:'absolute',
        right:10,
        bottom:isIphoneX()?iphoneXHeight(10):10
    },
    bottomToolbars:{
        flex:1,
        flexDirection:'row'
    },
    bottomToolbarsBtn:{
        flex:1
    },
    bottomToolbarsText:{
        fontSize:17,
        height:54,
        lineHeight:54,
        textAlign:'center'
    },
    sectionList:{
        marginBottom:isIphoneX()?iphoneXHeight(54):54
    },
    itemList:{
        marginBottom:10
    }
});