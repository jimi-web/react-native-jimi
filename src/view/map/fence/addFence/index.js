/*
 * @Descripttion: 
 * @version: 
 * @Author: xieruizhi
 * @Date: 2019-09-29 14:02:31
 * @LastEditors: xieruizhi
 * @LastEditTime: 2019-10-22 16:16:49
 */
import React, {Component} from 'react';
import {View,TouchableOpacity,Image,Text,ScrollView,DeviceEventEmitter,Keyboard} from 'react-native';
import {MapSearch} from 'react-native-baidu-map-jm';
import PropTypes from 'prop-types';
import Styles from '../../style/base';
import api from '../../../../api/index';
import {jmAjax} from '../../../../http/business';
import Slider from '../../../../components/slider/index';
import AddFenceStyles from '../../style/addfence';
import {SearchInput,Toast} from 'teaset';
import {devicePosition,geocoder,distance} from '../../comm';
import {InputBox,Loading} from '../../../../components/index';
import gps from '../../../../libs/coversionPoint';


export default class AddFenceUtils extends Component { 
    static propTypes = {
        onSave:PropTypes.func,
        strokeStyle:PropTypes.object,
        fillColor:PropTypes.string,
        deviceMarkerOptions:PropTypes.object,//终点marker
        onDeviceChange:PropTypes.func,//设备位置改变监听事件
        getData:PropTypes.func
    };
    
    static defaultProps = {
        fenceId:'',
        onSave:()=>{},
        strokeStyle:AddFenceStyles.strokeStyle,
        fillColor:'#3479f61a',
        deviceMarkerOptions:{
            style:Styles.deviceMarker,
            image:require('../../../../assets/map/device.png'),
        },
    };


    constructor(props) {
        super(props);
        this.state={
            userMapType:0,//0为百度，1为谷歌
            isDelShow:false,//input是否显示删除按钮
            searchValue:'',
            isFocus:false,//是否在焦点上
            initialRegion:{
                latitude: 22.596904,
                longitude: 113.936674,
                latitudeDelta:0.010810810810810811,//145.5468733622675 0.00040644735832984225 最大值和最小值
                longitudeDelta:0.007207207207207207  //106.60983654376228 0.0005647605017351509 最大值和最小值
            },
            fenceState:'all',//围栏状态
            zoomingBtnHeight:85,
            deviceInfo:null,//设备信息
            fencePoint:{    //围栏坐标
                latitude:0,
                longitude:0,
                latitudeDelta:0.010810810810810811,//145.5468733622675 0.00040644735832984225 最大值和最小值
                longitudeDelta:0.007207207207207207  //106.60983654376228 0.0005647605017351509 最大值和最小值
            },
            radius:200, //半径
            fenceTitle:new Date().Format('YYYYMMDDhhmmss'),//
            fenceAddress:'',//围栏地址
            addressList:[],
            savefenceState:[],
            zoom:18,
        };
    }

    componentWillUnmount() {
        Loading.hide();
    }
    
    /**
     * 搜索元素
     */
    searchElement = ()=>{
        return  <View style={[AddFenceStyles.search,this.state.isDelShow?{borderTopRightRadius:0,borderBottomRightRadius:0}:{}]}>
            <SearchInput 
                style={AddFenceStyles.searchInput}
                placeholder='请输入搜索地址' 
                placeholderTextColor='#D8D8D8'
                onFocus={()=>{
                    this.onFocus();
                }}
                onBlur={()=>{
                    this.onBlur();
                }}
                value={this.state.searchValue}
                returnKeyType={'done'}
                onChangeText={(value)=>this.onChangeText(value)}
            />
            {
                this.state.isDelShow ? 
                    <TouchableOpacity style={AddFenceStyles.searchDel} activeOpacity={1} onPress={()=>{
                        this.setState({
                            searchValue:'',
                            addressList:[]
                        },()=>{
                            Keyboard.dismiss();
                        });
                    }}>
                        <Image source={require('../../../../assets/fence/list_delete.png')}></Image>
                    </TouchableOpacity>:null
            }
        </View>;
    }


