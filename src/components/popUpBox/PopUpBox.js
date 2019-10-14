/*
 * @Descripttion: 
 * @version: 
 * @Author: xieruizhi
 * @Date: 2019-10-09 15:34:12
 * @LastEditors: xieruizhi
 * @LastEditTime: 2019-10-10 10:13:44
 */
import React, {Component} from 'react';
import {View,StyleSheet,Modal,TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';

export default class PopUpBox extends Component {
    static propTypes = {
        visible:PropTypes.bool,//是否开启路况
        onShadow:PropTypes.func
    }

    static defaultProps = {
        visible:false,
        onShadow:()=>{}
    }

    render() {
        return <Modal
            animationType="slide"
            transparent={true}
            visible={this.props.visible}  
        >
            <TouchableOpacity style={styles.shadow} activeOpacity={1} onPress={()=>{this.onShadow();}}>
                {
                    this.props.children
                }
            </TouchableOpacity>
        </Modal>;
    }

    onShadow = ()=>{
        this.props.onShadow && this.props.onShadow();
    }
}

const styles = StyleSheet.create({
    shadow:{
        flex:1,
        backgroundColor:'#383838cc',
    }
});
