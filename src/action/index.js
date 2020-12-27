import { GET_LOGIN } from "./constant";
import axios from "axios";
import AsyncStorage from '@react-native-community/async-storage';


export const getLogin = (params) => {
    console.log("AddUserpppp-------",params);

    return dispatch => {
        console.log("Add User dispatch");
        dispatch({type: GET_LOGIN.PENDING,data:params})

        axios.post(params.url, params.body)
        .then(response => {
            console.log(response);
            if (response && response.data) {
                dispatch(getLoginFullFill(response.data))
                try {
                    AsyncStorage.setItem('userToken',JSON.stringify(response.data));
 
                } catch (error) {
                    alert(error)
                }
            }
        })
        .catch(error => {

            dispatch(getLoginReject(error))

            console.log('error--',error);
        });

    };
};
export const getLoginFullFill = (data) => ({
    type: GET_LOGIN.FULFILLED,
    data
})
export const getLoginReject = (err) => ({
    type: GET_LOGIN.REJECTED,
    err
})




export const doSignOut = (params) => {
    console.log("AddUserpppp-------",params);

    return dispatch => {
        console.log("Add User dispatch");
        AsyncStorage.clear()
        dispatch({type:'SIGN_OUT',data:null})


    };
};

export const restoreToken = (token) => {
    console.log("AddUserpppp-------",token);

    return dispatch => {
        console.log("Add User dispatch");
        dispatch({type:'RESTORE_TOKEN',data:token})


    };
};
