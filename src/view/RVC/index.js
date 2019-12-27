/*
 * @Descripttion: 
 * @version: 
 * @Author: liujinyuan
 * @Date: 2019-12-11 14:05:24
 * @LastEditors  : liujinyuan
 * @LastEditTime : 2019-12-24 15:05:05
 */
import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, FlatList,TouchableOpacity ,AsyncStorage,ActivityIndicator,AppState,Platform } from 'react-native';
import MonitorView from './MonitorView';

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
                <MonitorView onReversal={(data) => this.onReversal(data)} />
            </View>
        );
    }
    onReversal = (data) => {
        this.props.navigation.setParams({ param: data ? null : undefined});
    }
}