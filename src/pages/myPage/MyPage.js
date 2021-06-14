import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AiFillLike, AiFillDislike } from 'react-icons/ai'
import Nav from '../../components/nav/Nav';
import axios from 'axios';
import './style.css';
import exampleImg from '../../assets/farmer.jpeg';
import PasswordChangeModal from '../../components/modals/PasswordChangeModal';
import ByeModal from '../../components/modals/ByeModal';

const MyPage = () => {
  const dispatch = useDispatch();
  const state = useSelector(state => state.userReducer);
  const { isLogin, accessToken, userLevel } = state;
  const [pwChangeMode, setPwChangeMode] = useState(false);
  const [byeMode, setByeMode] = useState(false);
  const [userInfo, setUserInfo] = useState({
    //임시 하드 코딩 나중에 데이터 받아오면 제대로 수정 필요
    username: '양꼬치',
    secrets: 50,
    viewSecrets: [
      {
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        likecount: 2,
        dislikecount: 20,
      },
      {
        content: `나 사실 어제 로또 1등 당첨 됐어!!!`,
        likecount: 2,
        dislikecount: 20,
      },
      {
        content: `나 사실 어제 로또 1등 당첨 됐어!!!`,
        likecount: 2,
        dislikecount: 20,
      },
      {
        content: `나 사실 어제 로또 1등 당첨 됐어!!!`,
        likecount: 2,
        dislikecount: 20,
      },
      {
        content: `나 사실 어제 로또 1등 당첨 됐어!!!`,
        likecount: 2,
        dislikecount: 20,
      },
    ],
  });

  useEffect(() => {
    axios
      //임시 엔드포인트 나중에 수정 필요!
      .get('https://api.cakes.com/user', {
        headers: {
          authorization: `bearer ${accessToken}`
        },
        withCredentials: true,
      })
      .then(res => {
        const { username, secrets, viewsecret } = res.data.data;
        setUserInfo({
          ...userInfo,
          username: username,
          secrets: secrets,
          viewSecrets: viewsecret,
        });
      })
      .catch(err => {
        //현재 가지고 있는 refreshToken으로 새로 갱신해야 할듯?
        //refreshToken으로 accessToken 발급 받을 수 있는 API 필요
      })
  }, [accessToken, userInfo]);

  const handleChangePw = () => {
    setPwChangeMode(true);
  };

  const handleChangePwModalClose = () => {
    setPwChangeMode(false);
  }

  const handleByeBye = () => {
    setByeMode(true);
  };

  //임시 타이틀 나중에 수정 필요!
  const addUserTitle = (userlv) => {
    switch(userlv) {
      case 1:
        return '입이 가벼운 소작농';
      case 2:
        return '떠벌이 상인';
      case 3:
        return '숨기는게 없는 귀족';
      case 4:
        return '엔들리스 고해성사 중인 성직자';
      case 5:
        return '킹동키';
      default:
        return '???';
    }
  };

  return (
    <div className="MyPage">
      {pwChangeMode && <PasswordChangeModal open={pwChangeMode} close={handleChangePwModalClose} />}
      {byeMode && <ByeModal />}
      <Nav />
      <div className='content-wrapper'>
        <div className='info-wrapper'>
          <div className='lv-img'><img src={exampleImg} width='150' alt='nothing to show' /></div>
          <div className='my-info'>
            <div>{addUserTitle(userLevel)} {userInfo.username}</div>
            {/* 토큰 서버에서 받아와야 합니다. api 수정 필요!! */}
            <div>소지 토큰 : 5개</div>
            <div>내가 쓴 비밀 : {userInfo.secrets}개</div>
          </div>
          <div className='button-wrapper'>
            <button onClick={handleChangePw}>비밀번호 변경</button>
            <button>회원 탈퇴</button>
          </div>
        </div>
        <div className='readed-secret'>
          <ul>
            {/* li로 뿌려주려 합니다. 서버에서 5개 받아오고 map으로 랜더링 */}
            {userInfo.viewSecrets.map((el, idx) => {
              const { content, likecount, dislikecount } = el;
              
              return (
                <li key={idx}>
                  <div className='content'>{content}</div>
                  <div className='like-count'><AiFillLike /></div>
                  <div>{likecount}</div>
                  <div className='dislike-count'><AiFillDislike /></div>
                  <div>{dislikecount}</div>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default MyPage;