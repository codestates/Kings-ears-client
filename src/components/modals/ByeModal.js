import axios from 'axios';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { FaWindowClose } from 'react-icons/fa';
import { changeLogInStatus, getAccessToken, getUserLevel } from '../../actions/index';

const ByeModal = props => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { open, close } = props;
    const [byeSuccess, setByeSuccess] = useState(false);
    const [userInput, setUserInput] = useState('');
    const [errMessage, setErrMessage] = useState('');
    const [loginStatus, setLoginStatus] = useState(true);

    const handlePwInput = e => {
        setUserInput(e.target.value);
    }

    const handleByeBtn = () => {
        axios
            .delete(REACT_APP_URI+'/byebye', {
                withCredentials: true,
                headers: {
                    password: userInput,
                }
            })
            .then(res => {
                setByeSuccess(true);
                dispatch(changeLogInStatus(false));
                dispatch(getAccessToken(''));
                dispatch(getUserLevel(0));
                window.setTimeout(() => history.push('/'), 3000);
            })
            .catch(err => {
                if (err.status === 404) {
                    setErrMessage('비밀번호가 다릅니다 다시 입력해 주세요')
                    return;
                }

                if (err.status === 403) {
                    setLoginStatus(false);
                    dispatch(changeLogInStatus(false));
                    window.setTimeout(() => history.push('/'), 3000);
                    return;
                }
            })
    }

    return (
        <div className={open ? 'modalSeaweed openModal' : 'modalSeaweed'}>
            {open ? (
                <div className='bye-modal-box'>
                    {loginStatus ? (
                        <React.Fragment>
                            {byeSuccess ? (
                                <div class='message'>
                                    <div>회원 탈퇴가 성공 하였습니다</div>
                                    <div>잠시후 메인 페이지로 이동 됩니다</div>
                                </div>
                            ) : (
                                <React.Fragment>
                                    <FaWindowClose onClick={close} className='modal-box-close-btn' size={20} />
                                    <div>
                                        <div className='bye-content-wrapper'>
                                            <div>회원 탈퇴를 진행 하시겠습니까?</div>
                                            <div>회원 탈퇴시 작성 하셨던 모든 비밀이 사라집니다</div>
                                            <input type='password' placeholder='비밀번호를 입력해 주세요' onChange={handlePwInput}></input>
                                            {errMessage && <div className='alert-box'>{errMessage}</div>}
                                        </div>
                                        <div className='button-container'>
                                            <button onClick={handleByeBtn}>예</button>
                                            <button onClick={close}>아니오</button>
                                        </div>
                                    </div>
                                </React.Fragment>
                            )}
                        </React.Fragment>
                    ) : (
                        <div class='message'>
                            <div>로그아웃 상태 입니다 다시 로그인 해주세요!</div>
                            <div>잠시후 메인 페이지로 이동 됩니다</div>
                        </div>
                    )}
                </div>
            ) : null}
        </div>
    );
}

export default ByeModal;