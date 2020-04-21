import React from 'react';
import {Icon} from '../../components/index';

const iconList =  [{
    icon:(color,size)=><Icon name={'details_icon_car'} color={color}   size={size} />,
    key:'car',
    isActivate:false
},{
    icon:(color,size)=><Icon name={'details_icon_truck'} color={color}  size={size}  />,
    key:'truck',
    isActivate:false
},{
    icon:(color,size)=><Icon name={'details_icon_passenger_car'} color={color}  size={size}   />,
    key:'passenger',
    isActivate:false
},{
    icon:(color,size)=><Icon name={'details_icon_taxi'} color={color}  size={size}   />,
    key:'taxi',
    isActivate:false
},{
    icon:(color,size)=><Icon name={'details_icon_motorcycle'} color={color}  size={size}  />,
    key:'motorcycle',
    isActivate:false
},{
    icon:(color,size)=><Icon name={'details_icon_bicycle'} color={color}  size={size}   />,
    key:'bicycle',
    isActivate:false
},{
    icon:(color,size)=><Icon name={'details_icon_person'} color={color}  size={size}   />,
    key:'person',
    isActivate:false
},{
    icon:(color,size)=><Icon name={'details_icon_animal'} color={color}  size={size}  />,
    key:'animal',
    isActivate:false
},{
    icon:(color,size)=><Icon name={'details_icon_card'} color={color}  size={size}   />,
    key:'card',
    isActivate:false
},{
    icon:(color,size)=><Icon name={'details_icon_uav'} color={color}  size={size}  />,
    key:'uav',
    isActivate:false
},{
    icon:(color,size)=><Icon name={'details_icon_other'}  color={color} size={size}  />,
    key:'other',
    isActivate:false
}];

export {iconList}