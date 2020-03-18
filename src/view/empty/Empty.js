/*
 * @Descripttion: 
 * @version: 
 * @Author: xieruizhi
 * @Date: 2019-11-25 15:32:34
 * @LastEditors  : xieruizhi
 * @LastEditTime : 2019-12-27 17:33:09
 */
import React, {Component} from 'react';
import {View,Image,Text,StyleSheet,TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';

export default class Empty extends Component { 

    static propTypes = {
        onPress:PropTypes.func,
        imgStyle:PropTypes.object
    }

    static defaultProps = {
        source:require('../../assets/fence/list_empty.png'),
        text:'暂无内容',
    }

    constructor(props){
        super(props);
    }

    render() {
        return <View style={{flex:1}}>
            <TouchableOpacity style={{flex:1}} activeOpacity={1} onPress={this.props.onPress}>
                <View style={[Styles.imgStyle,this.props.imgStyle]}>
                    <Image source={this.props.source} />
                    <Text style={Styles.emptyText}>{this.props.text}</Text>
                </View>
            </TouchableOpacity>
            {this.props.children}
        </View>;
    }
}

const Styles = StyleSheet.create({
    emptyText:{
        marginTop:30,
        fontSize:16,
        color:'#979797',
        textAlign:'center'
    },
    imgStyle:{
        position:'absolute',
        top:'50%',
        left:'50%',
        width:280,
        height:218,
        marginLeft:-140,
        marginTop:-163,        
    }
});