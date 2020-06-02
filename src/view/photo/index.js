/*
 * @Descripttion: 
 * @version: 
 * @Author: xieruizhi
 * @Date: 2019-11-19 09:52:42
 * @LastEditors: xieruizhi
 * @LastEditTime: 2020-06-02 15:02:39
 */
import React, {Component} from 'react';
import {View,StyleSheet,Text,Image,TouchableOpacity,Dimensions,Platform} from 'react-native';
import {getVideoTime,getVideoFirstImage} from '../../http/index';
import PropTypes from 'prop-types';
import {Icon} from '../../components/index';
import {queryDeviceVideoPicFile,getLocalList} from './file';
const {width} =Dimensions.get('window');

export default class Photo extends Component { 

    static propTypes = {
        placeholderImg:  PropTypes.oneOfType([
            PropTypes.shape({uri: PropTypes.string}), 
            PropTypes.number,
            PropTypes.string
        ]),
        placeholderVideo:PropTypes.oneOfType([
            PropTypes.shape({uri: PropTypes.string}), 
            PropTypes.number,
            PropTypes.string
        ]),
        videoType:PropTypes.array,
        onSelect:PropTypes.func.isRequired,
        filePath:PropTypes.string
    }

    static defaultProps = {
        placeholderImg:'photo_photo',
        placeholderVideo:'photo_viedo',
        videoType:['mp4','3gp','avi','mov'],
        filePath:'jmLocalPhotoList'
    }

    constructor(props){
        super(props);
        this.state = {
            localPhoto:[], //本地相册
            longPhoto:[], //远程相册
            longPhotoTotal:0,
            localVideo:[], //本地视频
            fileTypeItemHeight:160,//文件夹高度
            fileTypeItemHeightChange:false,//用来判断文件夹高度是否改变
        }; 
    }


    componentDidMount(){
        this.upDate();
    }

    render(){
        let localPhotoimg = this.state.localPhoto.length>0? this.state.localPhoto[0].videoFirstImage? this.state.localPhoto[0].videoFirstImage:this.state.localPhoto[0].url:null;  
        let longPhotoimg = this.state.longPhoto.length>0?this.state.longPhoto[0].thumbnailUrl?this.state.longPhoto[0].thumbnailUrl+'?imageView2/0/w/200/h/200':this.state.longPhoto[0].fileUrl+'?imageView2/0/w/200/h/200':null;
        let localVideoimg = this.state.localVideo.length>0?this.state.localVideo[0].videoFirstImage:null;
        return <View style={Styles.content}>
            <View>
                <Text style={Styles.header}>相册</Text>
                <View style={ Styles.fileType}>
                    {this.fileTypeItem(0,localPhotoimg,this.props.placeholderImg,'本地相册',this.state.localPhoto,true)}
                    {this.fileTypeItem(1,longPhotoimg,this.props.placeholderImg,'远程相册')}
                </View>
                <View style={ Styles.fileType}>
                    {this.fileTypeName('本地相册',this.state.localPhoto.length,true)}
                    {this.fileTypeName('远程相册',this.state.longPhotoTotal)}
                </View>
            </View>
            <View style={Styles.line}></View>
            <View>
                <Text style={Styles.header}>视频</Text>
                <View style={ Styles.fileType}>
                    {this.fileTypeItem(0,localVideoimg,this.props.placeholderVideo,'本地视频',this.state.localVideo,true)}
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
     *  @param {Array} img 显示第一张图片
     *  @param {String} placeholder 替代图
     *  @param {String} name 文件夹名
     *  @param {Boolean} isRight 是否有右边距
     */
    fileTypeItem = (fileType,img,placeholder,name,mediaList,isRight)=>{
        return <View style={[Styles.fileTypeItem,{marginRight:isRight?25:0}]} onLayout={this.fileTypeItemOnLayout}>
            <TouchableOpacity style={[Styles.imgBtn,{height:this.state.fileTypeItemHeight}]} activeOpacity={1} onPress={()=>{this.onTouch({fileType:fileType,title:name,mediaList:mediaList});}}>
                {
                    img?
                        <Image style={{width:'100%',height:'100%',borderRadius:2}} resizeMode={'cover'} source={{uri:img}}></Image>
                        :
                        <Icon name={placeholder} size={50} />
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
     * 数据更新
     */
    upDate =()=>{
        getLocalList(this.props.filePath,(fileData)=>{
            this.dataSort(fileData)
        });
        this.getFirstLongImg();
    }

    /**
     * 本地数据分类
     * @param {Object} fileData 获取的本地数据
     */
    dataSort = async(fileData)=>{
        const filePath = fileData.filePath;
        const fileList = fileData.fileList.files;
        if(fileList.length===0){
            this.setState({
                localPhoto:[],
                localVideo:[]
            });
            return;
        }
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
            obj.url = 'file:///'+item;
            let fileName = item.split(filePath)[1];
            obj.time = Number(fileName.split('.')[0]);
            let type = fileName.split('.')[1];
            obj.type = type;
            localPhoto.push(obj);
            if(this.props.videoType.indexOf(type)>-1){
                obj.videoTime = getTime[index].videoTime;
                //苹果手机需要第一帧
                if(Platform.OS == 'ios'){
                    obj.videoFirstImage = 'file:///'+firstImg[index].videoFirstImagePath;
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

    /**
     * 获取远程相册第一张图片缩略图
     */
    getFirstLongImg = async()=>{
        let img = await queryDeviceVideoPicFile({pageNum:1,pageSize:1});
        this.setState({
            longPhoto:[...img.result],
            longPhotoTotal:img.totalRecord
        });
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