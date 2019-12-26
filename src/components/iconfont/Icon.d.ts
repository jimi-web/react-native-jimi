/* eslint-disable */

import { FunctionComponent } from 'react';
// Don't forget to install package: @types/react-native
import { ViewProps } from 'react-native';
import { GProps } from 'react-native-svg';

interface Props extends GProps, ViewProps {
  name: 'zhifubao' | 'weixinzhifu' | 'home_icon_path' | 'home_icon_share' | 'home_icon_details' | 'home_icon_set' | 'home_icon_tracking' | 'home_icon_record' | 'home_icon_navigation' | 'home_icon_time' | 'home_icon_close' | 'home_icon_horn' | 'home_icon_place' | 'home_icon_roadcondi' | 'home_icon_location' | 'home_icon_roadcondi1' | 'home_icon_live-actio' | 'home_icon_vista' | 'home_icon_live-actio1' | 'path_icon_basestati' | 'path_icon_all' | 'path_icon_down_d' | 'nav_icon_reture' | 'path_icon_down' | 'home_icon_locat' | 'path_icon_play' | 'path_icon_satellite' | 'path_icon_stop' | 'record_icon_record' | 'path_icon_wifi' | 'path_icon_up_d' | 'tracking_icon_amplif' | 'path_icon_up' | 'record_icon_inform' | 'tracking_icon_narrow' | 'set_icon_fence' | 'set_icon_dismount' | 'set_icon_gain' | 'set_icon_sos' | 'set_icon_custom' | 'set_icon_speed' | 'set_icon_notice' | 'set_icon_electricity' | 'set_icon_more' | 'set_icon_vibration' | 'set_icon_work' | 'set_icon_wifi' | 'fence_icon_add' | 'detail_icon_copy' | 'fence_icon_edit' | 'fence_icon_cancle' | 'fence_icon_address' | 'fence_icon_fence' | 'mine_icon_search' | 'mine_icon_mass' | 'mine_icon_phone' | 'fence_icon_adds' | 'fence_icon_subtract' | 'mine_icon_indent' | 'set_icon_voice' | 'record_icon_voice' | 'set_icon_prevent' | 'record_icon_hand' | 'set_icon_card' | 'set_icon_locat' | 'set_icon_vibrat' | 'set_icon_mount' | 'sos_icon_del' | 'path_icon_timechoose' | 'chongdianicon' | 'icon_phone' | 'icon_mass' | 'wodeweizhi';
  size?: number;
  color?: string | string[];
}

export declare const Icon: FunctionComponent<Props>;

export default Icon;
