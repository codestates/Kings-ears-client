import React from 'react'
import { Link } from 'react-router-dom'
import './style.css'
import { HiOutlineLogout } from 'react-icons/hi'
import { ImHome3 } from 'react-icons/im'
import { RiUserHeartLine } from 'react-icons/ri'

export default function Nav() {
  function handleLogOut() {
    console.log('로그아웃 기능 구현 필요')
  }
  return (
    <nav className="Nav">
      <ul>
        <li><Link to="/"><ImHome3/></Link></li>
        <li><Link to="/mypage"><RiUserHeartLine/></Link></li>
        <li><HiOutlineLogout onClick={handleLogOut}/></li>
      </ul>
    </nav>
  )
}

