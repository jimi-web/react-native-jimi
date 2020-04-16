/*
 * @Descripttion: 
 * @version: 
 * @Author: liujinyuan
 * @Date: 2020-04-10 14:42:51
 * @LastEditors: liujinyuan
 * @LastEditTime: 2020-04-10 18:00:06
 */
import React, {Component} from 'react';
import {View,Text,StyleSheet,TouchableOpacity} from 'react-native';
import Photograph from '../photo/photoDeatil/Photograph';
import Video from '../photo/photoDeatil/Video';
import {Icon} from '../../components/index';
import BottomToolbars from '../components/BottomToolbars';
import {Modal} from '../../components/index';
import {createTheFolder,fileDelete,saveToAlbum,saveVideoToAlbum} from '../../http/index';
import {batchFileDelete,batchSaveToAlbum,deleteDeviceVideoPicFile,downloadFile} from '../photo/file';
import PropTypes from 'prop-types';
import Toast from 'teaset/components/Toast/Toast';

export default class MediaDetails extends Component { 

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
        onChangeSreen:()=>{
            //
        },
        onDelete:()=>{
            //
        },
        onSave:()=>{
            //
        },
        isGoBackShow:false,
        onPlayChange:()=>{
            //
        },
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
        console.log(data,'bendi ');
        
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
        const {data} = this.props;
        Modal.dialog({
            contentText:'是否删除该文件？',
            onConfirm:() => {
                fileDelete([data.url]).then(res => {
                    Toast.message('删除成功');
                });
                this.props.onDelete && this.props.onDelete(data);
            }
        });
       
       
    }

    /**
     * 保存到本地
     */
    save = () => {
        const {data} = this.props;
        console.log(data,'保存');
        if(data.type === 'mp4'){
            saveVideoToAlbum(data.url).then(res => {
                Toast.message('保存成功');
            });
        }else{
            saveToAlbum(data.url).then(res => {
                Toast.message('保存成功');
            });
        }
        this.props.onSave && this.props.onSave(data);
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