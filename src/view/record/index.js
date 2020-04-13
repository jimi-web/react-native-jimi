/*
 * @Descripttion: 
 * @version: 
 * @Author: liujinyuan
 * @Date: 2019-09-12 11:40:33
 * @LastEditors: liujinyuan
 * @LastEditTime: 2020-04-13 14:32:45
 */
import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, FlatList,TouchableOpacity ,AsyncStorage,ActivityIndicator,AppState,Platform } from 'react-native';
import {Theme} from '../../components/index';
import RecordControl from './RecordControl';
import { jmAjax,getEncoding } from '../../http/business';
import { createTheFolder,playAudio,stopAudio } from '../../http/index';
import api from '../../api/index';
import { parseDate,parseTime } from '../../libs/utils';
import RNFS from 'react-native-fs';
import PropTypes from 'prop-types';
import {Toast} from 'teaset';
import {Modal} from '../../components/index';
import Empty from '../empty/Empty';

export default class Record extends Component {
    static propTypes = {
        params: PropTypes.object,
        insTimeArr:PropTypes.array,
        recordIns:PropTypes.string,
        recordStutainTrue:PropTypes.string,
        recordStutainFalse:PropTypes.string,

    };
    static defaultProps = {
        recordIns:'LY,ins#',//单个指令
        recordStutainTrue:'CXLY,ON,ins#',  //持续录音
        recordStutainFalse:'CXLY,OFF#',//关闭录音
        params:{
            pageNum: 1,
            pageSize: 10
            
        },
        insTimeArr:[
            {
                title:'30s',
                value:30,
                isChange:true
            },
            {
                title:'1分钟',
                value:60,
                isChange:false
            },
            {
                title:'2分钟',
                value:120,
                isChange:false
            },
            {
                title:'3分钟',
                value:180,
                isChange:false
            },
            {
                title:'4分钟',
                value:240,
                isChange:false
            },
            {
                title:'5分钟',
                value:300,
                isChange:false
            },
            {
                title:'持续录音',
                value:'30',
                isChange:false
            },
        ],
    };
    constructor(props) {
        super(props);
        this.backRecordPlayLength = 0;//录音播放时长
        this.backTimeLength = 0;//录音的时长
        this.userkey = null;
        // this.overlayKey = 0;
        this.totalPage = 10;//总页数
        this.isFolder = false;//判断是否创建或是否拥有该文件夹
        this.folderPath = '';//是否创建文件夹地址
        this.recordTimer = null;//录音过程中的计时器
        this.playAudioTimer = null;//录音播放器
        this.state = {
            isPlay:false,//是否正在播放
            isOpenSelect: 1,//是否开启选择
            changeFileLength: 0,//选中的文件长度
            recordType:0,//录音类型，0是正常，1是持续录音
            isRecording:false,//是否录制中
            recordLength:30,//录音时长
            refreshing:true,//列表是否加载中
            /* 传参 */
            params: this.props.params,
            initFile: [],//原始数据
            recordList: [],//格式化之后数据
            deleteRecordList:[],//删除录音深拷贝数据
            isBeginRecord:true
        };
    }
    componentDidMount() {
        this.getServerRecordFile(this.state.params);
        this.createFolder();
        this.getStorage();
        this.getBackTime();
        // this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
        //     if (!this.state.isChangeScreen) {
        //         this.changeSreenDirection('portrait');
        //         return true;
        //     }
        //     return false;
        // });
    }
    
