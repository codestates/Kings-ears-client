import React, { useState } from 'react';
import './style.css';
import { FaWindowClose } from 'react-icons/fa';
import axios from 'axios';
import { passwordCheck, emailCheck, usernameCheck, checkAll } from '../../utilities/checkAvailable';

const SigninModal = props => {
  const { open, close } = props;
  const [userInput, setUserInput] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [errMessage, setErrMessage] = useState('');
  const [validMessage, setValidMessage] = useState('');
  const [signUpSuccess, setSignUpSuccess] = useState(false);

  const handleInputValue = (key) => (e) => {
    setUserInput({ ...userInput, [key]: e.target.value });
  }

  const handleSignup = e => {
    //서버에 post 요청 보내어 회원가입 진행
    //서버의 응답에 따라 errMessage 상태 변경하여 핸들링
    e.preventDefault();

    const { username, email, password } = userInput;

    if (!username || !email || !password) {
      setErrMessage('insufficient');
      return;
    }

    if(!checkAll(username, email, password)) {
      setErrMessage('invalid');
      return;
    }

    axios.post(`${process.env.REACT_APP_URI}/signup`,
      {
        username: username,
        email: email,
        password: password,
      },
      {
        withCredentials: true,
        'Content-Type': 'application/json'
      }
    ).then(res => {
      if (res.data.message === 'OK') {
        setSignUpSuccess(true);
      }
    }).catch(err => {
      const errMessage = err.response.data.message;

      if (errMessage) {
        if (errMessage === 'email exist') {
          setErrMessage(errMessage);
        } else {
          setErrMessage(errMessage);
        }
      } else if (err.request) {
        console.log(err.request);
      } else {
        console.log('Error', err.messege)
      }
    })
  }

  const handleErrMessage = (errMessage) => {
    //errMessage 상태에서 에러메세지를 받아 해당 에러메세지 조건부 랜더링
    switch (errMessage) {
      case 'insufficient':
        return <div className='alert-box error'>모든 항목은 필수입니다</div>
      case 'invalid':
        return <div className='alert-box error'>모든 항목을 올바르게 작성해 주세요!</div>
      case 'email exist':
        return <div className='alert-box error'>동키킹덤의 주민이시네요! 숲으로 가시겠어요?</div>
      case 'username exist':
        return <div className='alert-box error'>이미 사용중인 유저이름 입니다</div>
      default:
        return <div className='alert-box error'></div>
    }
  }

  const handleValidation = (validMessage) => {
    switch (validMessage) {
      case '1':
        return <div className='alert-box'>비밀번호는 8자리 이상이어야 합니다</div>
      case '2':
        return <div className='alert-box'>비밀번호는 영어,숫자,특수문자를 포함해야 합니다</div>
      case '3':
        return <div className='alert-box'>닉네임은 2글자 이상이어야 합니다</div>
      case '4':
        return <div className='alert-box'>닉네임은 한글,영어,숫자로 구성되며 공백이 없어야 합니다</div>
      case '5':
        return <div className='alert-box'>올바른 이메일을 입력해 주세요</div>
      default:
        return <div className='alert-box'></div>
    }
  }

  return (
    <div className={open ? 'modalSeaweed openModal' : 'modalSeaweed'}>
      {open ? (
        <div className="signinBox">
          <FaWindowClose onClick={close} className='signin-box-close-btn' size={20} />
          {signUpSuccess ? (
            <div className='successMsg'>
              <div>회원 가입에 성공 하였습니다!</div>
              <button onClick={close}>로그인 하러 가기</button>
            </div>
          ) : (
            <form>
            <input
              type="text"
              placeholder="Username"
              onChange={handleInputValue('username')}
              onBlur={() => setValidMessage(usernameCheck(userInput.username))}
            ></input>
            {validMessage === '3' || validMessage === '4' ?
              handleValidation(validMessage)
              : <div className='alert-box'></div>
            }
            <input
              type="text"
              placeholder="Email"
              onChange={handleInputValue('email')}
              onBlur={() => setValidMessage(emailCheck(userInput.email))}
            ></input>
            {validMessage === '5' ?
              handleValidation(validMessage)
              : <div className='alert-box'></div>
            }
            <input
              type="password"
              placeholder="Password"
              onChange={handleInputValue('password')}
              onBlur={() => setValidMessage(passwordCheck(userInput.password))}
            ></input>
            {validMessage === '1' || validMessage === '2' ?
              handleValidation(validMessage)
              : <div className='alert-box'></div>
            }
            <button type="submit" onClick={handleSignup}>회원가입</button>
            {errMessage ?
              handleErrMessage(errMessage)
              : <div className='alert-box error'></div>
            }
          </form>
          )}  
        </div>
      ) : null}
    </div>
  )
};

export default SigninModal;