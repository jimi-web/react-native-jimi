/*
 * @Descripttion: 导航主页面
 * @version: 
 * @Author: liujinyuan
 * @Date: 2019-08-08 15:47:57
 * @LastEditors: xieruizhi
 * @LastEditTime: 2019-10-17 18:35:47
 */

import {createStackNavigator,createAppContainer} from 'react-navigation';
import {TabContainer} from './TabNav';
import Photo from '../view/photo/index';
import Position from '../examples/Position';
import Track from '../examples/Track';
import Trace from '../examples/Trace';
import Fence from '../examples/Fence';
import Test from '../view/test';
import Record from '../examples/Record';
import PrivacyAgreement from '../view/map/share/PrivacyAgreement';
import AddFence from '../examples/AddFence';
import Share from '../examples/Share';
import PullView from '../examples/PullView';
import Switch from '../examples/Switch';

const getOptions = (title) => {
    let headerTitle = {};
    if(title){
        headerTitle = {
            title:title
        };
    }
    return {
        ...headerTitle,
        headerBackTitle:null,
        headerStyle:{
            backgroundColor:'#fff',
            // height:44
        },
        headerTintColor:'#232323',
        headerTitleStyle:{
            fontSize:16,
            fontWeight: 'bold',
        },
        gesturesEnabled:false
    };
};
const AppNavigator = createStackNavigator(
    {
        TabContainer:{
            screen:TabContainer,
            navigationOptions: ({ navigation }) => (
                {
                    title:'首页',
                    headerBackTitle:null,
                    headerStyle:{
                        backgroundColor:'#fff',
                    },
                    headerTintColor:'#232323',
                    headerTitleStyle:{
                        fontSize:16,
                        fontWeight: 'bold',
                    }
                }),
        },
        Photo:{
            screen:Photo,
            navigationOptions:getOptions('相册')
        },
        Position:{
            screen:Position,
            navigationOptions:getOptions('定位')
        },
        Track:{
            screen:Track,
            navigationOptions:getOptions('轨迹')
        },
        Trace:{
            screen:Trace,
            navigationOptions:getOptions('追踪')
        },
        Test:{
            screen:Test,
            navigationOptions:getOptions('测试')
        },
        Record:{
            screen:Record,
            navigationOptions:getOptions('录音')
        },
        PrivacyAgreement:{
            screen:PrivacyAgreement,
            navigationOptions:getOptions('隐私政策')            
        },
        Fence:{
            screen:Fence,
            navigationOptions:getOptions('围栏')            
        },
        AddFence:{
            screen:AddFence,
            navigationOptions: ({ navigation }) => (
                {
                    ...getOptions('添加围栏'),
                    headerStyle:{
                        backgroundColor:'#fff',
                        borderBottomColor:'#fff',
                        elevation:0
                    },
                }),
        },
        Share:{
            screen:Share,
            navigationOptions:getOptions('分享')            
        },
        PullView:{
            screen:PullView,
            navigationOptions:getOptions('下拉')            
        },
        Switch:{
            screen:Switch,
            navigationOptions:getOptions('开关')            
        },
    });

export const Root = createAppContainer(AppNavigator);
 