export const GET_ACCESS_TOKEN = 'GET_ACCESS_TOKEN';
export const IS_LOGIN = 'IS_LOGIN';
export const GET_USER_LEVEL = 'GET_USER_LEVEL';

export const getAccessToken = (accessToken) => {
    return {
        type: GET_ACCESS_TOKEN,
        payload: {
            accessToken: accessToken,
        }
    }
}

export const isLogin = (status) => {
    return {
        type: IS_LOGIN,
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