## 打开设备wifi热点
调用地址：http://smarthome.jimicloud.com/route/app
参数 | 类型  | 说明 
| - | :-: | :-: | - |
method | string  | 填"jimi.smarthome.device.custom.instruct.send"
imei | string | 设备imei
instruct | string | 填"WIFI,ON"
accessToken | string | 服务器登录token 测试用：2FCB70C6A1EE00CF688F5E9C54C3D502
timestamp | dete | 当前时间
app_key | string | 测试用：449A7D0E9C1911E7BEDB00219B9A2EF3
sign | string | 加密参数

### 参数sign说明
sign由secret和传给服务器的参数拼接之后用md5进行加密。
参数先根据key的ASCLL由小到大排序，sectet排前面，接着按keyvalue的格式拼接之前排序好的参数，最后将该字符串md5加密。secret测试时用695c1a459c1911e7bedb00219b9a2ef3。
- 格式：
  695c1a459c1911e7bedb00219b9a2ef3methodjimi.smarthome.device.custom.instruct.sendinstructWIFI,ONimei21321412app_key449A7D0E9C1911E7BEDB00219B9A2EF3accessToken2FCB70C6A1EE00CF688F5E9C54C3D502
  
### 连接设备UDPScoket服务，调用JMUDPScoketManager
#### 需要填写的参数
参数 | 类型  | 填写内容
| - | :-: | - |
host | string | 255.255.255.255
port | int | 1712
timeout | int | 5000
### 连接ftp，调用JMFTPSyncFileManager
#### 需要填写的参数
参数 | 类型  | 填写内容
| - | :-: | - |
baseUrl | string | 根据之前UDPScoket后返回内容自行拼接
mode | string | passive
port | int | 根据之前UDPScoket后返回内容自行拼接
account | string | admin
password | string | password
