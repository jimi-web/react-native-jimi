/*
 * @Descripttion: 
 * @version: 
 * @Author: xieruizhi
 * @Date: 2019-11-19 09:52:42
 * @LastEditors: xieruizhi
 * @LastEditTime: 2019-11-28 14:54:36
 */
import React, {Component} from 'react';
import {View,StyleSheet,Text,Image,TouchableOpacity,Dimensions,Platform} from 'react-native';
import {getFileList,createTheFolder,getVideoTime,getVideoFirstImage} from '../../http/index';
import PropTypes from 'prop-types';
const {width} =Dimensions.get('window');

export default class Photo extends Component { 

    static propTypes = {
        placeholderImg:  PropTypes.oneOfType([
            PropTypes.shape({uri: PropTypes.string}), 
            PropTypes.number,
        ]),
        placeholderVideo:PropTypes.oneOfType([
            PropTypes.shape({uri: PropTypes.string}), 
            PropTypes.number,
        ]),
        videoType:PropTypes.array,
        onSelect:PropTypes.func.isRequired
    }

    static defaultProps = {
        placeholderImg:require('../../assets/photo/photo_photo.png'),
        placeholderVideo:require('../../assets/photo/photo_viedo.png'),
        videoType:['mp4','3gp','avi','mov']
    }

    constructor(props){
        super(props);
        this.state = {
            localPhoto:[], //本地相册
            longPhoto:[], //远程相册
            localVideo:[], //本地视频
            fileTypeItemHeight:160,//文件夹高度
            fileTypeItemHeightChange:false,//用来判断文件夹高度是否改变
        }; 
    }


    componentDidMount(){
        this.getLocalList('jmPhotoListData');
    }

    render(){
        return <View style={Styles.content}>
            <View>
                <Text style={Styles.header}>相册</Text>
                <View style={ Styles.fileType}>
                    {this.fileTypeItem(0,this.state.localPhoto,this.props.placeholderImg,'本地相册',true)}
                    {this.fileTypeItem(1,this.state.longPhoto,this.props.placeholderImg,'远程相册')}
                </View>
                <View style={ Styles.fileType}>
                    {this.fileTypeName('本地相册',this.state.localPhoto.length,true)}
                    {this.fileTypeName('远程相册',this.state.longPhoto.length,true)}
                </View>
            </View>
            <View style={Styles.line}></View>
            <View>
                <Text style={Styles.header}>视频</Text>
                <View style={ Styles.fileType}>
                    {this.fileTypeItem(0,this.state.localVideo,this.props.placeholderVideo,'本地视频',true)}
                    <View style={Styles.fileTypeItem}>
                    </View>
                </View>
                <View style={ Styles.fileType}>
                    {this.fileTypeName('本地视频',this.state.localVideo.length,true)}
                    <View style={Styles.fileTypeName}>
                    </View>
                </View>
            </View>
        </View>;
    }  

    /**
     * 文件按钮
     *  @param {String} type 类型
     *  @param {Array} imageList 图片列表
     *  @param {Boolean} isRight 是否有右边距
     */
    fileTypeItem = (fileType,imageList,placeholder,name,isRight)=>{
        let urlHead = fileType?'':'file:///';
        let url = imageList.length>0?imageList[0].videoFirstImage? imageList[0].videoFirstImage:imageList[0].url:null;
        return <View style={[Styles.fileTypeItem,{marginRight:isRight?25:0}]} onLayout={this.fileTypeItemOnLayout}>
            <TouchableOpacity style={[Styles.imgBtn,{height:this.state.fileTypeItemHeight}]} activeOpacity={1} onPress={()=>{this.onTouch({fileType:fileType,mediaList:imageList,title:name});}}>
                {
                    imageList.length>0?
                        <Image style={{width:'100%',height:'100%',borderRadius:2}} resizeMode={'cover'} source={{uri:urlHead+url}}></Image>
                        :
                        <Image style={{borderRadius:2}} resizeMode={'center'} source={placeholder}></Image>
                }
            </TouchableOpacity>
        </View>;
    }

