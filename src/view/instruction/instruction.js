/*
 * @Descripttion: 指令组件
 * @version: 
 * @Author: liujinyuan
 * @Date: 2019-12-29 13:57:55
 * @LastEditors: liujinyuan
 * @LastEditTime: 2020-06-22 15:40:45
 */
import React, { Component } from 'react';
import {View,Text,ScrollView,ActivityIndicator} from 'react-native';
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
import InsTab from './InsTab';
import InsTime from './InsTime';
import Api from '../../api';
import {jmAjax} from '../../http/index';
import I18n from '../../language/index';
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
    /**
     * 将指令数据格式化成国际化包(由于二次传输，不建议使用该方法)
     * @param {Object} data 指令数据
     */
    static ftmInternation(data){
        data.forEach(item => {
             if(item.content){
                 item.content.text = I18n.t(item.content.text);
             }
             if(item.data){
                item.data.hint = I18n.t(item.data.hint);
                const instructionArr = item.data.instructionArr
                if(Array.isArray(instructionArr)){
                    instructionArr.forEach(value => {
                        value.hint = I18n.t(value.hint);
                        if(typeof value.content === 'string' || typeof value.content === 'number'){
                            value.content = I18n.t(value.content);
                        }else if(Array.isArray(value.content)){
                            value.content.forEach(v => {
                                v.text = I18n.t(v.text);
                                v.viceText = I18n.t(v.viceText);
                            })
                        }else if(typeof value.content === 'object'){
                            value.content.placeholder = I18n.t(value.content.placeholder);
                            value.content.text = I18n.t(value.content.text);
                            value.content.unit = I18n.t(value.content.unit);
                            if(Array.isArray(value.content.stepValue)){
                                value.content.stepValue.forEach(stepValue => {
                                    stepValue.text = I18n.t(stepValue.text);
                                })
                            }
                            if(Array.isArray(value.content.modelData)){
                                value.content.modelData.forEach(modelData => {
                                    modelData.text = I18n.t(modelData.text);
                                })
                            }
                        }
                    })
                }
             }
        })
        return data;
    }
    constructor(props){ 
        super(props);
        this.state = {
            insArr:JSON.parse(JSON.stringify(this.props.instructionArr)),
            setBtnFlag:false
        };
    }
    render(){
        return (
            <ScrollView style={{backgroundColor:'#f7f7f7',flex:1}}>
                {
                    this.props.hint ? 
                        <View style={{justifyContent:'center',padding:10,backgroundColor:'rgba(254, 116, 45, 0.5)'}}>
                            <Text style={{color:'#FE742D',lineHeight:16}}>{I18n.t(this.props.hint)}</Text>
                        </View>
                        :
                        null
                }
                {
                    this.props.instructionArr.map((item,index) => {
                        return <View key={index} style={this.renderItemStyle(item)}>{this.renderInstruction(item,index)}</View>;
                    })
                }
                {/* 底部按钮 */}
                {
                    this.props.isButton
                        ?
                        <View style={{marginTop:40,marginBottom:40,alignItems:'center'}}>
                            {
                                this.state.setBtnFlag ?
                                <Button style={{backgroundColor:baseStyle.disableColor,borderColor:baseStyle.disableColor}} 
                                activeOpacity={1} 
                                title={<View style={{flexDirection:'row',alignItems:'center'}}><Text style={{color:'#fff',marginRight:10,fontSize:14}}>{I18n.t('发送中')}</Text><ActivityIndicator size="small" color="#fff" /></View>} />:
                                    <Button style={{backgroundColor:baseStyle.mainColor}} titleStyle={{color:'#fff'}} onPress={() => this.onButton()} title={I18n.t('发送指令')} />
                            }
                        </View>
                        :
                        null
                }
            </ScrollView>
        );
    }
    /**
     * 渲染每一行的样式
     */
    renderItemStyle = (item) => {
        let itemStyle = item.itemStyle ? item.itemStyle: {};
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
    /**
     * 计算指令控制器，当指令属于受控状态会根据受控参数返回true和false
     * @param {*} data 整个指令列表
     * @param {*} item 当前条的数据
     */
    countContral = (data,item) => {
        // 若该指令不被控制则返回true
        if(item.contral == undefined){
            return true;
        }
        if(typeof item.contral != 'number' && Array.isArray(item.contral) == false){
            throw 'contral 需要一个Number/Array类型';
        }
        // 该指令根据控制字段来显示和隐藏
        if(item.contralValue == undefined){
            let insContralValue = data[item.contral].value;
            return insContralValue;
        }
        // 若该条参数只被一个控制器控制则根据对应的值进行判断
        if(typeof item.contralValue == 'string' || typeof item.contralValue == 'number' || typeof item.contralValue === 'boolean'){
            let insContralValue = data[item.contral].value;
            return insContralValue === item.contralValue
        }
        // 若被多个控制器控制则需要输入数组,并且控制器和值的下标一一对应。
        if(Array.isArray(item.contralValue) && Array.isArray(item.contral)){
            for (let i = 0; i < item.contral.length; i++) {
                const insContralValue = data[item.contral[i]].value;//控制器的值
                const itemValue = item.contralValue[i];//对应控制器的值
                if(typeof itemValue == 'string' || typeof itemValue == 'number' || typeof itemValue === 'boolean'){
                    let flag = true;
                    if(itemValue == undefined || itemValue === '*'){
                        flag  = false;
                    }
                    // 只要一个条件未满住，则隐藏
                    if(insContralValue !== itemValue && flag){
                        return false;
                    }
                }
                // 兼容多个值对应一个控制器
                if(Array.isArray(itemValue)){
                    for (let i = 0; i < itemValue.length; i++) {
                        const v = itemValue[i];
                        if(v === insContralValue){
                            return true;
                        }
                    }
                    return false;
                }

            }
            return true;
        }

        return true;
    }
    /*
    *渲染指令
    */
    renderInstruction = (item,index) => {
        this.state.insArr = this.props.instructionArr;
        let isShow = this.countContral(this.state.insArr,item);
        if(!isShow){
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
        case 'tab':
            element = <InsTab style={[baseStyle.leftOrRight]} isShow={isShow}  index={index} data={item} onSelect={(data,index) => this.onIns(data,index)} />;
            break;
        case 'time':
            element = <InsTime style={[baseStyle.leftOrRight,style]} index={index} data={item} onConfirm= {(data,index) => this.onIns(data,index)}/>;  
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
     onArrowButton = (data,index) => {
         this.props.onArrowButton && this.props.onArrowButton(data,index);
     }
     /*
     * 点击发送按钮
      */
     onButton = () => {
         const ins = this.getIns(this.state.insArr);
         for (let i = 0; i < this.state.insArr.length; i++) {
             const item = this.state.insArr[i];
             const content = item.content;
             let flag = this.countContral(this.state.insArr,item);
             if(item.stop && content.rule && flag){
                 let regExp = new RegExp(content.rule);//根据字符串生成正则
                 if(!regExp.test(item.value)){
                     return Toast.message(item.hint || '您当前输入的格式有误！');
                 }
             }
         }
         this.setState({
             setBtnFlag:true
         },()=>{
             this.setInstruction(this.state.insArr,ins);
         });
         
     }

     /**
      * 渲染占位指令内容
      */
     renderPerchIns = (data,item,ins) => {
        if(typeof item.contral != 'number'){
            throw 'contral 需要一个Number类型';
        }
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
                let insValue = item.insValue;
                if(item.content && item.content.symbol){
                    insValue += item.content.symbol;
                }
                if(item.contral !== undefined){
                    if(item.type == 'perch'){
                        ins = this.renderPerchIns(data,item,ins);
                    }else{
                        //这里加入判断
                        let insStatus = this.countContral(data,item)
                        if(insStatus){
                            ins = ins.replace(item.insID,insValue);
                        }else{
                            ins = ins.replace(item.insID,'');
                        }
                    }
                }else{
                    ins = ins.replace(item.insID,insValue);
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
       if(this.props.isButton){
            return;
        }
       let flag = true;
        // 处理被控制时值不被允许发送的逻辑   
        if(data.contral != undefined){
            flag = this.state.insArr[data.contral].value;
        }
       if(data.stop && data.content.rule && flag){
           let regExp = new RegExp(data.content.rule);//根据字符串生成正则
           if(!regExp.test(data.value)){
               return;
           }
       }
       this.setInstruction(this.state.insArr,ins);
   }
   /*
    *发送指令公用方法
     */
    setInstruction = (params,instrution) => {
        const url = Api.instruction;
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
            console.log(res,'指令成功');
            
            const insProps = {
                params,
                instrution 
            };
            this.props.setInstruction && this.props.setInstruction(insProps);
            this.setState({
                setBtnFlag:false
            });
        }).catch((res)=>{
            console.log(res,'失败');
            this.setState({
                setBtnFlag:false
            });
        }); 
    }
}