/*
 * @Descripttion: 指令组件
 * @version: 
 * @Author: liujinyuan
 * @Date: 2019-12-29 13:57:55
 * @LastEditors: liujinyuan
 * @LastEditTime: 2020-04-07 17:30:35
 */
import React, { Component } from 'react';
import {View,Text,ScrollView,Image} from 'react-native';
import PropTypes from 'prop-types';
import {Toast,Button} from '../../components/index';
import InsSwitch from './InsSwitch';
import baseStyle from '../baseStyle';
import InsArrowButton from './InsArrowButton';
import InsSelect from './InsSelect';
import InsMultiSelect from './InsMultiSelect';
import InsInput from './InsInput';
import InsModelSelect from './InsModelSelect';
import InsStep from './InsStep';
import Api from '../../api';
import {jmAjax} from '../../http/index';
export default class Instruction extends Component {

    static propTypes = {
        instructionArr:PropTypes.array,
        instruction:PropTypes.string,
        isButton:PropTypes.bool,//是否需要按钮，当开启该按钮时，除确定外，所有事件都不会触发指令
    }

    static defaultProps = {
        instruction:'21323,ins1,ins2,ins3,ins4,ins5,ins6#',
        isButton:false,
        
    }
    constructor(props){ 
        super(props);
        // this.insArr = JSON.parse(JSON.stringify(this.props.instructionArr));
        this.state = {
            insArr:JSON.parse(JSON.stringify(this.props.instructionArr))
        };
    }
    render(){
        return (
            <ScrollView style={{backgroundColor:'#f7f7f7',flex:1}}>
                {
                    this.props.hint ? 
                        <View style={{justifyContent:'center',padding:10,backgroundColor:'rgba(254, 116, 45, 0.5)'}}>
                            <Text style={{color:'#FE742D'}}>{this.props.hint}</Text>
                        </View>
                        :
                        null
                }
                {
                    this.props.instructionArr.map((item,index) => {
                        return <View key={index} style={this.renderItemStyle()}>{this.renderInstruction(item,index)}</View>;
                    })
                }
                {/* 底部按钮 */}
                {
                    this.props.isButton
                        ?
                        <View style={{marginTop:40,marginBottom:40,alignItems:'center'}}>
                            <Button style={{backgroundColor:baseStyle.mainColor}} titleStyle={{color:'#fff'}} onPress={() => this.onButton()} title={'发送指令'} />
                        </View>
                        :
                        null
                }
            </ScrollView>
        );
    }

