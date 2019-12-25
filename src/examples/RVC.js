/*
 * @Descripttion: 
 * @version: 
 * @Author: liujinyuan
 * @Date: 2019-12-11 14:05:24
 * @LastEditors  : liujinyuan
 * @LastEditTime : 2019-12-25 16:11:28
 */
import React, { Component } from 'react';
import { View, T} from 'react-native';
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
    }

    render(){
        return (
            <View style={{flex:1}}>
                <Jimi.RVC onReversal={(data) => this.onReversal(data)} />
            </View>
        );
    }
    onReversal = (data) => {
        this.props.navigation.setParams({ param: data ? null : undefined});
    }
}