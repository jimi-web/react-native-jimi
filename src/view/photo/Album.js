/*
 * @Descripttion: 相册集成页
 * @version: 
 * @Author: liujinyuan
 * @Date: 2019-08-14 17:30:33
 * @LastEditors: liujinyuan
 * @LastEditTime: 2019-08-16 10:15:25
 */

import React, {Component} from 'react';
import {View,Text,StyleSheet,Image} from 'react-native';
import {httpSamllLocation,getFileList} from '../../http/business';
import PropTypes from 'prop-types';
import {albumGaryIcon,videoGaryIcon} from '../../assets';
import { connect } from 'react-redux';
class Album extends Component{
    static propTypes = {
        mode:PropTypes.oneOf(['folder', 'list']),
        type:PropTypes.array,
        remote:PropTypes.string,
    }
    static defaultProps = {
        mode:'folder',
        type:['video','photo']
    }
    constructor(props){
        super(props);
        this.state = {
            photoList:[],

        };
    }
    componentDidMount(){
        this.getSamllLocation();
    }
    /**
     * 初始化文件夹
     */
    renderFolder(){
        const {remote,type,photoFile}  = this.props;
        let styles = {
            titleStyle:{
                color:'#333',
                fontWeight:'bold',
                fontSize:20,
                paddingTop:10,
                paddingBottom:10,
            },
            itemStyle:{
                justifyContent:'space-between',
                flexDirection:'row'
            }
        };
        const folder =  <View style={{flex:1,padding:10}}>
            <View style={[styles.titleStyle]}>
                <Text>{'相册'}</Text>
            </View>
            <View style={[styles.itemStyle]}>
                <View>
                    <Image source={albumGaryIcon}/>
                    <Text>{'本地相册'}</Text>
                    <Text>{photoFile.photoList}</Text>
                </View>
                <View>
                    <Image source={albumGaryIcon}/>
                </View>
            </View> 
        </View>;
        console.log(folder,111111);
        return folder;
    }
    /**
     * 获取小程序为位置
     */
    getSamllLocation = () => {
        httpSamllLocation().then(res => {
            console.log(res,'小程序位置');
        });
    }
    /**
     * 获取文件
     */
    getFileList = (url) => {
        this.getFileList(url).then(res => {
            console.log('获取的文件');
        });
    }
    render(){
        return (
            <View style={{flex:1}}>
                {this.renderFolder()}
            </View>
        );
    }
    

}



export default connect(
    (state) => ({
        photoFile:state.photo
    }),
    (dispatch) => ({
        setVideoList:(list) => {
            dispatch({
                type:'SET_VIDEO_LIST',
                value:list
            });
        },
        setPhotoList:(list) => {
            dispatch({
                type:'SET_PHOTO_LIST',
                value:list
            });
        },
        setRemoteList:(list) => {
            dispatch({
                type:'SET_REMOTE_LIST',
                value:list
            });
        },
    })
)(Album);