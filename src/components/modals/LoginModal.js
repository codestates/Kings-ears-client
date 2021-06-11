import axios from 'axios'
import './style.css'
import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { FaWindowClose } from 'react-icons/fa'
import { isLogin, getAccessToken, getUserLevel } from '../../actions/index.js'

export default function LoginModal( { setLogInMode } ) {
  const state = useSelector(state => state.userReducer)
  const dispatch = useDispatch()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const history = useHistory()

  function closeModal() {
    setLogInMode(false)
  }

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

    //로그인 요청 보내기: 앤드포인트 변경 필요 (케이크 아니에욧!!!)
    axios.post('https://api.cakes.com/signin', {
      email: email,
      password: password
    })
    .then ( res => {
      if (res.message === "OK") {
        // 스토어 상태 변경 해주기
        let userLevel = calculateUserLevel(res.data.secrets)
        dispatch(getUserLevel(userLevel)) 
        dispatch(isLogin(true))

        //랜딩페이지로 리디랙션: 서버 연결 후 테스팅 필요
        history.push('/')

      } else {
        setErrorMessage("이메일 또는 비밀번호를 잘못 입력하셨습니다.")
      }
    })
    .catch (err => console.log(err))
  }

  return (
    <div className="modalSeaweed">
      <div className="loginBox">
        <FaWindowClose onClick={closeModal} className="loginModal-close-btn"/>
        <form onSubmit={handleLogin}>
          <input type="email" placeholder="Email" onChange={handleEmail}></input>
          <input type="password" placeholder="Password" onChange={handlePassword}></input>
          { errorMessage !== "" && <div className="errorMessage">{ errorMessage }</div>}
          <button type="submit" className="loginModal-submit-btn">로그인</button>
        </form>
      </div>
    </div>
  )
}

//유저 레벨 판별 함수
function calculateUserLevel (secrets) {
  if (secrets < 2) return 1;
  if (2 <= secrets && secrets < 5) return 2;
  if (5 <= secrets && secrets < 10) return 3;
  if (10 <= secrets && secrets < 20) return 4;
  if (20 < secrets) return 5;
}