import React from 'react'
import { Link } from 'react-router-dom'
import '../nav/style.css'

export default function Nav() {
  function handleLogOut() {
    console.log('로그아웃해라해라')
  }
  return (
    <nav className="Nav">
      <ul>
        <li><Link to="/">홈</Link></li>
        <li><Link to="/mypage">마이페이지</Link></li>
        <li><button onClick={handleLogOut}>로그아웃</button></li>
      </ul>
    </nav>
  )
}

