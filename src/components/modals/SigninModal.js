import React from 'react'
import './style.css'
import { FaWindowClose } from 'react-icons/fa'

export default function SigninModal() {
  function closeModal () {
    // 모달 닫는 로직 구현
  }
  return (
    <div className="modalSeaweed">
      <div className="signinBox">
        <form>
          <input type="text" placeholder="Username"></input>
          <input type="email" placeholder="Email"></input>
          <input type="password" placeholder="Password"></input>
          <button type="submit">회원가입</button>
        </form>
        <FaWindowClose onClick={closeModal}/>
      </div>
    </div>
  )
}
