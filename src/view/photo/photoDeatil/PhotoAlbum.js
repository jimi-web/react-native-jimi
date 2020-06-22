import React, {Component} from 'react';
import { View,StyleSheet,TouchableOpacity,Text,Dimensions,ActivityIndicator} from 'react-native';
import {Icon} from '../../../components/index';
import {iphoneXStyle} from '../../../libs/utils';
import Swiper from 'react-native-swiper';
import PhotoDeatil from './PhotoDeatil';
const { width } = Dimensions.get('window');
import {createTheFolder} from '../../../http/index';
import {batchFileDelete,batchSaveToAlbum,deleteDeviceVideoPicFile,downloadFile} from '../file';
import BottomToolbars from '../../components/BottomToolbars';
import PropTypes from 'prop-types';

export default class PhotoAlbum extends Component { 
    static propTypes = {
        ...PhotoDeatil.propTypes
    }
    

    static defaultProps = {
        ...PhotoDeatil.defaultProps
    }

    constructor(props){
        super(props);
        this.state = {
            isFullScreen:this.props.isFullScreen,
            isPlaying:false,
            index:this.props.index,
            scrollEnabled:true,//是否可以滑动
        }
    }

    render() {
            return <View style={Styles.content}>
                     <Swiper 
                            loadMinimal 
                            loadMinimalSize={1}
                            index ={this.state.index}
                            autoplay={false}
                            autoplayDirection={false}
                            showsPagination={false}
                            loop={false}
                            scrollEnabled={this.state.scrollEnabled}
                            loadMinimalLoader={<ActivityIndicator size="large" color="#fff" />}
                            onIndexChanged={(index)=>{
                                this.setState({
                                    index:index
                                },()=>{
                                    this.props.onIndexChanged(index);
                                });
                            }}
                        >
                        { 
                           
                            this.props.data.map((item,index)=>{ 
                            return <PhotoDeatil
                                isBottomBar={false}
                                key = {'PhotoDeatil'+index}
                                data= {item}
                                styles={this.props.styles}
                                onChangeSreen={(value)=>{
                                    this.setScrollEnabled('isPlaying','isFullScreen',value);
                                    this.props.onChangeSreen(value);
                                }}
                                onPlayChange={(value)=>{
                                    this.setScrollEnabled('isFullScreen','isPlaying',value);
                                    this.props.onPlayChange(value);
                                }}
                                isGoBackShow={this.props.isGoBackShow} //全屏视频显示返回箭头
                            />;
                            })
                        }            
                        </Swiper>
                        {
                              !this.state.isFullScreen ?
                              <View  style={{width:width,height:iphoneXStyle(54)}}></View>:null
                        }
                        {
                            !this.state.isFullScreen ?
                            <BottomToolbars>
                                <View style={Styles.bottomToolbars}>
                                    <TouchableOpacity style={Styles.bottomToolbarsBtn} onPress={this.delete}>
                                        <Icon name={'photo_details_delete'} size={22}></Icon>
                                        <Text style={[Styles.bottomToolbarsText]}>{I18n.t('删除')}</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity  style={Styles.bottomToolbarsBtn} onPress={this.save} >
                                        <Icon name={'photo_details_save'} size={22}></Icon>
                                        <Text style={[Styles.bottomToolbarsText]}>{I18n.t('保存至本地')}</Text>
                                    </TouchableOpacity>
                                </View>
                            </BottomToolbars>:null
                        }
                    </View>
    }

    delete = ()=> {
        let data = this.props.data[this.state.index];
        if(data.hasOwnProperty('isDown')){
            //远程相册删除
            deleteDeviceVideoPicFile({
                longFileIds:[data.fileId],
                localFileIds:[data.isDown ? data.url :''],
                callBack:()=>{
                    this.props.onDelete && this.props.onDelete(data);
                }
            })
        }else{
            //本地相册删除
            batchFileDelete([data.url],()=>{
                this.props.onDelete && this.props.onDelete(data);
            });
        }
    }

    /**
     * 保存到本地
     */
    save = async()=>{
        let data = this.props.data[this.state.index];
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

    /**
     * 控制轮播允许不允许滚动
     */
    setScrollEnabled = (type,onChangeType,value)=>{
       let isFlag = this.state[type]?false:value?false:true;
       this.setState({
           scrollEnabled:isFlag,
           [onChangeType]:value
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