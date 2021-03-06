/*
 * @Descripttion: 
 * @version: 
 * @Author: liujinyuan
 * @Date: 2020-03-10 14:38:11
 * @LastEditors: xieruizhi
 * @LastEditTime: 2020-06-24 10:27:57
 */
import React, {Component} from 'react';
import {View,Image,Text,StyleSheet,TouchableOpacity,Dimensions,DeviceEventEmitter,NativeModules,NativeEventEmitter,ImageBackground,ScrollView,AppState, Platform,NetInfo,RefreshControl,BackHandler} from 'react-native';
import PropTypes from 'prop-types';
import Applet from '../../http/index';
import {Toast,Modal,Loading} from '../../components/index';
import baseStyle from '../baseStyle';
import {getFileType,dateConversion,isIphoneX,iphoneXHeight,formatTime} from '../../libs/utils';
import Empty from '../../view/empty/Empty';
import api from '../../api/index';
const imgWith = Dimensions.get('window').width;
import 'react-native-ftp-jm';
const { JMFTPSyncFileManager,JMUDPScoketManager} = NativeModules;
const JMUDPScoket = new NativeEventEmitter(JMUDPScoketManager);
const JMFTPProgress = new NativeEventEmitter(JMFTPSyncFileManager);
import BottomToolbars from '../components/BottomToolbars';
// const { FTPSyncFileManager } = NativeModules;
// const ftpSyncMrgListener = new NativeEventEmitter(FTPSyncFileManager);
// console.log(FTPSyncFileManager,'模块');
export default class MediaSyn extends Component {
    static propTypes = {
        udpConfig:PropTypes.object,// UDP配置
        ftpConfig:PropTypes.object,// FTP配置
        subPath:PropTypes.string, // 文件保存路径
    }
    static defaultProps = {
        udpConfig:{
            host:'255.255.255.255',
            port:1712,
            timeout:5000,
        },
        ftpConfig:{
            baseUrl:'ftp://192.168.43.1',
            mode:'passive',
            port:10011,
            account:'admin',
            password:'admin'
        },
        subPath:'',//文件保存路径
    }
    /**
     * 删除FTP文件
     * @param {String} path 路径
     */
    static deleteFTPFile(data){
        DeviceEventEmitter.emit('jmDeleteFTPFile',data);
    }
    constructor(props){
        super(props);
        this.localFilePath = [];
        this.JMFTPProgress = null;
        this.JMUDOScoket = null;
        this.isNerworkConnect = true,//网络是否连接中
        this.status = 0;//连接状态 0:未连接 1:连接中
        this.localUrl = '';//当前路径
        this.loading = 0;//弹框
        this.isReply = false,//设备是否恢复
        this.progressTime = null;
        this.state = {
            refreshing:false,//重新加载
            isFail:false,//网络连接是否失败
            hintStatus:0,//状态
            isConnect:false,//当前设备是否连接
            isEdit:false,
            connectText:'正在连接',
            fileChecked:[],//选中的文件
            fileList:[],
            // wifi账号密码
            wifiMessage:{
                password:'',
                account:'',
            },
            content:[],
            localFileList:[],//本地文件列表
            //进度信息
            isDownload:false,//是否进行下载
            progressMessage:{
                index:0,
                total:0,
                progress:0
            },
               
        };
    }
    /**
     * 监听网络变化
     */
    handleConnectivityChange = (status)=> {
        if(this.isNerworkConnect){
            return;
        }
        if(status.type == 'wifi'){
            Applet.getWifiInfo().then(res => {
                let data = res.data;
                if(!data){
                    return;
                }
                if(typeof data === 'string'){
                    data = JSON.parse(data);
                }
                if(res.data[0].ssid != this.state.account){
                    return Toast.message(I18n.t('请连接设备WIFI'));
                }else{
                    if(Platform.OS == 'ios'){
                        return;
                    }
                    if(this.state.fileList.length > 0){
                        return;
                    }
                    this.onConfigSocket();
                }
            });
        }else{
            return Toast.message(I18n.t('请连接设备WIFI'));
        }
    }
    /**
     * 监听是否退出后台
     */
    handleAppstatus = (status) => {
        if(status != 'active'){
            return;
        }
        Applet.getWifiState().then(res => {
            let data = res.data;
            if(!data){
                return;
            }
            if(typeof data === 'string'){
                data = JSON.parse(data);
            }
            if(data[0].ssid != this.state.wifiMessage.account){
                return Toast.message(I18n.t('请连接设备WIFI'));
            }
            if(this.state.fileList.length > 0){
                return;
            }
            this.onConfigSocket();
        });
    }
    /**
     * 监听退出
     */
    handleBackPress = () => {
        if(!this.state.isDownload){
            return false;
        }
        Modal.dialog({
            contentText:I18n.t('现在退出将会中断文件下载，是否继续?'),
            onConfirm:() => {
                return false;
            },
            onCancel:() => {
                return true;
            }
        });
    }

