




import React, { Component } from 'react';
import {
  StyleSheet, Dimensions, Text, View, FlatList, Animated, PanResponder,
  StatusBar,
} from 'react-native';
import Video from 'react-native-video';
import MediaControls, { PLAYER_STATES } from 'react-native-media-controls';
import Orientation from 'react-native-orientation';
var width = Dimensions.get('window').width;
import convertToCache from 'react-native-video-cache';
var RNFS = require('react-native-fs');
var height = Dimensions.get('window').height;
let arr = []
import AsyncStorage from '@react-native-community/async-storage';

class App extends Component {
  videoPlayer;

  constructor(props) {
    super(props);
    this.state = {
      currentTime: 0,
      status: 'starting',
      message: '--',
      duration: 0,
      isFullScreen: false,
      fullscreenStatus: false,
      isLoading: true,
      paused: true,
      playerState: PLAYER_STATES.PAUSED,
      soundArr: [
        {
          video: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4'
        },
        {
          video: 'https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-720p.mp4'
        },
        {
          video: 'https://vjs.zencdn.net/v/oceans.mp4'
        },

      ],
      videoArr: [],
      newArr:[],
      indx: 0
    };
  }



  UNSAFE_componentWillMount() {

    const { soundArr,newArr } = this.state
    soundArr.map(async (item, index) => {
      console.log('--item---', item)
      // arr.push('vfvfvf')

      await convertToCache(item.video)
        .then((message) => {
          console.log('-----', message)
          if (message) {
            arr.push({
              duration: 0, isFullScreen: false, refs: null, seeek: 0, video: message, fullscreenStatus: false, isLoading: true, paused: true, playerState: PLAYER_STATES.PAUSED, currentTime: 0
            })
            newArr.push({currentTime: 0,duration: 0})
            this.setState({})


            return
          }
        });

    })

    this.setState({
      videoArr: arr
    })

    if (Platform.OS === 'android') {
      var orient = Orientation.getInitialOrientation()
      this.setState({ orient: orient })
    }






    this._y = 0;
    this._animation = new Animated.Value(0);
    this._animation.addListener(({ value }) => {
      this._y = value;
    })

    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event([
        null,
        {
          dy: this._animation,
        },
      ]),
      onPanResponderRelease: (e, gestureState) => {
        if (gestureState.dy > 100) {
          Animated.timing(this._animation, {
            toValue: 300,
            duration: 200,
          }).start();
          this._animation.setOffset(300);
        } else {
          this._animation.setOffset(0);
          Animated.timing(this._animation, {
            toValue: 0,
            duration: 200,
          }).start();
        }
      },
    });
  }








  async componentDidMount() {
    let a = await AsyncStorage.getItem('time')
    let abc = JSON.parse(a)
    let d = await AsyncStorage.getItem('dur')
    let abcd = JSON.parse(d)
    let index = await AsyncStorage.getItem('index')
    let ind = JSON.parse(index)
    let newarr=await AsyncStorage.getItem('newArr')
    let newArr1=JSON.parse(newarr)
    await console.log('aaaaaaaaaaa', abc, 'd', abcd, "arr", arr, "ind", ind, "newArr1", newArr1)

    // let sek = await AsyncStorage.getItem('seek')
    // let seeek = JSON.parse(sek)
    if (newArr1) {
      newArr1.map((item,ind)=>{
        arr[ind].refs.seek(item.currentTime)
        arr[ind].currentTime = item.currentTime
      })
  
    }

    // if (seeek) {
    //   arr[ind].refs.seek(seeek)
    // }

    arr[ind].currentTime = abc
    arr[ind].duration = abcd
    this.setState({
      videoArr: arr,
      newArr:newArr1
    })
    // console.log('aaaaaaaaaaa', abc, 'd', abcd,"arr",arr)
  }

  onSeek = async (seek, ind) => {
    console.log('=seek=', seek, "ind", ind)
    let index = await AsyncStorage.getItem('index')
    let ind1 = JSON.parse(index)
    AsyncStorage.setItem('seek', JSON.stringify(seek))
    arr[ind].refs.seek(seek)

    this.setState({})
    // this.videoPlayer.seek(seek);
  };

  onPaused = async (playerState, ind) => {

    arr[ind].paused = !arr[ind].paused
    arr[ind].playerState = playerState

    this.setState({
      paused: !this.state.paused,
      playerState,
    });
    console.log('------pause', this.state.videoArr)

    let time = arr[ind].currentTime
    let dur = arr[ind].duration
    AsyncStorage.setItem('index', JSON.stringify(ind))
    AsyncStorage.setItem('time', JSON.stringify(time))
    AsyncStorage.setItem('dur', JSON.stringify(dur))

  };

  onReplay = (ind) => {
    arr[ind].playerState = PLAYER_STATES.PLAYING

    arr[ind].refs.seek(0)
    this.setState({ playerState: PLAYER_STATES.PLAYING });
    console.log('=seek=', arr[ind].refs)

    // this.videoPlayer.seek(0);
  };

  onProgress = (data, ind, e) => {
    const { isLoading, playerState,newArr } = this.state;
    // Video Player will continue progress even if the video already ended
    console.log('===progress', data, e)

    if (!arr[ind].isLoading && arr[ind].playerState !== PLAYER_STATES.ENDED) {
      arr[ind].currentTime = data.currentTime
      AsyncStorage.setItem('seek', JSON.stringify(data.currentTime))
      newArr[ind].currentTime=data.currentTime
      AsyncStorage.setItem('newArr', JSON.stringify(this.state.newArr))

      this.setState({})

    }

  };

  onLoad = (data, ind) => {
    console.log('------', data, "ind", ind, "dddddd", data.duration)
    arr[ind].duration = data.duration
    arr[ind].isLoading = false

    this.setState({ duration: data.duration, isLoading: false })
  };

  onLoadStart = (data, ind) => {
    arr[ind].isLoading = true

    this.setState({ isLoading: true })
  };

  onEnd = (ind) => {
    Orientation.lockToPortrait();
    arr[ind].playerState = PLAYER_STATES.ENDED
    AsyncStorage.setItem('seek', JSON.stringify(0))
    this.setState({ playerState: PLAYER_STATES.ENDED });
    console.log('endddd---')
  }

  onError = () => alert('Oh! ', error);

  exitFullScreen = () => {
    alert('no entry')
  };

  enterFullScreen = () => {
    alert('helllllll')
  };

  onFullScreen = (ind) => {
    if (arr[ind].fullscreenStatus) {
      arr[ind].fullscreenStatus = !arr[ind].fullscreenStatus
      this.setState({ fullscreenStatus: !this.state.fullscreenStatus })
      Orientation.lockToPortrait();
    } else {
      arr[ind].fullscreenStatus = !arr[ind].fullscreenStatus
      this.setState({ fullscreenStatus: !this.state.fullscreenStatus })

      Orientation.lockToLandscapeLeft();
    }
  };

  renderToolbar = () => (
    <View style={styles.toolbar}>
      <Text>I'm a custom toolbar </Text>
    </View>
  );

  onSeeking = (currentTime, ind) => {

    arr[ind].currentTime = currentTime
    console.log('====onseeking==')
    this.setState({ currentTime })
  };


  renderItem = ({ item, index }) => {
    const { fullscreenStatus } = this.state;
    const { width, height: screenHeight } = Dimensions.get("window");
    const videoHeight = width * 0.5625;

    const padding = 15;
    const statusBarHeight = StatusBar.currentHeight || 0;
    const yOutput = ((screenHeight - videoHeight) + ((videoHeight * .5) / 2)) - padding - statusBarHeight;
    const xOutput = ((width * .5) / 2) - padding;

    const opacityInterpolate = this._animation.interpolate({
      inputRange: [0, 300],
      outputRange: [1, 0],
    });

    const translateYInterpolate = this._animation.interpolate({
      inputRange: [0, 300],
      outputRange: [0, yOutput],
      extrapolate: "clamp",
    });

    const scaleInterpolate = this._animation.interpolate({
      inputRange: [0, 300],
      outputRange: [1, 0.5],
      extrapolate: "clamp",
    });

    const translateXInterpolate = this._animation.interpolate({
      inputRange: [0, 300],
      outputRange: [0, xOutput],
      extrapolate: "clamp",
    });

    const scrollStyles = {
      opacity: opacityInterpolate,
      transform: [
        {
          translateY: translateYInterpolate,
        },
      ],
    };

    const videoStyles = {
      transform: [
        {
          translateY: translateYInterpolate,
        },
        {
          translateX: translateXInterpolate,
        },
        {
          scale: scaleInterpolate,
        },
      ],
    };



    return (
      <View
        key={index}
        style={{ height: item.fullscreenStatus ? '100%' : height / 3, width: width, marginBottom: height / 40 }}>
        <Animated.View
          style={[{ width, height: videoHeight }, videoStyles]}
          {...this._panResponder.panHandlers}>

          <Video
            onEnd={() => this.onEnd(index)}
            onLoad={(data) => this.onLoad(data, index)}
            onLoadStart={(data) => this.onLoadStart(data, index)}
            onProgress={(data, eve) => this.onProgress(data, index, eve)}
            paused={arr[index].paused}
            // ref={videoPlayer => (this.videoPlayer = videoPlayer)}
            ref={ref => item.refs = ref}
            resizeMode='contain'
            style={StyleSheet.absoluteFill}
            source={{ uri: item.video }}
            // style={[styles.mediaPlayer, { width: '100%', height: item.fullscreenStatus ? '100%' : height / 3 }]}
            volume={0.0}
          />
          <MediaControls
            duration={arr[index].duration}
            isLoading={arr[index].isLoading}
            mainColor="#333"
            onFullScreen={this.onFullScreen}
            fullscreen={item.fullscreenStatus}
            onPaused={(data) => this.onPaused(data, index)}
            onReplay={() => this.onReplay(index)}
            onSeek={(data) => this.onSeek(data, index)}
            onSeeking={(data) => this.onSeeking(data, index)}
            playerState={arr[index].playerState}
            progress={arr[index].currentTime}
          />
        </Animated.View>
      </View>
    )
  }


  render() {
    const { fullscreenStatus, videoArr ,newArr} = this.state;
    console.log("Arr----", arr,"newArr",newArr)
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>

        <View style={[StyleSheet.absoluteFill, { justifyContent: 'center', alignItems: 'center' }
        ]} pointerEvents="box-none">

          <FlatList
            data={arr}
            // scrollEnabled={false}
            renderItem={this.renderItem}
            style={{ width: "95%", }}
            contentContainerStyle={{}}
            extraData={this.state}
          />


        </View>
      </View>

    );
  }
}

const styles = StyleSheet.create({
  toolbar: {
    marginTop: 30,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
  },
  scrollView: {
    flex: 1,
    backgroundColor: "#FFF",
  },

  mediaPlayer: {
    //height:height/3,
    position: 'absolute',
    top: 0,
    left: 0,
    //bottom: 110,
    right: 0,
    backgroundColor: 'black',
  },
});

export default App;
