import React,{Component} from 'react';
import {View} from 'react-native';
import Switch from '../components/switch/Switch';

export default class SwitchTest  extends Component {

    constructor(props) {
        super(props);
    }


    render(){
        return <Switch value={true} onChange={(value)=>{
            console.log(value);
                
        }}></Switch>;

    }
}