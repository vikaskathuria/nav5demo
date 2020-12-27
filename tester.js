
// // import React, { Component } from 'react';
// // import { Alert } from 'react-native';
// // import firebase from 'react-native-firebase';

// // import Dashboard from './src/screens/Dashboard';

// // export default class App extends Component {
// //   componentDidMount() {
// //     // Create notification channel required for Android devices
// //     this.createNotificationChannel();

// //     // Ask notification permission and add notification listener
// //     this.checkPermission();
// //   }

// //   createNotificationChannel = () => {
// //     // Build a android notification channel
// //     const channel = new firebase.notifications.Android.Channel(
// //       'reminder',
// //       'Reminders Channel',
// //       firebase.notifications.Android.Importance.High
// //     ).setDescription('Used for getting reminder notification');

// //     // Create the android notification channel
// //     firebase.notifications().android.createChannel(channel);
// //   };

// //   checkPermission = async () => {
// //     const enabled = await firebase.messaging().hasPermission();
// //     if (enabled) {
// //       this.notificationListener = firebase.notifications().onNotification(async notification => {
// //         // Display your notification
// //         await firebase.notifications().displayNotification(notification);
// //       });
// //     } else {
// //       // user doesn't have permission
// //       try {
// //         await firebase.messaging().requestPermission();
// //       } catch (error) {
// //         Alert.alert(
// //           'Unable to access the Notification permission. Please enable the Notification Permission from the settings'
// //         );
// //       }
// //     }
// //   };

// //   render() {
// //     return <Dashboard />;
// //   }
// // }




// import React, { Component } from "react";
// import {
//   AppRegistry,
//   StyleSheet,
//   Text,
//   View,
//   Image,
//   Dimensions,
//   ScrollView,
//   TouchableOpacity,
//   PanResponder,
//   Animated,
//   Platform,
//   StatusBar
// } from "react-native";

// import Video from "react-native-video";
// import Icon from "react-native-vector-icons/FontAwesome";

// // import Lights from "./lights.mp4";
// // import Thumbnail from "./thumbnail.jpg";
// // import ChannelIcon from "./icon.png";

// const TouchableIcon = ({ name, children }) => {
//   return (
//     <TouchableOpacity style={styles.touchIcon}>
//       <Icon name={name} size={30} color="#767577" />
//       <Text style={styles.iconText}>
//         {children}
//       </Text>
//     </TouchableOpacity>
//   );
// };

// const PlaylistVideo = ({ name, channel, views, image }) => {
//   return (
//     <View style={styles.playlistVideo}>
//       <Image source={image} style={styles.playlistThumbnail} resizeMode="cover" />
//       <View style={styles.playlistText}>
//         <Text style={styles.playlistVideoTitle}>
//           {name}
//         </Text>
//         <Text style={styles.playlistSubText}>
//           {channel}
//         </Text>
//         <Text style={styles.playlistSubText}>
//           {views} views
//         </Text>
//       </View>
//     </View>
//   );
// };

// console.log();

// export default class rnvideo extends Component {
//   componentWillMount() {
//     this._y = 0;
//     this._animation = new Animated.Value(0);
//     this._animation.addListener(({ value }) => {
//       this._y = value;
//     })

//     this._panResponder = PanResponder.create({
//       onStartShouldSetPanResponder: () => true,
//       onMoveShouldSetPanResponder: () => true,
//       onPanResponderMove: Animated.event([
//         null,
//         {
//           dy: this._animation,
//         },
//       ]),
//       onPanResponderRelease: (e, gestureState) => {
//         if (gestureState.dy > 100) {
//           Animated.timing(this._animation, {
//             toValue: 300,
//             duration: 200,
//           }).start();
//           this._animation.setOffset(300);
//         } else {
//           this._animation.setOffset(0);
//           Animated.timing(this._animation, {
//             toValue: 0,
//             duration: 200,
//           }).start();
//         }
//       },
//     });
//   }
//   handleOpen = () => {
//     this._animation.setOffset(0);
//     Animated.timing(this._animation, {
//       toValue: 0,
//       duration: 200,
//     }).start();
//   }
//   render() {
//     const { width, height: screenHeight  } = Dimensions.get("window");
//     const videoHeight = width * 0.5625;

//     const padding = 15;
//     const statusBarHeight = StatusBar.currentHeight || 0;
//     const yOutput = ((screenHeight - videoHeight) + (( videoHeight * .5) / 2)) - padding - statusBarHeight;
//     const xOutput = ((width * .5) / 2) - padding;

