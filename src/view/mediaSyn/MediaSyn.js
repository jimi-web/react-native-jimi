/*
 * @Descripttion: 
 * @version: 
 * @Author: liujinyuan
 * @Date: 2020-03-10 14:38:11
 * @LastEditors: liujinyuan
 * @LastEditTime: 2020-04-03 17:13:10
 */
import React, {Component} from 'react';
import {View,Image,Text,StyleSheet,TouchableOpacity,Dimensions,NativeModules,NativeEventEmitter,ImageBackground,ScrollView,AppState, Platform,NetInfo,RefreshControl} from 'react-native';
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
        subPath:'',
        
    }
    /**
     * 删除FTP文件
     * @param {String} path 路径
     */
    static deleteFTPFile(path){
        return new Promise((resolve,reject) => {
            JMFTPSyncFileManager.deleteFTPFile(path).then(res => {
                resolve(res);
            })
                .catch(res => {
                    reject(res);
                });
        });
    }
    constructor(props){
        super(props);
        this.localFilePath = [];
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
        console.log(status,'网路变化',this.status);
        if(this.status){
            return;
        }
        if(this.state.fileList.length > 0){
            return;
        }
        if(status.type == 'wifi'){
            Applet.getWifiInfo().then(res => {
                console.log(res,'信息');
                if(!res.status){
                    return;
                }
                if(res.data[0].ssid !== this.state.account){
                    return;
                }else{
                    this.onConfigSocket();
                }
            });
        }
    }
    /**
     * 监听是否退出后台
     */
    handleAppstatus = (status) => {
        
        if(this.status){
            return;
        }
        if(status != 'active'){
            return;
        }
        if(this.state.fileList.length > 0){
            return;
        }
        console.log(status,'houtai');
        Applet.getWifiState().then(res => {
            let data = res.data;
            if(typeof data === 'string'){
                data = JSON.parse(data);
            }
            if(data[0].ssid != this.state.wifiMessage.account){
                return Toast.message('请连接设备WIFI');
            }
            this.onConfigSocket();
        });
    }
    componentDidMount(){
        // 监听事件
        NetInfo.addEventListener('connectionChange',this.handleConnectivityChange);
        AppState.addEventListener('change',this.handleAppstatus);
        this.getSocketMessage();
        this.getFTPProgress();
        // 创建文件夹并且获取文件
        Applet.createTheFolder('mediaFile').then(res => {
            this.localUrl = res;
            Applet.getFileList('mediaFile').then(res => {
                console.log(res,123465);
                
                let paths = res.fileList.files.join(',');
                console.log(paths,'lujing');
                if(paths === ''){
                    return;
                }
                Applet.getVideoTime(paths).then(res => {
                    console.log(res,'shiping');
                    this.state.localFileList = res;
                    if(Platform.OS === 'ios'){
                        Applet.getVideoFirstImage(paths).then(images => {
                            console.log(images,'diyi');
                            this.state.localFileList.forEach((item,index) => {
                                item.firstImage = images[index].videoFirstImagePath;
                            });
                            
                        });
                    }
                   
                });
            });

        });

        // 事件触发
        Applet.getWifiState().then(res => {
            console.log(res,'jie798');
            this.getAccount().then(data => {
                console.log(res,data,79878);
                let wifiMessage = res.data;
                if(typeof wifiMessage === 'string'){
                    wifiMessage = JSON.parse(wifiMessage);
                }
                if(!wifiMessage.length){
                    return;
                }
                if(wifiMessage[0].ssid !== data.account){
                    this.onDeviceMifi(data);
                }else{
                    this.onConfigSocket();
                }
            });
            
        });
        
        
    }
    componentWillUnmount() {
        NetInfo.removeEventListener('connectionChange',this.handleConnectivityChange);
        AppState.removeEventListener('change',this.handleAppstatus);
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
                            <ScrollView style={{flex:1,backgroundColor:'#fff',paddingBottom:54}}
                                refreshControl = {
                                    <RefreshControl
                                        refreshing={this.state.refreshing}
                                        onRefresh={this.onConfigSocket}
                                    />
                                }
                            >
                                
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
                                    <TouchableOpacity style={Styles.bottomToolbarsBtn} onPress={()=>{this.setState({isEdit:false});}}><Text style={[Styles.bottomToolbarsText,{color:'#000'}]}>{fileLength>0?'取消（'+fileLength+'）':'取消'}</Text></TouchableOpacity>
                                    <TouchableOpacity onPress={this.onDownload} activeOpacity={fileLength>0?0:1} style={Styles.bottomToolbarsBtn}><Text style={[Styles.bottomToolbarsText,{color:fileLength>0?'#3479F6':'#e1e1e1'}]}>保存至本地</Text></TouchableOpacity>
                                    <TouchableOpacity activeOpacity={fileLength>0?0:1} style={Styles.bottomToolbarsBtn} onPress={this.onDelete}><Text style={[Styles.bottomToolbarsText,{color:fileLength>0?'#FF3535':'#e1e1e1'}]}> 删除</Text></TouchableOpacity>
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
    /*
    *渲染加载时的页面
     */
    renderLoading(){
        let connectImage = require('../../assets/media/Connect_WiFi.gif');
        const element = 
        <View style={{flex:1}}>
            <View style={{backgroundColor:'rgba(254, 116, 45, 0.2)',height:32}}>
                <Text style={{color:'#FE742D',lineHeight:32,paddingLeft:10}}>同步前请先链接设备的wifi热点</Text>
            </View>
            <TouchableOpacity activeOpacity={0.6} onPress={this.onDeviceMifi.bind(this,this.state.wifiMessage)} style={{flex:6,alignItems:'center',justifyContent: 'center'}}>
                <ImageBackground style={{width:268,height:280,alignItems:'center',position:'relative'}} source={require('../../assets/media/Connect_pic.png')}>
                    <Text style={{color:'#fff',marginTop:50}}>{this.state.connectText}</Text>
                    <Image style={{marginTop:30}} source={connectImage} />
                    {
                        this.state.isFail ?
                            <Image style={{position:'absolute',bottom:80,left:140}} source={require('../../assets/media/Fail.png')} />
                            :
                            null
                           
                    }
                </ImageBackground>
            </TouchableOpacity>
            <View style={{flex:3,alignItems:'center'}}>
                <View style={{flexDirection:'row',paddingTop:60,alignItems:'flex-start',width:200}}>
                    <Text style={{fontSize:15,color:'#fff'}}>WIFI名称：</Text>
                    <Text style={{fontSize:15,color:'#fff'}}>{this.state.wifiMessage.account}</Text>
                </View>
                <View style={{flexDirection:'row',paddingTop:30,alignItems:'flex-start',width:200}}>
                    <Text style={{fontSize:15,color:'#fff'}}>WIFI密码：</Text>
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
        let noImage = require('../../assets/media/img_no.png');
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
                    <ImageBackground  source={img?{uri:img}:noImage}  style={{position:'relative',width:'100%',height:'100%',backgroundColor:'#ccc'}}>
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
                    <Text>当前正在下载 {progressMessage.index}/{progressMessage.total}</Text>
                </View>
                <View style={{paddingTop:20,width:120,flexDirection:'row'}}>
                    <Text>当前进度： </Text>
                    <Text style={{color:'#000'}}>{progressMessage.progress}%</Text>
                </View>
            </View>
        </View>;
        return element;
    }
    /*
    * 选择图片或视频
     */
     onSelect = (item,index) => {
         //未开启选项进行方法暴露，（跳转到详情）
         if(!this.state.isEdit){
             if(item.localPath){
                 this.props.onSelect && this.props.onSelect(item);
             }else{
                 //  let loading = Toast.loading('下载中...',30000);
                 //  前往详情需要先下载该图片/视频
                 this.state.progressMessage.index = 1;
                 this.state.progressMessage.total = 1;
                 this.setState({
                     isDownload:true,
                     progressMessage:this.state.progressMessage
                 });
                 //  设置超时时间
                 this.progressTime = setTimeout(() => {
                     Toast.message('文件下载失败');
                     clearTimeout(this.progressTime);
                 },15000);
                 JMFTPSyncFileManager.downFTPFile(item.filePath,this.localUrl,item.fileName,String(index)).then(res => {
                     
                     item.localPath = `file://${this.localUrl}${item.fileName}`;
                     item.checked = false;
                     console.log(item.localPath,'1321');
                     if(item.type === 'VIDEO'){
                         Applet.getVideoTime(item.localPath).then(file => {
                             item.timeLength = formatTime(file[0].videoTime);
                             this.state.fileList[item.index] = item;
                             const fileList = JSON.parse(JSON.stringify(this.state.fileList));
                             if(Platform.OS === 'ios'){
                                 Applet.getVideoFirstImage(item.localPath).then(images => {
                                     item.firstImage = images[0].videoFirstImagePath;
                                     this.setState({
                                         fileList,
                                         isDownload:false
                                     });
                                     this.props.onSelect && this.props.onSelect(item);
                                 });
                             }else{
                                 this.setState({
                                     fileList,
                                     isDownload:false
                                 });
                                 this.props.onSelect && this.props.onSelect(item);
                             }
                         });
                     }else{
                         this.state.fileList[item.index] = item;
                         const fileList = JSON.parse(JSON.stringify(this.state.fileList));
                         this.setState({
                             fileList,
                             isDownload:false
                         });
                         this.props.onSelect && this.props.onSelect(item);
                     }
                     //  Toast.remove(loading);
                 })
                     .catch(res => {
                         //  Toast.remove(loading);
                         this.setState({
                             isDownload:false
                         });
                         return Toast.message('下载失败');
                     });
             }
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
         
         console.log(fileChecked,'获取的数据');
         this.setState({
             fileList,
             fileChecked,
         });
     }
     /**
      * 下载文件
      */
     onDownload = () => {
         const {fileChecked} = this.state;
         console.log(fileChecked,'需要下载的文件');
         if(fileChecked.length <= 0){
             return Toast.message('请选择文件');
         }
         if(fileChecked.length > 15){
             return Toast.message('每次下载文件不超过15个');
         }
         let fileSize = 0;
         fileChecked.forEach(item => {
             fileSize += Number(item.fileSize);
         });
        
         if(fileSize > 10 * 1024 * 1024){
             Modal.dialog({
                 contentText:'选择的文件比较大，可能会耗费较长的时间，是否继续？',
                 onConfirm:() => {
                     //  this.loading = Toast.loading('下载中...',30);
                     this.state.progressMessage.total = fileChecked.length;
                     this.state.progressMessage.index = 1;
                     this.setState({
                         progressMessage:this.state.progressMessage,
                         isDownload:true
                     });
                     this.downFTPfile(fileChecked,0);
                     this.progressTime = setTimeout(() => {
                         Toast.message('文件下载失败');
                         clearTimeout(this.progressTime);
                     },15000);
                 }
             });
         }else{
             this.state.progressMessage.total = fileChecked.length;
             this.state.progressMessage.index = 1;
             this.setState({
                 progressMessage:this.state.progressMessage,
                 isDownload:true
             });
             this.progressTime = setTimeout(() => {
                 Toast.message('文件下载失败');
                 clearTimeout(this.progressTime);
             },15000);
             //  this.loading = Toast.loading('下载中...');
             this.downFTPfile(fileChecked,0);
         }
         
     }
     /**
      * 删除文件
      */
     onDelete = () => {
         const {fileChecked} = this.state;
         console.log(fileChecked,'需要删除的文件');
         if(fileChecked.length <= 0){
             return Toast.message('请选择文件');
         }
         this.loading = Toast.loading('删除中...');
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
            console.log(item,'类型');
            item.checked = false;
            item.localPath = null;
            
            if(item.type == 'VIDEO'){
                item.timeLength = '00:00:00';
            }
            item.day = dateConversion(item.fileDate);
            for (let i = 0; i < this.state.localFileList.length; i++) {
                const v = this.state.localFileList[i];
                let vName = v.videoPath.split('/');
                vName = vName[vName.length - 1];
                console.log(vName,'名字',item.videoPath);
                if(item.fileName == vName){
                    item.localPath = 'file://' + v.videoPath;
                    if(item.type == 'VIDEO'){
                        console.log(formatTime(v.videoTime),898989);
                        item.timeLength = formatTime(v.videoTime);
                        item.firstImage = v.firstImage;
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
        // const timer = setTimeout(() => {
        //     this.setState({
               
        //     });
        //     clearTimeout(timer);
        // },1500);
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
    /**
     * 跳转WIFI弹框
     */
    onWifiModal = () => {
        Modal.dialog({
            contentText:'当前设备未连接WIFI无法进行媒体同步，是否前往连接设备WIFI？',
            onConfirm:() => {
                Applet.skipSetWifi();
            }
        });
    }
    connectModal = () => {
        Modal.dialog({
            contentText:'连接设备失败，是否重试？',
            onConfirm:() => {
                this.status = 0;
                this.isReply = false;
                this.onConfigSocket();
            }
        });
    }
     /*
    * 开启设备wifi热点
     */
     onDeviceMifi = (wifi) => {
         console.log(wifi,'开始请求');
         let data = {
             cmdCode:'WIFI,ON',
             cmdType:0,
             cmdId:12345,
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
             console.log(res,'结果');
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
                                     console.log(data,'连接WIFI中');
                                     if(data.status == 1){
                                         let connectTime = setTimeout(() => {
                                             this.onConfigSocket();
                                             clearTimeout(connectTime);
                                         }, 1500);
                                         return;
                                     }
                                     console.log(connectIndex,'是否结束');
                                     if(connectIndex > 3){
                                         this.setState({
                                             isFail:true
                                         });
                                         return Toast.message('自动连接WIFI 失败');
                                     }
                                     let connectTime = setTimeout(() => {
                                         connectWifi(account,password);
                                         clearTimeout(connectTime);
                                     }, 2000);
                                 });
                             };
                             connectWifi(wifi.account,wifi.password);
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
         this.setState({
             refreshing:true
         });
         if(this.status){
             return;
         }
         this.status = 1;
         
         JMUDPScoketManager.configUDPSocket('255.255.255.255',1712,5000).then(res => {
             console.log(res,'socket连接后的值');
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
        console.log('发送数据');
        this.setState({
            refreshing:false
        });
        JMUDPScoketManager.send('jimi',1).then(res => {
            console.log(res,'发送消息回调');
            Toast.message('已发送消息给设备');
        })
            .catch(res => {
                console.log(res,'发送数据失败');
                this.connectModal();
            });
    }
    /*
    *   接受scoket
     */
     getSocketMessage = () => {
         console.log('接收数据',JMUDPScoketManager.kRNJMUDPSocketManager);
         JMUDPScoket.addListener(JMUDPScoketManager.kRNJMUDPSocketManager,(reminder) => {
             //  if(!reminder){
             //      return;
             //  }
             console.log(params,'格式化之前的数据');
             if(this.isReply){
                 return;
             }
             
             let params = null;
             if(Platform.OS === 'ios'){
                 params = JSON.parse(reminder);
                 params = params.data;
             }else{
                 params = JSON.parse(reminder);
                 params = JSON.parse(params.data);
             }
            
             console.log(params,'格式化之后的数据');
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
                console.log(res,'配置的参数');
                JMFTPSyncFileManager.connectFTP().then(res => {
                    console.log(res,'是否链接成功');
                    // this.setState({
                    //     isConnect:true
                    // });
                    this.onFindFiles(data);
                })
                    .catch(res => {
                        console.log(res,'连接结果');
                        this.connectModal();
                    });

            })
            .catch(() => {
                console.log('配置失败');
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
            console.log(item,'请求时');
            JMFTPSyncFileManager.findFTPFlies(item).then(res => {
                httpIndex++;
                const fileList = JSON.parse(res);
                fileList.forEach((item,index) => {
                    if(item.fileType == 1){
                        folderListArr.push(item.filePath);
                    }else{
                        // 进行数据转换
                        console.log(item,'文件');
                        let day = String(item.fileName).split('.')[0];
                        day = day.split('-');
                        day = `${day[0]}/${day[1]}/${day[2]} ${day[3]}:${day[4]}:${day[5]}`;
                        item.fileDate = new Date(day).Format('YYYY-MM-DD');
                        fileListArr.push(item);
                        
                    }
                });
                // 成功回调之后若没有循环完当前层所有文件夹继续进行循环
                //若循环完毕，进入第二层循环或结束循环
                console.log(httpIndex,pathIndex,folderListArr);
                if(httpIndex >= pathIndex){
                    console.log(folderListArr,'本次结束时',fileListArr);
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
                    console.log(res,'错误信息');
                    Toast.message('获取文件中断');
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
            console.log(res,'获取到的结果');
            this.ftmList(res);
        });
    }
    /**
     * 获取进度
     */
    getFTPProgress = () => {
        console.log('kRNJMFTPSyncFileManager','监听下载进度');
        JMFTPProgress.addListener('kRNJMFTPSyncFileManager',reminder => {
            clearTimeout(this.progressTime);
            const data = JSON.parse(reminder);
            console.log(data,'结果');
            let progress = 0;
            progress = Math.floor(JSON.parse(data.data).progress * 100);
            console.log(this.state.progressMessage,'数据');
            const progressMessage = {
                ...this.state.progressMessage,
                progress:progress
            };
            this.setState({
                progressMessage,
            });
            console.log(reminder,'当前设备返回的进度');
        });
    }
    /**
     * 回调逻辑
     */
    downFTPCallback = (array,index) => {
        console.log(index,array.length,'回调成功的对比');
        if(index == array.length - 1){
            const fileList = JSON.parse(JSON.stringify(this.state.fileList));
            console.log(fileList,'数据');
            this.setState({
                fileList,
                fileChecked:[],
                isEdit:false,
                isDownload:false
            });
            Toast.remove(this.loading);
            return Toast.message('下载成功');
           
        }else{
            this.state.progressMessage.index = index + 2;
            console.log(this.state.progressMessage.index,2213145);
            this.downFTPfile(array,index + 1);
        }
    }
    /**
     * 下载指定文件
     */
    downFTPfile = (array,index) => {
        let i = String(index);
        console.log(array[index].filePath,this.localUrl,array[index].fileName,i,123456789);
        console.log(array[index],1111111111);
        JMFTPSyncFileManager.downFTPFile(array[index].filePath,this.localUrl,array[index].fileName,i).then(res => {
            let data = array[index];
            data.localPath = `file://${this.localUrl}${data.fileName}`;
            let paths = data.localPath;
            data.checked = false;
            const dataIndex = data.index;
            
            if(data.type === 'VIDEO'){
                // 如果是视频获取视频长度
                Applet.getVideoTime(paths).then(file => {
                    console.log(file,'xiaziajieugo');
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
                console.log(this.state.fileList,this.state.fileList[dataIndex],'当前项',dataIndex);
                this.state.fileList[dataIndex] = data;
                this.downFTPCallback(array,index);
            }
        })
            .catch(res => {
                this.setState({
                    fileChecked:[],
                    isEdit:false,
                    isDownload:false
                });
                // Toast.remove(this.loading);
                return Toast.message('下载文件失败');
            });
    }
    /**
     * 删除文件
     */
    deleteFtpfile = (array,index) => {
        JMFTPSyncFileManager.deleteFTPFile(array[index].filePath).then(res => {
            console.log(res,index,array.length,'删除结果');
            
            if(index === array.length - 1){
                let fileArray  = [];
                this.state.fileList.forEach(item => {
                    if(!item.checked){
                        fileArray.push(item);
                    }
                });
                const fileList = JSON.parse(JSON.stringify(fileArray));
                this.setState({
                    fileList,
                    isEdit:false
                });
                Toast.remove(this.loading);
                return Toast.message('删除成功');
            }
            this.deleteFtpfile(array,index + 1);
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