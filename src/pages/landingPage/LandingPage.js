import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { GiDonkey } from 'react-icons/gi'
import MemberButtons from '../../components/memberButtons/MemberButtons'
import VisitorButtons from '../../components/visitorButtons/VisitorButtons'
import './style.css'
import axios from 'axios'

export default function LandingPage() {
  // Global state
  const state = useSelector(state => state.userReducer)
  const { isLogin } = state

  // Local state
  const [todaysSecrets, setTodaysSecrets] = useState(0)
  const [kingDonkey, setKingDongkey] = useState('김코딩')

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_URI}/`, {
        withCredentials: true
      })
      .then ( res => {
        setTodaysSecrets(res.data.data.todaysecret)
        setKingDongkey(res.data.data.kingdonkey)
      })
      .catch( err => {
        console.log(err)
      })
  }, [])
  

  return (
    <div className="LandingPage">
      <div className="LandingPage-welcome">
        <h1>"임금님 귀는 당나귀 귀!"</h1>
        <div>덩키킹덤에 오신 걸 환영합니다! <GiDonkey/> </div>
        <div>사소하지만 너무 말하고 싶었던 TMI, 아무도 모르게 털어놓으세요!</div>
      </div>
      <ul className="LandingPage-info">
        <li>오늘의 킹덩키: {kingDonkey}</li>
        <li>오늘의 새로운 비밀: {todaysSecrets}개</li>
      </ul>
      {
        isLogin ?
        <MemberButtons /> :
        <VisitorButtons isLogin={isLogin}/>
      }
    </div>
  )
}
