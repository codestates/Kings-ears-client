import React from 'react'
import { useHistory } from 'react-router-dom'

export default function GuidanceModal( { mode, setMode } ) {
  const history = useHistory()

  const handleClick = () => {
    if (mode === 'successful') {
      history.push('/')
    } else {
      setMode('writing')
    }
  }

  return (
    <div className="modalSeaweed openModal">
      <div className="guidance-modal-box">
        <div className="guidance-modal-message">
          {
            mode === 'secret not written' &&
            `비밀을 작성해주세요!`
          }
          {
            mode === 'successful' &&
            `성공적으로 비밀을 작성했습니다.`
          }
          {
            mode === 'unidentified error' &&
            `에러가 발생했습니다. 다시 시도해주세요.`
          }
        </div>
        <button onClick={ handleClick }>
          { mode === 'successful' ? `홈으로 돌아가기` : `확인`}
        </button>
      </div>
  </div>
  )
}
