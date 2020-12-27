import {useDispatch} from 'react-redux';
import { getLoginFullFill, getLoginReject, getLogin } from '../action';
const dispatch = useDispatch();
import axios from "axios";


export function request(url, params) {

    dispatch(getLogin())

    return axios({
        method: params.method,
        url,
        headers: {
          "Content-Type": "application/json",
          ...params.headers
        },
        data: params.body ? JSON.stringify(params.body) : null
      })
        // .then(response => response.json())
        .then(responseJson => {
            dispatch(getLoginFullFill(responseJson))
            return responseJson;
        })
        .catch(error => {
            dispatch(getLoginReject(error))

            console.error(error);
        });
}





