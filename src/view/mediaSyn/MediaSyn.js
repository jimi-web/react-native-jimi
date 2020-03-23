/*
 * @Descripttion: 
 * @version: 
 * @Author: liujinyuan
 * @Date: 2020-03-10 14:38:11
 * @LastEditors: liujinyuan
 * @LastEditTime: 2020-03-23 15:23:44
 */
import React, {Component} from 'react';
import {View,Image,Text,StyleSheet,TouchableOpacity,Dimensions,NativeModules,NativeEventEmitter,ImageBackground,ScrollView,FlatList, Platform} from 'react-native';
import PropTypes from 'prop-types';
import Applet from '../../http/index';
import {Toast,Modal} from '../../components/index';
import baseStyle from '../baseStyle';
import {sginMd5,dateConversion,isIphoneX,iphoneXHeight} from '../../libs/utils';
import api from '../../api/index';
const imgWith = Dimensions.get('window').width;
import 'react-native-ftp-jm';
const { JMFTPSyncFileManager,JMUDPScoketManager} = NativeModules;
const JMUDPScoket = new NativeEventEmitter(JMUDPScoketManager);
import BottomToolbars from '../components/BottomToolbars';
// const { FTPSyncFileManager } = NativeModules;
// const ftpSyncMrgListener = new NativeEventEmitter(FTPSyncFileManager);
// console.log(FTPSyncFileManager,'模块');
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
        this.httpIndex = 0;//请求的次数
        this.state = {
            isConnect:false,//当前设备是否连接
            isEdit:false,
            connectText:'正在连接',
            fileChecked:[],//选中的文件
            fileList:[]
               
        };
    }
    componentDidMount(){
        // FTPSyncFileManager.connectFTP('357730090466120').then(res => {
        //     console.log(res,'获取的数据');
        // });
        Applet.createTheFolder('mediaFile').then(res => {
            this.localUrl = res;
        });
        this.onDeviceMifi();
        this.getSocketMessage();
        this.onConfigSocket();
        
        // const data = [
        //     {
        //         fileName:'2020-03-18 05:43',
        //         fileSize:20000,
        //         filePath:'photo/1.png',
        //         type:'photo'
        //     },
        //     {
        //         fileName:'2020-03-18 05:49',
        //         fileSize:20000,
        //         filePath:'photo/1.mp4',
        //         type:'video'
        //     },
        //     {
        //         fileName:'2020-03-15 05:43',
        //         fileSize:20000,
        //         filePath:'photo/1.png',
        //         type:'photo'
        //     },
        //     {
        //         fileName:'2020-03-14 05:43',
        //         fileSize:20000,
        //         filePath:'photo/1.png',
        //         type:'photo'
        //     },
        //     {
        //         fileName:'2020-03-10 05:43',
        //         fileSize:20000,
        //         filePath:'photo/1.png',
        //         type:'photo'
        //     },
        //     {
        //         fileName:'2019-03-18 05:43',
        //         fileSize:20000,
        //         filePath:'photo/1.png',
        //         type:'photo'
        //     },
        //     {
        //         fileName:'2020-01-18 05:43',
        //         fileSize:20000,
        //         filePath:'photo/1.png',
        //         type:'photo'
        //     },
        //     {
        //         fileName:'2020-03-18 04:49',
        //         fileSize:20000,
        //         filePath:'photo/1.mp4',
        //         type:'video'
        //     },
        //     {
        //         fileName:'2020-03-18 07:49',
        //         fileSize:20000,
        //         filePath:'photo/1.mp4',
        //         type:'video'
        //     },
        //     {
        //         fileName:'2020-03-18 01:49',
        //         fileSize:20000,
        //         filePath:'photo/1.mp4',
        //         type:'video'
        //     },
            
        // ];
        // data.forEach(item => {
        //     item.fileName = item.fileName.replace(/-/g,'/');
        //     item.day = new Date(item.fileName.replace(/-/g,'/')).Format('YYYY-MM-DD');
        // });
        // this.ftmList(data);
    }
    
    render() {
        const fileLength = this.state.fileChecked.length;
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
            element = <View style={{width:imgWith,padding:10,justifyContent:'space-around'}}>
                <Text>{item.day}</Text>
                {
                    isEdit?
                        <TouchableOpacity activeOpacity={0} onPress={this.onSelect.bind(this,item,index)} style={[Styles.checkbox,{paddingLeft:10,paddingRight:10}]}>
                            {
                                item.checked
                                    ?
                                    <Image source={require('../../assets/photo/checkbox_pre.png')} />
                                    :
                                    <Image source={require('../../assets/photo/checkbox_nor.png')} />
                            }
                        </TouchableOpacity>
                        :
                        null
                }
            </View>;
        }else{
            element = <View style={[Styles.img,{marginRight:index+1%4===0?0:1}]}>
                <TouchableOpacity style={Styles.imgTouch} activeOpacity={1} onPress={this.onSelect.bind(this,item,index)} >
                    <ImageBackground style={{position:'relative',width:'100%',height:'100%',backgroundColor:'#ccc'}}>
                        <Text style={Styles.videoTime}>{item.timeLength}</Text>
                        {
                            isEdit?
                                <View style={Styles.checkbox}>
                                    {
                                        item.checked
                                            ?
                                            <Image source={require('../../assets/photo/checkbox_pre.png')} />
                                            :
                                            <Image source={require('../../assets/photo/checkbox_nor.png')} />
                                    }
                                </View>
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
         //未开启选项进行方法暴露，（跳转到详情）
         if(!this.state.isEdit){
             this.props.onSelect && this.props.onSelect(item);
             return;
         }
         //  处理选中逻辑
         item.checked = !item.checked;
         this.state.fileList[index] = item;
         let fileChecked = [];
         //控制当前头部下所有子元素
         for (let i = 0; i < this.state.fileList.length; i++) {
             const value = this.state.fileList[i];
            
             if(item.subIndex === value.parentIndex && item.type == 'title'){
                 value.checked = item.checked;
             }
             if(item.type != 'title' && item.checked){
                 fileChecked.push(item);
             }
             if(item.type != 'title' && item.parentIndex == value.subIndex){
                 let flag = true;
                 for (let j = 0; j < value.subArr.length; j++) {
                     const v = value.subArr[j];
                     const isChecked = this.state.fileList[v.index];
                     console.log(isChecked,123456);
                     if(!isChecked.checked){
                         flag = false;
                     }
                 }
                 value.checked = flag;
             }
         }
         
         const fileList = JSON.parse(JSON.stringify(this.state.fileList));
         
        
         this.setState({
             fileList,
             fileChecked,
         });
     }
     /**
     * 数据格式化
     * @param {Array} list 
     */
    ftmList = (list)=>{
        //先升序
        list.sort((a, b)=> {
            return new Date(b.fileName).getTime()>new Date(a.fileName).getTime() ? 1 : -1;
        });
        let newList = [];
        //在设置索引
        let i = 0;
        list.forEach((item,index)=>{
            
            item.checked = false;
            if(item.type == 'video'){
                item.timeLength = '00:00:00';
            }
            item.day = dateConversion(item.day);
            //设置头部数据
            if(index == 0){
                newList[0] = {
                    type:'title',
                    day:item.day,
                    checked:false,
                    subArr:[],
                    subIndex:0,
                    index:0
                };
            }
            if(newList[newList.length -1].day != item.day && newList[newList.length -1].type != 'title'){
                i = newList.length;
                newList[newList.length] = {
                    type:'title',
                    day:item.day,
                    checked:false,
                    subArr:[],
                    subIndex:i,
                    index:i
                };
                
            }
            item.parentIndex = i;
            newList[i].subArr.push(item);
            item.index = newList.length;
            newList[newList.length] = item;
            
        });
        console.log(newList,'格式化之后的数据');
        this.setState({
            fileList:newList
        });
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
             Applet.getWifiState().then(res => {
                 if(!res.status){
                     return; 
                 }
                 if(res.data[0].ssid != '357730090466120'){
                     Applet.connectWifi('357730090466120','90466120').then(res => {
                         console.log(res,'连接的结果');
                     });
                 }else{
                     this.onConfigSocket();
                 }
             });
             

             //  const wifiTime = setInterval = (res => {
             //      Applet.getWifiState().then(res => {
             //          if(res[0].ssid != '357730090466120'){
             //              //
             //          }
             //      });
             //  },1000);
             
             
         });
     }
     /*
    * 配置socket参数
     */
     onConfigSocket = () => {
         JMUDPScoketManager.configUDPSocket('ftp://255.255.255.255',1712,5000).then(res => {
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
        console.log('发送数据');
        JMUDPScoketManager.send('jimi',1).then(res => {
            console.log(res,'发送socket指令的值');
            
            
        });
    }
    /*
    *   接受scoket
     */
     getSocketMessage = () => {
         console.log('接收数据');
         JMUDPScoket.addListener(JMUDPScoketManager.kRNJMUDPScoketManager,(reminder) => {
             const params = JSON.parse(reminder);
             const data = JSON.parse(params.data);
             console.log(data,'收到的回复');
             if(data){
                 this.onConnect(data);
             }
         });
     }
    /**
     * 连接设备
     */
    onConnect = (data) => {
        
        JMFTPSyncFileManager.configFtpSyncFile('192.168.43.1','passive',10011,'admin','admin')
            .then(res => {
                console.log(res,'配置的参数');
                JMFTPSyncFileManager.connectFTP().then(res => {
                    console.log(res,'是否链接成功');
                    this.setState({
                        isConnect:true
                    });
                    this.onFindFiles(data);
                });

            })
            .catch(() => {
                Toast.message('连接错误');
            });
    }
    /**
     * 获取单个文件
     */
    onfilesOne = (path) => {
        return new Promise((resolve,reject) => {
            JMFTPSyncFileManager.findFTPFlies(path).then(res => {
                console.log(res,'获取的文件2');
                const data = res.body;
                resolve(path);
            })
                .catch(() => {
                    Toast.message('获取失败');
                });
        });
       
        
    }
    /**
     * 获取指定文件夹下的文件
     */
    onFindFiles = (data) => {
        const photoPath = data.photo_dirs.split(',');
        const videoPath = data.video_dirs.split(',');
        const pathArr = [...photoPath,...videoPath];
        let pathIndex = 0;//发送请求的次数
        this.httpIndex = 0;
        let fileArr = [];


        for (let i = 0; i < pathArr.length; i++) {
            const item = pathArr[i];
            if(item != ''){
                //记录请求次数
                pathIndex++;
                this.onfilesOne(item).then((res) => {
                    this.httpIndex++;
                    fileArr.concat(res);
                    if(pathIndex == httpIndex){
                        this.ftmList(fileArr);
                    }
                })
                    .catch(() => {
                        Toast.message('下载失败');
                    });
            }
            
        }
        console.log(photoPath,'文件夹路径');
        // JMFTPSyncFileManager.findFTPFlies(photoPath[0]).then(res => {
        //     console.log(res,'获取的文件1');
        //     const data = res.body;
        //     // this.downFTPfile(data,0);
        // })
        //     .catch(() => {
        //         Toast.message('下载失败');
        //     });
        JMFTPSyncFileManager.findFTPFlies('/mnt/sdcard1/DVRMEDIA/CarRecorder/PHOTO/').then(res => {
            console.log(res,'获取的文件2');
            const data = res.body;
            // this.downFTPfile(data,0);
        })
            .catch(() => {
                Toast.message('下载失败');
            });
    }

    /**
     * 上传ftp文件
     */
    uploadFTPFile = (data) => {
        const config = {
            path:'/mnt/sdcard1/DVRMEDIA/CarRecorder/PHOTO/',
            locaUrl:'',
            
        };
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
    /**
     * 查看图片
     */
    onPhoto = (item) => {
        this.props.onPhoto && this.props.onPhoto(item);
    }
    /**
     * 查看视频 
     */
    onVideo = (item) => {
        this.props.onVideo && this.props.onVideo(item);
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
        left:3,
        color:'#fff',
        fontSize:11
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