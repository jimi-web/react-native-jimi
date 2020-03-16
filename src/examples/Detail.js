/*
 * @Descripttion: 
 * @version: 
 * @Author: xieruizhi
 * @Date: 2019-12-27 17:43:23
 * @LastEditors  : xieruizhi
 * @LastEditTime : 2019-12-28 10:30:35
 */
import React,{Component} from 'react';
import { Jimi,Api,Applet} from '../index';

export default class Details extends Component { 
    
    constructor(props){
        super(props);
        this.state = {
            data:{
                deviceName:'',
                typeNum:'',
                encoding:'',
                simNo:'',
                iccid:'',
                deviceIcon:'',             
            }
        }
    }


    render(){
        return <Jimi.Details 
            data = {this.state.data}
            onSetUpIcon = {()=>{
                //跳转到设置图标界面
                this.props.navigation.push('IconLibrary',{activateKey:this.state.data.deviceIcon,callBack:(value)=>{
                    //设置图标后回调获取更新后的图标，重新更新数据
                    let data = this.state.data;
                    data.deviceIcon = value;
                    this.setState({
                        data
                    });
                }});
            }}
        />;
    }

    componentWillMount(){
        this.init();
    }

    /**
     * 请求数据设备详情
     */
    init = ()=>{
        Applet.jmAjax({
            url:Api.initLocatorInfo,
            method:'POST',
            encoding:true,
            encodingType:true
        }).then((res)=>{
           let data= res.data;
           data.typeNum = 'gt200'
           this.setState({
               data:{...data}
           });
        });
    }
}