    // 获取本地文件
    getLocalFile = () => {
        Applet.createTheFolder('mediaFile').then(res => {
            this.localUrl = res;
            Applet.getFileList('mediaFile').then(res => {
                let paths = res.fileList.files;
                if(paths.length <= 0){
                    return;
                }
                for (let i = 0; i < paths.length; i++) {
                    const item = paths[i];
                    this.state.localFileList[i] = {};
                    this.state.localFileList[i].videoPath = item;
                    let fileName = item.split('/');
                    fileName = fileName[fileName.length - 1];
                    this.state.localFileList[i].fileName = fileName;
                    let fileType = getFileType(fileName);
                    if(fileType === 'VIDEO'){
                        Applet.getVideoTime(item).then(data => {
                            this.state.localFileList[i].videoTime = data[0].videoTime;
                            if(Platform.OS === 'ios'){
                                Applet.getVideoFirstImage(item).then(images => {
                                    this.state.localFileList[i].videoFirstImagePath = images[0].videoFirstImagePath;
                                    
                                });
                            }
                           
                        });
                    }
                }
                
            });

        });
    }
    componentWillMount(){
        DeviceEventEmitter.addListener('jmDeleteFTPFile', e => this.onSycDelete(e,0));
    }
    componentDidMount(){
        // 监听事件
        NetInfo.addEventListener('connectionChange',this.handleConnectivityChange);
        AppState.addEventListener('change',this.handleAppstatus);
        // BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
        this.getSocketMessage();
        this.getFTPProgress();
        // 创建文件夹并且获取文件
        this.getLocalFile();

        // 事件触发
        Applet.getWifiState().then(res => {
            this.getAccount().then(data => {
                let wifiMessage = res.data;
                if(typeof wifiMessage === 'string'){
                    wifiMessage = JSON.parse(wifiMessage);
                }
                if(!wifiMessage.length){
                    return;
                }
                if(wifiMessage[0].ssid != data.account){
                    this.onDeviceMifi(data);
                }else{
                    this.onConfigSocket();
                }
            });
            
        });
        
        
    }
    componentWillUnmount() {
        DeviceEventEmitter.removeAllListeners('jmDeleteFTPFile');
        this.state.fileList = [];
        NetInfo.removeEventListener('connectionChange',this.handleConnectivityChange);
        AppState.removeEventListener('change',this.handleAppstatus);
        // BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
        JMUDPScoketManager.closeSocket();
        if(this.JMFTPProgress){
            this.JMFTPProgress.remove();
        }
        if(this.JMUDOScoket){
            this.JMUDOScoket.remove();
        }
        this.onClose();
    }
    render() {
        const fileLength = this.state.fileChecked.length;
        return (
            <View style={{flex:1,backgroundColor:'#303030'}}>
                {
                    this.state.isConnect
                        ?
                        this.state.fileList.length != 0
                            ?
                            <ScrollView style={{flex:1,backgroundColor:'#fff'}}
                                // refreshControl = {
                                //     <RefreshControl
                                //         refreshing={this.state.refreshing}
                                //         onRefresh={this.onConfigSocket}
                                //     />
                                // }
                            >
                                
                                <View style={{flexDirection:'row',flexWrap: 'wrap',paddingBottom:54}}>
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
                            <View style={{backgroundColor:'#fff',flex:1}}>
                                <Empty/>
                            </View>
                        :
                        this.renderLoading()
                }
               
                {
                    this.state.isConnect
                        ?
                        this.state.isEdit ? 
                            <BottomToolbars>
                                <View style={Styles.bottomToolbars}>
                                    <TouchableOpacity style={Styles.bottomToolbarsBtn} onPress={this.onCancel}><Text style={[Styles.bottomToolbarsText,{color:'#000'}]}>{fileLength>0?I18n.t('取消')+'（'+fileLength+'）':I18n.t('取消')}</Text></TouchableOpacity>
                                    <TouchableOpacity onPress={this.onDownload} activeOpacity={fileLength>0?0:1} style={Styles.bottomToolbarsBtn}><Text style={[Styles.bottomToolbarsText,{color:fileLength>0?'#3479F6':'#e1e1e1'}]}>{I18n.t('保存到本地')}</Text></TouchableOpacity>
                                    <TouchableOpacity activeOpacity={fileLength>0?0:1} style={Styles.bottomToolbarsBtn} onPress={this.onDelete}><Text style={[Styles.bottomToolbarsText,{color:fileLength>0?'#FF3535':'#e1e1e1'}]}>{I18n.t('删除')} </Text></TouchableOpacity>
                                </View>
                            </BottomToolbars>
                            :
                            <TouchableOpacity style={Styles.edit} onPress={()=>this.setState({isEdit:true})}>
                                <Image source={require('../../assets/photo/photo_list_management.png')}></Image>
                            </TouchableOpacity>
                        :
                        null
                }
                {
                    this.state.isDownload ?
                        this.renderProgressModal()
                        :
                        null
                }
            </View>
        );
    }
    onCancel = () => {
        this.state.fileList.forEach(item => {
            item.checked = false
        })
        let fileList = JSON.parse(JSON.stringify(this.state.fileList));
        let fileChecked = [];
        this.setState({
            fileList,
            fileChecked,
            isEdit:false,
        });
    }
    /**
     * 同步删除文件
     */
    onSycDelete = (item) => {
        JMFTPSyncFileManager.deleteFTPFile(item.filePath).then(res => {
            let fileArray = [];
            this.state.fileList.forEach(value => {
                if(value.type === 'title'){
                    let flag = true;
                    value.subArr.forEach(v => {
                        if(item.fileName == v.fileName && value.subArr.length <= 1){
                            flag = false;
                        }
                    });
                    console.log(flag,111);
                    if(flag){
                        fileArray.push(value);
                    }
                }else{
                    if(item.fileName !== value.fileName){
                        fileArray.push(value);
                    }
                }
            });
            let i = 0;
            fileArray.forEach((value,index) => {
                value.index = index;
                //设置头部数据
                if(value.type == 'title'){
                    value.subArr = [];
                    i = value.index;
                }
                if(value.type != 'title'){
                    fileArray[i].subArr.push(value);
                }
            });
            console.log(fileArray,'获取的最终数据');
            this.setState({
                fileList:fileArray
            });
        });
    }
    /*
    *渲染加载时的页面
     */
    renderLoading(){
        let connectImage = require('../../assets/medias/Connect_WiFi.gif');
        const element = 
        <View style={{flex:1}}>
            <View style={{backgroundColor:'rgba(254, 116, 45, 0.2)',height:32}}>
                <Text style={{color:'#FE742D',lineHeight:32,paddingLeft:10}}>{I18n.t('同步前请先链接设备的wifi热点')}</Text>
            </View>
            <TouchableOpacity activeOpacity={0.6} onPress={this.onDeviceMifi.bind(this,this.state.wifiMessage)} style={{flex:6,alignItems:'center',justifyContent: 'center'}}>
                <ImageBackground style={{width:268,height:280,alignItems:'center',position:'relative'}} source={require('../../assets/medias/Connect_pic.png')}>
                    <Text style={{color:'#fff',marginTop:50}}>{I18n.t(this.state.connectText)}</Text>
                    <Image style={{marginTop:30}} source={connectImage} />
                    {
                        this.state.isFail ?
                            <Image style={{position:'absolute',bottom:80,left:140}} source={require('../../assets/medias/Fail.png')} />
                            :
                            null
                           
                    }
                </ImageBackground>
            </TouchableOpacity>
            <View style={{flex:3,alignItems:'center'}}>
                <View style={{flexDirection:'row',paddingTop:60,alignItems:'flex-start',width:200}}>
                <Text style={{fontSize:15,color:'#fff'}}>{I18n.t('WIFI名称')}：</Text>
                    <Text style={{fontSize:15,color:'#fff'}}>{this.state.wifiMessage.account}</Text>
                </View>
                <View style={{flexDirection:'row',paddingTop:30,alignItems:'flex-start',width:200}}>
                    <Text style={{fontSize:15,color:'#fff'}}>{I18n.t('WIFI密码')}：</Text>
                    <Text style={{fontSize:15,color:'#fff'}}>{this.state.wifiMessage.password}</Text>
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
        let noImage = require('../../assets/medias/img_no.png');
        let img = item.firstImage ? item.firstImage : item.localPath;
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
                    <ImageBackground  source={img?{uri:img}:noImage}  style={{position:'relative',width:'100%',height:'100%',backgroundColor:'#666'}}>
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
                    </ImageBackground >
                </TouchableOpacity>
            </View>;
        }
        
