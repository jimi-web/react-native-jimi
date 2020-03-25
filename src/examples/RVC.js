/*
 * @Descripttion: 
 * @version: 
 * @Author: liujinyuan
 * @Date: 2019-12-11 14:05:24
 * @LastEditors: liujinyuan
 * @LastEditTime: 2020-03-24 10:45:41
 */
import React, { Component } from 'react';
import { View} from 'react-native';
import { Jimi } from '../index';

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
            imei:'357730090535536'

        };
    }

    render(){
        return (
            <View style={{flex:1}}>
                <Jimi.RVC params={this.params} onReversal={(data) => this.onReversal(data)} />
            </View>
        );
    }
    onReversal = (data) => {
        this.props.navigation.setParams({ param: data ? null : undefined});
    }

}