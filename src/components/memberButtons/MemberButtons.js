import { Link } from 'react-router-dom'
import './style.css'

export default function MemberButtons() {
  return (
    <div className="landing-modal-buttons">
      <Link to='/viewsecret'><button>비밀보기</button></Link>
      <Link to='/newsecret'><button>비밀쓰기</button></Link>
    </div>
  )
}