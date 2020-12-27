



import React from 'react';
import { View, Text,ActivityIndicator } from 'react-native';
import SocketIOClient from 'socket.io-client';
import { GiftedChat,Bubble ,SystemMessage, MessageImage,} from 'react-native-gifted-chat';
import AsyncStorage from '@react-native-community/async-storage';
import AccessoryBar from '../Profile/AccessoryBar';

const USER_ID = '@userId';

export default class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // messages: [],
      userId: null,
      name:'',
      avt:'',
      messages : [
        {
          _id: 1,
          text: 'This is a system message',
          createdAt: new Date(Date.UTC(2016, 5, 11, 17, 20, 0)),
          system: true,
        },
        {
          _id: 2,
          text: 'Hello developer',
          createdAt: new Date(Date.UTC(2016, 5, 12, 17, 20, 0)),
          user: {
            _id: 2,
            name: 'React Native',
            avatar: 'https://placeimg.com/140/140/any',
          },
        },
        {
          _id: 3,
          text: 'Hi! I work from home today!',
          createdAt: new Date(Date.UTC(2016, 5, 13, 17, 20, 0)),
          user: {
            _id: 1,
            name: 'React Native',
            avatar: 'https://placeimg.com/140/140/any',
          },
          image: 'https://placeimg.com/960/540/any',
        },
        {
          _id: 4,
          text: 'This is a quick reply. Do you love Gifted Chat? (radio) KEEP IT',
          createdAt: new Date(Date.UTC(2016, 5, 14, 17, 20, 0)),
          user: {
            _id: 2,
            name: 'React Native',
            avatar: 'https://placeimg.com/140/140/any',
          },
          quickReplies: {
            type: 'radio', // or 'checkbox',
            keepIt: true,
            values: [
              {
                title: '😋 Yes',
                value: 'yes',
              },
              {
                title: '📷 Yes, let me show you with a picture!',
                value: 'yes_picture',
              },
              {
                title: '😞 Nope. What?',
                value: 'no',
              },
            ],
          },
        },
        {
          _id: 5,
          text: 'This is a quick reply. Do you love Gifted Chat? (checkbox)',
          createdAt: new Date(Date.UTC(2016, 5, 15, 17, 20, 0)),
          user: {
            _id: 2,
            name: 'React Native',
            avatar: 'https://placeimg.com/140/140/any',
          },
          quickReplies: {
            type: 'checkbox', // or 'radio',
            values: [
              {
                title: 'Yes',
                value: 'yes',
              },
              {
                title: 'Yes, let me show you with a picture!',
                value: 'yes_picture',
              },
              {
                title: 'Nope. What?',
                value: 'no',
              },
            ],
          },
        },
        {
          _id: 6,
          text: 'Come on!',
          createdAt: new Date(Date.UTC(2016, 5, 15, 18, 20, 0)),
          user: {
            _id: 2,
            name: 'React Native',
            avatar: 'https://placeimg.com/140/140/any',
          },
        },
        {
          _id: 7,
          text: `Hello this is an example of the ParsedText, links like http://www.google.com or http://www.facebook.com are clickable and phone number 444-555-6666 can call too.
              #react #react-native`,
          createdAt: new Date(Date.UTC(2016, 5, 13, 17, 20, 0)),
          user: {
            _id: 1,
            name: 'React Native',
            avatar: 'https://placeimg.com/140/140/any',
          },
        },
      ],
      appIsReady: false,
      isLoadingEarlier: false,
      isTyping: false,
    };

    this.determineUser = this.determineUser.bind(this);
    this.onReceivedMessage = this.onReceivedMessage.bind(this);
    this.onSend = this.onSend.bind(this);
    this._storeMessages = this._storeMessages.bind(this);

    this.socket = SocketIOClient('http://192.168.43.124:3000/');
    this.socket.on('message', this.onReceivedMessage);
    this.determineUser();
  }

  determineUser() {
    AsyncStorage.getItem(USER_ID)
      .then((userId) => {
        if (!userId) {
          this.socket.emit('userJoined', null);
          this.socket.on('userJoined', (userId) => {
            AsyncStorage.setItem(USER_ID, userId);
            this.setState({ userId });
          });
        } else {
          this.socket.emit('userJoined', userId);
          this.setState({ userId });
        }
      })
      .catch((e) => alert(e));
  }


async componentDidMount(){
  let token =await AsyncStorage.getItem('userToken')
  let data=JSON.parse(token)
  console.log('----totot',data,'this.prop',this.props.route.params.user)
//   if (data && data.result) {
//         this.setState({
//           name:data.result.fname,
//           avt:data.result.profileimage
//         })
//   }

if (this.props &&  this.props.route && this.props.route.params) {
    this.setState({user:this.props.route.params.user})
}

}

  onReceivedMessage(messages) {
    this._storeMessages(messages);
  }

  onSend(messages=[]) {
    this.socket.emit('message', messages[0]);
    this._storeMessages(messages);
  }

  setIsTyping = () => {
    this.setState({
      isTyping: !this.state.isTyping,
    })
  }



  renderBubble(props) {
    return (
      <Bubble
        {...props}
        textStyle={{
          right: {
            // color: 'yellow',
          },
        }}
        wrapperStyle={{
          left: {
            backgroundColor: 'lightgrey',
          },
        }}
      />
    );  }

    renderSystemMessage = props => {
      return (
        <SystemMessage
          {...props}
          containerStyle={{
            marginBottom: 15,
          }}
          textStyle={{
            fontSize: 14,
          }}
        />
      )
    }
     onLoadEarlier = () => {
    this.setState(() => {
      return {
        isLoadingEarlier: true,
      }
    })
  }
  parsePatterns = () => {
    return [
      {
        pattern: /#(\w+)/,
        style: { textDecorationLine: 'underline', color: 'darkorange' },
        onPress: () => Linking.openURL('http://gifted.chat'),
      },
    ]
  }


  renderAccessory = () => (
    <AccessoryBar onSend={this.onSendFromUser} isTyping={this.setIsTyping} />
  )





  render() {
    const {name,avt,user}=this.state
    // var user = { _id: this.state.userId || -1 ,
    //   name: name,
    //   avatar: avt

    // };
    return (
      <GiftedChat
        messages={this.state.messages}
        onSend={this.onSend}
        user={user}
        renderBubble={this.renderBubble}
        showUserAvatar={true}
        showAvatarForEveryMessage={true}
        alwaysShowSend
        scrollToBottom
        infiniteScroll
         parsePatterns={this.parsePatterns}
        renderSystemMessage={this.renderSystemMessage}
        isTyping={this.state.isTyping}
        renderAccessory={this.renderAccessory}
        // loadEarlier={this.state.loadEarlier}
        //   onLoadEarlier={this.onLoadEarlier}
      />
    );
  }

  _storeMessages(messages) {
    this.setState((previousState) => {
      return {
        messages: GiftedChat.append(previousState.messages, messages),
        isLoadingEarlier: false,
      };
    });
  }
}

