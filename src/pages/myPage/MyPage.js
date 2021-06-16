import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AiFillLike, AiFillDislike } from 'react-icons/ai'
import { useHistory } from 'react-router-dom'
import axios from 'axios';
import './style.css';
import priest from '../../assets/levelimg/priest.png';
import aristocrat from '../../assets/levelimg/aristocrat.png';
import peasant from '../../assets/levelimg/peasant.gif';
import merchant from '../../assets/levelimg/merchant.png';
import knight from '../../assets/levelimg/knight.png';
import KingDonkey from '../../assets/levelimg/KingDonkey.png';
import PasswordChangeModal from '../../components/modals/PasswordChangeModal';
import ByeModal from '../../components/modals/ByeModal';
import { getAccessToken, changeLogInStatus } from '../../actions/index';
import addUserTitle from '../../utilities/addUserTitle';

const MyPage = () => {
  const dispatch = useDispatch();
  const state = useSelector(state => state.userReducer);
  const history = useHistory();
  const { accessToken, userLevel } = state;
  const [pwChangeMode, setPwChangeMode] = useState(false);
  const [byeMode, setByeMode] = useState(false);
  const [userInfo, setUserInfo] = useState({
    //임시 하드 코딩 나중에 데이터 받아오면 제대로 수정 필요
    username: '양꼬치',
    secrets: 50,
    viewSecrets: [
      {
        content: "내가 그린 비밀 그림은 목이 긴 비밀 그림이다. 내가 그린 기린 그림은 비밀을 많이 가진 기린 그림이다.내가 그린 비밀 그림은 목이 긴 비밀 그림이다. 내가 그린 기린 그림은 비밀을 많이 가진 기린 그림이다. 내가 그린 비밀 그림은 목이 긴 비밀 그림이다. 내가 그린 기린 그림은 비밀을 많이 가진 기린 그림이다.내가 그린 비밀 그림은 목이 긴 비밀 그림이다. 내가 그린 기린 그림은 비밀을 많이 가진 기린 그림이다.",
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
    mySecret: [
      {
        content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus ex exercitationem quam est enim placeat iure et asperiores adipisci. Error officiis, mollitia placeat voluptate nostrum soluta cum autem dolore voluptatibus nisi dolorem quaerat fugiat ipsa eius, assumenda non perspiciatis omnis eum ratione quibusdam ex earum itaque similique. Maiores tempora laborum commodi obcaecati distinctio et optio reprehenderit facilis aliquid repellendus id nesciunt, qui nisi magni illo sapiente, architecto quae necessitatibus labore molestiae laudantium reiciendis voluptates error quia. Praesentium molestiae quaerat rem eligendi sunt, eos nulla quasi voluptates iusto perspiciatis repellat quia facere dolorum ea illo dolor, voluptatum voluptatem consectetur, laudantium unde esse labore eveniet aliquam ratione. Molestiae unde rerum sit, a assumenda architecto necessitatibus distinctio velit magni alias voluptatem perferendis eius eligendi quam, laborum amet facilis earum ipsam soluta nobis blanditiis, incidunt itaque enim iure. Sint, facere. Sunt, ab. Optio, autem tempore corporis perferendis tenetur odit at iusto debitis eum error ipsam, a totam dolores, dolore aut iure similique deleniti illo! Accusantium corrupti delectus doloribus. Molestias nobis reprehenderit, ab magnam maiores recusandae voluptas eveniet omnis porro atque perspiciatis optio, ipsam ex praesentium eaque illo! Nostrum ratione asperiores totam. Impedit rem magni explicabo aspernatur atque ipsam mollitia minima corrupti recusandae consequatur expedita eveniet blanditiis, accusamus nulla aperiam laborum soluta hic magnam vitae iste totam, dolor adipisci. Eveniet tempora possimus expedita, voluptas numquam nulla ipsum eos totam accusamus cupiditate quod quis atque, et asperiores quia culpa, laboriosam magni ad. Suscipit aperiam natus, maxime, hic corporis veniam sint qui, neque numquam provident consequuntur necessitatibus magnam distinctio odio earum. Aut?",
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

  const verifyToken = useCallback(() => {
    axios
      .get(`${process.env.REACT_APP_URI}/user`, {
        headers: {
          authorization: `bearer ${accessToken}`
        },
        withCredentials: true,
      })
      .then(res => {
        const { username, secrets, viewsecret, mysecret } = res.data.data;
        setUserInfo({
          ...userInfo,
          username: username,
          secrets: secrets,
          viewSecrets: viewsecret,
          mySecret: mysecret,
        });
      })
      .catch(err => {
        axios
          .get(`${process.env.REACT_APP_URI}/accesstoken`, {
            withCredentials: true,
          })
          .then(res => dispatch(getAccessToken(res.data.accessToken)))
          .catch(err => {
            if (err.response.status === 403) {
              dispatch(changeLogInStatus(false));
              history.push('/unauthorized');
            } else {
              console.log(err);
            }
          });
      });
  }, [dispatch, history]);

  useEffect(() => {
    verifyToken();
  }, [verifyToken]);

  const handleChangePw = () => {
    setPwChangeMode(true);
  };

  const handleChangePwModalClose = () => {
    setPwChangeMode(false);
  }

  const handleByeBye = () => {
    setByeMode(true);
  };

  const handleByeModalClose = () => {
    setByeMode(false);
  }

  const handleImageRender = (userLevel) => {
    switch (userLevel) {
      case 1:
        return peasant;
      case 2:
        return merchant;
      case 3:
        return knight;
      case 4:
        return aristocrat;
      case 5:
        return priest;
      case 6:
        return KingDonkey;
      default:
        return '???';
    }
  }

  return (
    <div className="MyPage">
      {pwChangeMode && <PasswordChangeModal open={pwChangeMode} close={handleChangePwModalClose} />}
      {byeMode && <ByeModal open={byeMode} close={handleByeModalClose} />}
      <div className='content-wrapper'>
        <div className='info-wrapper'>
          <div className='lv-img'><img src={handleImageRender(userLevel)} alt='nothing to show' /></div>
          <div className='my-info'>
            <div>{addUserTitle(userLevel)} {userInfo.username}</div>
            <div>내가 쓴 비밀 : {userInfo.secrets}개</div>
          </div>
          <div className='button-wrapper'>
            <button onClick={handleChangePw}>비밀번호 변경</button>
            <button onClick={handleByeBye}>회원 탈퇴</button>
          </div>
        </div>
        <div className='secrets'>
          <div className='secret-list'>
            <div>나의 비밀</div>
            <ul>
              {userInfo.mySecret.map((el, idx) => {
                const { content, likeCount, dislikeCount } = el;
                let shortened;
                if (content.length > 80) {
                  shortened = `${content.split('').splice(0, 80).join('')}...`
                } else {
                  shortened = content
                }

                return (
                  <li key={idx}>
                    <div className='content'>{shortened}</div>
                    <div className='like-count'><AiFillLike /></div>
                    <div>{likeCount}</div>
                    <div className='dislike-count'><AiFillDislike /></div>
                    <div>{dislikeCount}</div>
                  </li>
                )
              })}
            </ul>
          </div>
          <div className='secret-list'>
            <div>내가 본 비밀</div>
            <ul>
              {userInfo.viewSecrets.map((el, idx) => {
                const { content, likeCount, dislikeCount } = el;
                let shortened;
                if (content.length > 80) {
                  shortened = `${content.split('').splice(0, 80).join('')}...`
                } else {
                  shortened = content
                }

                return (
                  <li key={idx}>
                    <div className='content'>{shortened}</div>
                    <div className='like-count'><AiFillLike /></div>
                    <div>{likeCount}</div>
                    <div className='dislike-count'><AiFillDislike /></div>
                    <div>{dislikeCount}</div>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MyPage;