//     const opacityInterpolate = this._animation.interpolate({
//       inputRange: [0, 300],
//       outputRange: [1, 0],
//     });

//     const translateYInterpolate = this._animation.interpolate({
//       inputRange: [0, 300],
//       outputRange: [0, yOutput],
//       extrapolate: "clamp",
//     });

//     const scaleInterpolate = this._animation.interpolate({
//       inputRange: [0, 300],
//       outputRange: [1, 0.5],
//       extrapolate: "clamp",
//     });

//     const translateXInterpolate = this._animation.interpolate({
//       inputRange: [0, 300],
//       outputRange: [0, xOutput],
//       extrapolate: "clamp",
//     });

//     const scrollStyles = {
//       opacity: opacityInterpolate,
//       transform: [
//         {
//           translateY: translateYInterpolate,
//         },
//       ],
//     };

//     const videoStyles = {
//       transform: [
//         {
//           translateY: translateYInterpolate,
//         },
//         {
//           translateX: translateXInterpolate,
//         },
//         {
//           scale: scaleInterpolate,
//         },
//       ],
//     };

//     return (
//       <View style={styles.container}>
//         <TouchableOpacity onPress={this.handleOpen}>
//           <Text>Content Below: Click To Reopen Video</Text>
//         </TouchableOpacity>
//         <View style={StyleSheet.absoluteFill} pointerEvents="box-none">
//           <Animated.View
//             style={[{ width, height: videoHeight }, videoStyles]}
//             {...this._panResponder.panHandlers}
//           >
//             <Video repeat style={StyleSheet.absoluteFill} source={Lights} resizeMode="contain" />
//           </Animated.View>
//           <Animated.ScrollView style={[styles.scrollView, scrollStyles]}>
//             <View style={styles.padding}>
//               <Text style={styles.title}>Beautiful DJ Mixing Lights</Text>
//               <Text>1M Views</Text>
//               <View style={styles.likeRow}>
//                 <TouchableIcon name="thumbs-up">10,000</TouchableIcon>
//                 <TouchableIcon name="thumbs-down">3</TouchableIcon>
//                 <TouchableIcon name="share">Share</TouchableIcon>
//                 <TouchableIcon name="download">Save</TouchableIcon>
//                 <TouchableIcon name="plus">Add to</TouchableIcon>
//               </View>
//             </View>

//             <View style={[styles.channelInfo, styles.padding]}>
//               <Image
//                 source={ChannelIcon}
//                 style={styles.channelIcon}
//                 resizeMode="contain"
//               />
//               <View style={styles.channelText}>
//                 <Text style={styles.channelTitle}>Prerecorded MP3s</Text>
//                 <Text>1M Subscribers</Text>
//               </View>
//             </View>

