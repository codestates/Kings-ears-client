import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios'
import './style.css'
import { changeLogInStatus, getAccessToken } from '../../actions';
import GuidanceModal from '../../components/modals/GuidanceModal';
import Nav from '../../components/nav/Nav.js'

export default function NewSecret() {
  // 전역 상태
  const dispatch = useDispatch()
  const state = useSelector(state => state.userReducer)
  const { isLogin, accessToken } = state

  // 로컬 상태
  const [mode, setMode] = useState('writing')
  const [secret, setSecret] = useState('')

  const handleNewSecretSubmit = (e) => {
    e.preventDefault()

    // 비밀란을 비웠을 경우
    if ( secret === '' ) {
      setMode('secret not written')
      return;
    }
    
    // 비밀이 제대로 작성되었을 경우
    axios
      .post(
        process.env.REACT_APP_URI+'/new', 
        { content: secret }, 
        { headers: 
          { authorization: `bearer ${ accessToken }` },
          withCredentials: true
        }
      )
      .then(() => {
        // 성공적으로 새로운 비밀을 생성했을 경우
        setMode('successful')
      })
      .catch(err => {
        // access token 만료로인해 새로 요청해야 할 경우
        if (err.status === 403) {
          axios
            .get(process.env.REACT_APP_URI+'/accesstoken', {
              withCredentials: true
            })
            .then( res => {
              dispatch(getAccessToken(res.data.accessToken))
              axios
                .post(
                  process.env.REACT_APP_URI+'/new', 
                  { content: secret }, 
                  { headers: 
                    { authorization: `bearer ${ accessToken }` },
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
            })
        } else {
          // 그 외의 에러가 발생했을 경우
          setMode('unidentified error')
        }
      })
  }
  
  const handleWriting = (e) => {
    setSecret(e.target.value)
  }

  return (
    <div className="NewSecret">
      { mode !== 'writing' && <GuidanceModal mode={mode} setMode={ setMode }/>}
      <form className="NewSecret-form" onSubmit={ handleNewSecretSubmit }>
        <textarea 
          onChange={ handleWriting }
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

