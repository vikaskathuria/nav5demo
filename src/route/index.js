import * as React from 'react';
import { Button, Text, TextInput, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { getLogin, doSignOut, restoreToken } from '../action';
import Test from '../test';
import { useSelector, useDispatch } from 'react-redux';
import SignInScreen from '../screens/Login/Login';
import { AuthContext } from '../context/index'
import AsyncStorage from '@react-native-community/async-storage';
import Home from '../screens/Home/Home';
import Login from '../screens/Login/Login';
import { createDrawerNavigator } from '@react-navigation/drawer';
import CustomDrawerContent from '../components/CustomDrawerContent/CustomDrawerContent';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Notification from '../screens/Notification/Notification';
import Profile from '../screens/Profile/Profile';
import Chat from '../screens/Chat/Chat';
import TestScreen from '../screens/Test/Test';

export default function AppStack() {
  const [Token, setToken] = React.useState('');

  const dispatch = useDispatch();
  const Stack = createStackNavigator();
  const Drawer = createDrawerNavigator();
  const isLoading = useSelector(state => state.login.isLoading);
  const loginData = useSelector(state => state.login.loginData);
  const Tab = createBottomTabNavigator();

  console.log('loadingg----', isLoading, 'loginData', loginData)
  React.useEffect(() => {
    const bootstrapAsync = async () => {
      let data
      try {
        let userToken = await AsyncStorage.getItem('userToken');
        data = JSON.parse(userToken)
      } catch (e) {
      }
      setToken(data)
      console.log('userToken----', data)
      dispatch(restoreToken(data))
    };

    bootstrapAsync();
  }, []);



  console.log('userToken-12334---', Token)


  function HomeStack({ navigation, route }) {
    console.log('navigation-------', route)
    let ind = route.state && route.state.index ? route.state.index : null
    return (
      <Tab.Navigator>
        <Tab.Screen name="Home" component={Home} options={{
          tabBarLabel: 'Updates',
        }}
        />
        <Tab.Screen name="Profile" component={Profile}
          options={{
            tabBarVisible: false
            // tabBarVisible: route && route.state && route.state.routes[ind] && route.state.routes[ind].params ? route.state.routes[ind].params.showTab : true

          }}
        />
        <Tab.Screen name="Notification" component={Notification}
          options={{
            unmountOnBlur: true
          }}


        />
      </Tab.Navigator>

    )
  }

  function DrawerStack() {
    return (

      <Drawer.Navigator drawerContent={(props) => <CustomDrawerContent {...props} />}>
        <Drawer.Screen name="HomeStack" component={HomeStack} />
      </Drawer.Navigator>

    )

  }


  const authContext = React.useMemo(
    () => ({
      signIn: async data => {
        dispatch(getLogin(data));
      },
      signOut: () => {
        console.log('loginData', loginData)

        AsyncStorage.clear()

        dispatch(doSignOut())
        setToken(null)

      },
      signUp: async data => {

        dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
      },
    }),
    []
  )

  console.log('loginData', loginData, 'token', Token)
  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>


        {Token == null && loginData == null ? (
          <Stack.Navigator>

            <Stack.Screen
              name="SignIn"
              component={Login}
              options={{
                title: 'Sign in',
              }}
            />
          </Stack.Navigator>

        ) : (



            // <Drawer.Navigator drawerContent={(props) => <CustomDrawerContent {...props} />}>
            //   <Drawer.Screen name="HomeStack" component={HomeStack} />
            // </Drawer.Navigator>
            <Stack.Navigator>

              <Stack.Screen
                name="HomeStack" component={DrawerStack}
                options={{
                  headerShown: false
                }}
              />
              <Stack.Screen
                name="Chat" component={Chat}
              />
              <Stack.Screen
                name="TestScreen" component={TestScreen}
                options={{
                  headerShown: false
                }}
              />

            </Stack.Navigator>


          )}

      </NavigationContainer>
    </AuthContext.Provider>
  );
}






