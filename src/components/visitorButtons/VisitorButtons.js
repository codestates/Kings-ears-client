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

  const closeLoginModal = () => {
    setLogInMode(false);
  }

  const closeSigninModal = () => {
    setSignInMode(false);
  }

  return (
    <div className="landing-modal-buttons">
      <button onClick={loginHandler}>로그인</button>
      <button onClick={signinHandler}>회원가입</button>
      {
        logInMode && <LoginModal open={setLogInMode} close={closeLoginModal} />
      }
      {
        signInMode && <SigninModal open={signInMode} close={closeSigninModal} />
      }
    </div>
  )
}
