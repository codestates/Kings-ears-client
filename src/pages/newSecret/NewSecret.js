import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import './style.css';
import { changeLogInStatus, getAccessToken } from '../../actions';
import GuidanceModal from '../../components/modals/GuidanceModal';

export default function NewSecret() {
  // 전역 상태
  const dispatch = useDispatch()
  const state = useSelector(state => state.userReducer)
  const { isLogin, accessToken } = state
  const history = useHistory();

  // 로컬 상태
  const [mode, setMode] = useState('writing')
  const [secret, setSecret] = useState('')

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
              history.push('/unauthorized');
            } else {
              console.log(err);
            }
          })
      });
  },[accessToken, dispatch, history]);

  useEffect(() => {
    verifyToken();
  }, [verifyToken]);

  const handleNewSecretSubmit = (e) => {
    e.preventDefault()

    // 로그인 상태인 경우: 글 작성 가능
    if (isLogin === true) {
      // (1) 비밀란을 비웠을 경우
      if (secret === '') {
        setMode('secret not written')
        return;
      }

      // (2) 비밀이 제대로 작성되었을 경우
      axios
        .post(
          `${process.env.REACT_APP_URI}/newsecret`,
          { content: secret },
          {
            headers:
              { authorization: `bearer ${accessToken}` },
            withCredentials: true
          }
        )
        .then(() => {
          // (3) 성공적으로 새로운 비밀을 생성했을 경우
          setMode('successful')
        })
        .catch(err => {
          // (4) access token 만료로인해 새로 요청해야 할 경우
          if (err.response.status === 403) {
            axios
              .get(`${process.env.REACT_APP_URI}/accesstoken`, {
                withCredentials: true
              })
              .then(res => {
                dispatch(getAccessToken(res.data.accessToken))
                axios
                  .post(
                    `${process.env.REACT_APP_URI}/newsecret`,
                    { content: secret },
                    {
                      headers:
                        { authorization: `bearer ${accessToken}` },
                      withCredentials: true
                    }
                  )
                  .then(() => {
                    // 성공적으로 새로운 비밀을 생성했을 경우
                    setMode('successful')
                  })
                  .catch(err => {
                    // 그 외의 에러가 발생했을 경우
                    setMode('unidentified error')
                  })
              })
              .catch(err => {
                //만약 access token 요청 실패한 경우 로그인 상태 변경해주기
                dispatch(changeLogInStatus(false))
                dispatch(getAccessToken(''))
              })
          } else {
            // 그 외의 에러가 발생했을 경우
            setMode('unidentified error')
          }
        })
    }
  }

  const handleWriting = (e) => {
    setSecret(e.target.value)
  }

  return (
    <div className="NewSecret">
      { mode !== 'writing' && <GuidanceModal mode={mode} setMode={setMode} />}
      <form className="NewSecret-form" onSubmit={handleNewSecretSubmit}>
        <textarea
          onChange={handleWriting}
          placeholder="비밀을 작성하세요!"
          maxLength="255"
          rows="5"
          cols="55"
        >
        </textarea>
        <div className="NewSecret-form-wordCount">{secret.length}/255 characters</div>
        <button type="submit">작성하기</button>
      </form>
    </div>
  )
}

