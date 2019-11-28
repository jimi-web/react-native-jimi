/*
 * @Descripttion: 
 * @version: 
 * @Author: xieruizhi
 * @Date: 2019-11-19 09:33:58
 * @LastEditors: xieruizhi
 * @LastEditTime: 2019-11-28 14:39:18
 */
import React, {Component} from 'react';
import {View,Text,SectionList,StyleSheet,FlatList,TouchableOpacity,Image} from 'react-native';
import Empty from '../../empty/Empty';
import {isIphoneX,iphoneXHeight} from '../../../libs/utils';
import PhotoListTitle from './PhotoListTitle';
import PhotoListItem from './PhotoListItem';
import {batchFileDelete,batchSaveToAlbum} from '../file';
import PropTypes from 'prop-types';
import BottomToolbars from '../../components/BottomToolbars';

export default class PhotoList extends Component {
    static propTypes = {
        items:PropTypes.array,
        fileType:PropTypes.number.isRequired,
        onSelect:PropTypes.func,
        videoType:PropTypes.array
    }
    

    static defaultProps = {
        items:[],
        fileType:0,//0为本地相册，1为远程相册，
        videoType:['mp4','3gp','avi','mov']
    }

    constructor(props){
        super(props);
        this.state = {
            defaultList:this.props.items,//初始格式数据
            mediaList:[],//setionList格式媒体列表
            urlHead:this.props.fileType !== 1 ? 'file:///':'',//判断是否网络图片，0为本地，1为远程
            isEdit:false,//是否编辑
            checkedList:[],//被选择的媒体的URL数组,用来删除和保存本地传的参数
            defaultCheckedList:[],//被选择的媒体的所有数据，用来和原来的数据做对比
        };
    }

    
    componentDidMount(){
        this.init();
    }

    render(){
        let checkedListLen = this.state.checkedList.length;
        return <View style={Styles.content}>
            <SectionList
                style={this.state.isEdit?Styles.sectionList:{}}
                keyExtractor={(item, index) => 'fileList'+index.toString()}
                stickySectionHeadersEnabled={true}
                renderSectionHeader={this._renderSectionHeader}
                renderItem={this._renderItem}
                sections={this.state.mediaList}
            />
            {
                !this.state.isEdit ? 
                    <TouchableOpacity style={Styles.edit} onPress={()=>this.onEdit(true)}>
                        <Image source={require('../../../assets/photo/photo_list_management.png')}></Image>
                    </TouchableOpacity>:
                    <BottomToolbars>
                        <View style={Styles.bottomToolbars}>
                            <TouchableOpacity style={Styles.bottomToolbarsBtn} onPress={()=>this.onEdit(false)}><Text style={[Styles.bottomToolbarsText,{color:'#000'}]}>{checkedListLen>0?'取消（'+checkedListLen+'）':'取消'}</Text></TouchableOpacity>
                            <TouchableOpacity activeOpacity={checkedListLen>0?0:1} style={Styles.bottomToolbarsBtn} onPress={this.save}><Text style={[Styles.bottomToolbarsText,{color:checkedListLen>0?'#3479F6':'#e1e1e1'}]}>保存至本地</Text></TouchableOpacity>
                            <TouchableOpacity activeOpacity={checkedListLen>0?0:1} style={Styles.bottomToolbarsBtn} onPress={this.delete}><Text style={[Styles.bottomToolbarsText,{color:checkedListLen>0?'#FF3535':'#e1e1e1'}]}> 删除</Text></TouchableOpacity>
                        </View>
                    </BottomToolbars>
            }{
                this.state.defaultList.length === 0? <Empty />:null
            }
        </View>;
    }

    /**
     * 图片列表
     */
    _renderItem = (info) =>{
        return <FlatList
            style={Styles.itemList}
            extraData={this.state}
            data={info.item.mediaItem}
            renderItem={this._chidlRenderItem}
            keyExtractor={(item, index) => index.toString()}
            numColumns={4}
        />;
    }

    _chidlRenderItem = (info) =>{
        let item = info.item;
        let url = item.videoFirstImage ? item.videoFirstImage:item.url;//如果有第一帧则是视频
        return <PhotoListItem  
            index={info.index} 
            url={this.state.urlHead+url}
            isEdit={this.state.isEdit}
            checked={item.checked}
            onSelect={()=>this.onSelect(item)}
            videoTime={this.videoTimeConvert(item.videoTime)}
        />;
    }

