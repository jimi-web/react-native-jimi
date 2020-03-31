import React, { Component } from 'react';
import { WebView,View} from 'react-native';
import api from '../../api/index';
import {jmAjax} from '../../http/business';
export default class FlowCard extends Component {

    constructor(props){
        super(props);
        this.state = {
            url:api.flowUrl
        }
    }

    componentWillMount(){
        this.init();
    }


    init =()=>{
        jmAjax({
            url:api.encodeUserInfo,
            method:'GET',
            encoding:true,
            encodingType:true,
            data:{
                apptype:'jmaxapp'
            }
        }).then((res)=>{
           this.setState({
               url:this.state.url+res.data
           });
        }); 
    }


    render(){
        return (
            <View style={{flex:1}}>
                <WebView
                source={{uri: this.state.url}}
                style={{flex:1}}
                />
            </View>
        )
    }
    
}