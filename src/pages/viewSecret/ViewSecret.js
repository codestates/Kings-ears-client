import React, { useState, useEffect, useCallback } from 'react';
import { changeLogInStatus, getAccessToken } from '../../actions/index'
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './style.css';
import ViewSecretBtns from './ViewSecretBtns.js';

export default function ViewSecret() {
  const state = useSelector(state => state.userReducer)
  const { accessToken } = state
  const dispatch = useDispatch();
  const history = useHistory();

  const [mode, setMode] = useState('button')
  const [secretId, setSecretId] = useState(0)
  const [writer, setWriter] = useState(null)
  const [content, setContent] = useState(null)
  const [likeCount, setLikeCount] = useState(0)
  const [dislikeCount, setDislikeCount] = useState(0)

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
            dispatch(changeLogInStatus(false));
            history.push('/unauthorized');
          })
      });
  },[accessToken, dispatch, history]);

  useEffect(() => {
    verifyToken();
  }, [verifyToken]);

  const handleShowSecret = (e) => {
    // 서버 요청: 비밀 가져오기
    axios.get(`${process.env.REACT_APP_URI}/secret`,
      {
        headers:
          { authorization: `bearer ${accessToken}` },
        withCredentials: true
      }
    )
      .then(res => {
        // 받은 데이터로 상태 변경 하기
        setSecretId(res.data.data.id)
        setWriter(res.data.data.writer)
        setLikeCount(res.data.data.likeCount)
        setDislikeCount(res.data.data.dislikeCount)
        setContent(res.data.data.content)

        // 비밀보기 버튼 사라지고 -> waiting 문구 나타났다가 사라지고 -> 비밀 보여주기(present모드)
        e.target.classList.add('secret-btn-disappears')
        setTimeout(() => {
          e.target.style.display = "none"
          setMode("waiting")
          setTimeout(() => {
            document.querySelector('.waitingBox').style.display = "none"
            setMode("present")
          }, 2500)
        }, 1500)
      })
      .catch(err => {
        console.log(err.response.data.message)
      })
  }

  return (
    <div className="ViewSecret">
      { mode === "button" &&
        <button onClick={(e) => handleShowSecret(e)} className="showSecretBtn">
          비밀보기
        </button>
      }
      { mode === "waiting" &&
        <div className="waitingBox">
          아무도 모르게 비밀을 가져오고 있습니다...
        </div>
      }
      {
        mode === "present" &&
        <div className="viewSecret-container">
          <div className="viewSecret-main">
            <span className="viewSecret-main-content">{content}</span>
            <div className="viewSecret-userInfo">
              유포자: {writer}
            </div>
          </div>
          <ViewSecretBtns
            secretId={secretId}
            likeCount={likeCount}
            dislikeCount={dislikeCount}
            setLikeCount={setLikeCount}
            setDislikeCount={setDislikeCount}
            setMode={setMode}
          />
        </div>
      }
    </div>
  )
}

function addClassNames(thumbState) {
  return thumbState ? "thumbs clicked-thumb" : "thumbs"
}
