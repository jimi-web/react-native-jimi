/*
 * @Descripttion: 
 * @version: 
 * @Author: liujinyuan
 * @Date: 2019-09-12 11:40:33
 * @LastEditors: liujinyuan
 * @LastEditTime: 2019-09-30 11:44:44
 */
import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, FlatList, Slider,TouchableOpacity ,AsyncStorage,ActivityIndicator,BackHandler } from 'react-native';
import RecordControl from './RecordControl';
import { jmAjax,getEncoding } from '../../http/business';
import { createTheFolder } from '../../http/file';
import { playAudio,stopAudio } from '../../http/media';
import api from '../../api/index';
import { parseDate,parseTime } from '../../libs/utils';
import RNFS from 'react-native-fs';
import PropTypes from 'prop-types';
import {Toast} from 'teaset';

export default class Record extends Component {

    static propTypes = {
        params: PropTypes.object,
        insTimeArr:PropTypes.array,
        insSutainTime:PropTypes.number,
        recordIns:PropTypes.string,
        recordStutainTrue:PropTypes.string,
        recordStutainFalse:PropTypes.string,

    };
    static defaultProps = {
        recordIns:'LY,OFF,ins#',
        recordStutainTrue:'CXLY,ON,ins#',
        recordStutainFalse:'CXLY,OFF#',
        insSutainTime:30,
        params:{
            pageNum: 1,
            pageSize: 10
            
        },
        insTimeArr: ['30s','1分钟','2分钟','3分钟','4分钟','5分钟','持续录音']
    };
        
