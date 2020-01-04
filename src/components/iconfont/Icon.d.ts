/* eslint-disable */

import { FunctionComponent } from 'react';
// Don't forget to install package: @types/react-native
import { ViewProps } from 'react-native';
import { GProps } from 'react-native-svg';

interface Props extends GProps, ViewProps {
  name: 'bofang' | 'zanting' | 'back_chevron_black' | 'details_icon_car' | 'details_icon_bicycle' | 'details_icon_animal' | 'details_icon_other' | 'details_icon_person' | 'details_icon_truck' | 'details_icon_motorcycle' | 'position_bubble_electricity' | 'photo_viedo' | 'position_more_bubble_details' | 'position_more_bubble_navigation' | 'details_icon_card' | 'position_more_bubble_share' | 'fence_map_name-edit' | 'list_copy' | 'fence_operating_add' | 'track_operating_contract' | 'operating_select_disable' | 'details_icon_passenger_car' | 'fence_map_zoom' | 'track_share_checkbox_off' | 'details_icon_uav' | 'operating_select' | 'subordinate_arrow' | 'details_icon_taxi' | 'position_more_bubble_recording' | 'trajectory_play_X' | 'recording_operating_duration' | 'trajectory_play_X1' | 'position_more_bubble_traffic_card' | 'trajectory_play_edit_time' | 'photo_details_save' | 'trajectory_play_replay' | 'photo_save_success' | 'trajectory_play_line_on' | 'trajectory_play_X2' | 'photo_details_delete' | 'checkbox_pre' | 'fence_list_turnover' | 'fence_map_radius' | 'map_current_position' | 'fence_list_enter' | 'fence_list_off' | 'map_cutover_off' | 'recording_list_play_slider' | 'recording_list_playing' | 'map_cutover_on' | 'recording_list_downloading' | 'recording_list_undownload' | 'track_navigation' | 'photo_photo' | 'track_map_share' | 'track_share_checkbox_on' | 'recording_list_downloaded' | 'map_phone_position' | 'trajectory_map_phone_position' | 'map_road-condition_off' | 'track_share_pengyouquan' | 'track_share_weixin' | 'trajectory_play_on' | 'map_road-condition_on' | 'fence_list_out' | 'trajectory_play_line_off' | 'track_share_qq' | 'map_panoramic_off' | 'photo_list_management' | 'map_panoramic_on' | 'trajectory_map_end' | 'trajectory_play_off' | 'trajectory_map_start' | 'position_nav_track' | 'position_nav_more' | 'position_nav_fence' | 'position_nav_trajectory' | 'position_nav_setting' | 'trajectory_time_selection_arrow1' | 'trajectory_play_arrow1' | 'photo_save_failure1' | 'track_operating_expand' | 'video_mute_off' | 'video_mute_on' | 'video_full_screen_off' | 'video_full_screen_on' | 'list_delete' | 'video_voice_normal' | 'video_photo_normal' | 'video_voice_press' | 'video_recording_press' | 'video_photo_press' | 'video_recording_normal';
  size?: number;
  color?: string | string[];
}

export declare const Icon: FunctionComponent<Props>;

export default Icon;
