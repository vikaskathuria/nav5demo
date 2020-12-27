import {combineReducers} from 'redux';
import { loginReducers } from '.';
export const rootReducer =combineReducers({
    login:loginReducers
})