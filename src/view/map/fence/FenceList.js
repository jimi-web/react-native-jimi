/*
 * @Descripttion: 
 * @version: 
 * @Author: xieruizhi
 * @Date: 2019-09-25 11:12:20
 * @LastEditors: xieruizhi
 * @LastEditTime: 2019-09-29 14:30:06
 */
import React, {Component} from 'react';
import {View,Image,ScrollView,Text,TouchableOpacity} from 'react-native';
import { withNavigation } from 'react-navigation';
import {jmAjax} from '../../../http/business';
import {map} from '../../../api/index';
import FenceListItem from '../../map/fence/FenceListItem';
import BottomToolbars from '../../components/BottomToolbars';
import FenceStyles from '../style/fenceList';

class FenceList extends Component { 

    constructor(props) {
        super(props);
        this.state = {
            fenceList:[],
            isSelect:false,//是否点击了选择
            delList:[],
        };
    }
    
    componentDidMount(){
        this.getFenceList();
    }

    render() {
        return <View style={{flex:1,position:'relative',backgroundColor:'#F7F7F7'}}>
            {
                this.state.fenceList.length>0 ?
                    <ScrollView>
                        {
                            this.state.fenceList.map((item,index)=>{
                                return <FenceListItem
                                    key={'fenceList'+index} 
                                    checked={item.checked}
                                    fenceState={item.fenceState}
                                    fenceTitle={item.fenceTitle}
                                    radius={item.radius}
                                    fenaddress={item.fenaddress}
                                    isSelect = {this.state.isSelect}
                                    onFenceListItem = {()=>{this.onFenceListItem(index);}}
                                ></FenceListItem>; 
                            })
                        }
                        <View style={FenceStyles.space}></View>
                    </ScrollView>:
                    <View style={FenceStyles.empty}>
                        <Image source={require('../../../assets/fence/list_empty.png')} />
                        <Text style={FenceStyles.emptyText}>暂无内容</Text>
                    </View>
            }
            <BottomToolbars>
                {this.bottomTool()}
            </BottomToolbars>
        </View>;
    } 

    /**
     * 底部工具栏
     */
    bottomTool = ()=>{
        return <View style={FenceStyles.btn}>
            {
                ! this.state.isSelect ? 
                    <View style={[FenceStyles.btnItem,{paddingTop:8}]}>
                        {
                            this.state.fenceList.length>0 ?
                                <TouchableOpacity onPress={()=>this.onSelect(true)}>
                                    <Image source={require('../../../assets/fence/operating_select.png')}/>
                                    <Text style={{fontSize:10,marginTop:2,color:'#979797'}}>选择</Text>
                                </TouchableOpacity>
                                :
                                <TouchableOpacity activeOpacity={1}>
                                    <Image source={require('../../../assets/fence/operating_select_disable.png')}/>
                                    <Text style={{fontSize:10,marginTop:2,color:'#E9E9E9'}}>选择</Text>
                                </TouchableOpacity> }
                        <TouchableOpacity style={FenceStyles.add} activeOpacity={0.5} onPress={()=>{this.props.navigation.push('AddFence');}}>
                            <Image source={require('../../../assets/fence/fence_operating_add.png')}/>
                            <Text style={FenceStyles.addText}>添加围栏</Text>
                        </TouchableOpacity>
                    </View>:
                    <View style={[FenceStyles.btnItem,{paddingTop:15}]}>
                        <TouchableOpacity onPress={this.deselect}>
                            <Text style={[FenceStyles.btnItemText,{color:'#000'}]}>取消</Text>
                        </TouchableOpacity>
                        <Text style={FenceStyles.btnItemLine}>|</Text>
                        <TouchableOpacity onPress={this.onCheckAll}>
                            <Text  style={[FenceStyles.btnItemText,{color:'#3479F6'}]}>全选</Text>
                        </TouchableOpacity>
                        <Text style={FenceStyles.btnItemLine}>|</Text>
                        {
                            this.state.delList.length>0 ? 
                                <TouchableOpacity onPress={this.del}>
                                    <Text  style={[FenceStyles.btnItemText,{color:'#FF3535'}]}>
                                        {'删除('+this.state.delList.length+')'}
                                    </Text>
                                </TouchableOpacity>:
                                <Text style={[FenceStyles.btnItemText,{color:'#d1d1d1'}]}>删除</Text>
                        }
                    </View>
            }
        </View>;
    }


    /**
     * 获取数据
     */
    getFenceList = ()=>{
        jmAjax({
            url:map.fenceList,
            method:'GET',
            encoding:true,
            encodingType:true
        }).then((res)=>{
            let result = res.data;
            result.forEach((item,index)=>{
                item.checked = false;
            });
            this.setState({
                fenceList:result
            });
        });        
    }



    /**
     * 选择点击事件
     * @param {Boolean} state  是否点击选择
     */
    onSelect = (state)=> {
        this.setState({
            isSelect:state
        });
    }

    /**
     * 点击围栏列表事件
     * @param {Number} index  位置
     */
    onFenceListItem = (index)=>{
        if(this.state.isSelect){
            let list = this.state.fenceList;
            list[index].checked = !list[index].checked;
            this.setState({
                fenceList:list,
                delList:list.filter(item => item.checked ==true)
            });
        }else {
            
        }
    }


    /**
     * 取消选择
     */
    deselect = ()=>{
        this.onSelect(false);
        //还原选的值
        let list = this.inverse(false);
        this.setState({
            fenceList:list,
            delList:[]
        });
    }

    /**
     * 反选
     * @param {Boolean} state  复选框状态
     */
    inverse = (state)=>{
        let list = this.state.fenceList;
        list.forEach((item)=>{
            item.checked = state;
        });
        return list;
    }

    /**
     * 全选
     */
    onCheckAll = ()=>{
        let list = this.inverse(true);
        this.setState({
            delList:JSON.parse(JSON.stringify(list)),
            fenceList:list
        });
    }

    del = ()=>{
        let delId = [];//给后台删除的数据
        let delList = this.state.delList;
        let fenceList = this.state.fenceList;
        //获取数据，删除信息
        delList.forEach((item,index)=>{
            delId.push(item.fenceId);
            fenceList.splice(fenceList.findIndex(v => v.fenceId === item.fenceId),1);
        });
        jmAjax({
            url:map.fenceDel,
            method:'GET',
            data:{
                fenceId:delId.join(',')
            }
        }).then((res)=>{
            //更新数据
            this.setState({
                fenceList:fenceList,
                delList:[]
            });
        }); 
    }
}

export default withNavigation(FenceList);