//             <View style={[styles.playlist, styles.padding]}>
//               <Text style={styles.playlistUpNext}>Up next</Text>
//               <PlaylistVideo
//                 image={Thumbnail}
//                 name="Next Sweet DJ Video"
//                 channel="Prerecorded MP3s"
//                 views="380K"
//               />
//               <PlaylistVideo
//                 image={Thumbnail}
//                 name="Next Sweet DJ Video"
//                 channel="Prerecorded MP3s"
//                 views="380K"
//               />
//               <PlaylistVideo
//                 image={Thumbnail}
//                 name="Next Sweet DJ Video"
//                 channel="Prerecorded MP3s"
//                 views="380K"
//               />
//               <PlaylistVideo
//                 image={Thumbnail}
//                 name="Next Sweet DJ Video"
//                 channel="Prerecorded MP3s"
//                 views="380K"
//               />
//               <PlaylistVideo
//                 image={Thumbnail}
//                 name="Next Sweet DJ Video"
//                 channel="Prerecorded MP3s"
//                 views="380K"
//               />
//               <PlaylistVideo
//                 image={Thumbnail}
//                 name="Next Sweet DJ Video"
//                 channel="Prerecorded MP3s"
//                 views="380K"
//               />
//               <PlaylistVideo
//                 image={Thumbnail}
//                 name="Next Sweet DJ Video"
//                 channel="Prerecorded MP3s"
//                 views="380K"
//               />
//             </View>
//           </Animated.ScrollView>
//         </View>
//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   scrollView: {
//     flex: 1,
//     backgroundColor: "#FFF",
//   },
//   title: {
//     fontSize: 28,
//   },
//   likeRow: {
//     flexDirection: "row",
//     justifyContent: "space-around",
//     paddingVertical: 15,
//   },
//   touchIcon: {
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   iconText: {
//     marginTop: 5,
//   },
//   padding: {
//     paddingVertical: 15,
//     paddingHorizontal: 15,
//   },
//   channelInfo: {
//     flexDirection: "row",
//     borderBottomWidth: 1,
//     borderBottomColor: "#DDD",
//     borderTopWidth: 1,
//     borderTopColor: "#DDD",
//   },
//   channelIcon: {
//     width: 50,
//     height: 50,
//   },
//   channelText: {
//     marginLeft: 15,
//   },
//   channelTitle: {
//     fontSize: 18,
//     marginBottom: 5,
//   },
//   playlistUpNext: {
//     fontSize: 24,
//   },
//   playlistVideo: {
//     flexDirection: "row",
//     height: 100,
//     marginTop: 15,
//     marginBottom: 15,
//   },
//   playlistThumbnail: {
//     width: null,
//     height: null,
//     flex: 1,
//   },
//   playlistText: {
//     flex: 2,
//     paddingLeft: 15,
//   },
//   playlistVideoTitle: {
//     fontSize: 18,
//   },
//   playlistSubText: {
//     color: "#555",
//   },
// });
























// import React, { Component } from 'react';
// import {
//   StyleSheet, Dimensions, Text, View, FlatList, Animated, PanResponder,
//   StatusBar,
// } from 'react-native';
// import Video from 'react-native-video';
// import MediaControls, { PLAYER_STATES } from 'react-native-media-controls';
// import Orientation from 'react-native-orientation';
// var width = Dimensions.get('window').width;
// import convertToCache from 'react-native-video-cache';
// var RNFS = require('react-native-fs');
// var height = Dimensions.get('window').height;
// let arr = []
// import AsyncStorage from '@react-native-community/async-storage';

// class App extends Component {
//   videoPlayer;

//   constructor(props) {
//     super(props);
//     this.state = {
//       currentTime: 0,
//       status: 'starting',
//       message: '--',
//       duration: 0,
//       isFullScreen: false,
//       fullscreenStatus: false,
//       isLoading: true,
//       paused: true,
//       playerState: PLAYER_STATES.PAUSED,
//       soundArr: [
//         {
//           video: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4'
//         },
//         {
//           video: 'https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-720p.mp4'
//         },
//         {
//           video: 'https://vjs.zencdn.net/v/oceans.mp4'
//         },

//       ],
//       videoArr: [],
//       newArr:[],
//       indx: 0
//     };
//   }



//   UNSAFE_componentWillMount() {

//     const { soundArr,newArr } = this.state
//     soundArr.map(async (item, index) => {
//       console.log('--item---', item)
//       // arr.push('vfvfvf')

//       await convertToCache(item.video)
//         .then((message) => {
//           console.log('-----', message)
//           if (message) {
//             arr.push({
//               duration: 0, isFullScreen: false, refs: null, seeek: 0, video: message, fullscreenStatus: false, isLoading: true, paused: true, playerState: PLAYER_STATES.PAUSED, currentTime: 0
//             })
//             this.setState({})


//             return
//           }
//         });

//     })

//     this.setState({
//       videoArr: arr
//     })

//     if (Platform.OS === 'android') {
//       var orient = Orientation.getInitialOrientation()
//       this.setState({ orient: orient })
//     }






//     this._y = 0;
//     this._animation = new Animated.Value(0);
//     this._animation.addListener(({ value }) => {
//       this._y = value;
//     })

//     this._panResponder = PanResponder.create({
//       onStartShouldSetPanResponder: () => true,
//       onMoveShouldSetPanResponder: () => true,
//       onPanResponderMove: Animated.event([
//         null,
//         {
//           dy: this._animation,
//         },
//       ]),
//       onPanResponderRelease: (e, gestureState) => {
//         if (gestureState.dy > 100) {
//           Animated.timing(this._animation, {
//             toValue: 300,
//             duration: 200,
//           }).start();
//           this._animation.setOffset(300);
//         } else {
//           this._animation.setOffset(0);
//           Animated.timing(this._animation, {
//             toValue: 0,
//             duration: 200,
//           }).start();
//         }
//       },
//     });
//   }








//   async componentDidMount() {
//     let a = await AsyncStorage.getItem('time')
//     let abc = JSON.parse(a)
//     let d = await AsyncStorage.getItem('dur')
//     let abcd = JSON.parse(d)
//     let index = await AsyncStorage.getItem('index')
//     let ind = JSON.parse(index)
//     let newarr=await AsyncStorage.getItem('newArr')
//     let newArr1=JSON.parse(newarr)

//     if (newArr1) {
//       newArr1.map((item,ind)=>{
//         arr[ind].refs.seek(item.currentTime)
//         arr[ind].currentTime = item.currentTime

//       })
  
//     }
//     arr.map((item,index)=>{
//       newArr.push({currentTime: item.currentTime,duration: item.duration})

//     })

//     await console.log('aaaaaaaaaaa', arr,  "newArr1", newArr1)

//     this.setState({
//       videoArr: arr
//     })
//     // console.log('aaaaaaaaaaa', abc, 'd', abcd,"arr",arr)
//   }

//   onSeek = async (seek, ind) => {
//     console.log('=seek=', seek, "ind", ind)
//     let index = await AsyncStorage.getItem('index')
//     let ind1 = JSON.parse(index)
//     AsyncStorage.setItem('seek', JSON.stringify(seek))
//     arr[ind].refs.seek(seek)

//     this.setState({})
//     // this.videoPlayer.seek(seek);
//   };

//   onPaused = async (playerState, ind) => {
//     const {newArr } = this.state;

//     arr[ind].paused = !arr[ind].paused
//     arr[ind].playerState = playerState

//     this.setState({
//       paused: !this.state.paused,
//       playerState,
//     });
//     console.log('------pause', this.state.videoArr)

//     let time = arr[ind].currentTime
//     let dur = arr[ind].duration
//     // newArr[ind].currentTime=time
//     // newArr[ind].duration =dur
//     // this.setState({})
//     // AsyncStorage.setItem('newArr', JSON.stringify(this.state.newArr))

//     AsyncStorage.setItem('index', JSON.stringify(ind))
//     AsyncStorage.setItem('time', JSON.stringify(time))
//     AsyncStorage.setItem('dur', JSON.stringify(dur))

//   };

//   onReplay = (ind) => {
//     arr[ind].playerState = PLAYER_STATES.PLAYING

//     arr[ind].refs.seek(0)
//     this.setState({ playerState: PLAYER_STATES.PLAYING });
//     console.log('=seek=', arr[ind].refs)

//     // this.videoPlayer.seek(0);
//   };

//   onProgress = async(data, ind, e) => {
//     const {newArr } = this.state;
//     // Video Player will continue progress even if the video already ended
//     console.log('===progress', data, e)
//     // let newarr=await AsyncStorage.getItem('newArr')
//     // let newArr1=JSON.parse(newarr)
//     let khaliArr=[]
//     let sum = 0



//     if (!arr[ind].isLoading && arr[ind].playerState !== PLAYER_STATES.ENDED) {
//       arr[ind].currentTime = data.currentTime
//       this.setState({})


//       // newArr1[ind].currentTime=data.currentTime
//       // newArr1[ind].duration =data.seekableDuration
//       arr.map((item,index)=>{
//         khaliArr.push({currentTime:item.currentTime,duration:item.duration})
//       })
      

//         this.setState({})
//         console.log("this.state.newArr",khaliArr,"arrrrrr",arr)
//         AsyncStorage.setItem('newArr', JSON.stringify(khaliArr))

//       AsyncStorage.setItem('seek', JSON.stringify(data.currentTime))


//     }

//   };

//   onLoad = (data, ind) => {
//     console.log('------', data, "ind", ind, "dddddd", data.duration)
//     arr[ind].duration = data.duration
//     arr[ind].isLoading = false

//     this.setState({ duration: data.duration, isLoading: false })
//   };

//   onLoadStart = (data, ind) => {
//     arr[ind].isLoading = true

//     this.setState({ isLoading: true })
//   };

//   onEnd = (ind) => {
//     Orientation.lockToPortrait();
//     arr[ind].playerState = PLAYER_STATES.ENDED
//     AsyncStorage.setItem('seek', JSON.stringify(0))
//     this.setState({ playerState: PLAYER_STATES.ENDED });
//     console.log('endddd---')
//   }

//   onError = () => alert('Oh! ', error);

//   exitFullScreen = () => {
//     alert('no entry')
//   };

//   enterFullScreen = () => {
//     alert('helllllll')
//   };

//   onFullScreen = (ind) => {
//     if (arr[ind].fullscreenStatus) {
//       arr[ind].fullscreenStatus = !arr[ind].fullscreenStatus
//       this.setState({ fullscreenStatus: !this.state.fullscreenStatus })
//       Orientation.lockToPortrait();
//     } else {
//       arr[ind].fullscreenStatus = !arr[ind].fullscreenStatus
//       this.setState({ fullscreenStatus: !this.state.fullscreenStatus })

//       Orientation.lockToLandscapeLeft();
//     }
//   };

//   renderToolbar = () => (
//     <View style={styles.toolbar}>
//       <Text>I'm a custom toolbar </Text>
//     </View>
//   );

//   onSeeking = (currentTime, ind) => {

//     arr[ind].currentTime = currentTime
//     console.log('====onseeking==')
//     this.setState({ currentTime })
//   };


//   renderItem = ({ item, index }) => {
//     const { fullscreenStatus } = this.state;
//     const { width, height: screenHeight } = Dimensions.get("window");
//     const videoHeight = width * 0.5625;

//     const padding = 15;
//     const statusBarHeight = StatusBar.currentHeight || 0;
//     const yOutput = ((screenHeight - videoHeight) + ((videoHeight * .5) / 2)) - padding - statusBarHeight;
//     const xOutput = ((width * .5) / 2) - padding;

//     const opacityInterpolate = this._animation.interpolate({
//       inputRange: [0, 300],
//       outputRange: [1, 0],
//     });

//     const translateYInterpolate = this._animation.interpolate({
//       inputRange: [0, 300],
//       outputRange: [0, yOutput],
//       extrapolate: "clamp",
//     });

//     const scaleInterpolate = this._animation.interpolate({
//       inputRange: [0, 300],
//       outputRange: [1, 0.5],
//       extrapolate: "clamp",
//     });

//     const translateXInterpolate = this._animation.interpolate({
//       inputRange: [0, 300],
//       outputRange: [0, xOutput],
//       extrapolate: "clamp",
//     });

//     const scrollStyles = {
//       opacity: opacityInterpolate,
//       transform: [
//         {
//           translateY: translateYInterpolate,
//         },
//       ],
//     };

//     const videoStyles = {
//       transform: [
//         {
//           translateY: translateYInterpolate,
//         },
//         {
//           translateX: translateXInterpolate,
//         },
//         {
//           scale: scaleInterpolate,
//         },
//       ],
//     };



//     return (
//       <View
//         key={index}
//         style={{ height: item.fullscreenStatus ? '100%' : height / 3, width: width, marginBottom: height / 40 }}>
//         <Animated.View
//           style={[{ width, height: videoHeight }, videoStyles]}
//           {...this._panResponder.panHandlers}>

//           <Video
//             onEnd={() => this.onEnd(index)}
//             onLoad={(data) => this.onLoad(data, index)}
//             onLoadStart={(data) => this.onLoadStart(data, index)}
//             onProgress={(data, eve) => this.onProgress(data, index, eve)}
//             paused={arr[index].paused}
//             ref={ref => item.refs = ref}
//             resizeMode='contain'
//             style={StyleSheet.absoluteFill}
//             source={{ uri: item.video }}
//             // style={[styles.mediaPlayer, { width: '100%', height: item.fullscreenStatus ? '100%' : height / 3 }]}
//             volume={0.0}
//           />
//           <MediaControls
//            on
//             duration={arr[index].duration}
//             isLoading={arr[index].isLoading}
//             mainColor="#333"
//             onFullScreen={this.onFullScreen}
//             fullscreen={item.fullscreenStatus}
//             onPaused={(data) => this.onPaused(data, index)}
//             onReplay={() => this.onReplay(index)}
//             onSeek={(data) => this.onSeek(data, index)}
//             onSeeking={(data) => this.onSeeking(data, index)}
//             playerState={arr[index].playerState}
//             progress={arr[index].currentTime}
//           />
//         </Animated.View>
//       </View>
//     )
//   }


//   render() {
//     const { fullscreenStatus, videoArr ,newArr} = this.state;
//     console.log("Arr----", arr,"newArr",newArr)
//     return (
//       <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>

//         <View style={[StyleSheet.absoluteFill, { justifyContent: 'center', alignItems: 'center' }
//         ]} pointerEvents="box-none">

//           <FlatList
//             data={arr}
//             // scrollEnabled={false}
//             renderItem={this.renderItem}
//             style={{ width: "95%", }}
//             contentContainerStyle={{}}
//             extraData={this.state}
//           />


//         </View>
//       </View>

//     );
//   }
// }

// const styles = StyleSheet.create({
//   toolbar: {
//     marginTop: 30,
//     backgroundColor: 'white',
//     padding: 10,
//     borderRadius: 5,
//   },
//   scrollView: {
//     flex: 1,
//     backgroundColor: "#FFF",
//   },

//   mediaPlayer: {
//     //height:height/3,
//     position: 'absolute',
//     top: 0,
//     left: 0,
//     //bottom: 110,
//     right: 0,
//     backgroundColor: 'black',
//   },
// });

// export default App;
