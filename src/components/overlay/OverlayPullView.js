/*
 * @Descripttion: 
 * @version: 
 * @Author: liujinyuan
 * @Date: 2019-10-26 09:05:31
 * @LastEditors: xieruizhi
 * @LastEditTime: 2019-12-03 10:45:21
 */

import React, {Component} from 'react';
import {Animated,Text,View} from 'react-native';
import OverlayView from './OverlayView';
import PropTypes from 'prop-types';

class OverlayPullView extends OverlayView{
    static propTypes = {
        ...OverlayView.propTypes,
        side: PropTypes.oneOf(['top', 'bottom', 'left', 'right']),
        friction:PropTypes.number
    };
    
      static defaultProps = {
          ...OverlayView.defaultProps,
          side: 'top',
          friction:12
      }

      constructor(props){
          super(props);
          Object.assign(this.state, {
              fadeAnim:new Animated.Value(0),
              translateY:0,
              showed:false
          });
      }

      get appearAnimates() {
          let animates = super.appearAnimates;
          animates.push(
              Animated.spring(this.state.fadeAnim, {
                  toValue:1,
                  friction: this.props.friction,
              })
          );
          return animates;
      }

      onLayout = (e)=>{
          let viewLayout = e.nativeEvent.layout;
          if (!this.state.showed) {
              this.setState({
                  showed:true,
                  translateY:-viewLayout.height
              });
          }
      }

      renderContent(){
          const translateY = this.state.fadeAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [0, this.state.translateY],
          });
          return (
              <Animated.View style={{opacity:this.state.showed?1:0,marginBottom:this.state.translateY,transform:[{translateY:translateY}]}} onLayout={(e) => this.onLayout(e)} >
                  {this.props.children}
              </Animated.View>
          );
      }

      buildStyle(){
          let {side} = this.props;
          let sideStyle;
          switch (side) {
          case 'top':
              sideStyle = {flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'stretch'};
              break;
          case 'left':
              sideStyle = {flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'stretch'};
              break;
          case 'right':
              sideStyle = {flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'stretch'};
              break;
          default:
              sideStyle =  {flexDirection: 'column', justifyContent: 'flex-end', alignItems: 'stretch'};
          }
          return super.buildStyle().concat(sideStyle);
      }
}

export default OverlayPullView;