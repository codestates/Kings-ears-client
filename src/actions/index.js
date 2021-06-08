export const SIGN_IN = 'SIGN_IN';

export const singIn = () => {
    return {
        type: SIGN_IN,
        payload: {
            userinfo: '',
        }
    }
}