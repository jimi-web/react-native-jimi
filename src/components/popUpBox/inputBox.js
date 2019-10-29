/*
 * @Descripttion:
 * @version:
 * @Author: xieruizhi
 * @Date: 2019-10-09 15:34:12
 * @LastEditors: liujinyuan
 * @LastEditTime: 2019-10-28 12:00:23
 */
import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    DeviceEventEmitter,
    TouchableOpacity,
    Text,
    Image,
    Platform
} from 'react-native';
import PropTypes from 'prop-types';
import PopUpBox from './PopUpBox';
import { Input } from 'teaset';
import Toast from '../../components/toast/OtherToast';

export default class InputBox extends Component {

    static propTypes = {
        onConfirm:PropTypes.func,
    }

    static defaultProps = {
        onConfirm:()=>{ 
            //
        }
    }


    constructor(props) {
        super(props);
        this.state = {
            searchValue: '',
            isDelShow: true,
            visible: false,
            inputBoxTop:'50%',
            title:this.props.title ?this.props.title :'输入框',
            autoFocus:true
        };
    }

    componentDidMount() {
        DeviceEventEmitter.addListener('jmInputBoxShow', res=>{
            this.setState({
                visible:res.visible,
                searchValue:res.value
            });
        });
    }

    static show(value) {
        let data = {
            value:value,
            visible:true
        };
        DeviceEventEmitter.emit('jmInputBoxShow',data);
    }

    static hide() {
        DeviceEventEmitter.emit('jmInputBoxShow',{visible:false});
    }

    componentWillUnmount() {
        DeviceEventEmitter.removeAllListeners('jmInputBoxShow');
    }


    render() {
        return (
            <PopUpBox visible={this.state.visible} onShadow={()=>{this.onShadow();}}>
                <View style={[styles.inputBox,{top:this.state.inputBoxTop}]}>
                    <View style={styles.content}>
                        <Text style={styles.name}>{this.state.title}</Text>
                        <View style={styles.inputName}>
                            {
                                this.state.autoFocus ? 
                                    <Input
                                        style={[styles.inputItem,{borderRightWidth:this.state.isDelShow?0:1}]}
                                        value={this.state.searchValue}
                                        maxLength={this.props.maxLength ? this.props.maxLength:30}
                                        onFocus={() => {
                                            this.onFocus();
                                        }}
                                        onBlur={() => {
                                            this.onBlur();
                                        }}
                                        onChangeText={text => {
                                            this.onChangeText(text);
                                        }}
                                        autoFocus={this.state.autoFocus}
                                        ref='inputName'
                                    ></Input>:null
                            }
                       
                            {this.state.isDelShow ? 
                                <TouchableOpacity
                                    style={styles.inputDel}
                                    activeOpacity={1}
                                    onPress={() => {
                                        this.setState({
                                            searchValue: '',
                                            autoFocus:false
                                        },()=>{
                                            this.setState({
                                                autoFocus:true
                                            });
                                        });
                                    }}
                                >
                                    <Image
                                        source={require('../../assets/fence/list_delete.png')}
                                    ></Image>
                                </TouchableOpacity>
                                : null}
                        </View>
                    </View>
                    <View style={styles.btn}>
                        <TouchableOpacity style={styles.btnItem} onPress={()=>{this.onCancel();}}>
                            <Text style={styles.btnItemText}>取消</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[
                                styles.btnItem,
                                { borderLeftWidth: 1, borderLeftColor: '#d8d8d88a' }
                            ]}
                            onPress={()=>{this.onConfirm();}}
                        >
                            <Text style={styles.btnItemText}>确定</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <Toast message={this.props.title}>
                </Toast>
            </PopUpBox>
        );
    }

  onFocus = () => {
      this.setState({
          isDelShow: true,
          inputBoxTop:Platform.OS === 'ios' ? '30%':'50%'
      });
  };

  onBlur = () => {
      this.setState({
          isDelShow: false,
          inputBoxTop:'50%'
      });
  };

  onChangeText = text => {
      this.setState({
          searchValue: text
      });
  };

  onCancel = () => {
      this.setState({
          visible: false
      });
  };

  onConfirm = () => {
      if(!this.state.searchValue){
          Toast.show();
      }else {
          this.setState({
              visible: false
          });
          this.props.onConfirm&& this.props.onConfirm(this.state.searchValue);
      }
  };

  onShadow = ()=> {
      this.refs.inputName.blur();
  }
}

const styles = StyleSheet.create({
    inputBox: {
        position: 'absolute',
        left: '50%',
        top: '50%',
        marginLeft: -135,
        marginTop: -85,
        width: 270,
        height: 170,
        backgroundColor: '#F6F6F6',
        borderRadius: 12
    },
    content: {
        width: '100%',
        height: 125,
        paddingLeft: 15,
        paddingRight: 15
    },
    name: {
        marginTop: 20,
        fontSize: 17,
        color: '#030303',
        textAlign: 'center'
    },
    btn: {
        width: 270,
        height: 45,
        flexDirection: 'row',
        borderTopColor: '#d8d8d88a',
        borderTopWidth: 1
    },
    btnItem: {
        width: '50%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    btnItemText: {
        fontSize: 17,
        color: '#0076FF'
    },
    inputName: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
    },
    inputItem: {
        flex: 1,
        borderColor: '#E3E3E3',
        borderWidth: 1,
        borderRadius: 0,
        height: 42,
        marginTop: 0,
    },
    inputDel: {
        height: 42,
        width: 24,
        justifyContent: 'center',
        backgroundColor: '#fff',
        borderColor: '#E3E3E3',
        borderWidth: 1,
        borderLeftWidth: 0
    }
});
