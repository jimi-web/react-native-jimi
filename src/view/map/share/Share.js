/*
 * @Descripttion: 
 * @version: 
 * @Author: xieruizhi
 * @Date: 2019-09-23 10:48:33
 * @LastEditors: xieruizhi
 * @LastEditTime: 2020-06-11 16:33:53
 */
import React, {Component} from 'react';
import {View,TouchableOpacity,Image,Text,Modal,StyleSheet,Dimensions,Animated} from 'react-native';
import PropTypes from 'prop-types';
import {httpApp} from '../../../http/basic';
import {jmAjax,getEncoding} from '../../../http/business';
import api from '../../../api/index';
import Toast from '../../../components/toast/OtherToast';
import {Checkbox} from 'teaset';
import {Theme,Icon} from '../../../components/index';
import {isIphoneX,iphoneXHeight} from '../../../libs/utils';
const {width} = Dimensions.get('window');


export default class Share extends Component { 
    static propTypes = {
        checkedTitle:PropTypes.string,
        onFile:PropTypes.func,
        shareUrl:PropTypes.string,
        shareTitle:PropTypes.string,
        shareText:PropTypes.string,
        token:PropTypes.string,
    };

    static defaultProps = {
        checkedTitle:'《使用协议和隐私政策》',
        shareUrl:api.shareUrl,
        shareTitle:'我的实时位置',
        shareText:'点击查看我现在在哪里吧！'
    }

    constructor(props) {
        super(props);
        this.state ={
            shareTime:[{
                key:'1小时',
                value:3600
            },{
                key:'3小时',
                value:10800
            },{
                key:'6小时',
                value:21600
            },{
                key:'12小时',
                value:43200
            },{
                key:'1天',
                value:86400
            },{
                key:'1个月',
                value:2592000
            }],
            activeIndex:0,
            activeValue:3600,
            isChecked:false,
            shareType:[{
                img:'track_share_weixin',
                value:'wx',
                key:'微信'
            },{
                img:'track_share_pengyouquan',
                value:'pyq',
                key:'朋友圈'
            },{
                img:'track_share_qq',
                value:'qq',
                key:'QQ'
            }],
            isDrawerShareShow:false,
            err:false,
            message:'请先勾选同意',
            fadeAnim: new Animated.Value(0),  // 透明度初始值设为0
        };
    }


    isShow =(flag,value,toValue)=>{
        this.setState({
            isDrawerShareShow:flag,
            fadeAnim:new Animated.Value(value)
        },()=>{
            Animated.spring(                  // 随时间变化而执行动画
                this.state.fadeAnim,            // 动画中的变量值
                {
                    toValue: toValue,
                    friction:9
                }
            ).start();  
        });
    }

    show = ()=>{
        this.isShow(true,0,1);
    }

    hide = ()=>{
        this.isShow(false,1,0);
    }
    
    
    // static show(params) {
    //     let isShow = true;
    //     DeviceEventEmitter.emit('jmDrawerShareShow',isShow);
    // }

    // static hide() {
    //     let isShow = false;
    //     DeviceEventEmitter.emit('jmDrawerShareShow',isShow);
    // }    

    // componentDidMount() {
    //     DeviceEventEmitter.addListener('jmDrawerShareShow', (isShow)=>{
    //         this.setState({
    //             isDrawerShareShow:isShow,
    //         });
    //     });
    // }


    // componentWillUnmount() {
    //     DeviceEventEmitter.removeAllListeners('jmDrawerShareShow');
    // }    
    
