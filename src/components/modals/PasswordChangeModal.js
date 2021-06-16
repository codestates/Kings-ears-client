import React, { useState } from 'react';
import { FaWindowClose } from 'react-icons/fa';
import { passwordCheck } from '../../utilities/checkAvailable';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { changeLogInStatus } from '../../actions/index';
import './style.css';
import axios from 'axios';

const PasswordChangeModal = props => {
    const history = useHistory();
    const state = useSelector(state => state.userReducer);
    const dispatch = useDispatch();
    const { accessToken } = state;
    const { open, close } = props;
    const [userInput, setUserInput] = useState({
        curPw: '',
        changePw: '',
        confirmPw: '',
    });
    const [errMessage, setErrMessage] = useState('');
    const [changeSuccess, setChangeSuccess] = useState(false);

    const handleInputValue = (key) => (e) => {
        setUserInput({ ...userInput, [key]: e.target.value });
    }

    const handleRedirctBtn = () => {
        history.push('/');
    }

    const handleChangePw = e => {
        e.preventDefault();
        const { curPw, changePw, confirmPw } = userInput;

        //에러메세지 타입 1, 2 는 유효성 검사 함수에서 사용 중
        if (!curPw || !changePw || !confirmPw) {
            setErrMessage('6');
            return;
        }

        if (curPw === changePw) {
            setErrMessage('5');
            return;
        }

        if (changePw !== confirmPw) {
            setErrMessage('3');
            return;
        }

        axios
            .patch(`${process.env.REACT_APP_URI}/changepw`, {
                currentpassword: curPw,
                newpassword: changePw,
            },
                {
                    headers: {
                        authorization: `bearer ${accessToken}`,
                        'Content-Type': 'application/json',
                    },
                })
            .then(() => setChangeSuccess(true))
            .then(() => {
                axios
                    .get(`${process.env.REACT_APP_URI}/signout`, {
                        headers: {
                            authorization: `bearer ${accessToken}`,
                        },
                        withCredentials: true,
                    })
                    .then(() => {
                        //비밀번호가 변경 되었으니까 로그인 해제
                        dispatch(changeLogInStatus(false));
                        dispatch(getAccessToken(''));
                        dispatch(getUserLevel(0));
                    })
                    .catch(err => console.log(err));
            })
            .catch(err => {
                if (err.status === 404) setErrMessage('4');
            });
    }

    return (
        <div className={open ? 'modalSeaweed openModal' : 'modalSeaweed'}>
            {open ? (
                <div className='modal-box'>
                    <FaWindowClose onClick={close} className='modal-box-close-btn' size={20} />
                    {changeSuccess ? (
                        <div className='successMsg'>
                            <div>비밀번호 변경에 성공하였습니다</div>
                            <div>다시 로그인 해주세요</div>
                            <button onClick={handleRedirctBtn}>메인 페이지</button>
                        </div>
                    ) : (
                        <form>
                            <input
                                type='password'
                                placeholder='현재 비밀번호'
                                onChange={handleInputValue('curPw')}
                            ></input>
                            <input
                                type='password'
                                placeholder='변경할 비밀번호'
                                onChange={handleInputValue('changePw')}
                                onBlur={() => { setErrMessage(passwordCheck(userInput.changePw)) }}
                            ></input>
                            {errMessage === '1' && <div className='alert-box'>비밀번호는 8자리 이상이어야 합니다</div>}
                            {errMessage === '2' && <div className='alert-box'>비밀번호는 영어,숫자,특수문자를 포함해야 합니다</div>}
                            {errMessage === '5' && <div className='alert-box'>현재 사용중인 비밀번호와 다른 비밀번호를 입력해야 합니다</div>}
                            <input
                                type='password'
                                placeholder='한번 더 입력해 주세요'
                                onChange={handleInputValue('confirmPw')}
                            ></input>
                            {errMessage === '3' && <div className='alert-box'>입력한 비밀번호와 다릅니다</div>}
                            <button type="submit" onClick={handleChangePw}>비밀번호 변경</button>
                            {errMessage === '4' && <div className='alert-box pw'>현재 비밀번호를 올바르게 입력해 주세요</div>}
                            {errMessage === '6' && <div className='alert-box pw'>모든 항목은 필수 입니다</div>}
                        </form>
                    )}
                </div>
            ) : null}
        </div>
    )
}

export default PasswordChangeModal;