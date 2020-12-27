import React from 'react';
import {
  View,
} from 'react-native';

import { Provider } from 'react-redux';
import { store } from './src/store';
import AppStack from './src/route';

const App = () => {
  const handlePress = () => {
    this.props.getLogin()
  }



  return (

      <Provider store={store}>
        <View style={{ flex: 1, backgroundColor: '' }}>
          <AppStack/>
        </View>
      </Provider>

  )
}

export default App









