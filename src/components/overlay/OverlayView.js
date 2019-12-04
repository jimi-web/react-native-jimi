/*
 * @Descripttion: 
 * @version: 
 * @Author: liujinyuan
 * @Date: 2019-10-26 09:05:31
 * @LastEditors: xieruizhi
 * @LastEditTime: 2019-12-03 14:11:20
 */

import React, {Component} from 'react';
import {Text, View,Animated,TouchableOpacity,StyleSheet} from 'react-native';
// import JmTopView from './TopView';
// import Theme from '../themes/index';
import PropTypes from 'prop-types';

class OverlayView extends Component{
    static propTypes = {
        opacity:PropTypes.number,
        style:Text.propTypes.style,
    };
    
      static defaultProps = {
          opacity:0.4,
      }
      constructor(props){
          super(props);
          this.state = {
              opacity:new Animated.Value(0),
          };
      }

      componentDidMount(){
          this.sequenceOpacity();
      }

      render(){
          return (
              <View style={styles.screen} pointerEvents={'auto'}>
                  <Animated.View style={[styles.screen,{backgroundColor:'#000',opacity:this.state.opacity}]}>
                      <TouchableOpacity activeOpacity={0} onPress={this.onPress} style={{flex:1}}></TouchableOpacity>
                  </Animated.View>
                  <View style={this.buildStyle()} pointerEvents={'box-none'}>
                      {this.renderContent()}
                  </View>
              </View>
          );
      }

      renderContent (){
          return this.props.children;
      }

      buildStyle (){
          let {style} = this.props;
          style = [{backgroundColor: 'rgba(0, 0, 0, 0)', flex: 1,justifyContent:'center',alignItems:'center'}].concat(style);
          return style;
      }

    onPress = () => {
        Animated.sequence([
            Animated.timing(
                this.state.opacity,
                {
                    toValue:0,
                    duration:0
                }
            )
        ]);
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



var styles = StyleSheet.create({
    screen: {
        backgroundColor: 'rgba(0, 0, 0, 0)',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
});

export default OverlayView;