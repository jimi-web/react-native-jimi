/*
 * @Descripttion: 
 * @version: 
 * @Author: liujinyuan
 * @Date: 2020-01-07 10:04:51
 * @LastEditors  : liujinyuan
 * @LastEditTime : 2020-01-16 14:50:08
 */
import React, { Component } from 'react';
import {View,Text,TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import {Switch,Icon,Datepicker,Drawer} from '../../components/index';
import baseStyle from '../baseStyle';

export default class InsModelSelect extends Component {
    constructor(props){
        super(props);
        this.id = null;
    }
    render(){
        let {content,value} = this.props.data;
        return <TouchableOpacity activeOpacity={0.6}  style={this.renderStyle()} onPress={this.onPress}>
            <View>
                <Text style={{fontSize:14}}>{content.text}</Text>
                {content.viceText?<Text style={{fontSize:10}}>{content.viceText}</Text>:null}
            </View>
            <View style={{flexDirection:'row'}}>
                <Text style={{marginRight:10}}>{value}</Text>
                <Icon name={'subordinate_arrow'} />
            </View>
        </TouchableOpacity >;
    }
    renderStyle = () => {
        const {border} = this.props.data;
        let style = this.props.style;
        let borderStyle = border?baseStyle.bottomBorderStyle:null;
        const styles = [
            {
                flexDirection:'row',
                justifyContent:'space-between',
                alignItems:'center',
                flex:1,
                height:50
            },
            borderStyle
        ].concat(style);
        return styles;
    }
    onPress = () => {
        const {index,data} = this.props;
        const {content} = this.props.data;
        if(content.modelType == 'Datepicker'){
            Datepicker.show({
                onConfirm:(data) => {
                    console.log(data,'回调的参数');
                    data.value = data;
                    data.insValue = data;
                    this.props.onPress && this.props.onPress(data,index);
                }
            });
        }
        if(content.modelType == 'Custom'){
            const element = this.renderDrawerElement(content);
            this.id = Drawer.open(element);
        }
        
        
    }
    /*
    *渲染底部抽屉
     */
     renderDrawerElement = (arr) => {
         const modelData = arr.modelData;
         return (
             <View style={{zIndex:999,backgroundColor:'#fff'}}>
                 {
                     modelData.map((item,index) => {
                         return <TouchableOpacity key={index} activeOpacity={0.6}  style={{height:50,backgroundColor:'#fff'}} onPress={this.onDrawer.bind(this,item)}>
                             <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
                                 <Text style={{fontSize:14}}>{item.text}</Text>
                             </View>
                         </TouchableOpacity >;
                     })
                 }
             </View>
         );
     }
     /*
     *点击每一列
      */
      onDrawer = (item) => {
          Drawer.close(this.id);
          const {data,index} = this.props;
          const content = data.content;
          data.value = item.text;
          data.insValue = item.value;
          this.props.onPress && this.props.onPress(data,index);
      }
}