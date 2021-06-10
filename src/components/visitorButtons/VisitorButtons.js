import { useState } from 'react'
import LoginModal from '../modals/LoginModal'
import SigninModal from '../modals/SigninModal'
import './style.css'

export default function VisitorButtons() {
  const [logInMode, setLogInMode] = useState(false)
  const [signInMode, setSignInMode] = useState(false)
  
  function loginHandler() {
    setLogInMode(true)
  }

  function signinHandler() {
    setSignInMode(true)
  }
  return (
    <div className="landing-modal-buttons">
      <button onClick={loginHandler}>로그인</button>
      <button onClick={signinHandler}>회원가입</button>
      {
        logInMode && <LoginModal />
      }
      {
        signInMode && <SigninModal />
      }
    </div>
  )
}