    /**
     * 地址列表
     */
    addressList = ()=> {
        return <View style={AddFenceStyles.addressList}>
            <ScrollView keyboardDismissMode={'on-drag'} keyboardShouldPersistTaps={'always'}>
                {
                    this.state.deviceInfo ?
                        <TouchableOpacity 
                            style={AddFenceStyles.addressListItem} 
                            key={'addressListOne'}
                            onPress={()=>{
                                let deviceInfo = this.state.deviceInfo;
                                this.onSelectAddress({
                                    ...this.state.fencePoint,
                                    longitude:deviceInfo.longitude,
                                    latitude:deviceInfo.latitude
                                },deviceInfo.address);
                            }}
                        >
                            <Text style={[AddFenceStyles.placename,{color:'#3479F6'}]}>{'【设备位置】'}</Text>
                            <Text style={AddFenceStyles.fullAddress}>{this.state.deviceInfo.address}</Text>
                        </TouchableOpacity> :null
                }
                {
                    this.state.addressList.map((item,index)=>{
                        return   <TouchableOpacity 
                            style={AddFenceStyles.addressListItem} 
                            key={'addressList'+index} 
                            onPress={()=>{
                                this.onSelectAddress({
                                    ...this.state.fencePoint,
                                    longitude:item.longitude,
                                    latitude:item.latitude
                                },item.city+item.district+item.key);
                            }}
                        >
                            <Text style={AddFenceStyles.placename}>{item.key}</Text>
                            <Text style={AddFenceStyles.fullAddress}>{item.city+item.district+item.key}</Text>
                        </TouchableOpacity>;
                    })
                }
            </ScrollView>
        </View>;
    }


    /**
     * 空白元素
     */
    spaceElement = ()=>{
        return  <View style={AddFenceStyles.space}></View>;
    }


