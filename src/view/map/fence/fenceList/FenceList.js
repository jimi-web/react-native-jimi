/*
 * @Descripttion: 
 * @version: 
 * @Author: xieruizhi
 * @Date: 2019-09-25 11:12:20
 * @LastEditors: xieruizhi
 * @LastEditTime: 2020-06-28 14:19:58
 */
import React, {Component} from 'react';
import {View,Image,ScrollView,Text,TouchableOpacity,DeviceEventEmitter} from 'react-native';
import PropTypes from 'prop-types';
import {jmAjax} from '../../../../http/business';
import api from '../../../../api/index';
import Empty from '../../../empty/Empty';
import FenceListItem from './FenceListItem';
import BottomToolbars from '../../../components/BottomToolbars';
import FenceStyles from '../../style/fenceList';
import {Modal,Toast,Icon} from '../../../../components/index';

export default class FenceList extends Component { 
    static propTypes = {
        onAddEditFence:PropTypes.func,
        fenceStateImg:PropTypes.object,
        getData:PropTypes.func
    }

    static defaultProps = {
        fenceStateImg:{
            in:'fence_list_enter',
            out:'fence_list_out',
            all:'fence_list_turnover',
            none:'fence_list_off'
        }
    };

    constructor(props) {
        super(props);
        this.state = {
            fenceList:[],
            isSelect:false,//是否点击了选择
            delList:[],
            isAllSelect:false,//是否全选
            allSelectText:'全选'
        };
    }
    
    componentDidMount(){
        this.loading = Toast.loading(I18n.t('加载中')+'...');
        this.getFenceList();
    }

    componentWillMount() {
        //添加围栏或者编辑围栏更新数据时候返回刷新
        DeviceEventEmitter.addListener('jmFenceList', ()=>{
            this.getFenceList();
        });
    }

    componentWillUnmount() {
        Toast.remove(this.loading);
        DeviceEventEmitter.removeAllListeners('jmFenceList');
    }

    render() {
        return <View style={{flex:1,backgroundColor:'#F7F7F7'}}>
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
                                    onFenceListItem = {()=>{this.onFenceListItem(index,item);}}
                                ></FenceListItem>; 
                            })
                        }
                        <View style={FenceStyles.space}></View>
                    </ScrollView>: <Empty text={I18n.t('暂无内容')} />
                   
          
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
                                <TouchableOpacity onPress={()=>this.onSelect(true)}  style={{alignItems:'center'}}>
                                    <Icon name={'operating_select_disable'} size={20} />
                                    <Text style={{fontSize:10,marginTop:2,color:'#979797'}}>{I18n.t('选择')}</Text>
                                </TouchableOpacity>
                                :
                                <TouchableOpacity activeOpacity={1}>
                                    <Icon name={'operating_select_disable'} size={20} color={'#E9E9E9'} />
                                    <Text style={{fontSize:10,marginTop:2,color:'#E9E9E9'}}>{I18n.t('选择')}</Text>
                                </TouchableOpacity> }
                        <TouchableOpacity style={FenceStyles.add} activeOpacity={0.5} 
                            onPress={()=>{this.props.onAddEditFence && this.props.onAddEditFence();}}>
                            <Icon name={'fence_operating_add'} size={15} color={'#fff'} />
                            <Text style={FenceStyles.addText}>{I18n.t('添加围栏')}</Text>
                        </TouchableOpacity>
                    </View>:
                    <View style={[FenceStyles.btnItem,{paddingTop:15}]}>
                        <TouchableOpacity style={{paddingLeft:15,paddingRight:15}} onPress={this.deselect}>
                            <Text style={[FenceStyles.btnItemText,{color:'#000'}]}>{I18n.t('取消')}</Text>
                        </TouchableOpacity>
                        <Text style={FenceStyles.btnItemLine}>|</Text>
                        <TouchableOpacity style={{paddingLeft:15,paddingRight:15}} onPress={this.onCheckAll}>
                            <Text  style={[FenceStyles.btnItemText,FenceStyles.allSelectText]}>{I18n.t(this.state.allSelectText)}</Text>
                        </TouchableOpacity>
                        <Text style={FenceStyles.btnItemLine}>|</Text>
                        {
                            this.state.delList.length>0 ? 
                                <TouchableOpacity onPress={this.deltip}>
                                    <Text  style={[FenceStyles.btnItemText,{color:'#FF3535'}]}>
                                        {I18n.t('删除')+'('+this.state.delList.length+')'}
                                    </Text>
                                </TouchableOpacity>:
                                <Text style={[FenceStyles.btnItemText,{color:'#d1d1d1'}]}>{I18n.t('删除')}</Text>
                        }
                    </View>
            }
        </View>;
    }

    


    /**
     * 获取数据
     */
    getFenceList = ()=>{
        if(this.props.getData){
            this.props.getData((data)=>{
                this.assignment(data);
            });
        }else{
            jmAjax({
                url:api.fenceList,
                method:'GET',
                encoding:true,
                encodingType:true
            }).then((res)=>{
                this.assignment(res);
            });  
        }
    }

    /**
     * 拿到数据后赋值
     */
    assignment = (res)=>{
        let result = res.data;
        result.forEach((item,index)=>{
            item.checked = false;
        });
        this.setState({
            fenceList:result
        },()=>{
            Toast.remove(this.loading);
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
    onFenceListItem = (index,item)=>{
        //选择
        if(this.state.isSelect){
            let list = this.state.fenceList;
            list[index].checked = !list[index].checked;
            let delList = list.filter(item => item.checked ==true);
            this.setState({
                fenceList:list,
                delList:delList,
                allSelectText:delList.length === list.length ? '全不选' : '全选',
                isAllSelect:delList.length === list.length ? true : false,
            });
        }else {
            //编辑
            this.props.onAddEditFence && this.props.onAddEditFence(item);
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
            delList:[],
            isAllSelect:false,
            allSelectText:'全选'
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
        this.setState({
            isAllSelect:!this.state.isAllSelect
        },()=>{
            if(this.state.isAllSelect){
                let list = this.inverse(true);
                this.setState({
                    delList:JSON.parse(JSON.stringify(list)),
                    fenceList:list,
                    allSelectText:'全不选'
                });
            }else{
                let list = this.inverse(false);
                this.setState({
                    delList:[],
                    fenceList:list,
                    allSelectText:'全选'
                });
            }
        });
    }

    
    del = ()=>{
        this.loading = Toast.loading(I18n.t('删除中'));
        let delId = [];//给后台删除的数据
        let delList = this.state.delList;
        let fenceList = this.state.fenceList;
        //获取数据，删除信息
        delList.forEach((item,index)=>{
            delId.push(item.fenceId);
        });  

        jmAjax({
            url:api.fenceDel,
            method:'DELETE',
            data:{
                fenceIds:delId.join(',')
            },
            header:0
        }).then((res)=>{
            Toast.remove(this.loading);
            //更新数据
            delList.forEach((item,index)=>{
                fenceList.splice(fenceList.findIndex(v => v.fenceId === item.fenceId),1);
            });
            this.setState({
                fenceList:fenceList,
                delList:[],
                isSelect:false,
                allSelectText:'全选'
            });
        }).catch(()=>{
            Toast.remove(this.loading);
        }); 
    }

    /**
     * 删除提示
     */
    deltip = ()=>{
        Modal.dialog({
            contentText:I18n.t('确认删除围栏吗?'),
            onConfirm:()=>{
                this.del();
            }
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
            break;
        case '':
            img = this.props.fenceStateImg.none;
            
        }
        return img;
    } 
}

