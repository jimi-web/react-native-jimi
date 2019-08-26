/*
 * @Descripttion: 导航主页面
 * @version: 
 * @Author: liujinyuan
 * @Date: 2019-08-08 15:47:57
 * @LastEditors: liujinyuan
 * @LastEditTime: 2019-08-23 09:36:20
 */

import {createStackNavigator,createAppContainer} from 'react-navigation';

import {TabContainer} from './TabNav';
import Position from '../view/map/google/track';
import Photo from '../view/photo/index';

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
        }
    });



export const Root = createAppContainer(AppNavigator);
 