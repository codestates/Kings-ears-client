import axios from 'axios'
import './style.css'
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { FaWindowClose } from 'react-icons/fa'
import { changeLogInStatus, getAccessToken, getUserLevel } from '../../actions/index.js'

export default function LoginModal(props) {
  const { open, close } = props;
  const dispatch = useDispatch()

  // 로컬 변수
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const history = useHistory()

  function handleEmail(e) {
    setEmail(e.target.value)
  }

  function handlePassword(e) {
    setPassword(e.target.value)
  }

  function handleLogin(e) {
    e.preventDefault()

    // 이메일 또는 비밀번호가 빈칸일 경우
    if ( email==="" || password==="") {
      setErrorMessage("이메일과 비밀번호는 필수 항목 입니다.")
      return;
    }

    //로그인 요청 보내기
    axios.post(
      `${process.env.REACT_APP_URI}/signin`, 
      { email: email, password: password },
      { withCredentials: true }
    )
    .then ( res => {
      // 전역 변수 변경 (유저레벨, 로그인 상태, 토큰 상태)
      dispatch(changeLogInStatus(true))
      dispatch(getAccessToken(res.data.accessToken))

      //랜딩페이지로 리디랙션
      history.push('/')
    })
    .catch (err => {
      setErrorMessage("이메일 또는 비밀번호를 잘못 입력하셨습니다.")
    })
  }

  return (
    <div className={ open ? 'modalSeaweed openModal' : "modalSeaweed" } >
      { open ? (
        <div className="loginBox">
          <FaWindowClose onClick={close} className="loginModal-close-btn" size={20}/>
          <form onSubmit={handleLogin}>
            <input type="email" placeholder="Email" onChange={handleEmail}></input>
            <input type="password" placeholder="Password" onChange={handlePassword}></input>
            { errorMessage !== "" && <div className="errorMessage">{ errorMessage }</div>}
            <button type="submit" className="loginModal-submit-btn">로그인</button>
          </form>
        </div>
      ) : null}
    </div>
  )
}