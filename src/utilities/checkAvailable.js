const passwordCheck = password => {
    const regex = /^.*(?=^.{8,}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/

    if (password.length < 8) {
        return '1';
    } else if (!regex.test(password)) {
        return '2';
    } else {
        return '';
    }
}

const usernameCheck = username => {
    const regex = /^[가-힣ㄱ-ㅎa-zA-Z0-9._-]{2,}$/

    if (username.length < 2) {
        return '3';
    } else if (!regex.test(username)) {
        return '4';
    } else {
        return ''
    }
}

const emailCheck = email => {
    const regex = /^[0-9a-zA-Z]([-_]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i

    if (!regex.test(email)) return '5';
    else return '';
}

export { passwordCheck, usernameCheck, emailCheck };