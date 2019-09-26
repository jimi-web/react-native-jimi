/*
 * @Descripttion: 
 * @version: 
 * @Author: xieruizhi
 * @Date: 2019-09-25 11:12:20
 * @LastEditors: xieruizhi
 * @LastEditTime: 2019-09-26 09:37:00
 */
import React, {Component} from 'react';
import {View,Image,ScrollView,Text} from 'react-native';
import {Checkbox} from 'teaset';
import FenceStyles from '../style/fenceList';

export default class FenceList extends Component { 

    constructor(props) {
        super(props);
        
    }
    

    render() {
        // return <Checkbox 
        //     checkedIcon={<Image style={{width: 24, height: 24}} source={require('../../../assets/record/checkbox_pre.png')} />}
        //     uncheckedIcon={<Image style={{width: 24, height: 24}} source={require('../../../assets/record/checkbox_nor.png')} />}
        // />;

        return <ScrollView>
            <View style={FenceStyles.line}>
                <View>
                    <Image style={FenceStyles.icon} source={require('../../../assets/fence/fence_list_enter.png')}>  
                    </Image>
                </View>
                <View style={FenceStyles.info}>
                    <View style={FenceStyles.title}>
                        <Text style={FenceStyles.name}>20190820143520</Text>
                        <Text style={FenceStyles.text}>半径:200m</Text>
                    </View>
                    <View > 
                        <Text style={[FenceStyles.text,FenceStyles.address]}>广东省深圳市宝安区留仙一路高新奇科技园东北60米</Text>
                    </View>
                </View>
            </View>
        </ScrollView>;
    }

    
}