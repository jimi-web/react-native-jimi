/*
 * @Descripttion: 
 * @version: 
 * @Author: liujinyuan
 * @Date: 2019-12-11 14:05:24
<<<<<<< HEAD
 * @LastEditors  : liujinyuan
 * @LastEditTime : 2020-01-03 17:05:31
=======
 * @LastEditors  : xieruizhi
 * @LastEditTime : 2020-01-04 18:24:47
>>>>>>> 129ca47bc8aefbeb2925abd155410a0f5664bf1e
 */
import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, DeviceEventEmitter,TouchableOpacity ,AsyncStorage,ActivityIndicator,AppState,Platform,NativeModules,NativeEventEmitter, Dimensions,BackHandler} from 'react-native';


import { changeSreenDirection,createTheFolder,getMicrophone } from '../../http';
import RVCError from './RVCErrorHint';
import RVCLoading from './RVCLoading';
import RVCTimer from './RVCTimer';
import PropTypes from 'prop-types';
import {Toast,Icon} from '../../components/index';


import { JMRTMPMonitorView} from 'react-native-rtmp-player-jm';
const { JMRTMPPlayerManager } = NativeModules;

export default class MonitorView extends Component {
    static propTypes = {
        topStatusIcon: PropTypes.array,//顶部内容添加图标
        bottomStautsIcon:PropTypes.array,//底部内容添加图标
        isSoundIcon:PropTypes.bool,//是否开启声音控制按钮
        isScreenIcon:PropTypes.bool,//是否开启全屏控制阿牛
        isTolkIcon:PropTypes.bool,//是否开启对讲控制按钮
        isRecordIcon:PropTypes.bool,//是否开启录制按钮
        isSnapshotIcon:PropTypes.bool,//是否开启截图按钮
        isBackVideo:PropTypes.bool,
        RVCRatio:PropTypes.string,
        isStopWork:PropTypes.bool,//外部控制内部不能进行录像，对讲，静音,
        params:PropTypes.object,//外部控制内部不能进行录像，对讲，静音,
        LoadingElement:PropTypes.element,//加载组件
        ErrorElement:PropTypes.element,//错误提示组件
        LeftBootomRN:PropTypes.element,//视频左侧组件默认为null
        CenterRn:PropTypes.element,//视频中间组件,设置该组件默认加载和错误提示失效
    }
    static defaultProps = {
        isSoundIcon:true,
        isTolkIcon:true,
        isSnapshotIcon:true,
        isScreenIcon:true,
        isBackVideo:true,
        isRecordIcon:true,
        RVCRatio:'16:9',
        bottomStautsIcon:[],
        topStatusIcon:[],
        isStopWork:false,
    }

    /**
     * 停止视频并回到释放SDK
     */
    static stop (){
        DeviceEventEmitter.emit('jmStop');
    }
    /**
     * 停止播放RVC
     */
    static stopPlay (){
        DeviceEventEmitter.emit('jmStopPlay');
    }
    /**
     * 停止播放RVC
     */
    static startPlay (){
        DeviceEventEmitter.emit('jmStartPlay');
    }
    /**
     * 停止播放RVC
     */
    static initialize (){
        DeviceEventEmitter.emit('jmInitialize');
    }
    /**
     * 自定义指令
     * @param {*} params 数据自定义
     */
    static sendCustomRequest (params){
        console.log(params,'调用');
        return new Promise((resolve,reject) => {
            JMRTMPPlayerManager.sendCustomRequest(params).then(res => {
                console.log(res,'回调');
                resolve(res);
            });
        });
    }


    /**
     * 播放回调
     * @param {Array} params 回调数组
     */
    static startPlayback (params){
        JMRTMPPlayerManager.startPlayback(params);
    }

    /**
     * 切换摄像头，默认填true   
     * @param {Bool} params 
     */
    static switchCamera (params){
        return new Promise((resolve,reject) => {
            JMRTMPPlayerManager.switchCamera(params).then(res => {
                resolve(res);
            });
        });
    }


