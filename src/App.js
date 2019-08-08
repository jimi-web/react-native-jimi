/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {TopView,Theme} from './components/index';
export default class App extends Component{
    render() {
        return (
            <View style={{flex:1}}>
                <TopView>
                    <View style={styles.container}>
                        <Text style={styles.welcome}>Welcome to React Native!</Text>
                    </View>
                </TopView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#fff',
        marginBottom: 5,
    },
});
