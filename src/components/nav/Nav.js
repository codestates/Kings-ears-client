import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import './style.css'
import { HiOutlineLogout } from 'react-icons/hi'
import { ImHome3 } from 'react-icons/im'
import { RiUserHeartLine } from 'react-icons/ri'
import Tooltip from '../tooltip/Tooltip'
import axios from 'axios'
import { changeLogInStatus } from '../../actions/index'

export default function Nav() {
  const dispatch = useDispatch();
  const state = useSelector(state => state.userReducer);
  const { accessToken } = state;

  function handleLogOut() {
    axios
      .get(`${process.env.REACT_APP_URI}/singout`, {
        withCredentials: true,
        headers: {
          authorization: `bearer ${accessToken}`
        }
      })
      .then(res => {
        dispatch(changeLogInStatus(false));
      })
      .catch(err => console.log(err));
  }
  return (
    <nav className="Nav">
      <ul>
        <li>
          <Link to="/"><ImHome3/></Link>
          <Tooltip text={`홈`}/>
        </li>
        <li>
          <Link to="/mypage"><RiUserHeartLine/></Link>
          <Tooltip text={`마이페이지`}/>
        </li>
        <li>
          <HiOutlineLogout onClick={handleLogOut}/>
          <Tooltip text={`로그아웃`}/>
        </li>
      </ul>
    </nav>
  )
}

