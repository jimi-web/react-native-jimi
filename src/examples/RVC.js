/*
 * @Descripttion: 
 * @version: 
 * @Author: liujinyuan
 * @Date: 2019-12-11 14:05:24
 * @LastEditors: xieruizhi
 * @LastEditTime: 2020-06-24 09:53:30
 */
import React, { Component } from 'react';
import { View} from 'react-native';
import { Jimi,Applet,Api } from '../index';

export default class Record extends Component {
    static navigationOptions = ({ navigation, screenProps }) => (
        {
            title: 'RVC',
            header:navigation.state.params ? navigation.state.params.param :undefined,
        }
    );
    constructor(props){
        super(props);
        this.params = {
            key:'69dcc204c82e4861a7a763c6bb3f4b96',
            secret:'fcb0f7e8ec9e4ed89d632240f4e1b8b9',
            imei:'357730090058752'
        };

        this.state = {
            isOpen:false
        }
    }

    componentWillMount(){
        this.awakenDvr();
    }

    render(){
        return (
            <View style={{flex:1}}>
                {
                    this.state.isOpen ? <Jimi.RVC code={'DVR,ON'} params={this.params} onReversal={(data) => this.onReversal(data)} />:null
                }
            </View>
        );
    }
    onReversal = (data) => {
        this.props.navigation.setParams({ param: data ? null : undefined});
    }



    /**
     * 唤醒dvr
     */
    awakenDvr = () => {
        let data = {
            cmdCode: 'DVR,ON',
            cmdType: 0,
            cmdId: 700,
            isSync: 0,
            offLineFlag: 0,
            platform: 'app',
            offLineInsType: 'customIns',
            instructSetting: { data: { flag: 0 } }
        };

        Applet.jmAjax({
            url: Api.instruction,
            method: 'POST',
            encoding: true,
            encodingType: true,
            data
        }).then((res) => {
            console.log(res,'出现');
            
           this.setState({
                isOpen:true
           });
        }).catch((res) => {

            console.log(res,'失败');
            
        });
    }

}