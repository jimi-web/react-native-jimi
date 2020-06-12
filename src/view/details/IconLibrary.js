import React, {Component} from 'react';
import {View,StyleSheet,Dimensions,TouchableOpacity} from 'react-native';
import {Button,Theme,Toast} from '../../components/index';
const { width } = Dimensions.get('window');
import PropTypes from 'prop-types';
import {jmAjax} from '../../http/business';
import Api from '../../api/index';
import {Icon} from '../../components/index';
import {iconList} from './iconList';

export default class IconTable extends Component { 

    static propTypes = {
        iconDefault:PropTypes.object,
        iconActive:PropTypes.object,
        activateKey:PropTypes.string,
        onSaveCallBack:PropTypes.func
    }

    static defaultProps = {
        iconDefault:{
            color:'#888',
            bgColor:'#F7F7F7'
        },
        iconActive:{
            color:'#fff',
            bgColor:Theme.iconActiveBgColor
        },     
        activateKey:'car',
        onSaveCallBack:()=>{}  
    }    

    constructor(props) {
        super(props);
        this.state = {
            iconArray:iconList,
            activateKey:this.props.activateKey
        };
    }

    render() {
        let iconDefault = this.props.iconDefault;
        let iconActive = this.props.iconActive;
        return <View style={Styles.container}>
            <View style={Styles.iconList}>
                {
                    this.state.iconArray.map((item,index)=>{
                        return  <TouchableOpacity    
                            activeOpacity={0.6} 
                            style={[Styles.iconLi,{backgroundColor:item.isActivate?iconActive.bgColor:iconDefault.bgColor}]} 
                            onPress={()=>this.selectIcon(index)} 
                            key={'iconTable'+index} 
                        >
                             <Icon name={item.name} size={40}  color={item.isActivate?iconActive.color:iconDefault.color} />
                        </TouchableOpacity>
                    })
                }
            </View>
            <Button title={I18n.t('保存')} type={'primary'} style={Styles.btn} onPress={this.onSave} ></Button>
        </View>
    }

    componentWillMount(){
        this.init();
    }

    /**
     * 初始化赋值
     */
    init = ()=> {
        let { activateKey,iconArray } = this.state;
        let iconList =JSON.parse(JSON.stringify(iconArray));
        iconList.forEach((item)=>{
            if(item.key === activateKey){
                item.isActivate = true;
            }
        });

        this.setState({
            iconArray:iconList
        });
    }

    /**
     * 选择图标
     */
    selectIcon = (_index)=> {
        let { iconArray } = this.state;
        let key = null;
        iconArray.forEach((item, index) => {
            if (_index == index) {
                item.isActivate = true; 
                key = item.key;
            } else {
                item.isActivate = false;
            }
        });

        this.setState({
            iconArray,
            activateKey:key
        });
    }

    /**
     * 保存图标
     */
    onSave =()=> {
        let loading = Toast.loading(I18n.t('修改中')+'...');
        jmAjax({
            url:Api.updateDeviceInfo,
            method:'POST',
            encoding:true,
            encodingType:true,
            data:{
                deviceIcon:this.state.activateKey
            }
        }).then((res)=>{
            Toast.remove(loading);
            Toast.message(I18n.t('修改成功'),'short','center')
            this.props.onSaveCallBack(this.state.activateKey);
        }).catch(()=>{
            Toast.remove(loading);
        });
    }
}

const Styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#F7F7F7',
        alignItems:'center'
    },
    iconList:{
        backgroundColor:'#fff',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
        marginTop: 15,
        width,
        minHeight: 80,
        paddingTop: 20,
    },
    iconLi:{
        alignItems:'center',
        justifyContent:'center',
        marginLeft: (width - 200) / 6,
        marginBottom: 20,
        width: 40,
        height: 40,
        borderRadius:40
    },
    btn:{
        marginTop:95,
        borderRadius:23,
        width:255
    }
});