    constructor(props) {
        super(props);
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
        };
    }
    componentDidMount() {
        this.getServerRecordFile(this.state.params);
        this.createFolder();
        this.getStorage();
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
        stopAudio();
    }
    /**
     * 获取存储的录音信息
     */
    getStorage = () => {
        getEncoding().then(value => {
            const key = value.encoding + 'locatorRecord';
            AsyncStorage.getItem(key).then(res => {
                if(!res){
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
            if (res.code) {
                this.setState({
                    refreshing:false
                });
                return;
            }
            this.totalPage = res.data.totalPage;
            
            const serverParams = {
                pageNum:res.data.currentPage,
                pageSize:res.data.pageSize
            };
            this.ftmRecord(res.data.result,serverParams);
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
            item.createTime = new Date(item.create_time).Format('hh:mm:ss');
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
                        item.type = flag;
                    }
                    if(index === data.length - 1){
                        const totalList = JSON.parse(JSON.stringify(this.state.recordList));
                        this.setState({
                            recordList:totalList
                        });
                    }
                });
            });
            item.timeLength  =  item.timeLength;
            // 添加日期标识符
            item.today = new Date(item.create_time).Format('YYYY-MM-DD');
            if (index == 0) {
                item.fileDate = parseDate(item.create_time);
            }
            for (let i = 0; i < index; i++) {
                const value = data[i];
                if (item.today !== value.today) {
                    item.fileDate = parseDate(item.create_time);
                }
            }
        });
        const recordList = this.state.recordList.concat(data);
        const initFile = this.state.recordList.concat(file);
        // console.log(recordList,'格式化之后的数据',serverParams);
        this.setState({
            recordList,
            initFile,
            refreshing:false,
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
                data:params
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
            cmdId:'recording',
            isSync:0,
            offLineFlag:0,
            platform:'app',
            offLineInsType:'',
            instructionSetting:{
                recordLength:this.state.recordLength
            }
        };
        return new Promise((resolve) => {
            jmAjax({
                url:api.instruction,
                method: 'POST',
                encoding: true,
                encodingType: true,
                data:params
            }).then(res => {
                resolve(res);
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
    };
    render() {
        return (
            <View style={{ backgroundColor: '#f7f7f7', flex: 1,position:'relative' }}>
                <FlatList
                    refreshing={this.state.refreshing}
                    onRefresh={this.onRefresh}
                    data={this.state.recordList}
                    renderItem={this.renderItem}
                    onEndReached={this.onEndReached}
                    onEndReachedThreshold={0.2}
                    ListFooterComponent={this.renderFooter}
                />
                <View style={{ height: 55, width: '100%' }}>
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
                    />
                </View>
                {
                    this.renderLoading()
                }

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
        
        const pageNum = this.state.params.pageNum + 1;
        // console.log(number,'滚动',this.totalPage,pageNum,this.state.params.pageNum);
        if(pageNum > this.totalPage){
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
        if(this.totalPage <= this.state.params.pageNum){
            return <View style={{height:44,alignItems:'center',padding:10}}>
                <Text>{'没有更多数据了'}</Text>
            </View>;
        }
        return <View style={{alignItems:'center',padding:15}}>
            <ActivityIndicator animating={true} color={'#ccc'}  />
            <Text>{'数据加载中，请稍后'}</Text>
        </View>;
    }
    /**
     * 错误提示
     */
    renderLoading = () => {
        if(this.state.recordList.length || this.state.refreshing){
            return null;
        }
        return <TouchableOpacity activeOpacity={1} onPress={() => {this.getServerRecordFile(this.state.params);}} style={{width:'100%',height:'100%',justifyContent:'center',alignItems:'center',position:'absolute'}}>
            <Image source={require('../../assets/record/list_empty.png')} />
        </TouchableOpacity>;
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
                console.info(res, '下载中');
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
     * 
     * @param {Object} data 录音文件
     * @param {Number}} index 初始位置
     */
    playRecord(data,index){
        if(this.state.isPlay){
            return Toast.message('当前录音正在播放');
        }
        this.playRecording(data,index);
    }
    /**
     * 停止播放录音
     * @param {Object} data 当前列文件
     */
    stopRecordAudio(data){
        stopAudio().then(res => {
            data.progress = 0;
            data.type = 2;
            this.state.recordList[data.index] = data;
            const recordList = JSON.parse(JSON.stringify(this.state.recordList));
            if(!this.playAudioTimer){
                return;
            }
            clearInterval(this.playAudioTimer);
            this.setState({
                recordList,
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
        // console.log(url,'获取的文件地址');
        
        playAudio(url).then(res => {
            i++;
            data.type = 3;
            this.playAudioTimer = setInterval(()=> {
                data.progress += 100;
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

        const params = {
            deleteFlag:1,
            fileIds:dataArr.join(','),
            isOpenSelect:1
        };
        this.deleteRecord(params).then(res => {
            if(res.code){
                return Toast.message('文件已删除');
            }
            this.getServerRecordFile(this.state.params);
        });
    }
    /**
     * 清空
     */
    onEmpty = () => {

        const params = {
            deleteFlag:0
        };
        this.deleteRecord(params).then(res => {
            if(res.code){
                return Toast.message('录音已清空');
            }
            this.setState({
                recordList:[]
            });
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
                instruction = this.props.recordStutainTrue.replace('ins',this.props.insSutainTime);
            }
        }else{
            instruction = this.props.recordIns.replace('ins',data.recordLength);
        }
        console.log(instruction,'当前请求时的录音指令');
        this.setRecordInstruction(instruction).then(res => {
            if(res.code){
                return Toast.message('指令发送失败');
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
                    this.getServerRecordFile(this.state.params);
                }
            }else{
                // 限时录音
                let i = data.recordLength;
                this.recordTimer = setInterval(() => {
                    i--;
                    this.setState({
                        recordLength:i
                    });
                    if(i === 0){
                        this.setState({
                            isRecording:false,
                            recordLength:data.recordLength
                        });
                        this.getServerRecordFile(this.state.params);
                        clearInterval(this.recordTimer);
                    }
                }, 1000);
            }
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
        
        if(!this.state.recordList.length){
            return Toast.message('当前没有录音文件，无法进行操作！');
        }
        if(this.state.isRecording){
            return Toast.message('声音录制中，无法进行操作！');
        }
        if(type == 1){
            this.setState({
                recordList:this.state.deleteRecordList,
                isOpenSelect: type
            });
        }else{
            this.state.deleteRecordList = JSON.parse(JSON.stringify(this.state.recordList));
            this.state.recordList.forEach(item => {
                item.type = 4;
            });
            const recordList = JSON.parse(JSON.stringify(this.state.recordList));
            this.setState({
                recordList,
                isOpenSelect: type
            });
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
                    <View style={{ paddingLeft: 10, flex: 1 }}>
                        <Text style={{ color: '#4D4D4D', fontSize: 16 }}>
                            {item.createTime}
                        </Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10, }}>
                            {this.renderRecordType(item)}
                            <Text style={{ color: '#000', fontSize: 15 }}>{parseTime(item.timeLength)}</Text>
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
        return <TouchableOpacity activeOpacity={1} style={{paddingTop:5,paddingBottom:5}} onPress={fn}>
            <Image source={img} />
        </TouchableOpacity>;
    }
    /**
     * 
     * @param {*} type 根据状态类型生成不同的文字
     */
    renderRecordType(item) {
        let text;
        let textColor = '#A3A3A3';
        switch (item.type) {
        case 0:
            text = item.recordType;
            break;
        case 1:
            text = '下载中…';
            textColor = '#3479F6';
            
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
        return <Text style={{ color: textColor, fontSize: 11 }}>{text}</Text>;
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
        height: 70,
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