    constructor(props){
        super(props);
        this.screenWidth = Dimensions.get('window').width;
        this.screenHeight = Dimensions.get('window').height;
        this.photoPath = null;//当前文件夹的位置
        this.videoPath = null;
        this.backHandler = null;
        this.appState = null;
        this.errorNumber = 0;//记录当前播放过程中出错误的次数，达到三次以下进行静默重连。
        this.state = {
            rtmpManagerListener:new NativeEventEmitter(JMRTMPPlayerManager),
            isScreen:false,//是否全屏，初始化该组件为false
            isRecord:false,//是否开启录制,
            isTolk:false,//是否开启对讲
            isSnapshot:false,//是否开启截屏
            isSound:true,//当前声音是否开启
            bottomHint:null,//视频底部出现的提示
            isInit:false,//是否初始化完成
            isPlay:false,//是否正在播放中
            RVCStatus:0,//RVC的状态，0为未进行初始化，1为加载中，2为加载成功，3为暂停播放,4为加载失败
            screenClickNum:0,//全屏状态下点击RVC的次数
            totalFrameCount:0,//当前视频速率
            isBusy:false,//RVC是否处于忙碌状态，如：录制中，对讲中，切换清晰度中
            errorMessage:null,//RVC返回的错误信息
            
        };
        
    }
    componentDidMount(){
        this.initialize();
        this.onBackPress();
        this.onAppState();
        
    }
    /**
     * 监听app状态
     */
    onAppState = () => {
        this.appState = AppState.addEventListener('change', (status) => {
            if(status == 'active'){
                this.onStartPlay(); 
            }else{
                this.onStopPlay();

            }
        });
    }
    /**
     * 监听后退按钮
     */
    onBackPress = () => {
        this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
            if (this.state.isScreen) {
                this.onReversal();
                return true;
            }
            return false;
        });
    }
    componentWillMount() {
        // RVC监听
        playStatusSubscription = this.state.rtmpManagerListener.addListener(JMRTMPPlayerManager.kOnStreamPlayerPlayStatus, (reminder) => {
            this.props.onPlayReminder && this.props.onPlayReminder(reminder);//将自定义数据抛出去
            if (reminder.status == JMRTMPPlayerManager.videoStatusPrepare) {
                console.log('准备播放视频');
                this.setState({
                    RVCStatus:1,
                });
            } else if (reminder.status == JMRTMPPlayerManager.videoStatusStart) {
                console.log('视频已开始播放');
                this.errorNumber = 0;
                this.setState({
                    isPlay:true,
                    RVCStatus:2
                });
            } else if (reminder.status == JMRTMPPlayerManager.videoStatusStop) {
                this.setState({
                    isPlay:false,
                    RVCStatus:3,
                });
                console.log('视频已停止播放');
            } else {
                console.log('视频播放失败，Code:' + reminder.errCode + ',ErrMag:' + reminder.errMsg);
                this.errorNumber++;
                if(this.errorNumber > 4){
                    this.setState({
                        isPlay:false,
                        RVCStatus:reminder.errCode,
                        errorMessage:reminder.errMsg
                    });
                }else{
                    this.onStartPlay();
                }
            }


        });
        // 对讲回调                                      
        talkStatusSubscription = this.state.rtmpManagerListener.addListener(JMRTMPPlayerManager.kOnStreamPlayerTalkStatus, (reminder) => { 
            this.props.onTalk && this.props.onTalk(reminder);//对讲时的信息
            const status = reminder.status;
            if(status == 1){
                this.setState({
                    bottomHint:<Text style={{color:'#fff'}}>对讲准备就绪……</Text>,
                    isBusy:true

                });
            }
            if(status == 2){
                this.setState({
                    isTolk:true,
                    bottomHint:<RVCTimer status={true} title={'对讲：'} />,
                    
                });
            }
            if(status == 3){
                this.setState({
                    bottomHint:<Text style={{color:'#fff'}}>对讲已停止</Text>,
                },() => {
                    let timer =  setTimeout(() => {
                        this.setState({
                            isTolk:false,
                            bottomHint:null,
                            isBusy:false
                        });
                        //
                        clearTimeout(timer);
                    },500);
                });
            }
            if(status == 14){
                console.log('权限');
                const ask = Platform.OS == 'ios'? 2 : 1;
                getMicrophone(ask).then(res => {
                    // 有权限则再次调用对讲
                    console.log(res,'结果');
                    if(res.code == 0){
                        JMRTMPPlayerManager.startTalk();
                    }
                    //无权限取消状态
                    if(res.code == -221){
                        this.setState({
                            isTolk:false,
                            isBusy:false,
                            bottomHint:null
                        });
                    }
                });
            }
            
        });
        recordStatusSubscription = this.state.rtmpManagerListener.addListener(JMRTMPPlayerManager.kOnStreamPlayerRecordStatus, (reminder) => {
            console.log(reminder,'录制信息'); 
            this.props.onRecord && this.props.onRecord(reminder);//录制时的信息
            const status = reminder.status;
            if(status == 1){
                this.setState({
                    bottomHint:<RVCTimer title={'录制：'} status={true} />,
                    isRecord:true,
                    isBusy:true
                });
            }
            if(status == 2){
                this.setState({
                    bottomHint:<Text style={{color:'#fff'}}>录制结束</Text>,
                },() => {
                    let timer =  setTimeout(() => {
                        this.setState({
                            isRecord:false,
                            bottomHint:null,
                            isBusy:false
                        });
                        clearTimeout(timer);
                    },500);
                });
            }
        });
        frameInfoSubscription = this.state.rtmpManagerListener.addListener(JMRTMPPlayerManager.kOnStreamPlayerReceiveFrameInfo, (reminder) => {
            this.props.getRVCInfo && this.props.getRVCInfo(reminder);//视频的消息
            this.setState({
                totalFrameCount:Math.floor((reminder.videoBps + reminder.audioBPS) /1024 * 100)/100
            });
        });
        receiveDeviceSubscription = this.state.rtmpManagerListener.addListener(JMRTMPPlayerManager.kOnStreamPlayerReceiveDeviceData, (reminder) => { 
            this.props.onPlayBack && this.props.onPlayBack(reminder);
        });

        // 事件监听
        DeviceEventEmitter.addListener('jmStop', e => this.onStop(e));
        DeviceEventEmitter.addListener('jmStopPlay', e => this.onStopPlay(e));
        DeviceEventEmitter.addListener('jmStartPlay', e => this.onStartPlay(e));
        DeviceEventEmitter.addListener('jmInitialize', e => this.initialize(e));
        
    }
    componentWillUnmount() {
        if (playStatusSubscription) playStatusSubscription.remove();
        if (talkStatusSubscription) talkStatusSubscription.remove();
        if (recordStatusSubscription) recordStatusSubscription.remove();
        if (frameInfoSubscription) frameInfoSubscription.remove();
        if (receiveDeviceSubscription) receiveDeviceSubscription.remove();
        this.onStop();
        // 事件释放
        DeviceEventEmitter.removeAllListeners('jmStopPlay');
        DeviceEventEmitter.removeAllListeners('jmStopPlay');
        DeviceEventEmitter.removeAllListeners('jmStartPlay');
        DeviceEventEmitter.removeAllListeners('jmInitialize');
    }
    render(){
        return (
            <View style={{backgroundColor:'#fff',flex:1,alignItems:'center'}}>
                {/* 页头 */}
                
                {
                    this.renderHeader()
                }
                {/* 视频 */}
                <TouchableOpacity onPress={this.onScreen} activeOpacity={1} style={this.renderRVCStyle()}>
                    <JMRTMPMonitorView
                        style={{flex:1}}
                    >
                    </JMRTMPMonitorView>
                    {/* 渲染中间提示 */}
                    {
                        <View style={{width:'100%',height:'100%', justifyContent:'center',alignItems:'center',position:'absolute',zIndex:110}}>
                            {
                                this.renderLoading()
                            }
                        </View>
                    }
                    {/* 渲染底部左侧提示 */}
                    {
                        <View style={{position:'absolute',bottom:0,left:0,zIndex:211}}>
                            {
                                this.renderLeftHint()
                            }
                        </View>
                    }
                    {/* 底部提示 */}
                    {
                        this.renderBottomHint()
                    }
                </TouchableOpacity>
                {/* 页尾 */}
                {
                    this.renderFooter()
                }
                {/* 功能按钮区域 */}
                {
                    this.renderTool()
                }
            </View>
        );
    }
    /**
     * 初始化视频样式
     */
    renderRVCStyle = () => {
        const width = this.state.isScreen ? this.screenWidth * 16 / 9 : this.screenWidth;
        const height = this.state.isScreen ? this.screenWidth : this.screenWidth * 9 / 16;
        const styles = {
            width: width,
            height:height,
            position:'relative',
            overflow:'hidden',
        };
        return styles;
    }
    /**
     * 初始化页头
     */
    renderHeader(){
        const {topStatusIcon} = this.props;
        const {isScreen,screenClickNum,totalFrameCount} = this.state;
        let styles = null;
        if(isScreen){
            // 全屏状态下点击视频隐藏操作框
            //
            if(screenClickNum % 2 !== 0){
                return null;
            }
            const left = (this.screenHeight - this.screenWidth * 16 / 9) / 2;
            styles = {
                left,
                width:this.screenWidth * 16 / 9,
                height:40,
                backgroundColor:'rgba(0,0,0,0.6)',
                position:'absolute',
                top:0,
                zIndex:455,
                justifyContent:'center',
                alignItems:'center'
            };
        }else{
            styles = {
                width:this.screenWidth,
                height:40,
                backgroundColor:'#343837',
                justifyContent:'center',
                alignItems:'center',
                position:'relative',
            };
        }
        let iconArr = [
            <View key={'totalFrameCount'} style={{position:'absolute',right:10,width:80}}><Text style={{color:'#fff',textAlign:'right'}}>{totalFrameCount + 'kb/s'}</Text></View>,
        ].concat(topStatusIcon);
        const element = 
            <View style={styles}>
                {{...iconArrs} = iconArr}
            </View>
        ;
        return element;
    }
    /**
     * 初始化页脚
     */
    renderFooter(){
        const {bottomStautsIcon,isSoundIcon,isScreenIcon} = this.props;
        const {isScreen,isSound,screenClickNum} = this.state;
        let styles = null;
        if(isScreen){
            // 全屏状态下点击视频隐藏操作框
            if(screenClickNum % 2 !== 0){
                return null;
            }
            const left = (this.screenHeight - this.screenWidth * 16 / 9) / 2;
            styles = {
                left,
                width:this.screenWidth * 16 / 9,
                height:40,
                backgroundColor:'rgba(0,0,0,0.6)',
                position:'absolute',
                bottom:0,
                zIndex:455,
                justifyContent:'center',
                alignItems:'center'
            };
        }else{
            styles = {
                width:this.screenWidth,
                height:40,
                backgroundColor:'#343837',
                position:'relative',
                justifyContent:'center',
                alignItems:'center'
            };
        }
        const screenIcon = isScreen ? 'video_full_screen_off' : 'video_full_screen_on';
        const soundIcon = isSound ?  'video_mute_on' : 'video_mute_off';
        const iconStyle = {
            position:'absolute',
        };
        let screenElement = isScreenIcon?
            <TouchableOpacity key={'screen'} activeOpacity={0.3} onPress={this.onReversal} style={[iconStyle,{right:10}]}>
                <Icon name={screenIcon} size={28} color={'#fff'} />
            </TouchableOpacity>
        :null;
        let soundElement = isSoundIcon?
            <TouchableOpacity key={'sound'} activeOpacity={0.3} onPress={this.onSound} style={[iconStyle,{right:50}]}>
                <Icon name={soundIcon} size={28}  color={'#fff'} />
            </TouchableOpacity>
            :null;
        let iconArr =  [
            soundElement,
            screenElement,
        ].concat(bottomStautsIcon);
        const element = 
            <View style={[styles]}>
                {{...iconArrs} = iconArr}
            </View>
        ;
        return element;
    }
    /**
     * 初始化工具
     */
    renderTool(){
        const {isRecordIcon,isTolkIcon,isSnapshotIcon} = this.props;
        const {isRecord,isTolk,isSnapshot,isScreen,screenClickNum} = this.state;
        const recordIcon = isRecord?'video_recording_press' : 'video_recording_normal';
        const tolkIcon = isTolk?'video_voice_press' : 'video_voice_normal';
        const snapshotIcon = isSnapshot? 'video_photo_normal': 'video_photo_normal';

        let styles = null;
       
        if(isScreen){
            // 全屏状态下点击视频隐藏操作框
            if(screenClickNum % 2 !== 0){
                return null;
            }
            const right = (this.screenHeight - this.screenWidth * 16 / 9) / 2 + 10;
            styles = {
                right,
                height:this.screenWidth - 80, 
                justifyContent:'center',
                alignItems:'center',
                position:'absolute',
                backgroundColor:'transparent',
                zIndex:455,
                top:20
                
            };
        }else{
            styles = {
                width:this.screenWidth,
                justifyContent:'center',
                alignItems:'center',
                flexDirection:'row',
                padding:10,
                marginTop:20,
                backgroundColor:'#fff'
            };
        }
        
        const element = 
            <View style={styles}>
                {
                    isSnapshotIcon
                        ?
                        <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                            <TouchableOpacity onPress={this.onSnapshot}>
                                {/* <Image source={snapshotIcon} /> */}
                                <Icon name={snapshotIcon} size={50} />
                            </TouchableOpacity>
                        </View>
                        :
                        null
                }
                {
                    isTolkIcon
                        ?
                        <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                            <TouchableOpacity onPress={this.onTalk}>
                                {/* <Image source={tolkIcon} /> */}
                                <Icon name={tolkIcon} size={90} />
                            </TouchableOpacity>
                        </View>
                        :
                        null
                }
                {
                    isRecordIcon
                        ?
                        <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                            <TouchableOpacity onPress={this.onRecord}>
                                {/* <Image source={recordIcon} /> */}
                                <Icon name={recordIcon} size={50} />
                            </TouchableOpacity>
                        </View>
                        :
                        null
                }
            </View>
        ;
        return element;
    }
    /**
     * 初始化底部左侧提示
     */
    renderLeftHint = () => {
        const {leftBootomRN} = this.props;
        if(leftBootomRN){
            return leftBootomRN;
        }
        let element = null;
        return element;
    }
    /**
     * 加载底部提示
     */
    renderBottomHint = () => {
        let top = 5;
        if(this.state.isScreen){
            bottom = Platform.OS == 'ios'?45:80;
            if(this.state.screenClickNum % 2 !== 0){
                bottom = Platform.OS == 'ios'?5:40;
            }
        }else{
            bottom = 5;
        }
        const element = <View style={{bottom,position:'absolute',zIndex:212,width:'100%',alignItems:'center'}}>
            {this.state.bottomHint}
        </View>;
        return element;
    }
    /**
     * 初始化中间提示
     */
    renderLoading = () => {
        const {centerRn,ErrorElement,LoadingElement} = this.props;
        const {RVCStatus,errorMessage} = this.state;
        let Error = ErrorElement || <RVCError errorMessage={errorMessage} errorCode={RVCStatus} onAgain={this.initialize} />;
        let Loading = LoadingElement || <RVCLoading />;
        
        if(centerRn){
            return centerRn;
        }
        let element = null;
        if(RVCStatus == 0){
            element = null;
        }else if(RVCStatus == 1){
            element = Loading;
        }else if(RVCStatus == 2){
            element = null;
        }else if(RVCStatus == 3){
            element = null;
        }else if(RVCStatus > 3){
            element = Error;
        }
        return element;
    }
    /** 
     * 视频初始化
     */
    initialize = () => {
        // const params = {
        //     key:'d0c67074f14e403d916379f6664414b2',
        //     secret:'feef6c9e8ff94bfa95c2fc9b56b8c52a',
        //     imei:'312345678912314',
        // };
 
        const {params} = this.props;
        if(!params){
            return;
        }
        if(typeof params.key != 'string'){
            throw 'key 需要一个String类型';
        }
        if(typeof params.secret != 'string'){
            throw 'secret 需要一个String类型';
        }
        if(typeof params.imei != 'string'){
            throw 'imei 需要一个String类型';
        }
        
        this.setState({
            RVCStatus:1
        });
        JMRTMPPlayerManager.initialize(params.key, params.secret, params.imei);
        this.onStartPlay();
    }
    /**     
     * 播放视频
     */
    onStartPlay = (type) => {
        JMRTMPPlayerManager.startPlayLive();
    }
    /**
     * 停止播放
     */
    onStopPlay = () => {
        JMRTMPPlayerManager.stopPlay();
    }
    /**
     * 停止视频所有数据，广播，并将此页面恢复当初始化
     */
    onStop = () => {
        this.onStopPlay();
        this.setState({
            isScreen:false,
            isRecord:false,
            isTolk:false,
            isSnapshot:false,
            isSound:false,
            bottomHint:null,
            isBusy:false,
            screenClickNum:0,
            totalFrameCount:0
        });
        this.backHandler = null;
        this.appState = null;
        JMRTMPPlayerManager.deInitialize();
    }
    /**
     * 开启声音true为开启，false静音
     * 
     */
    onSound = () => {
        if(this.state.RVCStatus != 2){
            return;
        }
        if(this.state.isBusy){
            return;
        }
        if(this.props.isStopWork){
            return;
        }
        const {isSound} = this.state;
        this.setState({
            isSound:!isSound
        },() => {
            JMRTMPPlayerManager.setMute(isSound);
            this.props.onSound && this.props.onSound(isSound);// 关闭声音之后触发的函数
        });
        
    }
    /**
     * 旋转视频
     */
    onReversal = () => {
        const type = this.state.isScreen?'portrait':'landscapeRight';
        changeSreenDirection(type).then(res => {
            this.props.onReversal && this.props.onReversal(!this.state.isScreen);
            this.setState({
                isScreen:!this.state.isScreen
            });
        });
    }
    /**
     * 点击视频
     */
    onScreen = () => {
        if(this.state.RVCStatus != 2){
            return;
        }
        if(this.state.isScreen){
            const screenClickNum =  this.state.screenClickNum + 1;
            this.setState({
                screenClickNum
            });
        }
        this.props.onScreen && this.props.onScreen();
    }
    /**
     * 对讲，true为关闭对讲，false为开启对讲
     */
    onTalk = () => {
        if(this.state.isTolk){
            let timer = setTimeout(() => {  
                JMRTMPPlayerManager.stopTalk();
                clearTimeout(timer);
            }, 800);
        }else{
            if(this.state.RVCStatus != 2){
                return;
            }
            if(this.state.isBusy){
                return;
            }
            if(this.props.isStopWork){
                return;
            }
            JMRTMPPlayerManager.startTalk();
            this.setState({
                isTolk:true,
                bottomHint:<Text style={{color:'#fff'}}>{'对讲准备中……'}</Text>
            });
        }
    }
    /**
     * 截图
     */
    onSnapshot = () => {
        const time = new Date().getTime();
        this.setState({
            isSnapshot:true
        });
        if(this.photoPath){
            JMRTMPPlayerManager.snapshot(this.photoPath + time + '.png').then(res => {
                Toast.message('图片已保存');
                this.setState({
                    isSnapshot:false
                });
            });
        }else{
            createTheFolder('photo').then(res =>{
                this.photoPath = res;
                JMRTMPPlayerManager.snapshot(this.photoPath + time + '.png').then(res => {
                    Toast.message('图片已保存');
                    this.setState({
                        isSnapshot:false
                    });
                });
            });
        }
        this.props.onSnapshot && this.props.onSnapshot();//点击截图触发的方法
    }
    /**
     * 开始录制，true为关闭录制，false为开启录制
     */
    onRecord = () => {
        const time = new Date().getTime();
        if(this.state.isRecord){
            JMRTMPPlayerManager.stopRecording();
        }else{
            if(this.state.RVCStatus != 2){
                return;
            }
            if(this.state.isBusy){
                return;
            }
            if(this.props.isStopWork){
                return;
            }
            if(this.videoPath){
                JMRTMPPlayerManager.startRecording(this.videoPath + time + '.mp4');
            }else{
                createTheFolder('video').then(res =>{
                    this.videoPath = res;
                    JMRTMPPlayerManager.startRecording(this.videoPath + time + '.mp4');
                });
            }
        }
    }
}
