import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Nav from '../../components/nav/Nav';
import axios from 'axios';
import './style.css';
import exampleImg from '../../assets/farmer.jpeg';
import PasswordChangeModal from '../../components/modals/PasswordChangeModal';
import ByeModal  from '../../components/modals/ByeModal';

export default function MyPage() {
  const dispatch = useDispatch();
  const state = useSelector(state => state.userReducer);
  const { isLogin, accessToken } = state;
  const [pwChangeMode, setPwChangeMode] = useState(false);
  const [byeMode, setByeMode] = useState(false);
  const [userLv, setUserLv] = useState(0);

  useEffect(() => {
    axios
      .get('https://api.cakes.com/user', {
        headers: {
          authorization: `bearer ${accessToken}`
        },
        withCredentials: true,
      })
  }, [])

  const handleChangePw = () => {
    setPwChangeMode(true);
  }

  const handleByeBye = () => {
    setByeMode(true);
  }

  return (
    <div className="MyPage">
      <Nav />
      <div className='content-wrapper'>
        <div className='info-wrapper'>
          <div className='lv-img'><img src={exampleImg} width='150' /></div>
          <div className='my-info'>
            <div>입이 가벼운 소작농 양꼬치</div>
            <div>소지 토큰 : 5개</div>
            <div>내가 쓴 비밀 : 50개</div>
          </div>
          <div className='button-wrapper'>
            <button>비밀번호 변경</button>
            <button>회원 탈퇴</button>
            {pwChangeMode && <PasswordChangeModal />}
            {byeMode && <ByeModal />}
          </div>
        </div>
        <div className='readed-secret'>
          <ul>
            <li>어제는 말이야...</li>
            <li>나 로또 1등 됬어!!!</li>
            <li>버스에서 졸다가...</li>
            <li>사실 나... </li>
            <li>우리 아빠 빌게이츠임</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