    componentWillUnmount(){
        if(this.recordTimer){
            clearInterval(this.recordTimer);
        }
        if(this.playAudioTimer){
            clearInterval(this.playAudioTimer);
        }
        if(this.state.isPlay){
            stopAudio(this.userkey);
        }
    }
    /**
     * 获取用户在后台的时间
     */
    getBackTime = () => {
        // 监听用户后台
        let backDate = 0;
        AppState.addEventListener('change', (status) => {
            if(this.isLeave){
                return;
            }
            if(status == 'active'){
                if(backDate != 0){
                    this.backTimeLength  = parseInt((new Date().getTime() - backDate) / 1000);
                    this.backRecordPlayLength = parseInt(new Date().getTime() - backDate);
                    // console.log(this.backTimeLength,this.backRecordPlayLength,89401);
                }
            }else{
                // console.log(this.isPlay,23456);
                if(this.state.isPlay && Platform.OS === 'ios'){
                    this.getPlayRecord().then(res => {
                        this.getStopRecordList(res[0]).then(data => {
                            this.setState({
                                recordList:data,
                                isPlay:false
                            });
                        });
                    });
                }   
                this.backTimeLength = 0;
                backDate = new Date().getTime();
            }
        });
    }
    /**
     * 获取存储的录音信息
     */
    getStorage = () => {
        getEncoding().then(value => {
            const key = value.encoding + 'locatorRecord';
            AsyncStorage.getItem(key).then(res => {
                if(!res){
                    let recordLength = 30
                    this.props.insTimeArr.forEach(item => {
                        if(item.isChange){
                            recordLength = item.value
                        }
                    })
                    this.setState({
                        recordLength
                    })
                    console.log(recordLength,111)
                    return;
                }
                const data = JSON.parse(res);
                const recordTime = Math.floor((new Date().getTime() - data.recordCreatedTime) / 1000);
                let isRecording;
                if(data.isRecording && data.recordType == 0){
                    isRecording = recordTime > data.recordLength?false:true;
                }else{
                    isRecording = data.isRecording;
                }
                this.setState({
                    isRecording,
                    recordType:data.recordType,
                    recordLength:data.recordLength,
                });
                if(isRecording && data.recordType == 0){
                    let i = data.recordLength - recordTime;
                    this.recordTimer = setInterval(()=>{
                        i--;
                        if(i <= 0){
                            this.setState({
                                isRecording:false,
                                recordLength:data.recordLength
                            });
                            clearInterval(this.recordTimer);
                        }else{
                            this.setState({
                                recordLength:i
                            });
                        }
                    },1000);
                }
            });
        });
    }
    /**
     * 获取录音文件
     */
    getServerRecordFile = (params) => {
        jmAjax({
            url: api.recordList,
            method: 'GET',
            encoding: true,
            encodingType: true,
            data: params
        }).then(res => {
            this.setState({
                refreshing:false
            });
            if (res.code) {
                return;
            }
            this.totalPage = res.data.totalPage;
            const serverParams = {
                pageNum:res.data.currentPage,
                pageSize:res.data.pageSize
            };
            const initFile = this.state.initFile.concat(res.data.result);
            this.ftmRecord(initFile,serverParams);
        });
    }
    /**
     * 数据处理
     */
    ftmRecord = (file,serverParams) => {
        const data = JSON.parse(JSON.stringify(file));
        // 数据重组
        // data[0].create_time = new Date().getTime();
        data.forEach((item, index) => {
            item.timeLength = 0;
            // 修改成显示数据
            item.createTimeFtm = new Date(item.createTime).Format('hh:mm:ss');
            item.row = 1;
            item.recordType = item.recordType == 'MANUAL' ? '手动录音' : '震动录音';
            item.progress = 0;
            item.isChange = false;
            
            item.type = 0;
            item.index = index;
            const fileList = item.fileDetails || [];
            // 计算时长
            fileList.forEach((value, i) => {
                let flag = 2;
                item.timeLength += Number(value.audioTime) || 0;
                item.ext  = value.ext || '.amr';
                this.onExists(value).then(status => {
                    if(!status){
                        flag = 0;
                    }
                    if(i === fileList.length - 1){
                        this.state.recordList.forEach(downloadData => {
                            if(item.fileId === downloadData.fileId){
                                downloadData.type = flag;
                            }
                        });
                        const totalList = JSON.parse(JSON.stringify(this.state.recordList));
                        this.setState({
                            recordList:totalList
                        });
                    }
                });
            });
            item.timeLength  =  item.timeLength;
            // 添加日期标识符
            item.today = new Date(item.createTime).Format('YYYY-MM-DD');
            if (index == 0) {
                item.fileDate = parseDate(item.createTime);
            }
            let dataFalg = true;
            for (let i = 0; i < index; i++) {
                const value = data[i];
                if (item.today == value.today) {
                    dataFalg = false;
                }
            }
            if(dataFalg){
                item.fileDate = parseDate(item.createTime);
            }
        });
        
        // const recordList = this.state.recordList.concat();
        this.setState({
            recordList:data,
            initFile:file,
            isOpenSelect:1,
            params:serverParams
        });
    }
    /**
     * 删除录音文件
     */
    deleteRecord = (params) => {
        return new Promise((resolve) => {
            jmAjax({
                url:api.deleteRecord,
                method: 'DELETE',
                encoding: true,
                encodingType: true,
                data:params,
                header:1
            }).then(res => {
                resolve(res);
            });
        });
    }
    /**
     * 查询文件是否已经存在
     */
    onExists = (item) => {
        if(this.isFolder){
            const url = this.folderPath + item.fileName + item.ext;
            return new Promise((resolve) => {
                RNFS.exists(url).then(status => {
                    resolve(status);
                });
            });
        }else{
            this.createFolder().then(res => {
                this.onExists(item);
            });
        }
    }
    /**
     * 发送指令录音
     */
    setRecordInstruction = (instrution) => {
        const params = {
            encodingType:'IMEI',
            cmdCode:instrution,
            cmdType:0,
            cmdId:1002,
            isSync:0,
            offLineFlag:0,
            platform:'app',
            offLineInsType:'customIns',
            instructSetting:{
                recordLength:this.state.recordLength
            }
        };
        return new Promise((resolve,reject) => {
            jmAjax({
                url:api.instruction,
                method: 'POST',
                encoding: true,
                encodingType: true,
                data:params
            }).then(res => {
                resolve(res);
            }).catch((res)=>{
                reject(res);
            });
        });
    }
    /**
     * 创建文件夹
     */
    createFolder = () => {
        return new Promise((resolve) => {
            createTheFolder('record').then(res => {
                this.isFolder = true;
                this.folderPath = res;
                resolve(res);
            });
        });
    }
    
