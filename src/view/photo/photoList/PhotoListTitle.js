/*
 * @Descripttion: 
 * @version: 
 * @Author: xieruizhi
 * @Date: 2019-11-21 17:31:47
 * @LastEditors: xieruizhi
 * @LastEditTime: 2019-11-26 17:41:21
 */
import React,{Component} from 'react';
import {View,StyleSheet,TouchableOpacity,Text} from 'react-native';


export default class PhotoListTitle extends Component{ 
    constructor(props) {
        super(props);
    }
    
    shouldComponentUpdate(nextProps,nextState){
        return this.props.date !=nextProps.date || this.props.isEdit !=nextProps.isEdit || this.props.allChecked != nextProps.allChecked ;
    }  


    render(){
        const {date,onAllChecked,allChecked,isEdit} = this.props;
        return <View style={Styles.head} onLayout={(e)=>{
 
        }}>
            <Text style={Styles.title}>{date}</Text>
            {
                isEdit? 
                    <TouchableOpacity onPress={onAllChecked}>
                        <Text style={Styles.select}>{allChecked?'全不选':'全选'}</Text>
                    </TouchableOpacity>:null
            }
        </View>;
    }
}

const Styles = StyleSheet.create({
    head:{
        flex:1, 
        flexDirection: 'row',
        justifyContent:'space-between' ,
        backgroundColor:'#F7F7F7',
    },
    title:{
        height:37,
        lineHeight:37,
        paddingLeft:15,
        fontSize:15,
        color:'#333',
    },
    select:{
        height:37,
        paddingRight:15,
        color:'#3479F6',
        fontSize:15,
        lineHeight:37,
    },
});