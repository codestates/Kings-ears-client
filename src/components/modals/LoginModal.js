import React from 'react'
import './style.css'
import { FaWindowClose } from 'react-icons/fa'

export default function LoginModal() {
  function closeModal() {
    // 모달 닫는 로직 구현
  }
  return (
    <div className="modalSeaweed">
      <div className="loginBox">
        <form>
          <input type="email" placeholder="Email"></input>
          <input type="password" placeholder="Password"></input>
          <button type="submit">로그인</button>
        </form>
        <FaWindowClose onClick={closeModal}/>
      </div>
    </div>
  )
}
