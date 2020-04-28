/*
 * @Descripttion: 
 * @version: 
 * @Author: liujinyuan
 * @Date: 2019-08-09 09:45:53
 * @LastEditors: liujinyuan
 * @LastEditTime: 2019-09-12 10:50:30
 */

import React, {Component} from 'react';
import {createBottomTabNavigator,createAppContainer} from 'react-navigation';
import {Text,Image,View} from 'react-native';
import HomePage from '../page/home';
import ConfigurationPage from '../page/configuration';
import  Icon  from '../assets';
const tabNav  = createBottomTabNavigator(
    {
        Home:{screen:HomePage},
        Configuration:{screen:ConfigurationPage},
    },
    {
        initialRouteName:'Home',
        tabBarPosition:'center',
        lazy:true,
        // backBehavior:'order',
        tabBarOptions:{
            showIcon: false,
            activeTintColor:'#333',//选中的颜色
            inactiveTintColor:'#000',//未选中的颜色
            pressColor:'gay',//涟漪效果
            animationEnabled:true,//是否在标签改变时显示动画,
            backBehavior:false,//返回跳转首页
            labelStyle:{
                fontSize:14,
                textAlign:'center',
            },  
            // indicatorStyle:{ height: 44 },
            // 导航栏样式
            style:{
                backgroundColor:'#fff',
                alignItems:'center',
                justifyContent:'space-around',
            },
        },
        defaultNavigationOptions:({navigation }) => ({
            tabBarLabel:({tintColor})=>{
                const routeName = navigation.state.routeName;
                let tabName = '首页';
                let tabIcon = 'home';
                let type = 0;
                switch (routeName) {
                case 'Home':
                    tabName = '首页';
                    tabIcon = 'home';
                    type = tintColor === '#333'?1:0;
                    break;
                case 'Configuration':
                    tabName = '设置';
                    tabIcon = 'config';
                    type = tintColor === '#333'?1:0;
                    break;
                }
                return <View style={{justifyContent:'center',flex:1}}>
                    <Icon style={{width:23,height:23,marginLeft:'auto',marginRight:'auto'}} model={2} type={type} name={tabIcon}/>
                    <Text style={{textAlign:'center',fontSize:10}}>{tabName}</Text>
                </View>;
                
            },
            tabBarVisible:navigation.state.params && navigation.state.params.param === null ? false : true
        }),
    }
);
export const TabContainer = createAppContainer(tabNav);

