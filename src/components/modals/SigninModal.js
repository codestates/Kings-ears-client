import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import './style.css';
import { FaWindowClose } from 'react-icons/fa';
import axios from 'axios';
import { passwordCheck, emailCheck, usernameCheck } from '../../utilities/checkAvailable';

const SigninModal = withRouter(({ history }) => {
  const [userInput, setUserInput] = useState({
    username: '',
    email: '',
    password: '',
  })
  const [errMessage, setErrMessage] = useState({
    errMessage: '',
  })
  const [validMessage, setValidMessage] = useState({
    validMessage: '',
  })

  const handleInputValue = (key) => (e) => {
    setUserInput({ ...userInput, [key]: e.target.value });
  }

  const handleSignup = () => {
    //서버에 post 요청 보내어 회원가입 진행
    //서버의 응답에 따라 errMessage 상태 변경하여 핸들링
    const { username, email, password } = userInput;

    if (!username || !email || !password) {
      setErrMessage({ errMessage: 'insufficient' });
    } else {
      axios
        .post('http://SERVER_DOMAIN/signup', {
          username: username,
          email: email,
          password: password,
        },
          {
            withCredentials: true,
            'Content-Type': 'application/json'
          })
        .then(res => {
          console.log(res.status)
          if(res.data.message === 'OK') {
            history.push('/');
          }
        })
        .catch(err => {
          const errMessage = err.response.data.message;

          if (errMessage) {
            if (errMessage === 'email exist') {
              setErrMessage({ errMessage: errMessage });
            } else {
              setErrMessage({ errMessage: errMessage });
            }
          } else if (err.request) {
            console.log(err.request);
          } else {
            console.log('Error', err.messege)
          }
        })
    }
  }

  const handleErrMessage = (errMessage) => {
    //errMessage 상태에서 에러메세지를 받아 해당 에러메세지 조건부 랜더링
    switch (errMessage) {
      case 'insufficient':
        return <div className='alert-box'>모든 항목은 필수입니다</div>
      case 'email exist':
        return <div className='alert-box'>동키킹덤의 주민이시네요! 숲으로 가시겠어요?</div>
      case 'username exist':
        return <div className='alert-box'>이미 사용중인 유저이름 입니다</div>
      default:
        return <div className='alert-box'></div>
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

  function closeModal() {
    // 모달 닫는 로직 구현
  }

  return (
    <div className="modalSeaweed">
      <div className="signinBox">
        <FaWindowClose onClick={closeModal} className='signin-box-close-btn' />
        <form>
          <input
            type="text"
            placeholder="Username"
            onChange={handleInputValue('username')}
            onBlur={() => setValidMessage({ validMessage: usernameCheck(userInput.username) })}
          ></input>
          {validMessage.validMessage === '3' || validMessage.validMessage === '4' ?
            handleValidation(validMessage.validMessage)
            : <div className='alert-box'></div>
          }
          <input
            type="text"
            placeholder="Email"
            onChange={handleInputValue('email')}
            onBlur={() => setValidMessage({ validMessage: emailCheck(userInput.email) })}
          ></input>
          {validMessage.validMessage === '5' ?
            handleValidation(validMessage.validMessage)
            : <div className='alert-box'></div>
          }
          <input
            type="password"
            placeholder="Password"
            onChange={handleInputValue('password')}
            onBlur={() => setValidMessage({ validMessage: passwordCheck(userInput.password) })}
          ></input>
          {validMessage.validMessage === '1' || validMessage.validMessage === '2' ?
            handleValidation(validMessage.validMessage)
            : <div className='alert-box'></div>
          }
          <button type="submit" onClick={handleSignup}>회원가입</button>
          {errMessage.errMessage ?
            handleErrMessage(errMessage.errMessage)
            : <div className='alert-box'></div>
          }
        </form>
      </div>
    </div>
  )
});

export default SigninModal;