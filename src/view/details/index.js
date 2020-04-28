import React, {Component} from 'react';
import {View,Image,Text,StyleSheet,Clipboard} from 'react-native';
import {ListRow} from 'teaset';
import {jmAjax} from '../../http/business';
import api from '../../api/index';
import { Icon,InputBox,Toast} from '../../components/index'
import {iconList} from './iconList';
import PropTypes from 'prop-types';


export default class Details extends Component {

    static propTypes = {
        data:PropTypes.object.isRequired,
        onSetUpIcon:PropTypes.func,//监听设置图标点击事件
        detailMarginRight:PropTypes.number,//无图标的文字间距
        onDeviceNameChange:PropTypes.func
    }

    static defaultProps = {
        onSetUpIcon:()=>{},
        detailMarginRight:24
    }

    componentWillReceiveProps(nextProps){
        //数据发生变化则更新
        this.init(nextProps);
    }

    componentWillMount() {
        this.init(this.props);
    }

    init = (nextProps)=> {
        let nextPropsData = nextProps.data;
        let setUpList = this.state.setUpList;
        Object.keys(nextPropsData).forEach((key)=>{
            setUpList.forEach((data)=>{
                //图标更新
                if(data.type === 'deviceIcon' && key=== 'deviceIcon' && nextPropsData[key] ){
                    let name = iconList.filter((item)=>item.key===nextPropsData[key])[0].name;
                    data.value = <Icon name={name} size={30} />
                }
                
                if(key === data.type && key!='deviceIcon'){
                    data.value = nextPropsData[key];
                }
            })
        })
        this.setState({
            setUpList
        });
    }


    constructor(props){
        super(props);
        this.state = {
            setUpList:[{
                icon:require('../../assets/detail/details_list_equipment_name.png'),
                name:'设备名称',
                accessory:<Icon name={'subordinate_arrow'} size={14}  style={Styles.accessory} />,
                value:this.props.data.deviceName,
                onPress:()=>{
                    InputBox.show(this.state.setUpList[0].value);
                },
                type:'deviceName'
            },{
                icon:require('../../assets/detail/details_list_equipment_icon.png'),
                name:'设备图标',
                accessory:<Icon name={'subordinate_arrow'} size={14}  style={Styles.accessory} />,
                value:'',
                onPress:()=>{
                    this.props.onSetUpIcon();
                },
                type:'deviceIcon'
            },{
                icon:require('../../assets/detail/details_list_equipment_type.png'),
                name:'设备类型',
                accessory:null,
                value:this.props.data.typeNum,
                type:'typeNum'
            },{
                icon:require('../../assets/detail/details_list_imei.png'),
                name:'IMEI',
                accessory:<Icon name={'list_copy'} size={14} style={Styles.accessory} />,
                value:this.props.data.encoding,
                onPress:()=>{
                    Clipboard.setString(this.state.setUpList[3].value);
                    Toast.message('IMEI复制成功','short','center');
                },
                type:'encoding'
            },{
                icon:require('../../assets/detail/details_list_sim.png'),
                name:'SIM卡号',
                accessory:<Icon name={'list_copy'} size={14} style={Styles.accessory} />,
                value:this.props.data.simNo,
                onPress:()=>{
                    Clipboard.setString(this.state.setUpList[4].value);
                    Toast.message('SIM卡号复制成功','short','center');
                },
                type:'simNo'
            },{
                icon:require('../../assets/detail/details_list_iccid.png'),
                name:'ICCID',
                accessory:<Icon name={'list_copy'} size={14} style={Styles.accessory} />,
                value:this.props.data.iccid,
                onPress:()=>{
                    Clipboard.setString(this.state.setUpList[5].value);
                    Toast.message('SIM卡号复制成功','short','center');
                },
                type:'iccid'
            }]
        }
    }


    render(){
        return <View style={{flex:1,backgroundColor:'#F7F7F7'}}>
            {
                this.state.setUpList.map((item,index)=>{
                  let border = (index+1) % 3 == 0 ? 'none':'indent';
                  let css = item.accessory?{paddingRight:20,marginTop: index % 3 == 0?15:0} : { paddingRight:20+this.props.detailMarginRight,marginTop: index % 3 == 0?15:0};
                  return  <ListRow  
                    key={'detail'+index} 
                    style={css}
                    activeOpacity={item.accessory=='onPress'?0.2:1}
                    icon={<Image source={item.icon} style={Styles.iconStyle} />} 
                    title={<Text style={{marginLeft:8}}>{item.name}</Text>} 
                    accessory={item.accessory ? item.accessory :'none'} 
                    onPress={item.onPress?()=>item.onPress(item.value):()=>{}}
                    bottomSeparator={border}
                    detail={item.value}
                  />
                })
            }{
                this.inputBoxElement()
            }{
                this.props.children
            }
            </View>
    }

    /**
     * 编辑围栏名称输入框
     */
    inputBoxElement = ()=>{
        return <InputBox 
            title={'请输入设备名称'}
            maxLength={15}
            onConfirm={(value)=>{
                this.updateDeviceName(value);
            }}
        ></InputBox>;
    }


    /**
     * 修改名称
     */
    updateDeviceName = (deviceName)=>{
        jmAjax({
            url:api.updateDeviceName,
            method:'POST',
            data:{
                deviceName:deviceName,
            },
            encoding:true,
            encodingType:true
        }).then((res)=>{
            let setUpList = this.state.setUpList;
            setUpList[0].value = deviceName;
                this.setState({
                    setUpList:setUpList
                },()=>{
                    this.props.onDeviceNameChange(deviceName);
                    Toast.message('修改成功','short','center')
                });
        });
    }


}

const Styles = StyleSheet.create({
    iconStyle:{
        width:26,
        height:26
    },
    accessory:{
        marginLeft:10
    }
});