    /**
     * 文件名
     *  @param {String} name 名称
     *  @param {Number} num 数量
     *  @param {Boolean} isRight 是否有右边距
     */
    fileTypeName = (name,num,isRight)=>{
        return <View style={[Styles.fileTypeName,{marginRight:isRight?25:0}]}>
            <Text style={Styles.name}>{name}</Text>
            <Text style={Styles.num}>{num}</Text>
        </View>;
    }

    /**
     * 文件按钮画布大小
     */
    fileTypeItemOnLayout =(e)=>{
        if(!this.state.fileTypeItemHeightChange){
            this.setState({
                fileTypeItemHeight:e.nativeEvent.layout.width*1.05,
                fileTypeItemHeightChange:true
            });
        }    
    }

    /**
     * 获取本地数据
     * @param {String} name 存储媒体文件夹名称
     */
    getLocalList = async(name)=> {
        try {
            let fileData = await getFileList(name);
            this.dataSort(fileData);
        } catch (error) {
            if(error.code === -14){
                let fileUrl = await createTheFolder(name);
                if(fileUrl){
                    let fileData = await getFileList(name);
                    this.dataSort(fileData);
                }
            }
        }
    }

    /**
     * 数据更新
     */
    upDate =()=>{
        this.getLocalList('jmPhotoListData');
    }

    /**
     * 本地数据分类
     * @param {Object} fileData 获取的本地数据
     */
    dataSort = async(fileData)=>{
        //如果无本地数据
        if(!fileData.fileList){
            return;
        }
        const filePath = fileData.filePath;
        const fileList = fileData.fileList.files;
        //获取视频时长
        let getTime = await getVideoTime(fileList.join(','));
        //获取视频第一帧
        let firstImg = null;
        if(Platform.OS == 'ios'){
            firstImg = await getVideoFirstImage(fileList.join(','));
        }
        let videoList = [];
        let localPhoto = [];
        fileList.forEach((item,index) => {
            let obj = {};
            obj.url = item;
            let fileName = item.split(filePath)[1];
            obj.time = Number(fileName.split('.')[0]);
            let type = fileName.split('.')[1];
            obj.type = type;
            localPhoto.push(obj);
            if(this.props.videoType.indexOf(type)>-1){
                obj.videoTime = getTime[index].videoTime;
                //苹果手机需要第一帧
                if(Platform.OS == 'ios'){
                    obj.videoFirstImage = firstImg[index].videoFirstImagePath;
                }
                videoList.push(obj);
            }
        });
        videoList.sort((a, b)=> {
            return a.time - b.time;
        });
        localPhoto.sort((a, b)=> {
            return a.time - b.time;
        });

        this.setState({
            localVideo:videoList,
            localPhoto:localPhoto
        });
    }

    /**
     * 点击事件
     * @param {Number} type 相册类型
     * @param {Object} imageList 数据列表
     */
    onTouch = (data)=>{
        this.props.onSelect(data);
    }
}

const Styles = StyleSheet.create({
    content:{
        flex:1,
        backgroundColor:'#F7F7F7',
    },
    line:{
        width:width-30,
        height:1,
        marginTop:10,
        marginLeft:15,
        marginRight:15,
        backgroundColor:'#EEEEEE'
    },
    header:{
        fontSize:17,
        color:'#000000',
        padding:20,
        paddingBottom:10
    },
    fileType:{
        width:width,
        flexDirection:'row',
        marginTop:10,
        paddingLeft:20,
        paddingRight:20,
    },
    fileTypeItem:{
        flex:1,
        flexDirection:'row'
    },
    imgBtn:{
        flex:1,
        borderRadius:2,
        backgroundColor:'#EBEBEB',
        alignItems:'center',
        justifyContent:'center'
    },
    fileTypeName:{
        flex:1
    },
    name:{
        fontSize:15,
        color:'#333333',
        marginTop:3
    },
    num:{
        marginTop:5,
        fontSize:12,
        color:'#6B6B6B'
    }
});