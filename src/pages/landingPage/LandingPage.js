import MemberButtons from '../../components/memberButtons/MemberButtons'
import VisitorButtons from '../../components/visitorButtons/VisitorButtons'
import './style.css'
import { GiDonkey } from 'react-icons/gi'
import { useSelector } from 'react-redux'

export default function LandingPage() {
  // Redux 관련
  const state = useSelector(state => state.userReducer)
  const { isLogin } = state

  return (
    <div className="LandingPage">
      <div className="LandingPage-welcome">
        <h1>"임금님 귀는 당나귀 귀!"</h1>
        <div>덩키킹덤에 오신 걸 환영합니다! <GiDonkey/> </div>
        <div>사소하지만 너무 말하고 싶었던 TMI, 아무도 모르게 털어놓으세요!</div>
      </div>
      {
        isLogin ?
        <MemberButtons /> :
        <VisitorButtons isLogin={isLogin}/>
      }
    </div>
  )
}
