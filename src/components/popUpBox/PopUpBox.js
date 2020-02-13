/*
 * @Descripttion: 
 * @version: 
 * @Author: xieruizhi
 * @Date: 2019-10-09 15:34:12
 * @LastEditors  : liujinyuan
 * @LastEditTime : 2020-01-13 10:02:41
 */
import React, {Component} from 'react';
import {StyleSheet,Modal,TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';

export default class PopUpBox extends Component {
    static propTypes = {
        visible:PropTypes.bool,
        onShadow:PropTypes.func
    }

    static defaultProps = {
        visible:false,
        onShadow:()=>{
            //
        }
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
