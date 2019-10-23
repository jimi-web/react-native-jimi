/*
 * @Descripttion:
 * @version:
 * @Author: xieruizhi
 * @Date: 2019-09-19 13:38:09
 * @LastEditors: xieruizhi
 * @LastEditTime: 2019-10-17 18:31:25
 */
import React, { Component } from 'react';
import { View } from 'react-native';
import { Jimi } from '../index';

export default class Share extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.share.show();
    }

    render() {
        return <Jimi.Share 
            ref={ref=>this.share=ref}
            onFile={()=>{
                this.props.navigation.push('PrivacyAgreement');
            }}
        />;
    }
}