/*
 * @Descripttion: 
 * @version: 
 * @Author: xieruizhi
 * @Date: 2019-11-19 09:33:58
 * @LastEditors: xieruizhi
 * @LastEditTime: 2019-12-04 13:51:49
 */
import React from 'react';
import {View} from 'react-native';
import LocalPhotoList from './LocalPhotoList';
import {queryDeviceVideoPicFile,getLocalList,downloadFile,deleteDeviceVideoPicFile} from '../file';
import {GroupList} from '../../../components/index';

import PropTypes from 'prop-types';

export default class LongPhotoList extends LocalPhotoList {
    static propTypes = {
        ...LocalPhotoList.propTypes,
        onLongPhotoList:PropTypes.func,
    };
    

    static defaultProps = {
        ...LocalPhotoList.defaultProps,
        onLongPhotoListChange:()=>{}
    };

    constructor(props){
        super(props);
        Object.assign(this.state, {
            pageNum:1,
            pageSize:30,
            refresStatus:false,//是否下拉刷新状态,
            pullUpStatus:0,//下拉和上拉后状态
            localPhotoData:null,
            totalNum:0,//总页数
        });
    }

    /**
     * 初始化
     */
    init = () =>{
        this.setState({
            refresStatus:true,
            pageNum:1,
            localPhotoData:null,
            defaultList:[],
            mediaList:[],
            checkedList:[],
            defaultCheckedList:[],
            pullUpStatus:0
        },()=>{
            this.merge();
        });
    }

    /**
     * 获取远程相册照片
     */
    getLongPhotoList = ()=>{
        let data = [];
        queryDeviceVideoPicFile({
            pageNum:this.state.pageNum,
            pageSize:this.state.pageSize,
        }).then((list)=>{
            let longList  = list.result;
            let localPhotoData = this.state.localPhotoData;
            let localList = localPhotoData.fileList.files;
   
            let storage = []; //用来记录已经和本地对比过并且赋值的数据
            //与本地资源做判断
            if(localList.length>0){
                localList.forEach(localItem => {
                    let fileName = localItem.split(localPhotoData.filePath)[1].split('.')[0];
                    longList.forEach((longItem,index) => {
                        //将格式改为和本地数据字段一致
                        longItem.time  = longItem.createTime;
                        longItem.type = longItem.mimeType.split('/')[1];
                        longItem.videoTime  = longItem.audioTime;
    
                        //判断是否视频，设置第一帧
                        if( this.props.videoType.includes(longItem.type)){
                            longItem.videoFirstImage = longItem.thumbnailUrl+'?imageView2/0/w/200/h/200';
                        }
    
                        if(fileName===longItem.fileName){
                            longItem.url = 'file:///'+localItem;
                            longItem.isDown = true; //判断是否下载，true已下载
                            storage.push(index);//记录下已经复制的url
                        }else{
                            if(!storage.includes(index)){
                                longItem.url  = longItem.fileUrl+'?imageView2/0/w/200/h/200';
                                longItem.isDown = false;//未下载
                            }
                        }
                    });
                });
            }else{
                longList.forEach((longItem) => {
                    //将格式改为和本地数据字段一致
                    longItem.time  = longItem.createTime;
                    longItem.type = longItem.mimeType.split('/')[1];
                    longItem.videoTime  = longItem.audioTime;

                    //判断是否视频，设置第一帧
                    if( this.props.videoType.includes(longItem.type)){
                       
                        longItem.videoFirstImage = longItem.thumbnailUrl+'?imageView2/0/w/200/h/200';
                    }

                    longItem.url  = longItem.fileUrl+'?imageView2/0/w/200/h/200';
                    longItem.isDown = false;//未下载
                });
            }

            data = [...longList,...this.state.defaultList];//合并原来的数据和新增加数据
            this.setState({
                refresStatus:false,
                pullUpStatus:4,
                defaultList:data,
                totalNum:list.totalPage,
            },()=>{
                this.props.onLongPhotoListChange(this.state.defaultList);
                this.setData();
            });
        }).catch(()=>{
            //数据请求失败
            this.setState({
                pullUpStatus:3
            })
        });
    }

    /**
     * 本地相册和远程相册合并
     */
    merge = ()=>{
        //获取本地下载的资源
        getLocalList('jmlongPhotoListData',(fileData)=>{
            this.setState({
                localPhotoData:fileData
            },()=>{
                this.getLongPhotoList();
            });
        });        
    }

    render(){
        return <View style={{flex:1}}>
            <GroupList
                refresStatus={this.state.refresStatus}
                keyExtractor={(item, index) => 'longPhotoList'+index.toString()}
                stickySectionHeadersEnabled={true}
                renderSectionHeader={this._renderSectionHeader}
                renderItem={this._renderItem}
                data={this.state.mediaList}
                pullUpStatus={this.state.pullUpStatus}
                onRefresh={this.onRefresh}
                onPullUp={this.onPullUp}
                onFail={this.onFail}

            ></GroupList>
            {
                this._editBtn()
            }
        </View>    
    }

    /**
     * 下拉刷新
     */
    onRefresh = ()=> {
        this.init();
    }

    /**
     * 上拉加载
     */
    onPullUp = (number) => {
        console.log(number);
        
        if(number.distanceFromEnd < -25){
            return;
        }

        //没有更多数据
        console.log(this.state.pageNum);
        console.log(this.state.totalNum);
        console.log(this.state.pageNum > this.state.totalNum,'this.state.pageNum > this.state.totalNum');
        
        if(this.state.pageNum > this.state.totalNum){
            this.setState({
                pullUpStatus:2,
            });
            return;
        }

        //加载数据
        this.setState({
            pullUpStatus:1,
            pageNum:this.state.pageNum+1,
        },()=>{
            this.getLongPhotoList();
        })
    } 

    onFail = ()=>{
        //加载数据
        this.setState({
            pullUpStatus:1
        },()=>{
            this.getLongPhotoList();
        })        
    }

    /**
     * 保存到相册
     */
    save = ()=>{
        let defaultCheckedList = this.state.defaultCheckedList;
        let  defaultList = this.state.defaultList;
        downloadFile(defaultCheckedList,this.state.localPhotoData.filePath,this.props.videoType,()=>{
            //更新数据
            defaultCheckedList.forEach((list)=>{
               defaultList.forEach((item)=>{
                    if(list.fileName===item.fileName){
                        item.url = list.url
                    }
               })
            })
            this.setState({
                defaultList:defaultList
            },()=>{
                this.onEdit(false);
            })
        });
    }

    /**
     * 删除
     */
    delete = () =>{
        let defaultCheckedList = this.state.defaultCheckedList;
        let defaultList = this.state.defaultList;
        let localFileIds = [];
        let longFileIds = [];
        defaultCheckedList.forEach((item)=>{
            if(item.isDown){
                localFileIds.push(item.url);
            }
            longFileIds.push(item.fileId);
        });
        deleteDeviceVideoPicFile({
            longFileIds:longFileIds,
            localFileIds:localFileIds,
            callBack:()=>{
                defaultCheckedList.forEach((list)=>{
                    defaultList.forEach((item,index)=>{
                         if(list.fileName===item.fileName){
                            defaultList.splice(index,1);
                         }
                    })
                 })
                 this.setState({
                     defaultList:defaultList
                 },()=>{
                     this.onEdit(false);
                 })
            }
        });
    }

    /**
     * 数据更新
     */
    upDate = (defaultList)=>{
        this.setState({
            defaultList:defaultList
        },()=>{
            this.props.onLongPhotoListChange(defaultList);
            this.setData();
        })
    }
};