import React from 'react'
import { GiDonkey } from 'react-icons/gi'
import tree1 from '../../assets/tree1.png'
import tree2 from '../../assets/tree2.png'

export default function LandingPageInfo() {
  return (
    <section className="LandingPageInfo">
      <div className="LandingPageInfo-image">
        <GiDonkey/>
      </div>
      <div className="LandingPageInfo-message">
        <h1 className="LandingPageInfo-message-title">About King's Ears</h1>
        <p>
          동화 속 주인공은 얼마나 답답했으면 <strong>"임금님 귀는 당나귀 귀!"</strong>라고 몰래 외쳤을까요? 
          비밀을 안다는 것은 때로 굉장한 고통을 선사합니다.
        </p>
        <p>
          임금님귀(King's Ears)는 이러한 답답함을 해소하면서, 다른 사람이 작성한 비밀도 랜덤하게 볼 수 있는 서비스 입니다.
        </p>
        <p>
          나만 알고 있는 비밀을 아무도 모르게 말하고 싶을 때,
          사소하고 웃픈 TMI지만 굳이 내가 이 비밀의 출처라고 밝히고 싶지 않을 때
          임금님귀를 찾아주세요!
        </p>
      </div>
      <img src={tree1} alt="tree" className="LandingPageInfo-tree1"></img>
      <img src={tree2} alt="tree" className="LandingPageInfo-tree2"></img>
    </section>
  )
}