import React, { Component } from 'react'
import {AuthContext} from '../../context/index'

import { View, Text,Button } from 'react-native'

const Login = () => {
    const { signIn } = React.useContext(AuthContext);
    let data = {
        url: 'https://guruq.in:4200/user/login',
        body: {
            "email": "9835773216",
            "password": "123"
        },
        method: 'POST'
    }

    return (
        <View>
            <Button title="Sign in" onPress={() => signIn(data)} />

        </View>
    )
}

export default Login