    _renderSectionHeader =({section})=>{
        return <PhotoListTitle 
            date={this.dateConversion(section.date)}
            onAllChecked={()=>this.allChecked(section)}
            allChecked={section.allChecked}
            isEdit={this.state.isEdit}
        />; 
    }

    /**
     * 初始化
     */
    init = async()=>{
        let dataStructure = await this.dataStructure(this.state.defaultList);
        let sectionListFormat = await this.sectionListFormat(dataStructure);
        this.setState({
            mediaList:sectionListFormat,
            checkedList:[],
            defaultCheckedList:[]
        });
    }

    /**
     * 数组转成需要的
     * @param {Array} list 
     */
    dataStructure = (list,exists)=>{
        //时间戳转时间
        list.forEach(item => {
            item.date = new Date(item.time).Format('YYYY-MM-DD');
            item.fullTime = new Date(item.time).Format('yyyy-MM-dd hh:mm:ss');
            item.fullTimeFormat = this.dateConversion(item.date);
            item.checked = exists?item.checked:false;
        });
        //先升序
        list.sort((a, b)=> {
            return this.dateToTime(b.fullTime)>this.dateToTime(a.fullTime) ? 1 : -1;
        });
        //在设置索引
        list.forEach((item,index)=>{item.index=index;});
        
        //根据时间分组
        let classifyData = [];
        for (let key of list) {
            if(!classifyData[key.date]) {
                let arr = [];
                arr.push(key);
                classifyData[key.date] = arr;
            }else {
                classifyData[key.date].push(key);
            } 
        }
        return classifyData;
    }

    /**
     * 日期替换
     */
    dateToTime = (str)=>{
        return (new Date(str.replace(/-/g,'/'))).getTime(); //用/替换日期中的-是为了解决Safari的兼容
    }

    /**
     * 转成SectionList格式
     */
    sectionListFormat =(data)=>{
        let result = [];
        for(let key  in data){
            let obj={};
            let mediaItem = {};
            obj.date = key;
            obj.allChecked = false;
            let setMediaItem = obj.data = [];
            mediaItem.mediaItem = data[key];
            setMediaItem.push(mediaItem);
            result.push(obj);
        }
        
        //时间排序
        result.sort((a, b)=> {
            return this.dateToTime(b.date)>this.dateToTime(a.date) ? 1 : -1;
        });
        return result;
    }

    /**
     * 是否在编辑状态
     */
    onEdit =(flag)=>{
        this.setState({
            isEdit:flag
        },()=>{
            //数据更新，取消checked选中状态
            if(!this.state.isEdit){
                this.init();
            }
        });
    }

    /**
     * 选择图片事件
     * @param {Object} item 每个图片数据
     */
    onSelect = async(item)=> {
        if(this.state.isEdit){
            //拿到最新选中的数据列表
            let checkedList = this.state.checkedList;//用来传参
            let defaultCheckedList = this.state.defaultCheckedList;//用来对比判断
            let data = this.check(item,checkedList,defaultCheckedList);
            checkedList = data.listUrl;
            defaultCheckedList = data.list;
            //被选择的媒体的所有数据转成sectionList格式
            let dataStructure = await this.dataStructure(defaultCheckedList,true);
            let sectionListFormat = await this.sectionListFormat(dataStructure);
            //将原来所有数据对比被选中的数据
            this.invert(sectionListFormat,checkedList,defaultCheckedList);

        }else{
            //如果不在编辑状态则进入图片详情
            this.props.onSelect &&  this.props.onSelect(this.state.defaultList,item.index);
        }
    }

    /**
     * 全选反选判断
     */
    invert = (sectionListFormat,checkedList,defaultCheckedList)=>{
        let mediaList = this.state.mediaList;
        for (let mediaKey of  mediaList){
            //判断选中的数据列表是否存在
            if(sectionListFormat.length>0){
                ///判断展示的数据里某个天数是否有被选中
                if(sectionListFormat.findIndex((data)=>data.date===mediaKey.date) != -1){
                    //有则循环选中的天数列表
                    for(let checkedKey of sectionListFormat){
                        //判断天数是否相等,相等则去判断相等天数的数据长度
                        if(checkedKey.date === mediaKey.date){
                            //判断两个数组长度是否相等,相等则为全选
                            if(checkedKey.data[0].mediaItem.length === mediaKey.data[0].mediaItem.length){
                                mediaKey.allChecked = true;
                            }else{
                                mediaKey.allChecked = false;
                            }
                        }
                    }
                }else{
                    mediaKey.allChecked = false;
                }
            }else{
                mediaKey.allChecked = false;
            }
        }

        this.setState({
            checkedList:checkedList,
            mediaList:this.state.mediaList,
            defaultCheckedList:defaultCheckedList
        });
    }
    