    render(){
        const modalHeight = this.state.fadeAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [1, isIphoneX()?iphoneXHeight(337):337],
        });
        return <Modal
            animationType="none"
            transparent={true}
            visible={this.state.isDrawerShareShow}
        >
            <TouchableOpacity style={MapStyles.shadow} onPress={this.hide}></TouchableOpacity>
            <Animated.View style={[MapStyles.share,{height:modalHeight}]}>
                <View style={MapStyles.shareTime}>
                    <Text style={MapStyles.shareTitle}>{I18n.t('分享时间')}</Text>
                    <View style={MapStyles.shareSelectTime}>
                        {
                            this.state.shareTime.map((item,index)=>{
                                return <TouchableOpacity key={'shareTime'+index} 
                                    style={[MapStyles.shareSelectTimeButton,this.state.activeIndex===index?MapStyles.shareSelectTimeButtonAactive:null]} 
                                    onPress={()=>this.onChangeTime(item.value,index)}>
                                    <Text style={[MapStyles.shareSelectTimeButtonText,this.state.activeIndex===index?MapStyles.shareSelectTimeButtonAactiveText:null]}>{I18n.t(item.key)}</Text>
                                </TouchableOpacity>;
                            })
                        }
                        <View style={{flexDirection:'row',paddingLeft:'2%'}}>
                            <Checkbox
                                title={I18n.t('我已阅读并同意')}
                                checked={this.state.isChecked}
                                onChange={this.onCheckChange}
                                checkedIcon={<Image style={{width: 12, height: 12}} source={require('../../../assets/trace/track_share_checkbox_on.png')}  />}
                                uncheckedIcon={<Image style={{width: 12, height: 12}} source={require('../../../assets/trace/track_share_checkbox_off.png')} />}
                            />
                            <TouchableOpacity onPress={()=>{
                                this.setState({
                                    isDrawerShareShow:false
                                },()=>{
                                    // this.props.navigation.push(this.props.routerName);
                                    this.props.onFile &&  this.props.onFile();
                                });
                            }}>
                                <Text style={{color:'#3479F6'}}>{this.props.checkedTitle}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <View style={MapStyles.shareType}>
                        <Text style={MapStyles.shareTitle}>{I18n.t('分享到')}</Text>
                    <View style={MapStyles.shareTypeImg}>
                        {
                            this.state.shareType.map((item,index)=>{
                                return <TouchableOpacity style={MapStyles.shareTypeImgBtn} key={'shareTypeImg'+index} onPress={()=>this.onShareTypeChange(item.value)}>
                                    <Icon name={item.img} size={46} />
                                    <Text style={MapStyles.shareTypeImgBtnText}>{item.key}</Text>
                                </TouchableOpacity>;
                            })
                        }
                    </View>
                </View>
                <View style={MapStyles.shareLine}></View>
                <TouchableOpacity style={MapStyles.shareCancel} onPress={this.hide}>
                    <Text style={MapStyles.shareCancelText}>{I18n.t('取消')}</Text>
                </TouchableOpacity>
            </Animated.View>
            <Toast message={I18n.t(this.state.message)}></Toast>
        </Modal>;
    }


    /**
     * 时间改变
     */
    onChangeTime = (value,index)=>{
        this.setState({
            activeValue:value,
            activeIndex:index
        });
    }

    onCheckChange = (checked)=>{
        this.setState({
            isChecked:checked
        });
    }

    /**
     * 监听分享
     */
    onShareTypeChange = (value)=> {
        let data = {
            state:value,
            expireTime:this.state.activeValue
        };
        if(this.state.isChecked){
            if(this.props.token){
                this.httpShare(data.state,this.props.token);
            }else{
                this.getToken(data);
            }
        }else{
            Toast.show();
        } 
    }

    /**
     * 获取token认证身份
     */
    getToken = (data)=>{
        jmAjax({
            url:api.shareToken,
            method:'POST',
            data:{
                shareType:'position',
                expireTime:data.expireTime,
            },
            encoding:true,
            encodingType:true,
            header:0,
        }).then((res)=>{ 
            let result = res.data;
            this.httpShare(data.state,result);
        });
    }

    /**
     * 分享
     */
    httpShare = (state,token)=> {
        getEncoding().then((res)=>{
            httpApp('jm_api.onShare',{
                state:state,
                text:this.props.shareText,
                url:this.props.shareUrl+'?token='+token+'&encodingType='+res.encodType+'&encoding='+res.encoding,
                title:this.props.shareTitle,
                onSuccess: () => {
                    this.hide();
                },
                onFail: (res) => {
                    let message ='分享失败';
                    if(res.code === -100){
                        return;
                    }else if(res.code === -103){
                        message = state === 'qq'?'未安装QQ' :'未安装微信';
                    }
                    this.setState({
                        message:message
                    },()=>{
                        Toast.show();
                    });
                },
                onComplete:()=>{
                    //
                }
            });    
        });    
    }  
    
    

}


const MapStyles =  StyleSheet.create({
    share:{
        position:'absolute',
        bottom:0,
        width:width,
        height: isIphoneX()?iphoneXHeight(337):337,
        backgroundColor:'#fff',
        zIndex:1,
    },
    shareTime:{
        height:161,
        padding:20,
        paddingTop:15,
        paddingBottom:10,
        borderBottomWidth:1,
        borderBottomColor:'#F7F7F7'
    },
    shareSelectTime:{
        flexWrap: 'wrap',
        flexDirection:'row',
        padding:'4%',
        paddingTop:10,
        paddingBottom:0
    },  
    shareSelectTimeButton:{
        width:'20%',
        height:32,
        justifyContent:'center',
        alignItems:'center',
        borderWidth:1,
        borderRadius:4,
        borderColor:'#DBDBDB',
        marginLeft:'2%',
        marginRight:'2%',
        marginBottom:15,
    },
    shareSelectTimeButtonAactive:{
        borderColor:'rgba(52, 121, 246, 0.8)',
        backgroundColor:'rgba(52, 121, 246, 0.1)',
    },
    shareSelectTimeButtonAactiveText:{
        color:Theme.TextColorPrimary
    },  
    shareSelectTimeButtonText:{
        fontSize:14,
        color:'#959595'
    },  
    shareType:{
        height:123,
        padding:20,
        paddingTop:10,
        paddingBottom:15
    },
    shareLine:{
        height:3,
        backgroundColor:'#F7F7F7'
    },
    shareTitle:{
        fontSize:13,
        color:'#333333'
    },  
    shareCancel:{
        height:48,
        alignItems:'center',
        justifyContent:'center'
    },
    shareCancelText:{
        fontSize:17
    },
    shareTypeImg:{
        paddingTop:10,
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center'
    },
    shareTypeImgBtn:{
        width:46,
        alignItems:'center',
        marginLeft:28,
        marginRight:28
    },
    shareTypeImgBtnText:{
        marginTop:10,
        fontSize:13
    },
    shadow:{
        position:'absolute',
        bottom:0,
        top:0,
        width:width,
        backgroundColor:'#383838',
        opacity:0.8,
    },
    tip:{
        position:'absolute',
        bottom:isIphoneX()?iphoneXHeight(30):30,
        width:120,
        height:40,
        left:'50%',
        marginLeft:-60,
        backgroundColor:'#000000bd',
        borderRadius:6,
        zIndex:2,
        justifyContent:'center',
        alignItems:'center'
    }
});