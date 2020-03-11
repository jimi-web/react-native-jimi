# `FlowCard` 流量卡

## Demo
```
import React, {Component} from 'react';
import { View } from 'react-native';
import {Jimi} from 'react-native-jimi';

export default class FlowCard  extends Component {

    constructor(props) {
        super(props);
    }


    render(){
        return <View style={{flex:1}}>
            <Jimi.FlowCard></Jimi.FlowCard>
        </View>
    }
}
```