    /**
     * 信息框元素
     */
    infoBoxElement = ()=>{
        let fenceState = this.state.fenceState;
        let activeStyle = {btnStyle:AddFenceStyles.alarmBtnActive,textStyle:AddFenceStyles.alarmTextActive};
        let defaultStyle = {btnStyle:{},textStyle:{}};
        let inStype = fenceState == 'in' || fenceState == 'all' ? activeStyle  : defaultStyle;
        let outStype = fenceState == 'out' || fenceState == 'all'?  activeStyle : defaultStyle;
        return  <View style={AddFenceStyles.info}>
            <View style={AddFenceStyles.infoItem}>
                <Text style={AddFenceStyles.name}>{this.state.fenceTitle}</Text>
                <TouchableOpacity onPress={()=>{
                    InputBox.show(this.state.fenceTitle);
                }}>
                    <Image source={require('../../../../assets/fence/fence_map_name-edit.png')}></Image>
                </TouchableOpacity>
            </View>
            <Text style={AddFenceStyles.address}>{this.state.fenceAddress}</Text>
            <View style={AddFenceStyles.btn}>
                <View style={AddFenceStyles.leftBtn}>
                    <TouchableOpacity style={[AddFenceStyles.alarmBtn,inStype.btnStyle]} onPress={()=>{this.selectAlarmText('in');}}>
                        <Text style={[AddFenceStyles.alarmText,inStype.textStyle]}>进围栏报警</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[AddFenceStyles.alarmBtn,{marginLeft:15},outStype.btnStyle]} onPress={()=>{this.selectAlarmText('out');}}>
                        <Text style={[AddFenceStyles.alarmText,outStype.textStyle]}>出围栏报警</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={AddFenceStyles.save} onPress={this.onSave}>
                    <Text style={AddFenceStyles.saveText}>保存</Text>
                </TouchableOpacity>
            </View>
        </View>;
    }

    /**
     * 编辑围栏名称输入框
     */
    inputBoxElement = ()=>{
        return <InputBox 
            title={'请输入围栏名称'}
            maxLength={15}
            onConfirm={(value)=>{
                this.setState({
                    fenceTitle:value
                });
            }}
        ></InputBox>;
    }

    /**
     * 滑块元素
     */
    slidersliderElement = ()=> {
        return <View style={AddFenceStyles.zooming}>
            <Slider style={{ flex: 1, justifyContent: 'center' }} 
                vertical 
                max={2500} 
                min={200}
                value={this.state.radius} 
                step={10}
                maxTrackColor={'#00000005'}
                minTrackColor={'#00000033'}
                renderThumb={() => {
                    return (
                        <View
                            style={{
                                width:30,
                                height:30,
                                alignItems:'center',
                            }}>
                            <Image style={{width:30,height:30}}source={require('../../../../assets/fence/fence_map_zoom.png')}></Image>
                        </View>
                    );
                }}
                onChange={this.onsliderChange}
            />
        </View>;
    }

    /**
     * 监听滑块改变事件
     */
    onsliderChange = (value)=>{
        let radius = value;
        let zoom = this.getZoom(radius*2);
        let latZoom  = this.getGoogleZoom(radius*2*3);
        let lngZoom   = this.getGoogleZoom(radius*2*2);
        this.setState({
            zoom:zoom,
            radius:radius,
            fencePoint:{
                ...this.state.fencePoint,
                latitudeDelta:latZoom,
                longitudeDelta:lngZoom
            }
        },()=>{
            if(!this.state.userMapType){
                setTimeout(()=>{
                    this.InfoWindowFunc.update();
                },10);
            }
        });
    }

    /**
     * 计算缩放级别
     */
    getZoom =(line)=> {
        var zoom = ['50', '100', '200', '500', '1000', '2000', '5000', '10000', '20000', '25000', '50000', '100000', '200000', '500000', '1000000', '2000000']; //级别18到3。  
        var distance = line; //获取两点距离 
        for (var i = 0, zoomLen = zoom.length; i < zoomLen; i++) {
            if (zoom[i] - distance > 0) {
                return 18 - i + 3; //之所以会多3，是因为地图范围常常是比例尺距离的10倍以上。所以级别会增加3。  
            }
        }
    }


    getGoogleZoom = (line)=>{
        const pointLength = line;
        return pointLength / (111 * 1000);
    }
    
    
    /**
     * 地图加载结束
     */
    onMapReady = (userMapType)=>{
        this.setState({
            userMapType:userMapType
        });
        
    }

    
    componentDidMount() {
        this.init();
    }

  

    init = ()=>{
        Loading.show();
        if(this.props.fenceId){
            this.getFence();
        }else {
            this.getDevicePosition();        
        }
    }

    /**
     * 获取当前围栏信息（编辑）
     */
    async getFence (){
        if(this.props.getData){
            this.props.getData((res)=>{
                this.editFenceDefaultValue(res);
            });
        }else{
            let deviceInfo = await devicePosition();
            console.log(deviceInfo);
            
            this.editFenceDefaultValue(deviceInfo);
        }
    }

    /**
     * 编辑围栏赋值
     */
    editFenceDefaultValue = (deviceInfo)=>{
        jmAjax({
            url:api.getFence,
            method:'GET',
            data:{
                fenceId:this.props.fenceId ? this.props.fenceId:''
            }
        }).then((res)=>{
            let data = res.data;
            let baidu = gps.GPSToBaidu(data.latitude,data.longitude);
            
            //编辑赋值
            this.setState({
                deviceInfo:deviceInfo,
                fencePoint:{
                    ...this.state.fencePoint,
                    latitude:baidu.lat,
                    longitude:baidu.lng  
                },
                fenceAddress:data.fenceAddress,
                radius:data.radius,
                fenceState:data.fenceState,
                fenceTitle:data.fenceTitle,
                savefenceState:data.fenceState === 'all' ? ['in','out']:data.fenceState?[data.fenceState]:[],
                zoom:this.getZoom(data.radius*2)
            },()=>{
                this.props.onDeviceChange && this.props.onDeviceChange(deviceInfo);
                Loading.hide();
            });
        });
    }


    /**
     * 创建一个新的围栏获取设备信息
     */
    async getDevicePosition () {
        if(this.props.getData){
            this.props.getData((res)=>{
                let data = res;
                this.addNewFenceDefaultValue(data);
            });
        }else {
            let deviceInfo = await devicePosition();
            this.addNewFenceDefaultValue(deviceInfo);
        }
    }


    /**
     * 新增围栏设置值
     * 
     */
    addNewFenceDefaultValue =(deviceInfo)=>{
        this.setState({
            deviceInfo:deviceInfo,
            fencePoint:{
                ...this.state.fencePoint,
                latitude:deviceInfo.latitude,
                longitude:deviceInfo.longitude 
            },
            fenceAddress:deviceInfo.address
        },()=>{
            this.props.onDeviceChange && this.props.onDeviceChange(deviceInfo);
            Loading.hide();
        });
    }





    /**
     * 选择报警状态
     */
    selectAlarmText = (state)=>{
        let fenceState = [...this.state.savefenceState];
        let index = fenceState.indexOf(state);
        if(index == -1){
            fenceState.push(state);
        }else {
            fenceState.splice(index, 1);
        }
        
        console.log(fenceState);
        
        this.setState({
            fenceState:fenceState.length == 1 ?fenceState[0] :fenceState.length == 0 ? '':'all',
            savefenceState:fenceState
        });
    }

    /**
     * 搜索框值返回事件
     */
    onChangeText = (value)=> {
        if(!value){
            this.setState({
                addressList:[],
                searchValue:''
            });
        }else {
            this.setState({
                searchValue:value,
            });

            if(!this.state.userMapType){
                MapSearch.requestSuggestion('',value).then((data)=>{
                    this.setState({
                        addressList:data.sugList
                    });
                });
            }
        }
    }

    /**
     * 选择地址
     */
    onSelectAddress = (point,address)=>{
        this.setState({
            fenceAddress:address,
            fencePoint:point,
            addressList:[],
            searchValue:''
        },()=>{
            Keyboard.dismiss();
            if(!this.state.userMapType){
                this.InfoWindowFunc.update();
            }
        });   
    }

    /**
     * 保存
     */
    onSave = ()=> {
        console.log(this.state.fencePoint.latitude);
        console.log(this.state.fencePoint.longitude);
        let baiduToChina = gps.baiduToChina(this.state.fencePoint.latitude,this.state.fencePoint.longitude);
        console.log(baiduToChina);
        let chinaToGPS = gps.chinaToGPS(baiduToChina.lat,baiduToChina.lng);
        console.log(chinaToGPS);
       
        //传入的数据
        let data = {
            fenceTitle:this.state.fenceTitle,
            radius:this.state.radius,
            latitude:chinaToGPS.lat,
            longitude:chinaToGPS.lng,
            fenceState:this.state.fenceState,
            fenceAddress:this.state.fenceAddress
        };

        if(this.props.fenceId){
            data.fenceId = this.props.fenceId;
        }

        console.log(data);
        

        jmAjax({
            url:api.fenceSave,
            method:'POST',
            data:data,
            encoding:true,
            encodingType:true
        }).then((res)=>{
            Toast.message('保存成功');
            DeviceEventEmitter.emit('jmFenceList',{});//围栏列表刷新
            this.props.onSave && this.props.onSave();
        });
    }

    /**
     * 地图移动停止状态
     */
    onMapStatusChangeFinish = (params)=>{
        this.setState({
            fencePoint:params
        });

        if(!this.state.userMapType){
            //解析地址
            geocoder(params).then((res)=>{
                this.setState({
                    fenceAddress:res.address
                });
            }); 
        }

    }

    onFocus =()=> {
        this.setState({
            isDelShow:true
        });
    }

    onBlur =()=> {
        this.setState({
            isDelShow:false
        });
    }

    /**
     * 半径提示元素
     */
    radiusTip = ()=> {
        return <View  style={[{backgroundColor:'#fff0',height:34,width:74,alignItems:'center'}]}>
            <View style={[{height:24,width:74,backgroundColor:'#3479F6',borderRadius:12,justifyContent:'center',alignItems:'center'}]}>
                <Text style={{color:'#fff',fontSize:11}}>半径:{distance(this.state.radius,true)}</Text>
            </View>
            <View style={[{backgroundColor:'#3479F6',height:10,width:2}]}>
            </View>
        </View>;
    }
}