        return element;
    }
    /**
     * 渲染进度弹框
     */
    renderProgressModal = (item) => {
        const {progressMessage}  = this.state;
        let element = null;
        element = <View style={{backgroundColor:'rgba(0, 0, 0, 0.6)',position:'absolute',top:0,left:0,height:'100%',width:'100%',justifyContent:'center',alignItems:'center'}}>
            <View style={{backgroundColor:'#fff',width:160,height:120,borderRadius:6,justifyContent:'center',alignItems:'center'}}>
                <View style={{width:120}}>
                <Text>{I18n.t('当前正在下载')}{progressMessage.index}/{progressMessage.total}</Text>
                </View>
                <View style={{paddingTop:20,width:120,flexDirection:'row'}}>
                    <Text>{I18n.t('当前进度')}： </Text>
                    <Text style={{color:'#000'}}>{progressMessage.progress}%</Text>
                </View>
            </View>
        </View>;
        return element;
    }
    /**
     * 跳转WIFI弹框
     */
    onWifiModal = () => {
        Modal.dialog({
            contentText:I18n.t('当前设备未连接WIFI无法进行媒体同步，是否前往连接设备WIFI?'),
            onConfirm:() => {
                Applet.skipSetWifi();
            }
        });
    }
    
    connectModal = () => {
        if(!this.status){
            return;
        }
        Modal.dialog({
            contentText:I18n.t('连接设备失败，是否重试?'),
            onConfirm:() => {
                this.status = 0;
                this.isReply = false;
                this.onConfigSocket();
            }
        });
    }

    /**
     * 跳转逻辑
     */
    onSkip = (item,index) => {
        if(item.localPath){
            this.props.onSelect && this.props.onSelect(item);
        }else{
            //  前往详情需要先下载该图片/视频
            this.state.progressMessage.index = 1;
            this.state.progressMessage.total = 1;
            this.state.progressMessage.progress = 0;
            this.setState({
                isDownload:true,
                progressMessage:this.state.progressMessage
            });
            
            this.timeoutDispose();//  设置超时时间
            JMFTPSyncFileManager.downFTPFile(item.filePath,this.localUrl,item.fileName,String(index)).then(res => {
                
                item.localPath = `file://${this.localUrl}${item.fileName}`;
                item.checked = false;
                if(item.type === 'VIDEO'){
                    Applet.getVideoTime(item.localPath).then(file => {
                        item.timeLength = formatTime(file[0].videoTime);
                        this.state.fileList[item.index] = item;
                        let fileList = JSON.parse(JSON.stringify(this.state.fileList));
                        if(Platform.OS === 'ios'){
                            Applet.getVideoFirstImage(item.localPath).then(images => {
                                item.firstImage = images[0].videoFirstImagePath;
                                this.state.fileList[item.index] = item;
                                fileList = JSON.parse(JSON.stringify(this.state.fileList));
                                this.setState({
                                    fileList,
                                    isDownload:false
                                },() => {
                                    this.props.onSelect && this.props.onSelect(item);
                                });
                            });
                        }else{
                            this.setState({
                                fileList,
                                isDownload:false
                            },() => {
                                this.props.onSelect && this.props.onSelect(item);
                            });
                            
                        }
                    });
                }else{
                    this.state.fileList[item.index] = item;
                    const fileList = JSON.parse(JSON.stringify(this.state.fileList));
                    this.setState({
                        fileList,
                        isDownload:false
                    },() => {
                        this.props.onSelect && this.props.onSelect(item);
                    });
                    
                }
                //  Toast.remove(loading);
            })
                .catch(res => {
                    //  Toast.remove(loading);
                    this.setState({
                        isDownload:false
                    });
                    return Toast.message(I18n.t('下载失败'));
                });
        }
    }
    /*
    * 选择图片或视频
     */
     onSelect = (item,index) => {
         //未开启选项进行方法暴露，（跳转到详情）
         if(!this.state.isEdit){
             this.onSkip(item,index);
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
             if(item.type != 'title' && item.parentIndex == value.subIndex){
                 let flag = true;
                 for (let j = 0; j < value.subArr.length; j++) {
                     const v = value.subArr[j];
                     const isChecked = this.state.fileList[v.index];
                     if(!isChecked.checked){
                         flag = false;
                     }
                 }
                 value.checked = flag;
             }
             if(value.type != 'title' && value.checked){
                 fileChecked.push(value);
             }
         }
         
         const fileList = JSON.parse(JSON.stringify(this.state.fileList));
         this.setState({
             fileList,
             fileChecked,
         });
     }
     /**
      * 超时处理
      */
     timeoutDispose = () => {
        this.progressTime = setTimeout(() => {
            Toast.message(I18n.t('文件下载失败'));
            clearTimeout(this.progressTime);
        },15000);
     }
     /**
      * 下载文件
      */
     onDownload = () => {
         const {fileChecked} = this.state;
         if(!fileChecked.length){
             return Toast.message(I18n.t('请选择文件')+'！');
         }
         if(fileChecked.length > 15){
             return Toast.message(I18n.t('每次下载文件不得超过15个!'));
         }
        //  获取选中文件及文件大小
         let fileSize = 0;
         let fileArray = [];
         fileChecked.forEach(item => {
             if(!item.localPath){
                fileSize += Number(item.fileSize);
                fileArray.push(item);
             }
         });
         if(!fileArray.length){
             return Toast.message(I18n.t('选择的文件已下载，请勿重复下载!'))
         }
         this.state.fileChecked = fileArray;
         if(fileSize > 10 * 1024 * 1024){
             Modal.dialog({
                 contentText:I18n.t('选择的文件比较大，可能会耗费较长的时间，是否继续？'),
                 onConfirm:() => {
                     //  this.loading = Toast.loading('下载中...',30);
                     this.state.progressMessage.total = this.state.fileChecked.length;
                     this.state.progressMessage.progress = 0;
                     this.state.progressMessage.index = 1;
                     this.setState({
                         progressMessage:this.state.progressMessage,
                         isDownload:true
                     });
                     this.downFTPfile(this.state.fileChecked,0);
                     this.timeoutDispose();
                     
                 }
             });
         }else{
             this.state.progressMessage.total = this.state.fileChecked.length;
             this.state.progressMessage.index = 1;
             this.state.progressMessage.progress = 0;
             this.setState({
                 progressMessage:this.state.progressMessage,
                 isDownload:true
             });
             this.timeoutDispose();
             this.downFTPfile(this.state.fileChecked,0);
         }
         
     }
     /**
      * 删除文件
      */
     onDelete = () => {
         const {fileChecked} = this.state;
         if(fileChecked.length <= 0){
             return Toast.message(I18n.t('请选择文件'));
         }
         this.loading = Toast.loading(I18n.t('删除中'));
         this.deleteFtpfile(fileChecked,0);
     }
     /**
     * 数据格式化
     * @param {Array} list 
     */
    ftmList = (list)=>{
        //先升序
        list.sort((a, b)=> {
            return new Date(b.fileDate).getTime()>new Date(a.fileDate).getTime() ? 1 : -1;
        });
        let newList = [];
        //在设置索引
        
        let i = 0;
        list.forEach((item,index)=>{
            item.type = getFileType(item.filePath);
            item.checked = false;
            item.localPath = null;
            
            if(item.type == 'VIDEO'){
                item.timeLength = '00:00:00';
            }
            item.day = dateConversion(item.fileDate);
            for (let i = 0; i < this.state.localFileList.length; i++) {
                const v = this.state.localFileList[i];
                if(item.fileName == v.fileName){
                    item.localPath = 'file://' + v.videoPath;
                    if(item.type == 'VIDEO'){
                        item.timeLength = formatTime(v.videoTime);
                        item.firstImage = v.videoFirstImagePath;
                    }
                }
                
            }
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
        this.status = 0;
        this.isReply = false;
        this.setState({
            isConnect:true,
            fileList:newList,
            refreshing:false
        });
    }
    /**
     * 获取账号密码
     */
    getAccount = () => {
        return new Promise((reslove,reject) => {
            Applet.getEncoding().then(content => {
                const account = String(content.encoding);
                const password = account.substring(account.length - 8,account.length);
                
                const data = {
                    account,
                    password
                };
                this.setState({
                    wifiMessage:data,
                });
                reslove(data);
            });
        });
    }
     /*
    * 开启设备wifi热点
     */
     onDeviceMifi = (wifi) => {
         let data = {
             cmdCode:'WIFI,ON',
             cmdType:0,
             cmdId:1001,
             isSync:0,
             offLineFlag:0,
             instructSetting:{isOpen:'ON'}
         };
         Applet.jmAjax({
             url:api.instruction,
             method:'POST',
             data:data,
             encoding:wifi.account,
             encodingType:true
         }).then(res => { 
             console.log(res,'发送指令结果');
             this.isNerworkConnect = true;
             Applet.getWifiState().then(res => {
                 if(!res.status){
                     this.onWifiModal();
                     return; 
                 }
                 if(res.data[0].ssid != wifi.account){
                     if(Platform.OS === 'ios'){
                         this.onWifiModal();
                     }else{
                         let connectIndex = 0;//连接次数
                         //  android递归连接3次设备，每次等待2s
                         Applet.openWifi().then(res => {
                             let connectWifi = (account,password) => {
                                 Applet.connectWifi(account,password).then(data => {
                                     connectIndex++;
                                     let connectTime = null;
                                     if(data.status == 1){
                                         connectTime = setTimeout(() => {
                                             Applet.getWifiInfo().then(res => {
                                                 console.log(res,'获取的wifi结果');
                                                 if(res.status){
                                                     if(res.data[0].ssid == wifi.account){
                                                         this.onConfigSocket();
                                                     }else{
                                                         this.onWifiModal();
                                                     }
                                                 }
                                             });
                                             clearTimeout(connectTime);
                                             return;
                                         }, 1000);
                                         return;
                                     }
                                     if(connectIndex > 3){
                                         if(connectTime){
                                             clearTimeout(connectTime);
                                         }
                                         this.setState({
                                             isFail:true
                                         },() => {
                                             this.onWifiModal();
                                         });
                                         this.isNerworkConnect = false;
                                         return;
                                        
                                     }
                                     connectTime = setTimeout(() => {
                                         connectWifi(account,password);
                                         clearTimeout(connectTime);
                                     }, 2000);
                                 });
                             };
                             let timer = setTimeout(() => {
                                 connectWifi(wifi.account,wifi.password);
                                 clearTimeout(timer);
                             }, 1000);
                         });
                     }
                 }else{
                     this.onConfigSocket();
                 }
             });
         });
     }

     /*
    * 配置socket参数
     */
     onConfigSocket = () => {
         this.isNerworkConnect = false;
         this.setState({
             refreshing:true,
             isFail:false
         });
         if(this.status){
             return;
         }
         this.status = 1;
         
         JMUDPScoketManager.configUDPSocket('255.255.255.255',1712,5000).then(res => {
             this.sendSocket();
         })
             .catch(res => {
                 this.connectModal();
             });
     }
     /*
     *发送socket指令
      */
    sendSocket = () => {
        this.setState({
            refreshing:false
        });
        JMUDPScoketManager.send('jimi',1).then(res => {
            Toast.message(I18n.t('已发送消息给设备'));
        })
            .catch(res => {
                this.connectModal();
            });
    }
    /*
    *   接受scoket
     */
     getSocketMessage = () => {
         this.JMUDOScoket = JMUDPScoket.addListener(JMUDPScoketManager.kRNJMUDPSocketManager,(reminder) => {
             if(!reminder){
                 return;
             }
             if(this.isReply){
                 return;
             }
             let params = null;
             params = JSON.parse(reminder);
             params = JSON.parse(params.data);
             if(params){
                 this.isReply = true;
                 this.onConnect(params);
                 JMUDPScoketManager.closeSocket();
             }
         });
     }
    /**
     * 连接设备
     */
    onConnect = (data) => {
        JMFTPSyncFileManager.configFtpSyncFile('ftp://192.168.43.1','passive',10011,'admin','admin')
            .then(res => {
                JMFTPSyncFileManager.connectFTP().then(res => {
                    // this.setState({
                    //     isConnect:true
                    // });
                    this.onFindFiles(data);
                }).catch(res => {
                    this.connectModal();
                });

            }).catch(() => {
                this.connectModal();
            });
    }

    /**
     * 注意事项：
     * 1. 因FTP获取文件每次只允许发送一个请求，故使用递归的方式等待成功回调之后调用
     * 2. 因文件夹下内容可能存在文件和文件夹，并且是不知层级的，因此需要进入文件夹，等记录不到文件夹时才代表所有文件都已经获取完毕
     * @param {Array} pathArr 文件路径
     * @param {Number} index 当前遍历的index
     * @param {Boolean} type 遍历的是当前轮还是新一轮
     */
    queryFile = (pathArr,callback) => {
        this.state.isConnect = true;
        let httpIndex = 0;
        let pathIndex = pathArr.length;//需要发送请求的次数
        let fileListArr = [];
        let folderListArr = [];
        onfilesOne = (pathArr,index = 0,type = false) => {
            //判断是否重新一轮的遍历
            if(!type){
                folderListArr = [];
            }
            const item = pathArr[index];
            if(!item){
                httpIndex++;
                if(httpIndex >= pathIndex){
                    // 若当前层查询结束时查询不到文件夹，则查询结束，否则继续循环
                    if(!folderListArr.length){
                        callback(fileListArr);
                        return;
                    }
                    httpIndex = 0;
                    pathIndex = folderListArr.length;
                    onfilesOne(folderListArr,httpIndex);
                    return;
                }else{
                    onfilesOne(pathArr,httpIndex,true);
                    return;
                }
            }
            console.log(item,'请求时');
            JMFTPSyncFileManager.findFTPFlies(item).then(res => {
                httpIndex++;
                const fileList = JSON.parse(res);
                fileList.forEach((item,index) => {
                    if(item.fileType == 1){
                        if(item.filePath){
                            folderListArr.push(item.filePath);
                        }
                    }else{
                        // 进行数据转换
                        let day = String(item.fileName).split('.')[0];
                        if(String(day).indexOf('-') != -1){
                            day = day.split('-');
                        }else{
                            day = day.split('_');
                        }
                        day = `${day[0]}/${day[1]}/${day[2]} ${day[3]}:${day[4]}:${day[5]}`;
                        item.fileDate = new Date(day).Format('YYYY-MM-DD');
                        fileListArr.push(item);
                        
                    }
                });
                // 成功回调之后若没有循环完当前层所有文件夹继续进行循环
                //若循环完毕，进入第二层循环或结束循环
                if(httpIndex >= pathIndex){
                    // 若当前层查询结束时查询不到文件夹，则查询结束，否则继续循环
                    if(!folderListArr.length){
                        callback(fileListArr);
                        return;
                    }
                    httpIndex = 0;
                    pathIndex = folderListArr.length;
                    onfilesOne(folderListArr,httpIndex);
                }else{
                    onfilesOne(pathArr,httpIndex,true);
                }
            })
                .catch(res => {
                    Toast.message(I18n.t('获取文件中断'));
                    callback(fileListArr);
                    // httpIndex++;
                    // const daeta = {
                    //     message:'获取文件失败',
                    //     data:res
                    // };
                });
            
        };
        onfilesOne(pathArr,0);
    }
    /**
     * 获取指定文件夹下的文件
     */
    onFindFiles = (data) => {
        let photoPath = [];
        if(data.photo_dirs){
            photoPath = data.photo_dirs.split(',');
        }
        let videoPath = [];
        if(data.video_dirs){
            videoPath = data.video_dirs.split(',');
        }
        let folderListArr = [...photoPath,...videoPath];
        this.queryFile(folderListArr,(res) => {
            this.ftmList(res);
        });
    }
    
    /**
     * 下载回调逻辑
     */
    downFTPCallback = (array,index) => {
        if(index == array.length - 1){
            this.state.fileList.forEach(item => {
                item.checked = false
            })
            const fileList = JSON.parse(JSON.stringify(this.state.fileList));
            
            this.setState({
                fileList,
                fileChecked:[],
                isEdit:false,
                isDownload:false
            });
            Toast.remove(this.loading);
            return Toast.message(I18n.t('下载成功'));
           
        }else{
            this.state.progressMessage.index = index + 2;
            this.downFTPfile(array,index + 1);
        }
    }
    /**
     * 下载指定文件
     */
    downFTPfile = (array,index) => {
        let i = String(index);
        JMFTPSyncFileManager.downFTPFile(array[index].filePath,this.localUrl,array[index].fileName,i).then(res => {
            let data = array[index];
            data.localPath = `file://${this.localUrl}${data.fileName}`;
            let paths = data.localPath;
            data.checked = false;
            const dataIndex = data.index;
            
            if(data.type === 'VIDEO'){
                // 如果是视频获取视频长度
                Applet.getVideoTime(paths).then(file => {
                    data.timeLength = formatTime(file[0].videoTime);
                    // ios获取视频第一帧
                    if(Platform.OS === 'ios'){
                        Applet.getVideoFirstImage(paths).then(images => {
                            data.firstImage = images[0].videoFirstImagePath;
                            this.state.fileList[dataIndex] = data;
                            this.downFTPCallback(array,index);
                        });
                    }else{
                        this.state.fileList[dataIndex] = data;
                        this.downFTPCallback(array,index);
                    }
                });
            }else{
               
                this.state.fileList[dataIndex] = data;
                this.downFTPCallback(array,index);
            }
        })
            .catch(res => {
                array.forEach((item,itemIndex) => {
                    this.state.fileList[itemIndex].checked = false;
                });
                this.setState({
                    fileChecked:[],
                    isEdit:false,
                    isDownload:false,
                    fileList:this.state.fileList
                });
                // Toast.remove(this.loading);
                return Toast.message(I18n.t('下载失败'));
            });
    }
    /**
     * 删除文件
     */
    deleteFtpfile = (array,index) => {
        JMFTPSyncFileManager.deleteFTPFile(array[index].filePath).then(res => {
            console.log(index,array.length,'index');
            if(index === array.length - 1){
                let fileArray  = [];
                this.state.fileList.forEach((item,i) => {
                    if(!item.checked){
                        fileArray.push(item);
                    }
                });
                // 数据归位
                let i = 0;
                fileArray.forEach((item,index) => {
                    item.checked = false;
                    item.index = index;
                    item.index = index;
                    //设置头部数据
                    if(item.type == 'title'){
                        item.subArr = [];
                        i = item.index;
                    }
                    if(item.type != 'title'){
                        fileArray[i].subArr.push(item);
                    }
                });
                const fileList = JSON.parse(JSON.stringify(fileArray));
                this.setState({
                    fileList,
                    isEdit:false,
                    fileChecked:[],
                });
                Toast.remove(this.loading);
                return Toast.message(I18n.t('删除成功'));
            }
            this.deleteFtpfile(array,index + 1);
        })
            .catch(res => {
                this.setState({
                    isEdit:false,
                    fileChecked:[],
                });
                Toast.remove(this.loading);
                Toast.message(I18n.t('删除失败'));
            });
    }
    /**
     * 获取进度
     */
    getFTPProgress = () => {
        this.JMFTPProgress = JMFTPProgress.addListener('kRNJMFTPSyncFileManager',reminder => {
            clearTimeout(this.progressTime);
            
            const data = JSON.parse(reminder);
            let progress = Math.floor(JSON.parse(data.data).progress * 100);
            const progressMessage = {
                ...this.state.progressMessage,
                progress:progress
            };
            this.setState({
                progressMessage,
            });
        });
    }
    /**
     * 关闭连接
     */
    onClose = () => {
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