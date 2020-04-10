/*
 * @Descripttion: 按钮
 * @version: 
 * @Author: liujinyuan
 * @Date: 2019-08-12 16:08:59
 * @LastEditors  : xieruizhi
 * @LastEditTime : 2019-12-28 13:50:59
 */


import React from 'react';
import {Text,TouchableOpacity} from 'react-native';
import Theme from '../themes/index';
import PropTypes from 'prop-types';
export default class Button extends TouchableOpacity {
    static propTypes = {
        ...TouchableOpacity.propTypes,
        type: PropTypes.oneOf(['default', 'primary', 'danger']),
        size: PropTypes.oneOf([ 'md', 'sm', 'xs']),
        title: PropTypes.oneOfType([PropTypes.element, PropTypes.string, PropTypes.number]),
        titleStyle: Text.propTypes.style,
    };

    static defaultProps = {
        ...TouchableOpacity.defaultProps,
        type: 'default',
        size: 'md',
    };

    
    constructor(props){
        super(props);
        this.state = {
            
        };
    }
    renderStyle(){
        const {style,type,size,title} = this.props;
        let backgroundColor, borderColor, borderRadius;
        
        switch (type) {
        case 'default':
            backgroundColor = Theme.buttonBackColorDefault; 
            borderColor = Theme.buttonBorderColorDefault;
            break;
        case 'primary':
            backgroundColor = Theme.buttonBackColorPrimary; 
            borderColor = Theme.buttonBorderColorPrimary;
            break;
        case 'danger':
            backgroundColor = Theme.buttonBackColorDanger; 
            borderColor = Theme.buttonBorderColorDanger;
            break;
        }
        borderWidth = Theme.buttonBorderWidth;
        borderRadius = Theme.buttonBorderRadius;
        const styles = [{
            borderRadius,
            backgroundColor,
            borderColor,
            borderWidth,
            height:44,
            width:180,
            overflow: 'hidden',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
        }].concat(style);
        return styles;
    }
    renderEl(){
        const {type,size,title,titleStyle} = this.props;
        let textFont,textColor;
        switch (size) {
        case 'md':
            textFont = Theme.buttonFontMd;
            break;
        case 'sm':
            textFont = Theme.buttonFontSm;       
            break;
        case 'xs':
            textFont = Theme.buttonFontXs;       
            break;
        }
        switch (type) {
        case 'default':
            textColor = Theme.buttonColorDefault; 
            break;
        case 'primary':
            textColor = Theme.buttonColorPrimary;    
            break;
        case 'danger':
            textColor = Theme.buttonColorDanger;
            break;
        }
        titleStyles = [{
            fontSize:textFont,
            color:textColor
        }].concat(titleStyle);
        if(typeof title === 'string' || typeof title === 'number'){
            return <Text style={titleStyles}>{title}</Text>
        }else{
            return title;
        }
    }
    render(){
        return (
            <TouchableOpacity  {...this.props} style={this.renderStyle()}>
                {this.renderEl()}
                {this.props.children}
            </TouchableOpacity>
        );
    }
}