    componentWillMount(){
        console.log(this.state.instructionArr,'instructionArrinstructionArrinstructionArrinstructionArr');
    }
    /**
     * 渲染每一行的样式
     */
    renderItemStyle = () => {
        const {itemStyle} = this.props;
        const styles = [
            {
                justifyContent:'center',
                width:'100%',
                backgroundColor:'#fff',
                // paddingLeft:20,
                // paddingRight:20
            }
        ].concat(itemStyle);
        return styles;
    }
    /*
    *渲染指令
    */
    renderInstruction = (item,index) => {
        let isShow = true; 
        if(item.contral !== undefined){
            isShow = this.state.insArr[item.contral].value;
        }
        if(!isShow &&(item.type != 'switch' || item.type != arrowButton)){
            return null;
        }
        let element = null;
        let style = item.style || [];
        switch (item.type) {
        case 'switch':
            element = <InsSwitch style={[baseStyle.leftOrRight,style]} index={index} data={item} onValueChange={(data,index) => this.onIns(data,index)} />;
            break;
        case 'select':
            element = <InsSelect style={[baseStyle.leftOrRight,style]} isShow={isShow} index={index} data={item} onSelect={(data,index) => this.onIns(data,index)}  />;
            break;
        case 'multiSelect':
            element = <InsMultiSelect style={[baseStyle.leftOrRight,style]} isShow={isShow} index={index} data={item} onMultiSelect={(data,index) => this.onIns(data,index)} />;
            break;
        case 'input':
            element = <InsInput style={[baseStyle.leftOrRight,style]} isShow={isShow} index={index} data={item} onInput={(data,index) => this.onIns(data,index)} />;
            break;
        case 'title':
            element = <View index={index} style={[{flex:1,justifyContent:'center',paddingTop:12,paddingBottom:12,paddingLeft:15,paddingRight:15,backgroundColor:'#f7f7f7'},style]}><Text>{item.content}</Text></View>;  
            break;
        case 'arrowButton':
            element = <InsArrowButton style={[baseStyle.leftOrRight,style]} index={index} data={item} onPress={(item) => this.onArrowButton(item,index)} />;  
            break;
        case 'modelSelect':
            element = <InsModelSelect style={[baseStyle.leftOrRight,style]} isShow={isShow} index={index} data={item} onPress={(data,index) => this.onIns(data,index)} />;  
            break;
        case 'step':
            element = <InsStep style={[baseStyle.leftOrRight,style]} isShow={isShow} index={index} data={item} onEndTouches={(data,index) => this.onIns(data,index)}/>;  
            break;
        case 'perch':
            element = null;  
            break;
        case 'element':
            element = item.data;
            break;
        default:
            break;
        }
        return element;
    }
    /*
    * 点击跳转（跳转位置由外部自定义）
     */
     onArrowButton = (data) => {
         this.props.onArrowButton && this.props.onArrowButton(data);
     }
     /*
     * 点击发送按钮
      */
     onButton = () => {
         const ins = this.getIns(this.state.insArr);
         for (let i = 0; i < this.state.insArr.length; i++) {
             const item = this.state.insArr[i];
             if(item.stop){
                 return Toast.message(item.hint || '您当前输入的格式有误！');
             }
             
         }
         this.setInstruction(this.state.insArr,ins);
     }

     /**
      * 渲染占位指令内容
      */
     renderPerchIns = (data,item,ins) => {
         const value = data[item.contral].value;
         const insVlue = item.insSymmetry[value];
         const perchIns = ins.replace(item.insID,insVlue);
         return perchIns;
     }
    /*
    *匹配指令统一方法
     */
    getIns = (data) => {
        const {instruction} = this.props;
        let ins = instruction;
        for (let i = 0; i < data.length; i++) {
            const item = data[i];
            if(item.insID){
                if(item.contral !== undefined){
                    if(item.type == 'perch'){
                        ins = this.renderPerchIns(data,item,ins);
                    }else{
                        if(data[item.contral].value){
                            ins = ins.replace(item.insID,item.insValue);
                        }else{
                            ins = ins.replace(item.insID,'');
                        }
                    }
                    
                }else{
                    ins = ins.replace(item.insID,item.insValue);
                }
            }
        }
        return ins;
    }
    
    /*
    * 触发指令统一方法
    */
   onIns = (data,index) => {
       this.state.insArr[index]  = data;
       const insArr = JSON.parse(JSON.stringify(this.state.insArr));
       this.setState({
           insArr
       });
       const ins = this.getIns(this.state.insArr);
       const insProps = {
           ins,
           insArr:this.state.insArr
       };
       this.props.onIns && this.props.onIns(insProps);
       if(data.stop){
           return Toast.message(data.hint || '您当前输入的格式有误！');
       }
       if(this.props.isButton){
           return;
       }
       this.setInstruction(this.state.insArr,ins);
   }
   /*
    *发送指令公用方法
     */
    setInstruction = (params,instrution) => {
        const url = Api.instruction;
        console.log('内容：',instrution,'参数：',params);
        const data = {
            encodingType:'IMEI',
            cmdCode:instrution,
            cmdType:0,
            cmdId:this.props.id,
            isSync:0,
            offLineFlag:0,
            platform:'app',
            offLineInsType:'customIns',
            instructSetting:{data:params}
        };
        jmAjax({
            url,
            data,
            method:'POST',
            encoding:true,
            encodingType:true,
        }).then(res => {
            const insProps = {
                params,
                instrution 
            };
            this.props.setInstruction && this.props.setInstruction(insProps);
        }).catch((res)=>{
            console.log(res.message);
        }); 
    }
}