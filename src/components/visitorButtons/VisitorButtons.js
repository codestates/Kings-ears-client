import { useState } from 'react'
import LoginModal from '../modals/LoginModal'
import SignupModal from '../modals/SignupModal'
import './style.css'

export default function VisitorButtons() {
  const [logInMode, setLogInMode] = useState(false)
  const [signupMode, setSignInMode] = useState(false)
  
  function loginHandler() {
    setLogInMode(true)
  }

  function signinHandler() {
    setSignInMode(true)
  }

  const closeLoginModal = () => {
    setLogInMode(false);
  }

  const closeSignupModal = () => {
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
        signupMode && <SignupModal open={signupMode} close={closeSignupModal} />
      }
    </div>
  )
}
