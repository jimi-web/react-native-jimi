<!--
 * @Descripttion: 
 * @version: 
 * @Author: xieruizhi
 * @Date: 2019-09-02 14:09:39
 * @LastEditors: liujinyuan
 * @LastEditTime: 2019-09-03 13:49:27
 -->
# `Position` 地图定位

只有元素名字不一样，其他属性都相同
`<Jimi.BaiduPosition />` 谷歌地图
`<Jimi.GooglePosition />` 百度地图

##Props
| Prop | Type | required | Default | Note
|------|:----:|:--------:|:-------:| -----
|mapType|String| false | 'standard'|地图类型 <br>- standard: 标准 <br>- satellite: 卫星
|initialRegion|Object|false | {<br>latitude: 22.596904,<br>longitude:113.936674,<br>latitudeDelta:0.0922,<br>longitudeDelta:0.0421<br>}|地图初始化地区
|trafficEnabled|Bool|false | false|是否打开路况图层 <br>true && false
|isRefresh|Bool|false | true|是否刷新定位信息 <br>true && false
|refreshTime|Number|false | 15000|定位信息更新时间
|markerOperation|Object|false | 有默认属性 |标记点属性 <br>{ <br>style:{width:100,height:100},<br>image:require('./../../assets/map/oldMan.png')<br>}
|markerOperation|Object|false | 有默认属性 |标记点属性,只有谷歌地图能自定义样式 style，百度传无效 <br>{ <br>style:{width:100,height:100},<br>image:require('./../../assets/map/oldMan.png'}
|mylocationOperation|Object|false | 有默认属性 |我的位置点属性,只有谷歌地图能自定义样式 style，百度传无效 <br>{ <br>style:{width:100,height:100},<br>image:require('./../../assets/map/oldMan.png')<br>}
|ChangePositionBtn|Object|false | 有默认属性 |我的位置和自定义标记的图标设置<br>-style: 自定义样式<br>-markerImg: 自定义标记图标 <br>-myPositionImg: 自定义我的位置图标<br>{<br> style:{width:100,height:100}  <br>markerImg:require('./../../assets/map/equipment.png'),<br>myPositionImg:require('./../../assets/map/old.png')<br>}
|getMarkerPoint|Function|false | 使用几米圈模板接口 | 设置定位信息，具体方法写法参考下面例子
|customItem|Function|false | 有默认属性|在地图上自定义其他元素
|markerInfoWindow|Object|false | 有默认属性|自定义inforWindow属性<br>- isCustom:是否自定义(百度地图无需传)<br>- markerInfo:自定义内容<br>{<br>isCustom:false,<br>markerInfo:()=>{}<br>}|-
|roadBtnStyle|Object|false | 有默认样式 |设置路况图标样式 <br> {width:100,height:100}
|mapTypeBtnStyle|Object|false | 有默认样式 |设置地图图标样式 <br> {width:100,height:100}


## 尝试
#### MapView Props 属性
| Prop                    | Type  | Default  | Description
| ----------------------- |:-----:| :-------:| -------
| zoomControlsVisible     |bool| true     | 是否显示缩放控件<br>Android only
| trafficEnabled          | bool  | false    | 是否打开路况图层
| baiduHeatMapEnabled     | bool  | false    | 是否打开热力图
| mapType                 | number| 1        | 地图类型：标准地图=1、卫星地图=2
| zoom                    | number| 10       | 地图缩放级别
| center                  | object| null     | 地图中心位置，{latitude: 0, longitude: 0}王球儿王企鹅群翁王企鹅无企鹅王企鹅佛山市的范德萨发票独守空房破损的看法破第三个独守空房肯定是破防空洞双排扣范德萨咖啡店【说刀法【是大佛【平顶山佛【拍            摄的佛【第三批佛【破防【排第三佛挡杀佛【多方
| buildingsEnabled        | bool  | true     | 是否显示3D楼块效果
| overlookEnabled         | bool  | true     | 是否打开俯仰角效果
| visualRange             | array | []       | 地图可是范围
| correctPerspective      | object| undefined| 是否支持透视效果，Android only
| onMapStatusChangeStart  | func  | undefined| 回调：地图状态开始更改，Android only
| onMapStatusChange       | func  | undefined| 回调：地图状态改变
| onMapStatusChangeFinish | func  | undefined| 回调：地图状态改变完成，Android only
| onMapLoaded             | func  | undefined| 回调：地图已加载完成
| onMapClick              | func  | undefined| 回调：地图点击
| onMapDoubleClick        | func  | undefined| 回调：双击地图
| onMarkerClick           | func  | undefined| 回调：点击Marker
| onMapPoiClick           | func  | undefined| 回调：点中底图标注
| onBubbleOfMarkerClick   | func  | undefined| 回调：点击气泡，Android only

##Demo
例子一，默认定位
```
import React, {Component} from 'react';
import {View} from 'react-native';
import {Jimi} from 'react-native-jimi';
export default class Map extends Component {
    constructor(props) {
        super(props);
    }

    render(){
        return <View style={{flex:1}}>
            <Jimi.BaiduPosition/>
        </View>;  
    }	

}

```


例子二，自定义样式定位

```
import React, {Component} from 'react';
import {View,StyleSheet,Text} from 'react-native';
import {Jimi} from 'react-native-jimi';

export default class Map extends Component {
    constructor(props) {
        super(props);
    }
    render(){
        let obj= {
            // style:styles.marker,
            image:require('../../assets/map/icon_car.png'),
        };

        let car = {
            isShow:false
        };

        let my = {
            image:require('../../assets/map/oldMan.png'),
        };

        let markerInfoWindow = {
            isCustom:true,
            markerInfo:this.markerInfo
        };

        return <View style={{flex:1}}>
            <Jimi.BaiduPosition
                getMarkerPoint={this.getPoint}
                trafficEnabled={false}
                mapType={'standard'}
                markerOperation={obj}
                refreshTime = {20000}
                ChangePositionBtn={car}
                mylocationOperation={my}
                customItem = {this.customItem}
                mapTypeBtnStyle={styles.set}
                // markerInfoWindow={markerInfoWindow}
            >
            </Jimi.BaiduPosition>
        </View>;  
    }

    
    componentDidMount() {
  
    }


    /**
     * 在地图上自定义样式
     */
    customItem = ()=>{
        return <View style={styles.customItem}>
        </View>;
    }

    /**
     * 自定义infoWindow
     */
    markerInfo = ()=>{
        return <View style={{width:100,backgroundColor:'#fff'}}>
            <Text>1111111111111111</Text>
        </View>;        
    }

    /**
     * 接口自定义
     */
    getPoint=(setLocationData)=>{
        let data = {
            imei:'355137100102921',
            latitude:22.54605355,
            longitude:114.02597366,
            gpsTime:'2019-08-09 10:37:42',
            otherPosTime:'2019-08-09 10:37:42',
            posType:'WIFI',
            gpsSpeed:'10',
            address:'深圳市宝安区留仙一路高新奇b栋几米物联有限公司gubuygyhiuhuihui',
            rotate:120.00,
        };
        setLocationData(data);
    }     
}

const styles =  StyleSheet.create({
    marker:{
        width:20,
        height:20
    },
    customItem:{
        position:'absolute',
        left:20,
        top:20,
        width:50,
        height:50,
        backgroundColor:'#000' 
    },
    set:{
        position:'absolute',
        right:40,
        zIndex:100,
    }
});

```

## 数据模板



