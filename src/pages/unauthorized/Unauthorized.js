import React from 'react'
import './style.css'

export default function Unauthorized() {
  const handleClick = () => {
    window.location.href = '/'
  }
  return (
    <div className="Unauthorized">
      <div className= "Unauthorized-emoji">&#128557;</div>
      <div className="Unauthorized-message">
        <h1 className="Unauthorized-title">Oops!</h1>
        <span>로그인이 필요한 서비스 입니다.</span>
        <span> 다시 로그인 해주세요!</span>
        <button onClick={handleClick}>홈으로 돌아가기</button>
      </div>

    </div>
  )
}
