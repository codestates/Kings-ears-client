import { CHANGE_LOGIN_STATUS, GET_ACCESS_TOKEN } from '../actions';
import { initialState } from './initialState';

const userReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_ACCESS_TOKEN:
            return {...state, accessToken: action.payload.accessToken};
        case CHANGE_LOGIN_STATUS:
            return {...state, isLogin: action.payload.isLogin};
        default:
            return state; 
    }
}

export default userReducer;