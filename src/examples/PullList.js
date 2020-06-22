import React,{Component} from 'react';
import {View,Text,Image} from 'react-native';
import {Circle} from '../index';

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
            <Circle.PullList style={{backgroundColor:'#eee'}}
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
            <Text style={{marginTop:20}}>{I18n.t('暂无数据')}</Text>
        </View>;
    }
}