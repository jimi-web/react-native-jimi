/*
 * @Descripttion: 
 * @version: 
 * @Author: liujinyuan
 * @Date: 2019-10-26 09:05:31
 * @LastEditors: liujinyuan
 * @LastEditTime: 2019-10-26 17:43:31
 */

import React, {Component} from 'react';
import {Text, View,StyleSheet,Animated,DeviceEventEmitter,TouchableOpacity} from 'react-native';
import JmTopView from './TopView';
import Theme from '../themes/index';
import PropTypes from 'prop-types';

class OverlayView extends Component{
    static propTypes = {
        opacity:PropTypes.number,
        style:Text.propTypes.style,
        isRemoveOverlay:PropTypes.bool
    };
    
      static defaultProps = {
          opacity:0.4,
          style:{flex:1,justifyContent:'center',alignItems:'center'},
          isRemoveOverlay:true,
      }
      constructor(props){
          super(props);
          this.state = {
              opacity:new Animated.Value(0),
              element:null
          };
      }
      renderStyle(){
          const {style} = this.props; 
          const styles = [this.props.styles].concat(style);
          return styles;
      }
      // static sequenceAnimated(opacity){
      //     DeviceEventEmitter.emit('jmSequenceAnimated',{opacity});
      // }
      // componentWillMount() {
      //     let {registerTopViewHandler} = this.context;
      //     if (registerTopViewHandler) {
      //         registerTopViewHandler(this);
      //         return;
      //     }
      //     // DeviceEventEmitter.addListener('jmSequenceAnimated', e => this.sequenceOpacity(e));
      // }
      // componentWillUnmount() {
      //     let {unregisterTopViewHandler} = this.context;
      //     if (unregisterTopViewHandler) {
      //         unregisterTopViewHandler(this);
      //         return;
      //     }
      //     DeviceEventEmitter.removeAllListeners('sequenceOpacity');
      // }
      componentDidMount(){
          this.sequenceOpacity({opacity:this.props.opacity});
      }
      render(){
          return (
              <View style={this.renderStyle()}>
                  <Animated.View style={{flex:1, width:'100%',height:'100%',backgroundColor:'#000',opacity:this.state.opacity}}>
                      <TouchableOpacity activeOpacity={0} onPress={this.onPress} style={{flex:1}}></TouchableOpacity>
                  </Animated.View>
                  {this.state.element}
              </View>
          );
      }
    onPress = () => {
        if(this.props.isRemoveOverlay){
            this.setState({
                element:null
            });
            Animated.sequence([
                Animated.timing(
                    this.state.opacity,
                    {
                        toValue:0,
                        duration:100
                    }
                )
            ]);
        }

        this.props.onPress && this.props.onPress();
    }
    sequenceOpacity = ({opacity}) => {
        Animated.sequence([
            Animated.timing(
                this.state.opacity,
                {
                    toValue:opacity,
                    duration:100
                }
            )
        ]).start(() => {
            this.setState({
                element:<View style={{position:'absolute',zIndex:1001}}>{this.props.children}</View>
            });
        });
    }
}

export default OverlayView;