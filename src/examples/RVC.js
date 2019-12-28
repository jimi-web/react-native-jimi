/*
 * @Descripttion: 
 * @version: 
 * @Author: liujinyuan
 * @Date: 2019-12-11 14:05:24
 * @LastEditors  : liujinyuan
 * @LastEditTime : 2019-12-28 09:53:31
 */
import React, { Component } from 'react';
import { View} from 'react-native';
import { Jimi } from '../index';
import { Button } from '../components/index';
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
            key:'d0c67074f14e403d916379f6664414b2',
            secret:'feef6c9e8ff94bfa95c2fc9b56b8c52a',
            imei:'312345678912314'
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