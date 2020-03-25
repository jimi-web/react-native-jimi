import React,{Component} from 'react';
import {SectionList,RefreshControl} from 'react-native';
import PropTypes from 'prop-types';
import PullList from './PullList'


export default class GroupList  extends PullList {
    static propTypes = {
        ...PullList.propTypes
        
    };
    
    static defaultProps = {
        ...PullList.defaultProps
    };



    constructor(props) {
        super(props);
    }


    renderContent = ()=>{
        return <SectionList 
        sections={this.props.data}
        refreshControl={
            <RefreshControl
                {...this.props.refreshControl}
                refreshing={this.props.refresStatus}
                onRefresh={this.props.onRefresh}
            />
        }
        renderItem={this.props.renderItem}
        renderSectionHeader={this.props.renderSectionHeader}
        onEndReachedThreshold={this.props.onEndReachedThreshold}
        onEndReached={this.props.onPullUp}
        extraData={this.props}
        keyExtractor={(item,index) => index.toString()+'pullList'}
        ListFooterComponent={this.renderFooter}
     />
    }
}