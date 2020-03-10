<!--
 * @Author: liujinyuan
 * @Date: 2020-02-25 21:59:53
 * @LastEditTime: 2020-02-25 22:03:35
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /code/react-native-jimi/src/docs/view/MediaSyn.md
 -->

# `MediaSyn` 相册分类

## Props
| Prop | Type | required | Default | Note |
|---|---|---|---|---|
| config | object | true | false | 连接设备的配置 |
| subPath | string | true | false | 需要下载的文件夹地址 |



## Demo
```
export default class MediaSyc extends Component { 

    constructor(props){
        super(props);
        this.config ={
            baseUrl:'192.17.1.227',
            mode:'passive',
            port:1245679,
            account:'jimitest',
            password:'jimi123'
        },
        this.subPath = 'www.baidu.com'
    }

    render(){
        return (
            <Jimi.MediaSyn config={this.config} subPath = {this.subPath} />
        )
    }

}
```

