/*
 * @Descripttion: 导航主页面
 * @version: 
 * @Author: liujinyuan
 * @Date: 2019-08-08 15:47:57
 * @LastEditors: xieruizhi
 * @LastEditTime: 2020-06-11 14:19:10
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

const getOptions = (title,navigation) => {
    console.log(navigation,'定位');
    let headerTitle = {};
    if(title){
        headerTitle = {
            title:navigation?navigation.state.params.I18n?navigation.state.params.I18n.t(title):title:title
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
            navigationOptions:({navigation})=>getOptions('相册',navigation)
        },
        PhotoList:{
            screen:PhotoList,
            navigationOptions:getOptions()
        },
        Position:{
            screen:Position,
            navigationOptions:({ navigation }) => getOptions('定位',navigation)
        },
        Track:{
            screen:Track,
            navigationOptions:({ navigation }) => getOptions('轨迹',navigation)
        },
        Trace:{
            screen:Trace,
            navigationOptions:({ navigation }) => getOptions('追踪',navigation)
        },
        Test:{
            screen:Test,
            navigationOptions:({ navigation }) => getOptions('测试',navigation)
        },
        Record:{
            screen:Record,
            navigationOptions:({ navigation }) => getOptions('录音',navigation)
        },
        PrivacyAgreement:{
            screen:PrivacyAgreement,
            navigationOptions:({ navigation }) => getOptions('隐私政策',navigation)           
        },
        Fence:{
            screen:Fence,
            navigationOptions:({ navigation }) => getOptions('围栏',navigation)            
        },
        Details:{
            screen:Details,
            navigationOptions:({ navigation }) => getOptions('详情',navigation)            
        },
        PhotoAlbum:{
            screen:PhotoAlbum,
            navigationOptions:({ navigation }) => getOptions()            
        },
        AddFence:{
            screen:AddFence,
            navigationOptions: ({ navigation }) => (
                {
                    ...getOptions('添加围栏',navigation),
                    headerStyle:{
                        backgroundColor:'#fff',
                        borderBottomColor:'#fff',
                        elevation:0
                    },
                }),
        },
        Share:{
            screen:Share,
            navigationOptions:({ navigation }) => getOptions('分享',navigation)           
        },
        PullList:{
            screen:PullList,
            navigationOptions:({ navigation }) => getOptions('普通列表',navigation)           
        },
        GroupList:{
            screen:GroupList,
            navigationOptions:({ navigation }) => getOptions('分组列表',navigation)            
        },
        PullView:{
            screen:PullView,
            navigationOptions:({ navigation }) => getOptions('上拉刷新下拉加载',navigation)        
        },        
        Switch:{
            screen:Switch,
            navigationOptions:({ navigation }) => getOptions('开关',navigation)            
        },
        GetWheel:{
            screen:GetWheel,
            navigationOptions:({ navigation }) => getOptions('滚轮',navigation)            
        },
        PhotoDeatil:{
            screen:PhotoDeatil,
            navigationOptions:({ navigation }) => getOptions()            
        },  
        Datepicker:{
            screen:Datepicker,
            navigationOptions:({ navigation }) => getOptions('日期选择器',navigation)            
        },  
        RVC:{
            screen:RVC,
        },  
        Dialog:{
            screen:Dialog,
            navigationOptions:({ navigation }) => getOptions('弹框',navigation)     
        },  
        Icon:{
            screen:Icon,
            navigationOptions:({ navigation }) => getOptions('图标',navigation)     
        }, 
        Empty:{
            screen:Empty,
            navigationOptions:({ navigation }) => getOptions('数据空白',navigation)     
        }, 
        Button:{
            screen:Button,
            navigationOptions:({ navigation }) => getOptions('按钮',navigation)     
        },
        Drawer:{
            screen:Drawer,
            navigationOptions:({ navigation }) => getOptions('底部抽屉',navigation)     
        },     
        Instruction:{
            screen:Instruction,
            navigationOptions:({ navigation }) => getOptions('指令',navigation)     
        },
        MediaSyn:{
            screen:MediaSyn,
            navigationOptions:({ navigation }) => getOptions('媒体同步',navigation)     
        },
        MediaContral:{
            screen:MediaContral,
            navigationOptions:({ navigation }) => getOptions('远程拍摄',navigation)     
        },
        MediaDetails:{
            screen:MediaDetails,
            navigationOptions:({ navigation }) => getOptions('媒体同步',navigation)     
        },
        Instructions:{
            screen:Instructions,
            navigationOptions:({ navigation }) => getOptions('指令详情',navigation)     
        },
        IconLibrary:{
            screen:IconLibrary,
            navigationOptions:({ navigation }) => getOptions('图标库',navigation)     
        }
    });

export const Root = createAppContainer(AppNavigator);
 