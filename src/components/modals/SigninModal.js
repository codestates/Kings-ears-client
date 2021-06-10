import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import './style.css';
import { FaWindowClose } from 'react-icons/fa';
import axios from 'axios';

const SigninModal = withRouter(({ history }) => {
  const [userInput, setUserInput] = useState({
    username: '',
    email: '',
    password: '',
  })
  const [errMessage, setErrMessage] = useState({
    errMessage: '',
  })

  const handleInputValue = (key) => (e) => {
    setUserInput({ ...userInput, [key]: e.target.value });
  }

  const handleSignup = () => {
    //서버에 post 요청 보내어 회원가입 진행
    //서버의 응답에 따라 errMessage 상태 변경하여 핸들링
    const { username, email, password } = userInput;

    if(!username || !email || !password) {
      setErrMessage({errMessage: 'insufficient'});
    } else {
      axios
        .post('http://INPUT_SERVER_DOMAIN/signup', {
          username: username,
          email: email,
          password, password,
        },
        {
          withCredentials: true,
          'Content-Type': 'application/json'
        })
        .then(res => history.push('/'))
        .catch(err => {
          const errMessage = err.response.data.message;

          if(errMessage) {
            if(errMessage === 'email exist') {
              setErrMessage(errMessage);
            } else {
              setErrMessage(errMessage);
            }
          } else if(err.request) {
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
        return;
    }
  }

  function closeModal() {
    // 모달 닫는 로직 구현
  }

  return (
    <div className="modalSeaweed">
      <div className="signinBox">
        <form>
          <div>
            <input
              type="text"
              placeholder="Username"
              onChange={handleInputValue('username')}
            ></input>
          </div>
          <div>
            <input
              type="email"
              placeholder="Email"
              onChange={handleInputValue('email')}
            ></input>
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              onChange={handleInputValue('password')}
            ></input>
          </div>
          <button type="submit" onClick={handleSignup}>회원가입</button>
          {errMessage.errMessage ?
            handleErrMessage(errMessage)
            : <div className='alert-box'></div>}
        </form>
        <FaWindowClose onClick={closeModal} />
      </div>
    </div>
  )
});

export default SigninModal;