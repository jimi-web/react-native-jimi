import React, {Component} from 'react';
import {View,StyleSheet} from 'react-native';
import {Jimi} from '../index';;

export default class IconLibrary extends Component { 

    constructor(props) {
        super(props);
        this.state = {
            iconArray:[{

            }]
        };
    }

    render() {
        let {activateKey,callBack} = this.props.navigation.state.params;
        return <View style={Styles.container}>
            <Jimi.IconLibrary
                activateKey={activateKey}
                onSaveCallBack={(value)=>{
                    callBack(value);
                    this.props.navigation.goBack()
                }}
            />
        </View>
    }
}

const Styles = StyleSheet.create({
    container:{
        flex:1
    }
});