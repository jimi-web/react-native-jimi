/*
 * @Descripttion:
 * @version:
 * @Author: xieruizhi
 * @Date: 2019-09-19 13:38:09
 * @LastEditors: xieruizhi
 * @LastEditTime: 2020-06-12 11:07:40
 */
import React, { Component } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Jimi } from '../index';

export default class Track extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isBaidu: true
        };
    }

    render() {
        let playPolylineOptions = {
            color: '#1027cc',
            width: 3
        };
        return (
            // <View style={{ flex: 1 }}>
            //     {this.state.isBaidu ? 
            //         <Jimi.BaiduTrace
            //             onDeviceChange = {(data)=>{
            //                 console.log(data,'设备数据');
                            
            //             }}
            //             onMyChange = {(data)=>{
            //                 console.log(data,'我的位置');
            //             }}
            //             isRefresh={true}
            //             polylineOptions={playPolylineOptions}
            //             onFile={()=>{
            //                 this.props.navigation.push('PrivacyAgreement');
            //             }}
            //         >
            //             {this.customItem()}
            //         </Jimi.BaiduTrace>
            //         : 
            //         <Jimi.GoogleTrace polylineOptions={playPolylineOptions}>
            //             {this.customItem()}
            //         </Jimi.GoogleTrace>
            //     }
            // </View>
            <Jimi.Trace>
                 {this.customItem()}
            </Jimi.Trace>
        );
    }

  /**
   * 在地图上自定义样式
   */
  customItem = () => {
      return (
          <View style={styles.customItem}>
              <TouchableOpacity
                  onPress={() => {
                      this.setState({
                          isBaidu: !this.state.isBaidu
                      });
                  }}
              >
                  <Text>切换地图</Text>
              </TouchableOpacity>
          </View>
      );
  };
}

const styles = StyleSheet.create({
    customItem: {
        position: 'absolute',
        left: 20,
        top: 20,
        borderWidth: 1,
        borderColor: '#000',
        backgroundColor: '#fff',
        padding: 10
    }
});