    render() {
        return (
            <View style={[{ backgroundColor: '#f7f7f7', flex: 1,position:'relative' }]}>
                {
                    this.state.refreshing || this.state.recordList.length ? 
                        <FlatList
                            style={{marginBottom:55}}
                            refreshing={this.state.refreshing}
                            onRefresh={this.onRefresh}
                            data={this.state.recordList}
                            renderItem={this.renderItem}
                            onEndReached={this.onEndReached}
                            onEndReachedThreshold={0.2}
                            ListFooterComponent={this.renderFooter}
                        />
                        :
                        this.renderLoading()
                }
                <RecordControl
                    isPlay={this.state.isPlay}
                    isOpenSelect={this.state.isOpenSelect}
                    recordLength={this.state.recordLength}
                    fileNumber={this.state.changeFileLength}
                    recordType={this.state.recordType}
                    isRecording={this.state.isRecording}
                    insTimeArr={this.props.insTimeArr}
                    onSelect={(type) => { this.onSelect(type); }}
                    onEmpty={() => { this.onEmpty(); }}
                    onDelete={() => { this.onDelete(); }}
                    onConfirm={(data) => this.onConfirm(data)}
                    onRecord={(data) => this.onRecord(data)}
                    isBeginRecord={this.state.isBeginRecord}
                />
            </View>
        );
    }
    /**
     * 刷新数据
     */
    onRefresh = () => {
        if(this.state.isPlay){
            return Toast.message('当前录音正在播放');
        }
        const pageNum = 1;
        const params = {
            ...this.state.params,
            pageNum,
        };
        // this.setState({
        //     refreshing:true
        // });
        this.state.initFile = [];
        this.state.recordList = [];
        this.getServerRecordFile(params);
    }
    /**
     * 滚动到底部
     */
    onEndReached = (number) => {
        if(number.distanceFromEnd < -25){
            return;
        }
        const pageNum = this.state.params.pageNum + 1;
        if(pageNum > this.totalPage){
            return;
        }
        if(this.state.isOpenSelect === 0){
            return;
        }
        const params = {
            ...this.state.params,
            pageNum
        };
        this.getServerRecordFile(params);
        
    }
    /**
     * 底部提示
     */
    renderFooter = () => {
        if(this.state.refreshing){
            return null;
        }
        if(!this.state.recordList.length){
            return null;
        }
        if(this.totalPage <= this.state.params.pageNum){
            return <View style={{alignItems:'center',padding:20,marginBottom:25}}>
                <Text>{'没有更多数据了'}</Text>
            </View>;
        }
        if(this.state.isOpenSelect === 0){
            return <View style={{alignItems:'center',padding:20,marginBottom:25}}>
                <Text>{'请取消选择操作'}</Text>
            </View>;
        }
        return <View style={{alignItems:'center',padding:20,marginBottom:25}}>
            <ActivityIndicator animating={true} color={'#ccc'}  />
            <Text>{'数据加载中，请稍后'}</Text>
        </View>;
    }
    /**
     * 错误提示
     */
    renderLoading = () => {
        return <Empty onPress={() => {this.getServerRecordFile({pageNum:1,pageSize:10});}} />;
    }
    /**
     * 
     * @param {Object} data 下载文件
     */
    downloadFile = (data = null,index) => {
        if (!data) {
            return;
        }
        let i = index || 0;
        const file = data.fileDetails;
        const options = {
            fromUrl: file[i].fileUrl,
            toFile: this.folderPath + file[i].fileName + file[i].ext,
            background: true,
            progressDivider: 5,
            begin: (res) => {
                if(i == 0){
                    data.type = 1;
                    this.state.recordList[data.index] = data;
                    const recordList = JSON.parse(JSON.stringify(this.state.recordList));
                    this.setState({
                        recordList
                    });
                }
                
            },
            progress: (res) => {
                // console.info(res, '下载中');
            }
        };

        const ret = RNFS.downloadFile(options);

        ret.promise.then(res => {
            i++;
            //下载完成时执行
            if(i < file.length){
                this.downloadFile(data,i);
            }
            if(i == file.length){
                data.type = 2;
                this.state.recordList[data.index] = data;
                const recordList = JSON.parse(JSON.stringify(this.state.recordList));
                this.setState({
                    recordList
                });
            }

        })
            .catch(err => {
                //下载出错时执行
                console.log('下载失败');
            });
    };
    /**
     * 下载录音
     */
    downloadRecord(item){
        if(this.isFolder){
            this.downloadFile(item);
        }else{
            this.createFolder().then(res => {
                this.downloadRecord(item);
            });
        }
    }
    /**
     * 获取正在播放的录音
     */
    getPlayRecord = () => {
        return new Promise(resolve => {
            const data = this.state.recordList.filter(item => {
                return item.type == 3;
            });
            resolve(data);
        });
    }
    /**
     * 停止录音并返回停止后构件号的录音列表
     */
    getStopRecordList = (data) => {
        return new Promise(resolve => {
            stopAudio(this.userkey).then(res => {
                data.progress = 0;
                data.type = 2;
                this.state.recordList[data.index] = data;
                const recordList = JSON.parse(JSON.stringify(this.state.recordList));
                if(!this.playAudioTimer){
                    return;
                }
                clearInterval(this.playAudioTimer);
                this.state.isPlay = false;
                resolve(recordList);
            });
        });
    }
    /**
     * 
     * @param {Object} data 点击录音文件
     * @param {Number}} index 初始位置
     */
    playRecord(data,index){
        data.progress = 0;
        if(this.state.isPlay){
            this.getPlayRecord().then(res => {
                this.getStopRecordList(res[0]).then(value => {
                    this.setState({
                        recordList:value,
                        isPlay:false
                    });
                    this.playRecording(data,index);
                });
            });
        }else{
            this.playRecording(data,index);
        }
    }
    /**
     * 停止播放录音
     * @param {Object} data 当前列文件
     */
    stopRecordAudio(data){
        this.getStopRecordList(data).then(res => {
            this.setState({
                recordList:res,
                isPlay:false
            });
        });
    }
    /**
     * 播放录音
     * @param {object} item 录音的文件
     * @param {Number}} index 初始位置
     */
    playRecording(data,index){
        let item = data.fileDetails;
        let i = index || 0;
        if(i >= item.length){
            data.type = 2;
            this.state.recordList[data.index] = data;
            const recordList = JSON.parse(JSON.stringify(this.state.recordList));
            this.setState({
                recordList,
                isPlay:false
            });
            return;
        }
        let length = 0;
        for (let j = 0; j < i + 1; j++) {
            const value = item[j];
            length = (length / 1000 + Number(value.audioTime)) * 1000;   
        }
        
        // console.log(data,'播放时的数据',i);
        const url = this.folderPath + item[i].fileName + item[i].ext;
        
        playAudio(url).then(res => {
            this.userkey = res.userData;
            i++;
            data.type = 3;
            this.playAudioTimer = setInterval(()=> {
                data.progress += 100;
                if(this.backRecordPlayLength && Platform !== 'ios'){
                    data.progress  = data.progress + this.backRecordPlayLength;
                    this.backRecordPlayLength = 0;
                }
                this.state.recordList[data.index] = data;
                const recordList = JSON.parse(JSON.stringify(this.state.recordList));
                this.setState({
                    recordList,
                    isPlay:true
                });
                // console.log(data.progress,length,'进度和长度');
                if(data.progress >= length){
                    // console.log(data.progress,length,'进入的进度和长度');
                    this.playRecording(data,i);
                    this.setState({
                        isPlay:false
                    });
                    clearInterval(this.playAudioTimer);
                }
            },100); 
            
        });
    }
    /**
     * 删除
     */
    onDelete = () => {
        const dataArr = [];
        this.state.recordList.forEach(item => {
            if(item.type == 5){
                dataArr.push(item.fileId);
            }
        });
        if(!dataArr.length){
            Toast.message('请选择需要删除的文件');
        }

        const data = {
            deleteFlag:0,
            fileIds:dataArr.join(','),
        };
        this.deleteRecord(data).then(res => {
            if(res.code){
                return Toast.message(res.message);
            }
            Toast.message('文件删除成功');
            const params = {
                pageNum:1,
                pageSize:10
            };
            this.setState({
                isOpenSelect:1
            });
            this.state.recordList = [];
            this.state.initFile = [];
            this.getServerRecordFile(params);
        });
    }
    /**
     * 清空
     */
    onEmpty = () => {
        // const element = <Dialog
        //     onConfirm={()=>{this.onConfirmEmpty();}}
        //     onCancel={() => {Overlay.remove(this.overlayKey);}}
        // />; 
        // this.overlayKey = Overlay.add(element);
        Modal.dialog({
            contentText:'清空所有录音数据将不可恢复，是否确定？',
            onConfirm:()=>{
                this.onConfirmEmpty();
            }
        });
        
    }
    onConfirmEmpty = () => {
        const params = {
            deleteFlag:1
        };
        this.deleteRecord(params).then(res => {
            this.setState({
                isOpenSelect:1,
                recordList:[],
                initFile:[],
                deleteRecordList:[]
            },()=>{
                Toast.message('录音已清空');
            });
            // Overlay.remove(this.overlayKey);
            // const params = {
            //     pageNum:1,
            //     pageSize:10
            // };
            // this.getServerRecordFile(params);
        });
    }
    /**
     * 开始录音
     */
    onRecord = (data) => {
        let instruction;
        if(this.state.recordType){
            if(data.isRecording){
                instruction = this.props.recordStutainFalse;
            }else{
                instruction = this.props.recordStutainTrue.replace('ins',data.recordLength);
            }
        }else{
            instruction = this.props.recordIns.replace('ins',data.recordLength);
        }
        this.setState({
            isBeginRecord:false
        });
        this.setRecordInstruction(instruction).then(res => {
            this.setState({
                isBeginRecord:true
            });
            // if(res.code){
            //     return Toast.message('指令发送失败');
            // }
            if(res.data){
                const content = typeof res.data.content === 'string'?JSON.parse(res.data.content) : {};
                if(!content._code){
                    return Toast.message(content._msg);
                }
            }
            //录音成功时储存录音状态
            const storage = {
                recordType:this.state.recordType,
                recordLength:data.recordLength,
                recordCreatedTime:new Date().getTime(),
                isRecording:!this.state.isRecording
            };
            getEncoding().then(value => {
                const key = value.encoding + 'locatorRecord';
                AsyncStorage.setItem(key,JSON.stringify(storage));
            });
            // 修改录音状态
            this.setState({
                isRecording:!data.isRecording
            });
            // 录音结束之后重新刷新数据
            if(this.state.recordType){
                // 持续录音
                if(data.isRecording){
                    const listParams = {
                        pageNum:1,
                        pageSize:10
                    };
                    setTimeout(() => {
                        this.state.recordList = [];
                        this.state.initFile = [];
                        this.getServerRecordFile(listParams);
                    },10000);
                }
            }else{
                // 限时录音
                let i = data.recordLength;
                this.recordTimer = setInterval(() => {
                    i = i - 1;
                    if(this.backTimeLength){
                        i = i - this.backTimeLength;
                        this.backTimeLength = 0;
                    }
                    this.setState({
                        recordLength:i
                    });
                    if(i <= 0){
                        this.setState({
                            isRecording:false,
                            recordLength:data.recordLength,
                            
                        });
                        const listParams = {
                            pageNum:1,
                            pageSize:10
                        };
                        setTimeout(() => {
                            this.state.recordList = [];
                            this.state.initFile = [];
                            this.getServerRecordFile(listParams);
                        },10000);
                        Toast.message('设备上传中，请耐心等待');
                        clearInterval(this.recordTimer);
                    }
                }, 1000);
            }
        }).catch((res)=>{
            this.setState({
                isBeginRecord:true
            });
        });
        
    }
    /**
     * 修改时长
     */
    onConfirm = ({type,time}) => {
        this.setState({
            recordLength:time,
            recordType:type,
        });
        
    }
    /**
     * 点击选择 
     */
    onSelect = (type) => {
        if(type == 1){
            this.setState({
                recordList:this.state.deleteRecordList,
                isOpenSelect: type
            });
        }else{
            if(!this.state.recordList.length){
                return Toast.message('当前没有录音文件，无法进行操作！');
            }
            if(this.state.isPlay){
                this.getPlayRecord().then(res => {
                    this.getStopRecordList(res[0]).then(value => {
                        this.state.deleteRecordList = JSON.parse(JSON.stringify(value));
                        this.state.recordList.forEach(item => {
                            item.type = 4;
                        });
                        const recordList = JSON.parse(JSON.stringify(this.state.recordList));
                        this.setState({
                            recordList,
                            isOpenSelect:type
                        });
                    });
                });
            }else{
                this.state.deleteRecordList = JSON.parse(JSON.stringify(this.state.recordList));
                this.state.recordList.forEach(item => {
                    item.type = 4;
                });
                const recordList = JSON.parse(JSON.stringify(this.state.recordList));
                this.setState({
                    recordList,
                    isOpenSelect:type
                });
            }
            
        }
    }
    /**
     * 
     * @param {Object} item 当前行数据
     */
    onSelectItem(item,type){
        item.type = type;
        this.state.recordList[item.index] = item;
        const recordList = JSON.parse(JSON.stringify(this.state.recordList));
        const changeFileLength = recordList.filter((item) => {
            return item.type == 5;
        });
        this.setState({
            recordList,
            changeFileLength:changeFileLength.length
        });
    }
    /**
     * 
     * @param {Object} data 当前行数据
     */
    renderItem = (data) => {
        const item = data.item;
        let progress = Math.floor(item.progress / (item.timeLength * 1000) * 100);
        progress = progress > 0? `${progress}%`: 0;
        let view = <View>
            {item.fileDate ?
                <View style={styles.titleStyle}>
                    <Text>{item.fileDate}</Text>
                </View>
                :
                null
            }
            <View style={{ ...styles.mainStyle, zIndex: item.zIndex }}>
                <View style={styles.contentStyle}>
                    <View>
                        {this.renderRecordImage(item)}
                    </View>
                    <View style={{ paddingLeft: 5, flex: 1 }}>
                        <Text style={{ color: Theme.recordUploadTimeTextColor, fontSize: Theme.recordUploadTimeTextSize }}>
                            {item.createTimeFtm}
                        </Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10, }}>
                            {this.renderRecordType(item)}
                            <Text style={{ color: Theme.recordTimeTextColor, fontSize: Theme.recordTimeTextSize }}>{parseTime(item.timeLength)}</Text>
                        </View>
                    </View>
                </View>
                <View style={{ ...styles.bottomBorder, width: progress, height: 1, position: 'absolute', bottom: 0, left: 15 }}></View>
            </View>
        </View>;
        return view;

    }
    /**
     * 
     * @param {number} type 根据类型生成不同的状态图,同图片状态
     */
    renderRecordImage(item) {
        let img;
        let fn  = () => {
            return null;
        };
        let status = item.type;
        switch (status) {
        case 0:
            img = require('../../assets/record/recording_list_undownload.png');
            fn  = this.downloadRecord.bind(this,item);
            break;
        case 1:
            img = require('../../assets/record/recording_list_downloading.png');
            break;
        case 2:
            img = require('../../assets/record/recording_list_downloaded.png');
            fn = this.playRecord.bind(this,item,0);
            break;
        case 3:
            img = require('../../assets/record/recording_list_playing.gif');
            fn = this.stopRecordAudio.bind(this,item);
            break;
        case 4:
            fn = this.onSelectItem.bind(this,item,5);
            img = require('../../assets/record/checkbox_nor.png');
            break;
        case 5:
            fn = this.onSelectItem.bind(this,item,4);
            img = require('../../assets/record/checkbox_pre.png');
            break;
        default:
            img = require('../../assets/record/recording_list_undownload.png');
            break;
        }
        return <TouchableOpacity activeOpacity={1} style={{padding:5}} onPress={fn}>
            <Image source={img} />
        </TouchableOpacity>;
    }
    /**
     * 
     * @param {*} type 根据状态类型生成不同的文字
     */
    renderRecordType(item) {
        let text;
        let textColor = Theme.recordTypeTextDefaultColor;
        switch (item.type) {
        case 0:
            text = item.recordType;
            break;
        case 1:
            text = '下载中…';
            textColor = Theme.recordTypeTextPrimaryColor;
            break;
        case 2:
            text = item.recordType;
            break;
        case 3:
            text = item.recordType;
            break;
        case 4:
            text = item.recordType;
            break;
        case 5:
            text = item.recordType;
            break;
        default:
            text = item.recordType;
            break;
        }
        return <Text style={{ color: textColor, fontSize: Theme.recordTypeTextSize,width:120 }}>{text}</Text>;
    }

}


const styles = StyleSheet.create({
    titleStyle: {
        fontSize: 12,
        height: 30,
        justifyContent: 'center',
        paddingLeft: 15,
        paddingRight: 15
    },
    mainStyle: {
        position: 'relative',
        paddingLeft: 15,
        paddingRight: 15,
        backgroundColor: '#fff',
    },
    contentStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        height: Theme.recordItemHeight,
        borderBottomColor: '#f7f7f7',
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderStyle: 'solid',
    },
    bottomBorder: {
        borderBottomColor: '#3479F6',
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderStyle: 'solid',
    }
});
