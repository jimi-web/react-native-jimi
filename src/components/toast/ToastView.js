/*
 * @Descripttion: 
 * @version: 
 * @Author: xieruizhi
 * @Date: 2019-10-10 16:01:37
 * @LastEditors: xieruizhi
 * @LastEditTime: 2019-11-25 14:18:00
 */
import React, { Component } from 'react';
import {
    View,
    Text,
    Image
} from 'react-native';
import PropTypes from 'prop-types';

export default class ToastView extends Component {
    static propTypes = {
        text: PropTypes.oneOfType([PropTypes.element, PropTypes.string, PropTypes.number]),
        icon: PropTypes.oneOfType([
            PropTypes.element,
            PropTypes.shape({uri: PropTypes.string}), //{uri: 'http://...'}
            PropTypes.number, //require('path/to/image')
        ]),
        position: PropTypes.oneOf(['top', 'bottom', 'center']),
    };
    
      static defaultProps = {
      };
  


    renderContent = ()=>{
        let {icon} = this.props;
        if (!icon && icon !== 0) return null;
        let image;
        if (!React.isValidElement(icon)) {
            let imageSource;
            imageSource = icon;
            image =  <Image
                style={{width: 40, height: 40, tintColor: '#ddd'}}
                source={imageSource}
            />;
        } else {
            image = icon;
        }
        return (
            <View style={{paddingBottom: 15}}>
                {image}
            </View>
        );
    }


    renderText = ()=> {
        let {text} = this.props;
        if (typeof text === 'string' || typeof text === 'number') {
            text = 
            <Text style={{color: '#fff', fontSize: 14}}>{text}</Text>
            ;
        }
        return text;
    }

    render(){
        let tip={
            padding:15,
            borderRadius:8,
            backgroundColor:'#000000bd',
            justifyContent: this.props.position === 'top' ? 'flex-start' : this.props.position === 'bottom' ? 'flex-end' : 'center',
            alignItems: 'center',
        };
        return  <View style={[tip,this.props.style]}>
            {this.renderContent()}
            {this.renderText()}
        </View>;
    }
}
