<!--
 * @Descripttion: 
 * @version: 
 * @Author: xieruizhi
 * @Date: 2019-09-24 15:28:09
 * @LastEditors: xieruizhi
 * @LastEditTime: 2019-10-17 13:44:51
 -->

# `GroupList` 上拉加载下拉刷新（分组列表）

## Props
| Prop | Type | required | Default | Note |
|---|---|---|---|---|
| [PullList props](http://172.16.0.101:3000/jmax/react-native-jimi/src/master/src/docs/components/PullList.md) | Oject | 无 | 无| 继承PullList所有属性 |
| renderSectionHeader | Element | 无 | 无| 分组的头部 |



## Demo
```
import React,{Component} from 'react';
import {View,Text,Image} from 'react-native';
import {Circle} from  'react-native-jimi';

let list = [
    { title: "Title1", data: ["item1", "item2"] },
    { title: "Title2", data: ["item3", "item4"] },
    { title: "Title3", data: ["item5", "item6"] },
    { title: "Title4", data: ["item1", "item2"] },
    { title: "Title5", data: ["item3", "item4"] },
    { title: "Title6", data: ["item5", "item6"] },
    { title: "Title7", data: ["item1", "item2"] },
    { title: "Title8", data: ["item3", "item4"] },
    { title: "Title9", data: ["item5", "item6"] },
    { title: "Title10", data: ["item1", "item2"] },
    { title: "Title11", data: ["item3", "item4"] },
    { title: "Title12", data: ["item5", "item6"] },
    { title: "Title13", data: ["item1", "item2"] },
    { title: "Title14", data: ["item3", "item4"] },
    { title: "Title15", data: ["item5", "item6"] },
    { title: "Title16", data: ["item1", "item2"] },
    { title: "Title17", data: ["item3", "item4"] },
    { title: "Title18", data: ["item5", "item6"] }
  ];


export default class GroupList  extends Component {
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
            <Circle.GroupList style={{backgroundColor:'#eee'}}
                data={this.state.testList}
                renderItem={({item}) => <Text>{item}</Text>}
                renderSectionHeader={({ section: { title } }) => (
                    <Text style={{ fontWeight: "bold" }}>{title}</Text>
                  )}
                onRefresh={this.onRefresh}
                pullUpStatus={this.state.pullUpStatus}
                refresStatus={this.state.refresStatus}
                onPullUp={this.onPullUp}
                footerEmptyDataComponent={this.footerEmptyDataComponent()}
                onFail={()=>{
                    this.onPullUp();
                }}
            />
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
                    data.push({ title: "Title18", data: ["item5", "item6"] });
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
