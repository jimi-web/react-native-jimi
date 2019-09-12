/*
 * @Descripttion: 图片集成导出 
 * @version: 
 * @Author: liujinyuan
 * @Date: 2019-08-12 11:54:39
 * @LastEditors: liujinyuan
 * @LastEditTime: 2019-09-12 10:50:39
 */

import React, {Component} from 'react';
import {Image,TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
// 图片对象,循环的图片数组，生成不同的图片，其中type
// 0 不可切换
// 1可切换状态
// 3 多种状态
const images = [
    {
        name:'home',
        type:1,
        default:require('./nav/home.png'),
        active:require('./nav/home_active.png'),
    },
    {
        name:'config',
        type:1,
        default:require('./nav/set.png'),
        active:require('./nav/set_active.png'),
    },
    {
        name:'wifi',
        type:3,
        default:[require('./nav/set.png'),require('./nav/set.png'),require('./nav/set.png')],
        active:[require('./nav/set_active.png'),require('./nav/set_active.png'),require('./nav/set_active.png')],
    }
];




export default class Icon extends TouchableOpacity {
    static propTypes = {
        ...TouchableOpacity.propTypes,
        type: PropTypes.number,
        icon:PropTypes.string,
        number:PropTypes.number
    };
    static defaultProps = {
        ...TouchableOpacity.defaultProps,
        type: 1,
        icon: 'home',
        style:{},
        number:0
    };
    constructor(props){
        super(props);
    }
    /**
     * 渲染图片
     */
    renderIcon(){
        const {icon,type,model} = this.props;
        const data = images.find(item => {
            return item.name == icon;
        });
        console.log(type,111);
        if(!data){
            return null;
        }
        let img;
        switch (model) {
        case 1:
            img = data.default;
            break;
        case 2:
            img = type == 0?data.default:data.active;
            break;
        case 3:
            const imgArr = type == 0?data.default:data.active;
            img = imgArr[number];
            break;
        default:
            img = data.default;
            break;
        }
       
        const styles = this.renderStyle();
        const imageElement = <Image style={styles} source={img} />;
        
        return imageElement;
    }
    /**
     * 样式
     */
    renderStyle(){
        const {style} = this.props;
        const styles = [{
            justifyContent: 'center',
            alignItems: 'center',

        }].concat(style);
        return styles;
    }
    render(){
        return (
            this.renderIcon()
        );
    }
}
