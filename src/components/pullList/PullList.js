import React,{Component} from 'react';
import {View,FlatList,Text,RefreshControl,ActivityIndicator,Image,TouchableOpacity} from 'react-native';
import {isIphoneX,iphoneXHeight} from '../../libs/utils';
import PropTypes from 'prop-types';

export default class PullList  extends Component {
    static propTypes = {
        refreshControl:PropTypes.object,//继承RefreshControl的属性
        activityIndicator:PropTypes.object,//加载图标自定义样式继承ActivityIndicator的属性
        data:PropTypes.array,//同FlatList中的data属性
        renderItem:PropTypes.func,//同FlatList中的renderItem属性
        refresStatus:PropTypes.bool,//是否下拉刷新状态
        pullUpStatus:PropTypes.number,//底部状态
        footerStyle:PropTypes.object,//底部框样式
        footerRefreshingText:PropTypes.string,//自定义底部刷新中文字
        footerFailureText:PropTypes.string,//自定义底部失败中文字
        footerNoMoreDataText:PropTypes.string,//自定义底部已加载全部数据文字
        footerEmptyDataText:PropTypes.string,//自定义空数据文字
        footerRefreshingComponent:PropTypes.element,//自定义底部刷新控件
        footerFailureComponent:PropTypes.element,//自定义底部失败控件
        footerNoMoreDataComponent:PropTypes.element,//自定义底部已加载全部数据控件
        footerEmptyDataComponent:PropTypes.element,//自定义空数据控件
        onRefresh:PropTypes.func,//上拉刷新监听事件
        onPullUp:PropTypes.func,//下拉加载监听事件
        onFail:PropTypes.func,//加载失败点击事件
        
    };
    
    static defaultProps = {
        refreshControl:{},
        activityIndicator:{},
        data:[],
        renderItem:()=>{},
        refresStatus:false,
        pullUpStatus:0,
        footerStyle:{},
        footerRefreshingText:'数据加载中，请稍后',
        footerFailureText:'点击重新加载',
        footerNoMoreDataText:'没有更多数据了',
        footerEmptyDataText:'暂无内容', 
        onRefresh:()=>{},
        onPullUp:()=>{}
    };



    constructor(props) {
        super(props);
    }

    render() {
        return <View style={{position:'relative',flex:1}}>
            <FlatList 
                data={this.props.data}
                refreshControl={
                    <RefreshControl
                        {...this.props.refreshControl}
                        refreshing={this.props.refresStatus}
                        onRefresh={this.props.onRefresh}
                    />
                }
                onEndReachedThreshold={0.2}
                onEndReached={this.props.onPullUp}
                extraData={this.props}
                renderItem={this.props.renderItem}
                keyExtractor={(item,index) => index.toString()+'pullList'}
                ListFooterComponent={this.renderFooter}
            ></FlatList>
            {
                this.props.pullUpStatus === 0 ? this.footerEmptyDataComponent():null
            }
        </View>;  
    }


    footerRefreshingComponent =()=>{
        let defaultElem =  <View style={[{alignItems:'center',paddingTop:20,height:isIphoneX()?iphoneXHeight(80):80},{...this.props.footerStyle}]}>
            <ActivityIndicator animating={true} {...this.props.activityIndicator} />
            <Text style={{marginTop:10}} >{this.props.footerRefreshingText}</Text>
        </View>;

        return this.props.footerRefreshingComponent ? this.props.footerRefreshingComponent:defaultElem;
    }

    footerFailureComponent =()=>{
        let defaultElem =  <TouchableOpacity style={[{alignItems:'center',paddingTop:20,height:isIphoneX()?iphoneXHeight(80):80},{...this.props.footerStyle}]} onPress={this.props.onFail}>
            <Text style={{marginTop:10}} >{this.props.footerFailureText}</Text>
        </TouchableOpacity>;
        return this.props.footerFailureComponent ? this.props.footerFailureComponent:defaultElem; 
    }

    footerNoMoreDataComponent =()=>{
        let defaultElem =  <View style={[{alignItems:'center',paddingTop:20,height:isIphoneX()?iphoneXHeight(80):80},{...this.props.footerStyle}]}>
            <Text style={{marginTop:10}} >{this.props.footerNoMoreDataText}</Text>
        </View>;
        return this.props.footerNoMoreDataComponent ? this.props.footerNoMoreDataComponent: defaultElem;
    }

    
    footerEmptyDataComponent =()=>{
        let defaultElem =  <View style={{alignItems:'center',position:'absolute',width:280,height:168,top:'50%',left:'50%',marginLeft:-140,marginTop:-163}}>
            <Image source={require('../../assets/fence/list_empty.png')}></Image>
            <Text style={{marginTop:30,color:'#979797',fontSize:16}}>{this.props.footerEmptyDataText}</Text>
        </View>;
        return this.props.footerEmptyDataComponent ? this.props.footerEmptyDataComponent: defaultElem; 
    }

    footerStatus = (status)=>{
        let elem = null;
        switch (status) {
        case 1:
            elem = this.footerRefreshingComponent();
            break;
        case 2:
            elem = this.footerNoMoreDataComponent();
            break;    
        case 3:
            elem = this.footerFailureComponent();
            break;      
        default:
            elem=null;
        }
        return elem;
    }

    /**
     * 底部提示
     */
    renderFooter = ()=> {
        return this.footerStatus(this.props.pullUpStatus);
    }
}