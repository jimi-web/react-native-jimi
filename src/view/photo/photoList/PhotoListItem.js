/*
 * @Descripttion: 
 * @version: 
 * @Author: xieruizhi
 * @Date: 2019-11-21 17:31:47
 * @LastEditors: xieruizhi
 * @LastEditTime: 2019-11-27 18:17:45
 */
import React,{Component} from 'react';
import {View,StyleSheet,TouchableOpacity,Dimensions,ImageBackground,Image,Text} from 'react-native';
import { Checkbox } from 'teaset';
const imgWith = Dimensions.get('window').width;
 
export default class PhotoListItem extends Component{ 
    constructor(props) {
        super(props);
    }
    
    shouldComponentUpdate(nextProps,nextState){
        return this.props.checked !=nextProps.checked || this.props.isEdit !=nextProps.isEdit || this.props.url != nextProps.url ;
    }  


    render(){
        const {index,url,isEdit,checked,videoTime} = this.props;
        return <View style={[Styles.img,{marginRight:index+1%4===0?0:1}]}>
            <TouchableOpacity style={Styles.imgTouch} activeOpacity={1} onPress={this.props.onSelect} >
                <ImageBackground style={{position:'relative',flex:1}} source={{uri:url}}>
                    <Text style={Styles.videoTime}>{videoTime}</Text>
                    {
                        isEdit?
                            <Checkbox 
                                onChange={this.props.onSelect}
                                checked={checked}
                                style={Styles.checkbox}
                                checkedIcon={<Image style={{width: 21, height: 21, }} source={require('../../../assets/photo/checkbox_pre.png')} />}
                                uncheckedIcon={<Image style={{width: 21, height: 21,}} source={require('../../../assets/photo/checkbox_nor.png')} />}
                            />:null
                    }
                    
                </ImageBackground>
            </TouchableOpacity>
        </View>;
    }
}

const Styles = StyleSheet.create({
    img:{
        position:'relative',
        width: imgWith/4-1+1/4,
        height: imgWith/4-1+1/4,
        backgroundColor:'#000',
        marginTop:1
    },
    imgTouch:{
        width:'100%',
        height:'100%',
    },
    checkbox:{
        position:'absolute',
        bottom:6,
        right:6
    },
    videoTime:{
        position:'absolute',
        bottom:3,
        right:6,
        color:'#fff'
    }
});