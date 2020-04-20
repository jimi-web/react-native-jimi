/*
 * @Descripttion: 
 * @version: 
 * @Author: xieruizhi
 * @Date: 2019-11-19 09:55:13
 * @LastEditors: xieruizhi
 * @LastEditTime: 2019-11-28 16:10:13
 */
import React, {Component} from 'react';
import {View,StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import { ZoomImageView } from 'react-native-photoview-jm';

export default class Photograph extends Component { 

    static propTypes = {
        url:PropTypes.string,
        style:PropTypes.object
    }
    

    constructor(props){
        super(props);
        this.state = {
            size:{width:0,height:0}
        }
    }

    render(){
        const {url,style} = this.props;
        return <View style={[Styles.content,{...style}]} onLayout={this._onLayout}>
            <ZoomImageView 
                style={{flex:1}}
                source={url}
                width={this.state.size.width}
                height={this.state.size.height}
            />
            {this.props.children}
        </View>;
    }

    _onLayout = (data)=>{
        let layout = data.nativeEvent.layout;
        let layoutHeight = layout.height;
        this.setState({
            size:{
                width:layout.width,
                height:layoutHeight
            }
        })
    }

}

const Styles = StyleSheet.create({
    content:{
        flex:1,
    }
});