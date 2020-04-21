import React, {Component} from 'react';
import {View, Dimensions, Image, Text, Slider, TouchableWithoutFeedback, TouchableOpacity, StyleSheet} from 'react-native';
import Video from 'react-native-video';
import {Icon} from '../../../components/index';
import {changeSreenDirection} from '../../../http/index';
import {isIphoneX,iphoneXHeight} from '../../../libs/utils';
import PropTypes from 'prop-types';
const screenWidth = Dimensions.get('window').width;

function formatTime(second) {
    let h = 0, i = 0, s = parseInt(second);
    if (s > 60) {
        i = parseInt(s / 60);
        s = parseInt(s % 60);
    }
    // 补零
    let zero = function (v) {
        return v >> 0 < 10 ? '0' + v : v;
    };
    return [zero(h), zero(i), zero(s)].join(':');
}

export default class VideoScreen extends Component {
  
    static propTypes = {
        url:PropTypes.string.isRequired,//视频路径
        videoCover:PropTypes.string.isRequired,//视频第一帧
        onChangeSreen:PropTypes.func,//屏幕切换回调
        onPlayChange:PropTypes.func,//播放状态回调
        isGoBackShow:PropTypes.bool,//是否返回箭头
    }

    static defaultProps = { 
        isGoBackShow:false,
        onChangeSreen:()=>{},
        onPlayChange:()=>{}
    }

    

    constructor(props) {
        super(props);
        this.state = {
            videoUrl: this.props.url,
            videoCover:this.props.videoCover,
            videoWidth: screenWidth,
            videoHeight: screenWidth * 9/16, // 默认16：9的宽高比
            showVideoCover: true,    // 是否显示视频封面
            showVideoControl: false, // 是否显示视频控制组件
            isPlaying: false,        // 视频是否正在播放
            currentTime: 0,        // 视频当前播放的时间
            duration: 0,           // 视频的总时长
            isFullScreen: false,     // 当前是否全屏显示
            playFromBeginning: false, // 是否从头开始播放
            // 兼容进度一直返回时间为当前时间的问题。
            totalProgressTime:0,//总进度
            currentProgressTime:-1,//当前进度
        };
    }

