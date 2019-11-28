/*
 * @Descripttion: 
 * @version: 
 * @Author: liujinyuan
 * @Date: 2019-10-26 09:05:31
 * @LastEditors: liujinyuan
 * @LastEditTime: 2019-10-26 17:43:31
 */

import React, {Component} from 'react';
import {Text, View,Animated,TouchableOpacity} from 'react-native';
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
          this.sequenceOpacity();
      }


      render(){
          return (
              <View style={this.renderStyle()}>
                  <Animated.View style={{flex:1, width:'100%',height:'100%',backgroundColor:'#000',opacity:this.state.opacity}}>
                      <TouchableOpacity activeOpacity={0} onPress={this.onPress} style={{flex:1}}></TouchableOpacity>
                  </Animated.View>
                  {/* {this.state.element} */}
                  <View style={this.buildStyle()} pointerEvents='box-none'>
                      {this.renderContent()}
                  </View>
              </View>
          );
      }

      renderContent (){
          return this.props.children;
      }

      buildStyle (){
          let style = [{position:'absolute',zIndex:1001}].concat(style);
          return style;
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
                        duration:0
                    }
                )
            ]);
        }

        this.props.onPress && this.props.onPress();
    }


    get appearAnimates() {
        let duration = 100;
        let animates = [
            Animated.timing(this.state.opacity, {
                toValue: this.props.opacity,
                duration,
            })
        ];
        return animates;
    }

    sequenceOpacity = () => {
        Animated.sequence(this.appearAnimates).start();
    }
}

export default OverlayView;