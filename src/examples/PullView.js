import React,{Component} from 'react';
import {View,FlatList,Text,RefreshControl,ActivityIndicator} from 'react-native';
import {isIphoneX,iphoneXHeight} from '../libs/utils';

export default class PullView  extends Component {
    constructor(props) {
        super(props);
        this.state = {
            refreshing:false
        };
    }

    render() {
        return <View style={{flex:1}}>
            <FlatList style={{backgroundColor:'#eee'}}
                data={[
                    {key: 'Devin'},
                    {key: 'Jackson'},
                    {key: 'James'},
                    {key: 'Joel'},
                    {key: 'John'},
                    {key: 'Jillian'},
                    {key: 'Jimmy'},
                    {key: 'Julie'},
                    {key: 'Devin'},
                    {key: 'Jackson'},
                    {key: 'James'},
                    {key: 'Joel'},
                    {key: 'John'},
                    {key: 'Jillian'},
                    {key: 'Jimmy'},
                    {key: 'Julie'},
                    {key: 'Devin'},
                    {key: 'Jackson'},
                    {key: 'James'},
                    {key: 'Joel'},
                    {key: 'John'},
                    {key: 'Jillian'},
                    {key: 'Jimmy'},
                    {key: 'Julie'},
                    {key: 'Devin'},
                    {key: 'Jackson'},
                    {key: 'James'},
                    {key: 'Joel'},
                    {key: 'John'},
                    {key: 'Jillian'},
                    {key: 'Jimmy'},
                    {key: 'Julie'},
                    {key: 'Devin'},
                    {key: 'Jackson'},
                    {key: 'James'},
                    {key: 'Joel'},
                    {key: 'John'},
                    {key: 'Jillian'},
                    {key: 'Jimmy'},
                    {key: 'Julie'},
                    {key: 'Julie'},
                    {key: 'Devin'},
                    {key: 'Jackson'},
                    {key: 'James'},
                    {key: 'Joel'},
                    {key: 'John'},
                    {key: 'Jillian'},
                    {key: 'Jimmy'},
                    {key: 'Julie'},
                    {key: 'Devin'},
                    {key: 'Jackson'},
                    {key: 'James'},
                    {key: 'Joel'},
                    {key: 'John'},
                    {key: 'Jillian'},
                    {key: 'Jimmy'},
                    {key: 'Julie'},
                    {key: 'Joel'},
                    {key: 'John'},
                    {key: 'Jillian'},
                    {key: 'Jimmy'},
                    {key: 'Julie'},
                    {key: 'Devin'},
                    {key: 'Jackson'},
                    {key: 'James'},
                    {key: 'Joel'},
                    {key: 'John'},
                    {key: 'Jillian'},
                    {key: 'Jimmy'},
                    {key: 'Julie'},
                ]}
                refreshControl={
                    <RefreshControl
                        {...this.props.RefreshControl}
                        refreshing={this.state.refreshing}
                        onRefresh={this.onRefresh}
                    />
                }
            
                onEndReachedThreshold={0.2}
                extraData={this.state}
                renderItem={({item}) => <Text>{item.key}</Text>}
                keyExtractor={(item,index) => index.toString()}
                ListFooterComponent={this.renderFooter}
            ></FlatList>
        </View>
        ;  
    }


    onRefresh = ()=>{
        setTimeout(()=>{
            this.setState({
                refreshing:false
            });
        },3000);

        this.setState({
            refreshing:true
        });
    }

    /**
     * 底部提示
     */
    renderFooter = ()=> {
        return <View style={[{alignItems:'center',padding:20,paddingBottom:isIphoneX()? iphoneXHeight(20):20},{...this.props.footerStyle}]}>
            <ActivityIndicator animating={true} color={'#ccc'} {...this.props.footerIconStyle} />
            <Text style={{marginTop:10}} >{'数据加载中，请稍后'}</Text>
        </View>; 
    }
}