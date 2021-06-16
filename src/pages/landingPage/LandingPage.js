import { useState, useEffect, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { changeLogInStatus, getAccessToken } from '../../actions/index'
import { GiDonkey, GiSecretBook } from 'react-icons/gi'
import { BiCrown } from 'react-icons/bi'
import MemberButtons from '../../components/memberButtons/MemberButtons'
import VisitorButtons from '../../components/visitorButtons/VisitorButtons'
import './style.css'
import axios from 'axios'

export default function LandingPage() {
  // Global state
  const state = useSelector(state => state.userReducer)
  const { isLogin, accessToken } = state
  const dispatch = useDispatch();

  // Local state
  const [todaysSecrets, setTodaysSecrets] = useState(0)
  const [kingDonkey, setKingDongkey] = useState('김코딩')

  const verifyToken = useCallback(() => {
    axios
      .get(`${process.env.REACT_APP_URI}/verification`, {
        withCredentials: true,
        headers: {
          authorization: `bearer ${accessToken}`
        }
      })
      .then(res => {
        dispatch(changeLogInStatus(true));
      })
      .catch(err => {
        axios
          .get(`${process.env.REACT_APP_URI}/accesstoken`, {
            withCredentials: true,
          })
          .then(res => {
            dispatch(getAccessToken(res.data.accessToken));
            dispatch(changeLogInStatus(true));
          })
          .catch(err => {
            if (err.response.status === 403) {
              dispatch(changeLogInStatus(false));
            } else {
              console.log(err);
            }
          })
      });
  },[accessToken, dispatch]);

  useEffect(() => {
    verifyToken();
  }, [verifyToken]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_URI}/`, {
        withCredentials: true
      })
      .then(res => {
        setTodaysSecrets(res.data.data.todaysecret)
        setKingDongkey(res.data.data.kingdonkey)
      })
      .catch(err => {
        console.log(err)
      })
  }, [])

  return (
    <div className="LandingPage">
      <div className="LandingPage-welcome">
        <h1>"임금님 귀는 당나귀 귀!"</h1>
        <div>임금님귀(King's Ears)에 오신 걸 환영합니다! <GiDonkey /> </div>
        <div>사소하지만 너무 말하고 싶었던 TMI, 아무도 모르게 털어놓으세요!</div>
      </div>
        <ul className="LandingPage-info">
          <li><BiCrown/> 오늘의 킹덩키: {kingDonkey}</li>
          <li><GiSecretBook/> 오늘의 새로운 비밀: {todaysSecrets}개</li>
        </ul>
      {
        isLogin ?
          <MemberButtons /> :
          <VisitorButtons isLogin={isLogin} />
      }
    </div>
  )
}
