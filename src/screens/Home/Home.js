import React, {Fragment,useEffect} from 'react';import {
    AppRegistry,
    StyleSheet,
    StatusBar,
    ImageBackground,
    View,
    Alert,
    ScrollView,
    SafeAreaView,
    AsyncStorage,
    Dimensions,
    Keyboard,
    Platform,
    TouchableOpacity,
    KeyboardAvoidingView,
    ActivityIndicator,
    Button,
  } from "react-native";
  import {AuthContext} from '../../context/index'
  import firebase from 'react-native-firebase';

import {
    LoginButton,
    AccessToken,
    GraphRequest,
    GraphRequestManager,
    LoginManager
  } from 'react-native-fbsdk';

  import {
  
    Input,
    Icon,
    Text,
    Image,
    SocialIcon,
    Overlay
  } from "react-native-elements";
  const { width, height } = Dimensions.get("window");
  const FB_API = 'https://graph.facebook.com/v2.5/me?fields=email,name,picture.type(large),friends&access_token='
  import io from "socket.io-client";
  
 const FBLogin = () => {
    LoginManager.logOut()
    LoginManager.logInWithPermissions(['public_profile', 'email']).then(
      async (result) => {
        if (result.isCancelled) {
          console.log("Login cancelled");
        } else {
          console.log(
            "Login success with permissions: " +
            result.grantedPermissions.toString()
          );
          const data = await AccessToken.getCurrentAccessToken();
         getUser(data.accessToken)
          console.log("permission ", data)
          if (!data) {
            // handle this however suites the flow of your app
            throw new Error('Something went wrong obtaining the users access token');
          }



        }
      },
      function (error) {
        console.log("Login fail with error: " + error);
        // LoginManager.logOut()
      }
    );
  }



const  getUser=(token)=> {
    fetch(FB_API + token)
      .then((response) => response.json())
      .then((json) => {
        console.log("json", json);
        // this.fbRegistration(json)
      })
      .catch(() => {
        reject('ERROR GETTING DATA FROM FACEBOOK')
      })
  }


const Home = ({navigation}) => {
    const { signOut } = React.useContext(AuthContext);



    useEffect(() => {
      this.checkPermission();
      this.messageListener();
    }, []);

    checkPermission = async () => {
      const enabled = await firebase.messaging().hasPermission();
      if (enabled) {
          this.getFcmToken();
      } else {
          this.requestPermission();
      }
    }
    getFcmToken = async () => {
      const fcmToken = await firebase.messaging().getToken();
      if (fcmToken) {
        console.log(fcmToken);
        this.showAlert('Your Firebase Token is:', fcmToken);
      } else {
        this.showAlert('Failed', 'No token received');
      }
    }

    requestPermission = async () => {
      try {
        await firebase.messaging().requestPermission();
        // User has authorised
      } catch (error) {
          // User has rejected permissions
      }
    }
    messageListener = async () => {
      this.notificationListener = firebase.notifications().onNotification((notification) => {
          const { title, body } = notification;
          this.showAlert(title, body);
      });
    
      this.notificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpen) => {
          const { title, body } = notificationOpen.notification;
          this.showAlert(title, body);
      });
    
      const notificationOpen = await firebase.notifications().getInitialNotification();
      if (notificationOpen) {
          const { title, body } = notificationOpen.notification;
          this.showAlert(title, body);
      }
    
      this.messageListener = firebase.messaging().onMessage((message) => {
        console.log(JSON.stringify(message));
      });
    }
    showAlert = (title, message) => {
      Alert.alert(
        title,
        message,
        [
          {text: 'OK', onPress: () => console.log('OK Pressed',title,'message',message)},
        ],
        {cancelable: false},
      );
    }
    return (
        <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
            <Text onPress={()=>navigation.navigate('TestScreen')} style={{margin:100}}>Home</Text>
            <Button title="Sign Out" onPress={() => signOut()} />


        </View>
    )
}

export default Home

const styles = StyleSheet.create({
    OrTextView: {
      flexDirection: 'row',
      backgroundColor: 'transparent',
      justifyContent: "center",
      alignItems: "center"
    },
  
    SocialLogoView: {
      width: '80%',
      backgroundColor: "transparent",
    },
  
    login: {
      justifyContent: "center",
      alignItems: "stretch",
      height: 40,
      marginTop: 20,
      backgroundColor: "#DDDFD3",
      padding: 10
    },
  
  });
  
  