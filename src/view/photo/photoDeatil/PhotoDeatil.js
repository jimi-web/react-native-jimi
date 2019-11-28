/*
 * @Descripttion: 
 * @version: 
 * @Author: xieruizhi
 * @Date: 2019-11-19 09:52:42
 * @LastEditors: xieruizhi
 * @LastEditTime: 2019-11-28 16:08:42
 */
import React, {Component} from 'react';
import {View,Text,StyleSheet,Image,TouchableOpacity} from 'react-native';
import Photograph from './Photograph';
import Video from './Video';
import BottomToolbars from '../../components/BottomToolbars';
import {batchFileDelete,batchSaveToAlbum} from '../file';
import PropTypes from 'prop-types';

export default class PhotoDeatil extends Component { 

    static propTypes = {
        url:PropTypes.string.isRequired,
        videoType:PropTypes.array,
        onDelete:PropTypes.func,
        onSave:PropTypes.func,
        fileType:PropTypes.number.isRequired,
        mediaType:PropTypes.string.isRequired,
        videoCover:PropTypes.string,
        onChangeSreen:PropTypes.func,
        isGoBackShow:PropTypes.bool,//是否返回箭头
        onPlayChange:PropTypes.func,//播放状态回调
        style:PropTypes.object
    }
    

    static defaultProps = {
        videoType:['mp4','3gp','avi','mov'],
        isFullScreen:false,
        onChangeSreen:()=>{},
        isGoBackShow:false,
        onPlayChange:()=>{},
        styles:{}
    }


    constructor(props){
        super(props);
        this.state = {
            urlHead:this.props.fileType !== 1 ? 'file:///':'',//判断是否网络图片，0为本地，1为远程
        };
    }

    render(){
        const {url,mediaType,videoType,videoCover} = this.props;
        return <View style={[Styles.content,{...this.props.style}]}>
            {
                videoType.indexOf(mediaType)>-1?<Video 
                    url={this.state.urlHead+url} 
                    videoCover={this.state.urlHead+videoCover} 
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
                />:<Photograph url={url} />
            }
            {
                !this.state.isFullScreen ?
                    <BottomToolbars>
                        <View style={Styles.bottomToolbars}>
                            <TouchableOpacity style={Styles.bottomToolbarsBtn} onPress={this.delete}>
                                <Image style={Styles.bottomToolbarsIcon} source={require('../../../assets/photo/photo_details_save.png')}></Image>
                                <Text style={[Styles.bottomToolbarsText]}>删除</Text>
                            </TouchableOpacity>
                            <TouchableOpacity  style={Styles.bottomToolbarsBtn} onPress={this.save} >
                                <Image style={Styles.bottomToolbarsIcon}  source={require('../../../assets/photo/photo_details_delete.png')}></Image>
                                <Text style={[Styles.bottomToolbarsText]}>保存至本地</Text>
                            </TouchableOpacity>
                        </View>
                    </BottomToolbars>:null}
            {this.props.children}
        </View>;
    }

    /**
     * 删除
     */
    delete = ()=>{
        batchFileDelete([this.props.url],()=>{
            this.props.onDelete && this.props.onDelete();
        });
    }

    /**
     * 保存到本地
     */
    save =()=>{
        batchSaveToAlbum([this.props.url],this.props.videoType,()=>{
            this.props.onSave && this.props.onSave();
        });
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