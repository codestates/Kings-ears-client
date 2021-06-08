import { initialState } from './initialState';
import { SIGN_IN } from '../actions';

const userReducer = (state = initialState, action) => {
    switch(action.type) {
        case SIGN_IN:
            return {
                ...state,
                userinfo: action.payload
            }
        default:
            return state; 
    }
}

export default userReducer;