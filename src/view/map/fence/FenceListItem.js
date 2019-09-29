/*
 * @Descripttion: 
 * @version: 
 * @Author: xieruizhi
 * @Date: 2019-09-27 10:46:26
 * @LastEditors: xieruizhi
 * @LastEditTime: 2019-09-28 14:58:55
 */
import React, {Component} from 'react';
import {View,Image,ScrollView,Text,TouchableOpacity} from 'react-native';
import FenceStyles from '../style/fenceList';
import {Checkbox} from 'teaset';

export default class FenceListItem extends Component {
    constructor(props) {
        super(props);
        
    }

    shouldComponentUpdate(nextProps,nextState){
        return this.props.isSelect!=nextProps.isSelect || this.props.checked!=nextProps.checked; 
    }   

    render() {
        const {isSelect,onFenceListItem,checked,fenceState,fenceTitle,radius,fenaddress} = this.props;
        return <TouchableOpacity style={FenceStyles.line} activeOpacity={0.5} onPress={onFenceListItem}>
            <View>
                {
                    isSelect ?
                        <Checkbox 
                            checked={checked}
                            checkedIcon={<Image style={{width: 24, height: 24}} source={require('../../../assets/record/checkbox_pre.png')} />}
                            uncheckedIcon={<Image style={{width: 24, height: 24}} source={require('../../../assets/record/checkbox_nor.png')} />}
                        />:
                        <Image style={FenceStyles.icon} source={this.getFenceState(fenceState)}>  
                        </Image>
                }
            </View>
            <View style={FenceStyles.info}>
                <View style={FenceStyles.title}>
                    <Text style={FenceStyles.name}>{fenceTitle}</Text>
                    <Text style={FenceStyles.text}>半径:{radius}m</Text>
                </View>
                <View> 
                    <Text style={[FenceStyles.text,FenceStyles.address]}>{fenaddress}</Text>
                </View>
            </View>
        </TouchableOpacity>;
    }

    /**
     * 围栏状态
     * @param {String} state  报警状态
     */
    getFenceState = (state)=> {
        let img = '';
        switch (state) {
        case 'in':
            img = require('../../../assets/fence/fence_list_enter.png');
            break;
        case 'out':
            img = require('../../../assets/fence/fence_list_out.png');
            break;
        case 'all':
            img = require('../../../assets/fence/fence_list_turnover.png');
        }
        return img;
    }    
    
}