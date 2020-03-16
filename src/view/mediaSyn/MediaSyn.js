/*
 * @Descripttion: 
 * @version: 
 * @Author: liujinyuan
 * @Date: 2019-11-25 15:32:34
 * @LastEditors: liujinyuan
 * @LastEditTime: 2020-03-10 15:49:42
 */
import React, {Component} from 'react';
import {View,Image,Text,StyleSheet,TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
import Applet from '../../http/index';
import {Toast} from '../../components/index';
import baseStyle from '../baseStyle';
import {JMFTPSyncFileManager} from 'react-native-ftp-jm';

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
            isConnect:false,//当前ftp是否连接
        };
    }
    componentDidMount(){
        this.onConnect();
        createTheFolder('mediaFile').then(res => {
            this.localUrl = res;
        });
    }
    
    render() {
        return <View style={{flex:1,backgroundColor:'#343836'}}>
            <View style={{flex:8}}>
                <Text style={{padding:20,color:'#fff',textAlign:'center'}}>同步前请先链接设备的wifi热点</Text>
                <Text style={{color:'#fff'}}>{'未连接'}</Text>
            </View>
            <View style={{backgroundColor:'#fff',flex:2}}>
                <TouchableOpacity activeOpacity={0.7} onPress={() => this.onPhoto}>
                    <Text style={[baseStyle.bootomBorderStyle,{textAlign:'center',height:60,lineHeight:60}]}>照片</Text>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.7} onPress={() => this.onVideo}>
                    <Text style={{textAlign:'center',height:60,lineHeight:60}}>视频</Text>
                </TouchableOpacity>
            </View>
        </View>;
    }
    /**
     * 连接设备
     */
    onConnect = () => {
        Applet.getWifiStatus.then(res => {
            if(res != 1200){
                Toast.message('请连接wifi');   
            }
            JMFTPSyncFileManager.configFtpSyncFile(this.props.config)
                .then(res => {
                    JMFTPSyncFileManager.connectFTP().then(res => {
                        this.setState({
                            isConnect:true
                        });
                    });

                })
                .catch(res => {
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
