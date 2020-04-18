/*
 * @Descripttion: 导航主页面
 * @version: 
 * @Author: liujinyuan
 * @Date: 2019-08-08 15:47:57
 * @LastEditors: liujinyuan
 * @LastEditTime: 2020-04-02 11:42:36
 */

import {createStackNavigator,createAppContainer} from 'react-navigation';
import {TabContainer} from './TabNav';
import Photo from '../examples/Photo';
import PhotoList from '../examples/PhotoList';
import PhotoDeatil from '../examples/PhotoDeatil';
import Position from '../examples/Position';
import Track from '../examples/Track';
import Trace from '../examples/Trace';
import Fence from '../examples/Fence';
import Test from '../view/test';
import Record from '../examples/Record';
import PrivacyAgreement from '../view/map/share/PrivacyAgreement';
import AddFence from '../examples/AddFence';
import Share from '../examples/Share';
import PullList from '../examples/PullList';
import PullView from '../examples/PullView';
import GroupList from '../examples/GroupList';
import Switch from '../examples/Switch';
import GetWheel from '../examples/Wheel';
import Datepicker from '../examples/Datepicker';
import RVC from '../examples/RVC';
import Dialog from '../examples/Dialog';
import Icon from '../examples/Icon';
import Empty from '../examples/Empty';
import Button from '../examples/Button';
import Drawer from '../examples/Drawer';
import Instruction from '../examples/Instruction';
import MediaSyn from '../examples/MediaSyn';
import MediaContral from '../examples/MediaContral';
import MediaDetails from '../examples/MediaDetails';
import Instructions from '../examples/Instructions';
import Details from '../examples/Detail';
import IconLibrary from '../examples/IconLibrary';
import PhotoAlbum from '../examples/PhotoAlbum';

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
        PhotoList:{
            screen:PhotoList,
            navigationOptions:getOptions()
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
        Details:{
            screen:Details,
            navigationOptions:getOptions('详情')            
        },
        PhotoAlbum:{
            screen:PhotoAlbum,
            navigationOptions:getOptions()            
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
        PullList:{
            screen:PullList,
            navigationOptions:getOptions('普通列表')            
        },
        GroupList:{
            screen:GroupList,
            navigationOptions:getOptions('分组列表')            
        },
        PullView:{
            screen:PullView,
            navigationOptions:getOptions('上拉刷新下拉加载')        
        },        
        Switch:{
            screen:Switch,
            navigationOptions:getOptions('开关')            
        },
        GetWheel:{
            screen:GetWheel,
            navigationOptions:getOptions('滚轮')            
        },
        PhotoDeatil:{
            screen:PhotoDeatil,
            navigationOptions:getOptions()            
        },  
        Datepicker:{
            screen:Datepicker,
            navigationOptions:getOptions('日期选择器')            
        },  
        RVC:{
            screen:RVC,
        },  
        Dialog:{
            screen:Dialog,
            navigationOptions:getOptions('弹框')     
        },  
        Icon:{
            screen:Icon,
            navigationOptions:getOptions('图标')     
        }, 
        Empty:{
            screen:Empty,
            navigationOptions:getOptions('数据空白')     
        }, 
        Button:{
            screen:Button,
            navigationOptions:getOptions('按钮')     
        },
        Drawer:{
            screen:Drawer,
            navigationOptions:getOptions('底部抽屉')     
        },     
        Instruction:{
            screen:Instruction,
            navigationOptions:getOptions('指令')     
        },
        MediaSyn:{
            screen:MediaSyn,
            navigationOptions:getOptions('媒体同步')     
        },
        MediaContral:{
            screen:MediaContral,
            navigationOptions:getOptions('远程拍摄')     
        },
        MediaDetails:{
            screen:MediaDetails,
            navigationOptions:getOptions('媒体同步')     
        },
        Instructions:{
            screen:Instructions,
            navigationOptions:getOptions('指令详情')     
        },
        IconLibrary:{
            screen:IconLibrary,
            navigationOptions:getOptions('图标库')     
        },
        
    });

export const Root = createAppContainer(AppNavigator);
 