    /**
     * 删除
     */
    delete = ()=>{
        let checkedList = this.state.checkedList;
        if(checkedList.length>0){
            batchFileDelete(checkedList,()=>{
                let defaultList = this.state.defaultList;
                //更新数据，将被删除的数据移除
                let newList = defaultList.filter(item=>checkedList.indexOf(item.url)<0);
                this.setState({
                    defaultList:newList
                },()=>{
                    this.onEdit(false);
                });
            });
        }
    }
    
    /**
     * 保存到相册
     */
    save = ()=>{
        if(this.state.checkedList.length>0){
            batchSaveToAlbum(this.state.checkedList,this.props.videoType,()=>{
                this.onEdit(false);
            });
        }
    }

    /**
     * 选择和取消
     * @param {Object} item 每个图片数据
     * @param {Array} listUrl 被选中的url数组
     * @param {Boolean} allChecked 是否全选
     */
    check = (item,listUrl,list,allChecked)=>{
        item.checked = allChecked ? true:!item.checked;
        if(item.checked){
            listUrl.push(item.url);
            list.push(item);
        }else{
            listUrl.splice(listUrl.findIndex(v => v === item.url),1);
            list.splice(list.findIndex(v => v.url === item.url),1);
        }

        let newList = this.filter(list);
        return {listUrl:[...new Set(listUrl)],list:newList};
    }

    /**
     * 过滤
     */
    filter =(list)=>{
        let hash={};
        let newList=[];
        newList=list.reduce((item,next)=>{
            hash[next.url]?'':hash[next.url]=true&&item.push(next);
            return item;
        },[]);
        return newList;
    }

    /**
     * 反选全选
     */
    allChecked =(section)=>{
        section.allChecked = !section.allChecked;
        let list = section.data[0].mediaItem;
        let checkedList = this.state.checkedList;
        let defaultCheckedList = this.state.defaultCheckedList;
        list.forEach(item => {
            let data =  this.check(item,checkedList,defaultCheckedList,section.allChecked);
            checkedList = data.listUrl;
            defaultCheckedList = data.list;
        });
        this.setState({
            checkedList:checkedList,
            defaultCheckedList:defaultCheckedList,
            mediaList:this.state.mediaList
        });
    }

    /**
     * 日期转换
     */
    dateConversion = (day)=>{
        let param = new Date(day.replace(/-/g,'/'));
        let date = new Date();
        var today = new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime();
        var yestday = new Date(today - 24*3600*1000).getTime();
        let week = ['周日','周一','周二','周三','周四','周五','周六'];
        if(today === param.getTime()){
            return '今天';
        }
        if(yestday === param.getTime()){
            return '昨天';
        }
        let sundayTime =  new Date(today - date.getDay()*24*3600*1000).getTime(); 
        if(param.getTime()>=sundayTime){
            return week[param.getDay()];
        }
        return day;
    }


    /**
     * 视频时长转换
     */
    videoTimeConvert = (second)=>{
        let minute = 0;
        let hour = 0;

        if (second >= 60) {
            second = 0;
            minute = minute + 1;
        }

        if (minute >= 60) {
            minute = 0;
            hour = hour + 1;
        }

        let s = second >= 10 ? second : '0' + second;
        let m = minute >= 10 ? minute : '0' + minute;
        let h = hour >= 10 ? hour : '0' + hour;

        return second?h>0?h + ':' + m + ':' + s:m + ':' + s:null;
    }


}

const Styles = StyleSheet.create({
    content:{
        position:'relative',
        flex:1,
        backgroundColor:'#F7F7F7',
    },
    edit:{
        position:'absolute',
        right:10,
        bottom:isIphoneX()?iphoneXHeight(10):10
    },
    bottomToolbars:{
        flex:1,
        flexDirection:'row'
    },
    bottomToolbarsBtn:{
        flex:1
    },
    bottomToolbarsText:{
        fontSize:17,
        height:54,
        lineHeight:54,
        textAlign:'center'
    },
    sectionList:{
        marginBottom:isIphoneX()?iphoneXHeight(54):54
    },
    itemList:{
        marginBottom:10
    }
});