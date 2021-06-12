export const GET_ACCESS_TOKEN = 'GET_ACCESS_TOKEN';
export const CHANGE_LOGIN_STATUS = 'CHANGE_LOGIN_STATUS';
export const GET_USER_LEVEL = 'GET_USER_LEVEL';

export const getAccessToken = (accessToken) => {
    return {
        type: GET_ACCESS_TOKEN,
        payload: {
            accessToken: accessToken,
        }
    }
}

export const changeLogInStatus = (status) => {
    return {
        type: CHANGE_LOGIN_STATUS,
        payload: {
            isLogin: status,
        }
    }
}

export const getUserLevel = (userLevel) => {
    return {
        type: GET_USER_LEVEL,
        payload: {
            userLevel: userLevel,
        }
    }
}