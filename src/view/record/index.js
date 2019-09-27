/*
 * @Descripttion: 
 * @version: 
 * @Author: liujinyuan
 * @Date: 2019-09-12 11:40:33
 * @LastEditors: liujinyuan
 * @LastEditTime: 2019-09-27 16:15:38
 */
import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, FlatList, Slider,TouchableOpacity ,AsyncStorage } from 'react-native';
import RecordControl from './RecordControl';
import { jmAjax,getEncoding } from '../../http/business';
import { createTheFolder } from '../../http/file';
import { playAudio } from '../../http/media';
import { recordApi } from '../../api/index';
import { parseDate,parseTime } from '../../libs/utils';
import RNFS from 'react-native-fs';
import PropTypes from 'prop-types';

export default class Record extends Component {
    constructor(props) {
        super(props);
        this.isFolder = false;//判断是否创建或是否拥有该文件夹
        this.folderPath = '';//是否创建文件夹地址
        this.isPlay = false;//是否正在播放
        this.recordTimer = null;//录音过程中的计时器
        this.state = {
            isOpenSelect: 1,//是否开启选择
            changeFileLength: 0,//选中的文件长度
            recordType:0,//录音类型，0是正常，1是持续录音
            isRecording:false,//是否录制中
            /* 传参 */
            params: {
                pageNum: 1,
                pageSize: 10
            },
            initFile: [],//原始数据
            recordList: [],//格式化之后数据
            recordLength:30,//录音时长
            deleteRecordList:[],//删除录音深拷贝数据
        };
    }
    componentDidMount() {
        this.getServerRecordFile(this.state.params);
        this.createFolder();
        this.getStorage();
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
                            console.log(data.recordLength,78888888);
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
            url: recordApi.recordList,
            method: 'GET',
            encoding: true,
            encodingType: true,
            data: params
        }).then(res => {
            if (res.code) {
                return;
            }
            this.ftmRecord(res.data);
        });
    }
    /**
     * 删除录音文件
     */
    deleteRecord = (params) => {
        return new Promise((resolve) => {
            jmAjax({
                url:recordApi.deleteRecord,
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
                url:recordApi.instruction,
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
     * 数据处理
     */
    ftmRecord = (file) => {
        const data = JSON.parse(JSON.stringify(file));
        // 数据重组
        // data[0].create_time = new Date().getTime();
        data.forEach((item, index) => {
            item.timeLength = 0;
            const fileList = item.fileDetails || [];
            // 计算时长
            fileList.forEach((value, index) => {
                item.timeLength += Number(value.audioTime) || 0;
                item.ext  = value.ext || '.amr';
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
            // 修改成显示数据
            item.createTime = new Date(item.create_time).Format('hh:mm:ss');
            item.row = 1;
            item.recordType = item.recordType === 'MANUAL' ? '手动录音' : '震动录音';
            item.progress = 0;
            item.isChange = false;
            item.type = 0;
            item.index = index;
        });
        console.log(data,'格式化之后的文件');
        this.setState({
            recordList: data,
            initFile: file
        });
    }
    /**
     * 创建文件夹
     */
    createFolder = () => {
        createTheFolder('record').then(res => {
            console.log(res,'当前创建的文件夹');
            this.isFolder = true;
            this.folderPath = res;
        });
    };
    render() {
        console.log(this.state.recordLength,'渲染时的录音长度');
        return (
            <View style={{ backgroundColor: '#f7f7f7', flex: 1,position:'relative' }}>
                <FlatList
                    data={this.state.recordList}
                    renderItem={this.renderItem}
                />
                <View style={{ height: 55, width: '100%' }}>
                    <RecordControl
                        isOpenSelect={this.state.isOpenSelect}
                        recordLength={this.state.recordLength}
                        fileNumber={this.state.changeFileLength}
                        recordType={this.state.recordType}
                        isRecording={this.state.isRecording}
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
     * 错误提示
     */
    renderLoading = () => {
        if(this.state.recordList.length){
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
            console.log(res, '下载完成');
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
                console.log(err);
            });
    };
    /**
     * 下载录音
     */
    downloadRecord(item){
        console.log(item,'下载录音',this.isFolder);
        if(this.isFolder){
            this.downloadFile(item);
        }else{
            this.createFolder();
        }
    }
    /**
     * 播放录音
     * @param {object} item 录音的文件
     */
    playRecord(data,index){
        let item = data.fileDetails;
        console.log(item,'i的值');
        if(index >= item.length){
            this.isPlay = false;
            data.type = 2;
            this.state.recordList[data.index] = data;
            const recordList = JSON.parse(JSON.stringify(this.state.recordList));
            this.setState({
                recordList
            });
            return;
        }
        let i = index || 0;
        const length = item[i].audioTime * 1000;
        console.log(data,'播放时的数据',i);
        const url = this.folderPath + item[i].fileName + item[i].ext;
        console.log(url,'获取的文件地址');
        this.isPlay = true;
        playAudio(url).then(res => {
            i++;
            data.type = 3;
            let timer = setInterval(()=> {
                data.progress += 100;
                this.state.recordList[data.index] = data;
                const recordList = JSON.parse(JSON.stringify(this.state.recordList));
                console.log(data.progress,'当前进度',length,recordList);
                this.setState({
                    recordList
                });
                if(data.progress >= length){
                    this.playRecord(data,i);
                    console.log('清除当前计时器');
                    clearInterval(timer);
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
            console.log('请选择需要删除的文件');
        }

        const params = {
            deleteFlag:1,
            fileIds:dataArr.join(','),
            isOpenSelect:1
        };
        this.deleteRecord(params).then(res => {
            if(res.code){
                return console.log('清空完成');
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
                return console.log('清空完成');
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
        let instruction = `LY${data.length}#`;
        if(this.state.recordType){
            if(data.isRecording){
                instruction = 'CXLY,ON,30#';
            }else{
                instruction = 'CXLY,ON,OFF#';
            }
        }else{
            instruction = `LY${data.length}#`;
        }
        this.setRecordInstruction(instruction).then(res => {
            if(res.code){
                return console.log('指令发送失败');
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
                console.log(storage,key,'存储');
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
                    console.log(i,'开始计时');
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
        console.log(time,type,888);
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
            return console.log('当前没有录音文件，无法进行操作！');
        }
        if(this.state.isRecording){
            return console.log('声音录制中，无法进行操作！');
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
        console.log(type,555);
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
        // console.log(view,item.row);
        return view;

    }
    /**
     * 
     * @param {number} type 根据类型生成不同的状态图,同图片状态
     */
    renderRecordImage(item) {
        let img;
        let fn  = () => {
            console.log('别点击了，毫无作用');
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
