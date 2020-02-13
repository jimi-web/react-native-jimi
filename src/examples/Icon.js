/*
 * @Descripttion: 
 * @version: 
 * @Author: xieruizhi
 * @Date: 2019-12-27 17:43:23
 * @LastEditors  : liujinyuan
 * @LastEditTime : 2020-01-07 16:26:46
 */
import React,{Component} from 'react';
import {View,FlatList,Dimensions,ScrollView,Text} from 'react-native';
import { Circle } from '../index';
const {width} = Dimensions.get('window');
const { Icon }  = Circle;

export default class IconExample extends Component { 
    
    constructor(props){
        super(props);
        this.state = {
            iconArray:[
                'back_chevron_black',
                'details_icon_car',
                'details_icon_bicycle',
                'details_icon_animal',
                'details_icon_other',
                'details_icon_person',
                'details_icon_truck',
                'details_icon_motorcycle',
                'position_bubble_electricity',
                'photo_viedo',
                'position_more_bubble_details',
                'position_more_bubble_navigation',
                'details_icon_card',
                'position_more_bubble_share',
                'fence_map_name-edit',
                'list_copy',
                'fence_operating_add',
                'track_operating_contract',
                'operating_select_disable',
                'details_icon_passenger_car',
                'fence_map_zoom',
                'track_share_checkbox_off',
                'details_icon_uav',
                'operating_select',
                'subordinate_arrow',
                'details_icon_taxi',
                'position_more_bubble_recording',
                'track_operating_expand',
                'trajectory_play_X',
                'recording_operating_duration',
                'trajectory_play_X1',
                'position_more_bubble_traffic_card',
                'trajectory_play_edit_time',
                'photo_details_save',
                'trajectory_play_replay',
                'photo_save_success',
                'trajectory_play_line_on',
                'trajectory_play_X2',
                'photo_details_delete',
                'checkbox_pre',
                'fence_list_turnover',
                'fence_map_radius',
                'map_current_position',
                'fence_list_enter',
                'fence_list_off',
                'map_cutover_off',
                'recording_list_play_slider',
                'recording_list_playing',
                'map_cutover_on',
                'recording_list_downloading',
                'recording_list_undownload',
                'track_navigation',
                'photo_photo',
                'track_map_share',
                'track_share_checkbox_on',
                'recording_list_downloaded',
                'map_phone_position',
                'trajectory_map_phone_position',
                'map_road-condition_off',
                'track_share_pengyouquan',
                'track_share_weixin',
                'trajectory_play_on',
                'map_road-condition_on',
                'fence_list_out',
                'trajectory_play_line_off',
                'track_share_qq',
                'map_panoramic_off',
                'photo_list_management',
                'map_panoramic_on',
                'trajectory_map_end',
                'trajectory_play_off',
                'trajectory_map_start',
                'position_nav_track',
                'position_nav_more',
                'position_nav_fence',
                'position_nav_trajectory',
                'position_nav_setting',
                'trajectory_time_selection_arrow1',
                'trajectory_play_arrow1',
                'photo_save_failure1',
                'video_recording_normal',
                'video_photo_press',
                'video_recording_press',
                'video_voice_press',
                'video_voice_press',
                'video_photo_normal',
                'video_voice_normal',
                'list_delete',
                'video_full_screen_on',
                'video_full_screen_off',
                'video_mute_on',
                'video_mute_off',
            ]
        };
    }

    componentDidMount(){
        //
    }

    render(){
        return <ScrollView style={{flex:1}}>
            <View style={{flex:1, flexDirection: 'row',flexWrap: 'wrap', display:'flex'}}>
                {
                    this.state.iconArray.map((item)=>{
                        return <View style={{width:width/2,alignItems:'center',marginTop:15}}>
                            <Icon name={item} size={30}></Icon>
                            <Text style={{fontSize:10}}>{item}</Text>
                        </View>;
                    })
                }
                <View style={{width:width,height:80}}></View>
            </View>
        </ScrollView> ;
    }
}