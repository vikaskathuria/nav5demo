import MaterialIcons  from 'react-native-vector-icons/MaterialIcons'
import React from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { Icon } from 'react-native-elements'

export default class AccessoryBar extends React.Component{
    pickImageAsync(){
        alert('dsd')
    }
    takePictureAsync(){
        
    }
    getLocationAsync(){
        
    }

  render() {
    const { onSend, isTyping } = this.props
    return (
      <View style={styles.container}>
        
        <Button onPress={() => this.pickImageAsync(onSend)} name='photo' />
        <Button onPress={() => this.takePictureAsync(onSend)} name='camera' />
        <Button onPress={() => this.getLocationAsync(onSend)} name='my-location' />
        <Button
          onPress={() => {
            isTyping()
          }}
          name='chat' 
        />
      </View>
    )
  }
}

const Button = ({
  onPress,
  size = 30,
  color = 'rgba(0,0,0,0.5)',
  ...props
}) => (
  <TouchableOpacity onPress={onPress}>
    <MaterialIcons size={size} color={color} {...props} />
  </TouchableOpacity>
)

const styles = StyleSheet.create({
  container: {
    height: 44,
    width: '100%',
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: 'rgba(0,0,0,0.3)',
  },
})