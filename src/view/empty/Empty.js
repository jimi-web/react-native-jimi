/*
 * @Descripttion: 
 * @version: 
 * @Author: xieruizhi
 * @Date: 2019-11-25 15:32:34
 * @LastEditors: xieruizhi
 * @LastEditTime: 2019-11-25 15:42:12
 */
import React, {Component} from 'react';
import {View,Image,Text,StyleSheet} from 'react-native';
import PropTypes from 'prop-types';

export default class Empty extends Component { 

    static propTypes = {
       
    }

    static defaultProps = {
        source:require('../../assets/fence/list_empty.png'),
        text:'暂无内容'
    }

    constructor(props){
        super(props);
    }

    render() {
        return <View style={Styles.empty}>
            <Image source={this.props.source} />
            <Text style={Styles.emptyText}>{this.props.text}</Text>
        </View>;
    }
}

const Styles = StyleSheet.create({
    empty:{
        position:'absolute',
        top:'50%',
        left:'50%',
        width:280,
        height:218,
        marginLeft:-140,
        marginTop:-163
    },
    emptyText:{
        marginTop:30,
        fontSize:16,
        color:'#979797',
        textAlign:'center'
    }
});