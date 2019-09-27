/*
 * @Descripttion: 
 * @version: 
 * @Author: xieruizhi
 * @Date: 2019-09-25 11:12:20
 * @LastEditors: xieruizhi
 * @LastEditTime: 2019-09-26 18:13:56
 */
import React, {Component} from 'react';
import {View,Image,ScrollView,Text,TouchableOpacity} from 'react-native';
import {jmAjax} from '../../../http/business';
import {map} from '../../../api/index';
import BottomToolbars from '../../components/BottomToolbars';
import {Checkbox} from 'teaset';
import FenceStyles from '../style/fenceList';

export default class FenceList extends Component { 

    constructor(props) {
        super(props);
        this.state = {
            fenceList:[]
        };
    }
    
    componentDidMount(){
        this.getFenceList();
    }

    render() {
        // return <Checkbox 
        //     checkedIcon={<Image style={{width: 24, height: 24}} source={require('../../../assets/record/checkbox_pre.png')} />}
        //     uncheckedIcon={<Image style={{width: 24, height: 24}} source={require('../../../assets/record/checkbox_nor.png')} />}
        // />;

        return <View style={{flex:1,position:'relative',backgroundColor:'#F7F7F7'}}>
            {
                this.state.fenceList.length>0 ?
                    <ScrollView>
                        {
                            this.state.fenceList.map((item,index)=>{
                                return <TouchableOpacity style={FenceStyles.line} activeOpacity={0.5} key={'fenceList'+index}>
                                    <View>
                                        <Image style={FenceStyles.icon} source={this.getFenceState(item.fenceState)}>  
                                        </Image>
                                    </View>
                                    <View style={FenceStyles.info}>
                                        <View style={FenceStyles.title}>
                                            <Text style={FenceStyles.name}>{item.fenceTitle}</Text>
                                            <Text style={FenceStyles.text}>半径:{item.radius}m</Text>
                                        </View>
                                        <View > 
                                            <Text style={[FenceStyles.text,FenceStyles.address]}>{item.fenaddress}</Text>
                                        </View>
                                    </View>
                                </TouchableOpacity >;
                            })
                        }
                        <View style={FenceStyles.space}></View>
                    </ScrollView>:
                    <View style={FenceStyles.empty} >
                        <Image source={require('../../../assets/fence/list_empty.png')} />
                        <Text style={FenceStyles.emptyText}>暂无内容</Text>
                    </View>
            }
            <BottomToolbars 
                element = {this.bottomTool}
            ></BottomToolbars>
        </View>;
    } 

    bottomTool = ()=>{
        return <View style={FenceStyles.btn}>
            {
                this.state.fenceList.length>0 ?
                    <TouchableOpacity>
                        <Image source={require('../../../assets/fence/operating_select.png')}/>
                        <Text style={{fontSize:10,marginTop:2,color:'#979797'}}>选择</Text>
                    </TouchableOpacity>
                    :
                    <TouchableOpacity activeOpacity={1}>
                        <Image source={require('../../../assets/fence/operating_select_disable.png')}/>
                        <Text style={{fontSize:10,marginTop:2,color:'#E9E9E9'}}>选择</Text>
                    </TouchableOpacity> }
            <TouchableOpacity style={FenceStyles.add} activeOpacity={0.5} >
                <Image source={require('../../../assets/fence/fence_operating_add.png')}/>
                <Text style={FenceStyles.addText}>添加围栏</Text>
            </TouchableOpacity>
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
            this.setState({
                fenceList:result
            });
        });        
    }

    /**
     * 围栏状态
     */
    getFenceState = (state)=> {
        let img = '';
        switch (state) {
        case 'in':
            img = require('../../../assets/fence/fence_list_enter.png');
            break;
        case 'out':
            img = require('../../../assets/fence/fence_list_out.png');
            break;
        case 'all':
            img = require('../../../assets/fence/fence_list_turnover.png');
        }
        return img;
    }
}