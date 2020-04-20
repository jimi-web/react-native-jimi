/*
 * @Descripttion: 
 * @version: 
 * @Author: liujinyuan
 * @Date: 2019-08-15 17:00:45
 * @LastEditors: liujinyuan
 * @LastEditTime: 2019-08-15 17:00:48
 */

const photoFile = {
    videoList:[],//视频文件
    photoList:[],//图片文件
    remoteList:[],//远程相册
};


const photo = (state = photoFile,action) => {
    switch (action.type) {
    case 'SET_VIDEO_LIST':
        return {
            ...state,
            videoList:action.value
        };
    case 'SET_PHOTO_LIST':
        return {
            ...state,
            photoList:action.value
        };
    case 'SET_REMOTE_LIST':
        return {
            ...state,
            remoteList:action.value
        };
    default:
        return state;
    }
};

export default photo;