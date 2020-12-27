import { GET_LOGIN } from "../action/constant"

const initialState = {
    loading: false,
    loginData: null,
    err:''
}

export const loginReducers =(state = initialState, action) => {

    switch (action.type) {

        case GET_LOGIN.PENDING:
                console.log('action.data',action.data)

            return {
                ...state,
                loading: true,
            };
        case GET_LOGIN.FULFILLED:

            return {
                ...state,
                loading: false,
                loginData: action.data
            };
            case GET_LOGIN.REJECTED:
                return {
                    ...state,
                    loading: false,
                    err:action.err,
                
                
                };
    
        default:
            return state
    }
}



export const signOutReducers =(state = initialState, action) => {

    switch (action.type) {

        case 'SIGN_OUT':

            return {
                ...state,
                loading: true,
                loginData: null
            };
    
        default:
            return state
    }
}


export const restoreReducers =(state = initialState, action) => {

    switch (action.type) {

        case 'RESTORE_TOKEN':
            console.log("RESTORE_TOKEN-------",action.data);

            return {
                ...state,
                loading: true,
                loginData: action.data
            };
    
        default:
            return state
    }
}
