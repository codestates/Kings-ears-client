import { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { AiFillLike, AiFillDislike } from 'react-icons/ai'

export default function ViewSecretBtns( {secretId, likeCount, dislikeCount, setLikeCount, setDislikeCount, setMode} ) {
  const [likeClicked, setLikeClicked] = useState(false)
  const [dislikeClicked, setDislikeClicked] = useState(false)

  //좋아요 싫어요
  const handleThumbClick = (type) => {
    if (type === 'like') {
      if ( likeClicked === false ) {
        setLikeClicked(true)
        setLikeCount(prev => prev + 1)
        toggleThumbsClassList('like', true)
        if ( dislikeClicked === true ) {
          setDislikeClicked(false)
          setDislikeCount(prev => prev - 1)
          toggleThumbsClassList('dislike', false)
          axios
            .get(
              `${process.env.REACT_APP_URI}/secret-user-response/${ secretId }`,
              { headers: {
                'Content-Type': 'application/json',
                'likeCount': '1',
                'dislikeCount': '-1'
              }, withCredentials: true })
            .catch( err => console.log(err))
          return;
        }
        axios
          .get(
            `${process.env.REACT_APP_URI}/secret-user-response/${ secretId }`,
            { headers: {
              'Content-Type': 'application/json',
              'likeCount': '1',
              'dislikeCount': '0'
            }, withCredentials: true })
          .catch( err => console.log(err))

      } else if ( likeClicked === true ) {
        setLikeClicked(false)
        setLikeCount(prev => prev - 1)
        toggleThumbsClassList('like', false)
        axios
          .get(
            `${process.env.REACT_APP_URI}/secret-user-response/${ secretId }`,
            { headers: {
              'Content-Type': 'application/json',
              'likeCount': '-1',
              'dislikeCount': '0'
            }, withCredentials: true })
          .catch( err => console.log(err))
      }
  
    } else if (type === 'dislike') {
      if ( dislikeClicked === false ) {
        setDislikeClicked(true)
        setDislikeCount(prev => prev + 1)
        toggleThumbsClassList('dislike', true)
        if ( likeClicked === true ) {
          setLikeClicked(false)
          setLikeCount(prev => prev - 1)
          toggleThumbsClassList('like', false)
          axios
            .get(
              `${process.env.REACT_APP_URI}/secret-user-response/${ secretId }`,
              { headers: {
                'Content-Type': 'application/json',
                'likeCount': '-1',
                'dislikeCount': '1'
              }, withCredentials: true })
            .catch( err => console.log(err))
          return;
        }
        axios
          .get(
            `${process.env.REACT_APP_URI}/secret-user-response/${ secretId }`,
            { headers: {
              'Content-Type': 'application/json',
              'likeCount': '0',
              'dislikeCount': '1'
            }, withCredentials: true })
          .catch( err => console.log(err))

      } else if ( dislikeClicked === true ) {
        setDislikeClicked(false)
        setDislikeCount(prev => prev - 1)
        toggleThumbsClassList('dislike', false)

        axios
          .get(
            `${process.env.REACT_APP_URI}/secret-user-response/${ secretId }`,
            { headers: {
              'Content-Type': 'application/json',
              'likeCount': '0',
              'dislikeCount': '-1'
            }, withCredentials: true })
          .catch( err => console.log(err))
      }
    }
  }

  // 새로운 비밀 또 보기
  const handleShowNewSecret = () => {
    setMode("button")
  }

  return (
    <div className="viewSecret-btnBox">
      <div className="viewSecret-btnBox-thumbs">
        <span className="socialBtns"id="likeBtn">
          <span className="thumbs" onClick={()=>handleThumbClick("like")}>
            <AiFillLike/>
          </span>
          { likeCount }
        </span>
        <span className="socialBtns" id="dislikeBtn">
          <span className="thumbs" onClick={ ()=> handleThumbClick("dislike") }>
            <AiFillDislike/>
          </span>
          { dislikeCount }
        </span>
      </div>
      <div className="viewSecret-btnBox-others">
        <button onClick={ handleShowNewSecret }>다른비밀보기</button>
        <Link to='/newsecret'><button>비밀쓰기</button></Link>
      </div>
    </div>
  )
}

function toggleThumbsClassList (type, state) {
  const btn = document.querySelector(`#${type}Btn`)
  if ( state === true ) {
    btn.classList.add('clicked')
  } else {
    btn.classList.remove('clicked')
  }
}