import { IS_LOGIN } from '../actions';
import { initialState } from './initialState';

const userReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_ACCESS_TOKEN:
            return {...state, accessToken: action.payload.accessToken};
        case IS_LOGIN:
            return {...state, isLogin: action.payload.isLogin};
        case GET_USER_LEVEL:
            return {...state, userLevel: action.payload.userLevel};
        default:
            return state; 
    }
}

export default userReducer;