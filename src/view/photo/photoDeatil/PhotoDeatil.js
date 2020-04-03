/*
 * @Descripttion: 
 * @version: 
 * @Author: xieruizhi
 * @Date: 2019-11-19 09:52:42
 * @LastEditors: liujinyuan
 * @LastEditTime: 2020-03-31 17:39:12
 */
import React, {Component} from 'react';
import {View,Text,StyleSheet,TouchableOpacity} from 'react-native';
import Photograph from './Photograph';
import Video from './Video';
import {Icon} from '../../../components/index';
import BottomToolbars from '../../components/BottomToolbars';
import {createTheFolder} from '../../../http/index';
import {batchFileDelete,batchSaveToAlbum,deleteDeviceVideoPicFile,downloadFile} from '../file';
import PropTypes from 'prop-types';

export default class PhotoDeatil extends Component { 

    static propTypes = {
        videoType:PropTypes.array,
        onDelete:PropTypes.func,
        onSave:PropTypes.func,
        onChangeSreen:PropTypes.func,
        isGoBackShow:PropTypes.bool,//是否返回箭头
        onPlayChange:PropTypes.func,//播放状态回调
        style:PropTypes.object,
        isFullScreen:PropTypes.bool,
        isBottomBar:PropTypes.bool,//是否需要底部栏
    }
    

    static defaultProps = {
        videoType:['mp4','3gp','avi','mov'],
        isFullScreen:false,
        onChangeSreen:()=>{},
        onDelete:()=>{},
        onSave:()=>{},
        isGoBackShow:false,
        onPlayChange:()=>{},
        styles:{},
        isBottomBar:true
    }


    constructor(props){
        super(props);
        this.state = {
            isFullScreen:this.props.isFullScreen
        };
    }

    

    render(){
        const {data,videoType} = this.props;
        const fileUrl = data.hasOwnProperty('isDown')?data.isDown?data.url:data.fileUrl:data.url;//区分远程相册和本地相册，区分是否下载过的远程相册
        const videoCover = data.videoFirstImage?data.videoFirstImage:data.thumbnailUrl;
        return <View style={[Styles.content,{...this.props.style}]}>
            {
                videoType.includes(data.type)?<Video 
                    ref={(ref)=>this.Video=ref}
                    url={fileUrl} 
                    videoCover={videoCover} 
                    videoTime={data.videoTime}
                    onChangeSreen={(value)=>{
                        this.setState({
                            isFullScreen:value
                        });
                        this.props.onChangeSreen(value);
                    }}
                    isGoBackShow={this.props.isGoBackShow}
                    onPlayChange={(value)=>{
                        this.props.onPlayChange(value);
                    }}
                />:<Photograph url={fileUrl} />
            }
            {
                this.props.isBottomBar ?
                !this.state.isFullScreen ?
                    <BottomToolbars>
                        <View style={Styles.bottomToolbars}>
                            <TouchableOpacity style={Styles.bottomToolbarsBtn} onPress={this.delete}>
                                <Icon name={'photo_details_delete'} size={22}></Icon>
                                <Text style={[Styles.bottomToolbarsText]}>删除</Text>
                            </TouchableOpacity>
                            <TouchableOpacity  style={Styles.bottomToolbarsBtn} onPress={this.save} >
                                <Icon name={'photo_details_save'} size={22}></Icon>
                                <Text style={[Styles.bottomToolbarsText]}>保存至本地</Text>
                            </TouchableOpacity>
                        </View>
                    </BottomToolbars>:null
                    :null}
            {this.props.children}
        </View>;
    }

    /**
     * 暂停
     */
    pauseVideo = ()=>{
        this.Video.pauseVideo();
    }

    /**
     * 删除
     */
    delete = ()=>{
        let data = this.props.data;
        if(data.hasOwnProperty('isDown')){
            //远程相册删除
            deleteDeviceVideoPicFile({
                longFileIds:[data.fileId],
                localFileIds:[data.isDown ? data.url :''],
                callBack:()=>{
                    this.props.onDelete && this.props.onDelete();
                }
            });
        }else{
            //本地相册删除
            batchFileDelete([data.url],()=>{
                this.props.onDelete && this.props.onDelete();
            });
        }
    }

    /**
     * 保存到本地
     */
    save = async()=>{
        let data = this.props.data;
        if(data.hasOwnProperty('isDown')){
            let filePath = await createTheFolder('jmlongPhotoListData');
            downloadFile([data],filePath,this.props.videoType,()=>{
                this.props.onSave && this.props.onSave();
            });
        }else {
            batchSaveToAlbum([data.url],this.props.videoType,()=>{
                this.props.onSave && this.props.onSave();
            });
        }
    }
}

const Styles = StyleSheet.create({
    content:{
        flex:1,
        backgroundColor:'#000'
    },
    bottomToolbars:{
        flex:1,
        flexDirection:'row'
    },
    bottomToolbarsBtn:{
        flex:1,
        alignItems:'center',
        justifyContent:'center'
    },
    bottomToolbarsText:{
        fontSize:10,
        textAlign:'center',
        color:'#333333'
    },
    bottomToolbarsIcon:{
        width:20,
        height:20
    }
});