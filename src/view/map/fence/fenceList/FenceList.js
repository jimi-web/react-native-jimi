/*
 * @Descripttion: 
 * @version: 
 * @Author: xieruizhi
 * @Date: 2019-09-25 11:12:20
 * @LastEditors: xieruizhi
 * @LastEditTime: 2019-10-14 10:00:05
 */
import React, {Component} from 'react';
import {View,Image,ScrollView,Text,TouchableOpacity,DeviceEventEmitter} from 'react-native';
import { withNavigation } from 'react-navigation';
import PropTypes from 'prop-types';
import {jmAjax} from '../../../../http/business';
import api from '../../../../api/index';
import FenceListItem from './FenceListItem';
import BottomToolbars from '../../../components/BottomToolbars';
import FenceStyles from '../../style/fenceList';

class FenceList extends Component { 
    static propTypes = {
        routeName:PropTypes.string,
        fenceStateImg:PropTypes.object
    }

    static defaultProps = {
        routeName:'',
        fenceStateImg:{
            in:require('../../../../assets/fence/fence_list_enter.png'),
            out:require('../../../../assets/fence/fence_list_out.png'),
            all:require('../../../../assets/fence/fence_list_turnover.png')
        }
    };

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

    componentWillMount() {
        //添加围栏或者编辑围栏更新数据时候返回刷新
        DeviceEventEmitter.addListener('jmFenceList', ()=>{
            this.getFenceList();
        });
    }

    componentWillUnmount() {
        DeviceEventEmitter.removeAllListeners('jmFenceList');
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
                                    source={this.getFenceState(item.fenceState)}
                                    fenceTitle={item.fenceTitle}
                                    radius={item.radius}
                                    fenceAddress={item.fenceAddress}
                                    isSelect = {this.state.isSelect}
                                    onChangeCheckbox = {()=>this.onFenceListItem(index)}
                                    onFenceListItem = {()=>{this.onFenceListItem(index,item.fenceId);}}
                                ></FenceListItem>; 
                            })
                        }
                        <View style={FenceStyles.space}></View>
                    </ScrollView>:
                    <View style={FenceStyles.empty}>
                        <Image source={require('../../../../assets/fence/list_empty.png')} />
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
                                    <Image source={require('../../../../assets/fence/operating_select.png')}/>
                                    <Text style={{fontSize:10,marginTop:2,color:'#979797'}}>选择</Text>
                                </TouchableOpacity>
                                :
                                <TouchableOpacity activeOpacity={1}>
                                    <Image source={require('../../../../assets/fence/operating_select_disable.png')}/>
                                    <Text style={{fontSize:10,marginTop:2,color:'#E9E9E9'}}>选择</Text>
                                </TouchableOpacity> }
                        <TouchableOpacity style={FenceStyles.add} activeOpacity={0.5} onPress={()=>{this.props.navigation.push(this.props.routeName);}}>
                            <Image source={require('../../../../assets/fence/fence_operating_add.png')}/>
                            <Text style={FenceStyles.addText}>添加围栏</Text>
                        </TouchableOpacity>
                    </View>:
                    <View style={[FenceStyles.btnItem,{paddingTop:15}]}>
                        <TouchableOpacity onPress={this.deselect}>
                            <Text style={[FenceStyles.btnItemText,{color:'#000'}]}>取消</Text>
                        </TouchableOpacity>
                        <Text style={FenceStyles.btnItemLine}>|</Text>
                        <TouchableOpacity onPress={this.onCheckAll}>
                            <Text  style={[FenceStyles.btnItemText,FenceStyles.allSelectText]}>全选</Text>
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
            url:api.fenceList,
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
     * @param {String} fenceId  围栏
     */
    onFenceListItem = (index,fenceId)=>{
        //选择
        if(this.state.isSelect){
            let list = this.state.fenceList;
            list[index].checked = !list[index].checked;
            this.setState({
                fenceList:list,
                delList:list.filter(item => item.checked ==true)
            });
        }else {
            //编辑
            this.props.navigation.push(this.props.routeName,{fenceId:fenceId});
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
            url:api.fenceDel,
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


    /**
     * 围栏状态
     * @param {String} state  报警状态
     */
    getFenceState = (state)=> {
        let img = '';
        switch (state) {
        case 'in':
            img = this.props.fenceStateImg.in;
            break;
        case 'out':
            img = this.props.fenceStateImg.out;
            break;
        case 'all':
            img = this.props.fenceStateImg.all;
        }
        return img;
    } 
}

export default withNavigation(FenceList);