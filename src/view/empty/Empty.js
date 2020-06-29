/*
 * @Descripttion: 
 * @version: 
 * @Author: xieruizhi
 * @Date: 2019-11-25 15:32:34
 * @LastEditors: xieruizhi
 * @LastEditTime: 2020-06-28 11:55:08
 */
import React, {Component} from 'react';
import {View,Image,Text,StyleSheet,TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';

export default class Empty extends Component { 

    static propTypes = {
        onPress:PropTypes.func,
        imgStyle:PropTypes.object,
        text: PropTypes.oneOfType([PropTypes.element,PropTypes.string])
    }

    static defaultProps = {
        source:require('../../assets/fence/list_empty.png'),
        text:'暂无内容',
        imgStyle:{}
    }

    constructor(props){
        super(props);
        
    }

    render() {
        return <View style={{flex:1}}>
                <View style={[Styles.imgStyle,this.props.imgStyle]}>
                    <Image source={this.props.source} />
                   {this.renderDetail()}
                </View>
            {this.props.children}
        </View>;
    }

    renderDetail = ()=>{
        let detail = this.props.text;
        if(typeof this.props.text === 'string'){
            if(this.props.text === 'upDate'){
            detail =  <TouchableOpacity style={Styles.btn} onPress={this.props.onPress}><Text style={{color:'#6f6e6e',fontSize:12}}>{I18n.t('点击重新加载')}</Text></TouchableOpacity>;
            }else{
                detail =  <Text style={Styles.emptyText}>{this.props.text}</Text>
            }
        }
        return detail;
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
        alignItems:'center'      
    },
    btn:{
        marginTop:20,
        padding:10,
        borderRadius:5,
        width:100,
        borderWidth:1,
        borderColor:'#bebebe',
        alignItems:'center'
    }
});