<!--
 * @Descripttion: 
 * @version: 
 * @Author: xieruizhi
 * @Date: 2019-09-24 15:28:09
 * @LastEditors: xieruizhi
 * @LastEditTime: 2019-10-17 13:44:51
 -->

# `PullList` 上拉加载下拉刷新

## Props
| Prop | Type | required | Default | Note |
|---|---|---|---|---|
| refreshControl  (RefreshControl props) | Oject | 无 | 无| 头部刷新自定义样式继承RefreshControl的属性|
| activityIndicator (ActivityIndicator props) | Oject | 无 | 无| 底部默认加载图标自定义样式继承ActivityIndicator的属性|
| data | Array| true | 无 | 同FlatList中的data属性 |
| renderItem | Element| true | 无 | 同FlatList中的renderItem属性 |
| refresStatus | Boolean| 无 | false | 是否下拉刷新状态 |
| pullUpStatus | number | 0 | false | 0: 无数据  <br/> 1:数据加载中  <br/> 2:已加载全部数据  <br/> 3:加载失败 <br/> 4:默认状态无下拉到底部|
| footerStyle | Oject | false | 无 | 底部自定义样式，可设置底部距离高度，边距之类的 |
| footerRefreshingText	 | String | false | '数据加载中，请稍后' | 自定义底部刷新中文字 |
| footerFailureText	 | String | false | '点击重新加载' | 自定义底部刷新中文字 |
| footerNoMoreDataText	 | String | false | '没有更多数据了' | 自定义底部已加载全部数据文字 |
| footerEmptyDataText	 | String | false | '暂无内容' | 自定义空数据文字 |
| footerRefreshingComponent	 | Element | false | 无 | 自定义底部刷新控件 |
| footerFailureComponent	 | Element | false | 无 | 自定义底部失败控件 |
| footerNoMoreDataComponent	 | Element | false | 无 | 自定义底部已加载全部数据控件 |
| footerEmptyDataComponent	 | Element | false | 无 | 自定义空数据控件 |

## Events
| Event Name | Returns | Notes |
|---|---|---|
|onRefresh| 无 |上拉刷新监听事件 |
|onPullUp| 无 | 下拉加载监听事件 |
|onFail| 无 | 当pullUpStatus为3的时候的点击事件 |



## Demo
```
import React,{Component} from 'react';
import {View,Text,Image} from 'react-native';
import {Circle} from  'react-native-jimi';

const {PullList} =Circle;


let list = [{key: 'Devin'},
    {key: 'Devin'},
    {key: 'Devin'},
    {key: 'Devin'},
    {key: 'Devin'},
    {key: 'Devin'},
    {key: 'Devin'},
    {key: 'Devin'},
    {key: 'Devin'},
    {key: 'Devin'},
    {key: 'Devin'},
    {key: 'Devin'},
    {key: 'Devin'},
    {key: 'Devin'},
    {key: 'Devin'},
    {key: 'Devin'},
    {key: 'Devin'},
    {key: 'Devin'},
    {key: 'Devin'},
    {key: 'Devin'},
    {key: 'Devin'},
    {key: 'Devin'},
    {key: 'Devin'},
    {key: 'Devin'},
    {key: 'Devin'},
    {key: 'Devin'},
    {key: 'Devin'},
    {key: 'Devin'},
    {key: 'Devin'},
    {key: 'Devin'},
    {key: 'Devin'},
    {key: 'Devin'},
    {key: 'Devin'},
    {key: 'Devin'},
    {key: 'Devin'},
    {key: 'Devin'},
    {key: 'Devin'},
    {key: 'Devin'},
    {key: 'Devin'},
    {key: 'Devin'},
    {key: 'Devin'},
    {key: 'Devin'},
    {key: 'Devin'},
    {key: 'Devin'},
    {key: 'Devin'},
    {key: 'Devin'},
    {key: 'Devin'},
    {key: 'Devin'},
    {key: 'Devin'},
    {key: 'Devin'},
    {key: 'Devin'},
    {key: 'Devin'}];


export default class PullView  extends Component {
    constructor(props) {
        super(props);
        this.state = {
            refresStatus:false,
            pullUpStatus:0,
            testList:[],
            totalNum:2,
            pageNum:0
        };
    }

    render() {
        return <View style={{flex:1}}>
            <PullList style={{backgroundColor:'#eee'}}
                data={this.state.testList}
                renderItem={({item}) => <Text>{item.key}</Text>}
                onRefresh={this.onRefresh}
                pullUpStatus={this.state.pullUpStatus}
                refresStatus={this.state.refresStatus}
                onPullUp={this.onPullUp}
                footerEmptyDataComponent={this.footerEmptyDataComponent()}
                onFail={()=>{
                    this.onPullUp();
                }}
            ></PullList>
        </View>;  
    }

    componentDidMount(){
        this.init();
    }

    init =()=>{
        setTimeout(()=>{
            this.setState({
                testList:list,
                refresStatus:false,
                pullUpStatus:4,
                pageNum:0
            });
        },3000);

        this.setState({
            refresStatus:true
        });
    }


    onRefresh = ()=>{
        this.init();
    }

    onPullUp = ()=>{
        //没有更多数据
        if(this.state.pageNum===this.state.totalNum){
            this.setState({
                pullUpStatus:4,
            });
            return;
        }


        this.setState({
            pullUpStatus:1,//数据加载中
        },()=>{
            //模拟数据请求
            let pageNum = this.state.pageNum+1;
            setTimeout(()=>{
                let data = [];
                for(let i=0;i<5;i++){
                    data.push( {key: 'Julie'});
                }
                this.setState({
                    testList:[...this.state.testList,...data],
                    pageNum:pageNum
                },()=>{
                    this.setState({
                        pullUpStatus:4,
                    });
                }); 
            },2000);
        });
    }

    footerEmptyDataComponent=()=>{
        return <View style={{alignItems:'center',position:'absolute',width:280,height:168,top:'50%',left:'50%',marginLeft:-140,marginTop:-163}}>
            <Image source={require('../assets/fence/list_empty.png')}></Image>
            <Text style={{marginTop:20}}>暂无数据</Text>
        </View>;
    }
}

```