    componentWillUnmount() {
        if (this.state.isFullScreen) {
            changeSreenDirection('portrait').then(()=>{
                this.props.onChangeSreen && this.props.onChangeSreen(false);
            });
        } 
    }

  
    render() {
        return (
            <View style={styles.container} onLayout={this._onLayout}>
                <View style={{ position:'relative',width: this.state.videoWidth, height: this.state.videoHeight, backgroundColor:'#000000' }}>
                    {
                        this.state.isFullScreen ? 
                            this.state.showVideoControl ?this.props.isGoBackShow? <TouchableOpacity style={[styles.back,{left:isIphoneX()?iphoneXHeight(15):15}]}  activeOpacity={1} onPress={() => { this.onControlShrinkPress(); }}>
                                <Icon name={'back_chevron_black'} size={'100%'} color={'#fff'} />
                            </TouchableOpacity>:null:null:null
                    }
                    <Video
                        ref={(ref) => this.videoPlayer = ref}
                        source={{uri: this.state.videoUrl}}
                        rate={1.0}
                        volume={1.0}
                        muted={false}
                        paused={!this.state.isPlaying}
                        resizeMode={'contain'}
                        playWhenInactive={false}
                        playInBackground={false}
                        ignoreSilentSwitch={'ignore'}
                        progressUpdateInterval={250.0}
                        onLoadStart={this._onLoadStart}
                        onLoad={this._onLoaded}
                        onProgress={this._onProgressChanged}
                        onEnd={this._onPlayEnd}
                        onError={this._onPlayError}
                        onBuffer={this._onBuffering}
                        style={{width: this.state.videoWidth, height: this.state.videoHeight}}
                    />
                    {
                        this.state.showVideoCover ?
                            <Image
                                style={{
                                    position:'absolute',
                                    top: 0,
                                    left: 0,
                                    width: this.state.videoWidth,
                                    height: this.state.videoHeight
                                }}
                                resizeMode={'cover'}
                                source={{uri: this.state.videoCover}}
                            /> : null
                    }
                    <TouchableWithoutFeedback onPress={() => { this.hideControl(); }}>
                        <View
                            style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                width: this.state.videoWidth,
                                height: this.state.videoHeight,
                                backgroundColor: this.state.isPlaying ? 'transparent' : 'rgba(0, 0, 0, 0.2)',
                                alignItems:'center',
                                justifyContent:'center'
                            }}>
                            {
                                this.state.isPlaying ? null :
                                    <TouchableWithoutFeedback onPress={() => { this.onPressPlayButton(); }}>
                                        <Icon name={'trajectory_play_on'} color={'#fff'} size={60} />
                                    </TouchableWithoutFeedback>
                            }
                        </View>
                    </TouchableWithoutFeedback>
                    {
                        this.state.showVideoControl ?
                            <View style={[styles.control, {width: this.state.videoWidth,height:this.state.isFullScreen?isIphoneX()?iphoneXHeight(50):50:50}]}>
                                <View style={{width: this.state.videoWidth,height:50, flexDirection: 'row',alignItems:'center'}}>
                                    <TouchableOpacity activeOpacity={0.3} onPress={() => { this.onControlPlayPress(); }}>
                                        {/* <Image
                                            style={[styles.playControl,{marginLeft:this.state.isFullScreen?isIphoneX()?iphoneXHeight(15):15:15}]}
                                            source={this.state.isPlaying ? require('../../../assets/photo/video_icon_stop.png') : require('../../../assets/photo/video_icon_play.png')}
                                        /> */}
                                        <Icon  style={{marginLeft:this.state.isFullScreen?isIphoneX()?iphoneXHeight(15):15:15}} name={this.state.isPlaying ? 'zanting':'bofang'} size={20} color={'#fff'}/>
                                    </TouchableOpacity>
                                    <Text style={styles.time}>{formatTime(this.state.currentTime)}</Text>
                                    <Slider
                                        style={{flex: 1}}
                                        maximumTrackTintColor={'#999999'}
                                        minimumTrackTintColor={'#3479F6'}
                                        thumbTintColor={'#3479F6'}
                                        thumbImage={require('../../../assets/photo/circle_bule_icon.png')}
                                        value={this.state.currentTime}
                                        minimumValue={0}
                                        maximumValue={this.props.videoTime? parseInt(this.props.videoTime):this.state.duration}
                                        onValueChange={(currentTime) => { this.onSliderValueChanged(currentTime); }}
                                    />
                                    <Text style={styles.time}>{formatTime(this.props.videoTime?parseInt(this.props.videoTime):this.state.duration)}</Text>
                                    <TouchableOpacity activeOpacity={0.3} onPress={() => { this.onControlShrinkPress(); }}>
                                        {/* <Image
                                            style={[styles.shrinkControl,{marginRight:this.state.isFullScreen?isIphoneX()?iphoneXHeight(15):15:15}]}
                                            source={this.state.isFullScreen ? require('../../../assets/photo/icon_shrinkage_screen.png') : require('../../../assets/photo/icon_screen_full.png')}
                                        /> */}
                                        <Icon  style={{marginRight:this.state.isFullScreen?isIphoneX()?iphoneXHeight(15):15:15}}  name={this.state.isFullScreen ? 'video_full_screen_off' : 'video_full_screen_on'} size={35} color={'#fff'} />
                                    </TouchableOpacity>
                                </View>
                            </View> : null
                    }
                </View>
            </View>
        );
    }
  
    /// -------Video组件回调事件-------
  
  _onLoadStart = () => {
      console.log('视频开始加载');
  };
  
  _onBuffering = () => {
      console.log('视频缓冲中...');
  };
  
  _onLoaded = (data) => {
      console.log('视频加载完成');
      this.setState({
          duration: data.duration,
      });
  };
  
  _onProgressChanged = (data) => {
      console.log('视频进度更新');
      //   if (this.state.isPlaying) {
      //       this.setState({
      //           currentTime: data.currentTime,
      //       });
      //   }
      if(this.state.currentProgressTime == data.currentTime){
          this.state.totalProgressTime += 0.25;
      }else{
          this.state.totalProgressTime = data.currentTime;
          this.state.currentProgressTime = data.currentTime;//保存当前进度
      }
      //   console.log(this.state.currentTime,'视频进度更新',data,'获取的数据',this.state.totalProgressTime);
      if (this.state.isPlaying && this.state.totalProgressTime != 0) {
          this.setState({
              currentTime: this.state.totalProgressTime,
          });
      }
  };
  
  _onPlayEnd = () => {
      console.log('视频播放结束');
      this.setState({
          totalProgressTime:0,
          currentTime: 0,
          isPlaying: false,
          playFromBeginning: true
      });
  };
  
  _onPlayError = () => {
      console.log('视频播放失败');
  };
  
  ///-------控件点击事件-------
  
  /// 控制播放器工具栏的显示和隐藏
  hideControl() {
      if (this.state.showVideoControl) {
          this.setState({
              showVideoControl: false,
          });
      } else {
          this.setState(
              {
                  showVideoControl: true,
              },
              // 5秒后自动隐藏工具栏
              () => {
                  setTimeout(
                      () => {
                          this.setState({
                              showVideoControl: false
                          });
                      }, 5000
                  );
              }
          );
      }
  }
  
  /// 点击了播放器正中间的播放按钮
  onPressPlayButton() {
      let isPlay = !this.state.isPlaying;
      this.setState({
          isPlaying: isPlay,
          showVideoCover: false
      },()=>{
          this.props.onPlayChange(isPlay);
      });
      if (this.state.playFromBeginning) {
          this.videoPlayer.seek(0);
          this.setState({
              playFromBeginning: false,
          });
      }
  }
  
  /// 点击了工具栏上的播放按钮
  onControlPlayPress() {
      this.onPressPlayButton();
  }
  
  /// 点击了工具栏上的全屏按钮
  onControlShrinkPress() {
      if (this.state.isFullScreen) {
          changeSreenDirection('portrait').then(()=>{
              this.props.onChangeSreen && this.props.onChangeSreen(false);
          });
      } else {
          changeSreenDirection('landscapeLeft').then(()=>{
              this.props.onChangeSreen && this.props.onChangeSreen(true);
          });
      }
  }
  
  /// 进度条值改变
  onSliderValueChanged(currentTime) {
      this.videoPlayer.seek(currentTime);
      if (this.state.isPlaying) {
          this.setState({
              currentTime: currentTime
          });
      } else {
          this.setState({
              currentTime: currentTime,
              isPlaying: true,
              showVideoCover: false
          });
      }
  }
  
  /// 屏幕旋转时宽高会发生变化，可以在onLayout的方法中做处理，比监听屏幕旋转更加及时获取宽高变化
  _onLayout = (event) => {
      //获取根View的宽高
      let {width, height} = event.nativeEvent.layout;
    
      // 一般设备横屏下都是宽大于高，这里可以用这个来判断横竖屏
      let isLandscape = width > height;
      if (isLandscape){
          this.setState({
              videoWidth: width,
              videoHeight: height,
              isFullScreen: true,
          });
      } else {
          this.setState({
              videoWidth: width,
              videoHeight: width * 9/16,
              isFullScreen: false,
          });
      }
  };
  
  /// -------外部调用事件方法-------
  
  ///播放视频，提供给外部调用
  playVideo() {
      this.setState({
          isPlaying: true,
          showVideoCover: false
      });
  }
  
  /// 暂停播放，提供给外部调用
  pauseVideo() {
      this.setState({
          isPlaying: false,
      });
  }
  
  /// 切换视频并可以指定视频开始播放的时间，提供给外部调用
  switchVideo(videoURL, seekTime) {
      this.setState({
          videoUrl: videoURL,
          currentTime: seekTime,
          isPlaying: true,
          showVideoCover: false
      });
      this.videoPlayer.seek(seekTime);
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent:'center'
    },
    playButton: {
        width: 50,
        height: 50,
    },
    playControl: {
        width: 24,
        height: 24,
        marginLeft: 15,
    },
    shrinkControl: {
        width: 23,
        height: 23,
        marginRight: 15,
    },
    time: {
        fontSize: 12,
        color: 'white',
        marginLeft: 10,
        marginRight: 10
    },
    control: {
        height: 50,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        position: 'absolute',
        bottom: 0,
        left: 0,
    },
    back:{
        position:'absolute',
        top:35,
        left:15,
        width:25,
        height:25,
        borderRadius:3,
        zIndex:20
    }
});