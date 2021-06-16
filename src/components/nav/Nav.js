import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import './style.css'
import { HiOutlineLogout } from 'react-icons/hi'
import { ImHome3 } from 'react-icons/im'
import { RiUserHeartLine } from 'react-icons/ri'
import Tooltip from '../tooltip/Tooltip'
import axios from 'axios'
import { changeLogInStatus, getAccessToken } from '../../actions/index'

export default function Nav() {
  // Global state
  const dispatch = useDispatch();
  const state = useSelector(state => state.userReducer);
  const { accessToken } = state;
  const history = useHistory();

  const handleLogOut = () => {
    axios
      .get(`${process.env.REACT_APP_URI}/signout`, {
        withCredentials: true,
        headers: {
          authorization: `bearer ${accessToken}`
        }
      })
      .then(res => {
        dispatch(changeLogInStatus(false));
        dispatch(getAccessToken(''));
        history.push('/');
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

