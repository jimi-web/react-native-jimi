/*
 * @Descripttion: 
 * @version: 
 * @Author: xieruizhi
 * @Date: 2019-09-27 10:46:26
 * @LastEditors: xieruizhi
 * @LastEditTime: 2019-10-16 14:49:48
 */
import React, {Component} from 'react';
import {View,Image,Text,TouchableOpacity} from 'react-native';
import FenceStyles from '../../style/fenceList';
import {Checkbox} from 'teaset';
import {distance} from '../../comm';
import {Icon} from '../../../../components/index';

export default class FenceListItem extends Component {
    constructor(props) {
        super(props);
        
    }

    shouldComponentUpdate(nextProps,nextState){
        return this.props.isSelect!=nextProps.isSelect || this.props.checked!=nextProps.checked || this.props.source!=nextProps.source || this.props.fenceTitle!=nextProps.fenceTitle || this.props.radius!=nextProps.radius; 
    }   

    render() {
        const {isSelect,onFenceListItem,checked,source,fenceTitle,radius,fenceAddress} = this.props;
        return <TouchableOpacity style={FenceStyles.line} activeOpacity={0.5} onPress={onFenceListItem}>
            <View>
                {
                    isSelect ?
                        <Checkbox 
                            onChange={this.props.onChangeCheckbox}
                            checked={checked}
                            checkedIcon={<Image style={{width: 24, height: 24}} source={require('../../../../assets/record/checkbox_pre.png')} />}
                            uncheckedIcon={<Image style={{width: 24, height: 24}} source={require('../../../../assets/record/checkbox_nor.png')} />}
                        />:
                            typeof(source) == 'string'?
                            <Icon name={source} size={24}/>:
                            <Image style={FenceStyles.icon} source={source} />   
                }
            </View>
            <View style={FenceStyles.info}>
                <View style={FenceStyles.title}>
                    <Text style={FenceStyles.name}>{fenceTitle}</Text>
                    <Text style={[FenceStyles.text,{width:80,textAlign:'right'}]}>半径:{distance(radius,true)}</Text>
                </View>
                <View> 
                    <Text style={[FenceStyles.text,FenceStyles.address]}>{fenceAddress}</Text>
                </View>
            </View>
        </TouchableOpacity>;
    }
}