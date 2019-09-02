/*
 * @Descripttion: 
 * @version: 
 * @Author: xieruizhi
 * @Date: 2019-08-12 09:30:32
 * @LastEditors: xieruizhi
 * @LastEditTime: 2019-09-02 13:54:05
 */
import GooglePosition from './google/Position';
import BaiduPosition from './baidu/Position';

const Position = {
    Google: GooglePosition,
    Baidu:BaiduPosition
};

export default Position;
