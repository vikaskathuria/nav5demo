import React, { Component } from 'react'
import { StyleSheet, View, TouchableOpacity, Dimensions, Platform, TextInput } from 'react-native';
import { Icon, Text, Image, Badge, Input } from "react-native-elements";
let menu = require('../../assets/icons/menu.png')
let sort = require('../../assets/icons/sort.png')

const { height, width } = Dimensions.get('window')

export default class Header extends Component {

    render() {
        const { search,orientation,ref } = this.props
        return (
            <View style={{ flex: 1, flexDirection: 'row' }}>
                <View style={{ flex: 2, justifyContent: 'center', alignItems: 'center',}}>
                    <Image source={menu} style={{ height: height / 27, width: height / 27 }}
                        placeholderStyle={{ backgroundColor: 'transparent' }}
                        resizeMode='center'

                    />
                </View>
                <View style={{ flex: 5.5, justifyContent: 'center', alignItems: 'center' }}>
                    <View onStartShouldSetResponder={this.props.onPress}
                    style={{
                        backgroundColor: "#F2F2F2",
                        flexDirection: 'row',
                        height: height / 18,
                        borderRadius: height / 5,
                        alignItems: 'center',
                    }}>
                        <Icon
                            name="location"
                            type="evilicon"
                            size={height / 40}
                            //   color={Colors.Black}
                            containerStyle={{ marginLeft:width/70,}}
                            underlayColor='transparent'
                        />
                        <TextInput
                            value={search}
                            style={{
                                padding: 0,
                                margin: 0,
                                borderWidth: 0,
                                marginLeft:width/70,
                                textAlignVertical: 'center', width: search ? '79%' : '89%', fontSize: height / 55, height: '100%'
                            }} onChangeText={(term) => { this.searchUpdated(term) }} placeholder={'Search By Location'} />
                    </View>

                </View>
                <View style={{ flex: 2.5, flexDirection: 'row' }}>
                    <View style={{ flex: 1.5, justifyContent: 'center', alignItems: 'flex-end',backgroundColor:"#fff" }}>
                        <Image source={sort} style={{ height: height / 26, width: height / 26 ,}}
                            placeholderStyle={{ backgroundColor: 'transparent' }}
                            resizeMode='center'

                        />

                    </View>
                    <View style={{ flex: 1.5, justifyContent: 'center', alignItems: 'center', }}>
                        <Badge ref={ref} status="error" containerStyle={{ position: 'absolute', right: width / 30, bottom: height / 15, }} />

                        <Icon
                            type="evilicon"
                            name="bell"
                            size={height / 27}
                        />

                    </View>

                </View>

            </View>
        )
    }
}
