import { useState, useEffect }  from 'react';
import './styles/App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import LandingPage from './pages/landingPage/LandingPage';
import MyPage from './pages/myPage/MyPage';
import NewSecret from './pages/newSecret/NewSecret';
import ViewSecret from './pages/viewSecret/ViewSecret';
import Nav from './components/nav/Nav';
import backgroundVideo from './assets/background.mp4'
import { useSelector, useDispatch } from 'react-redux'
import { isLogin, getAccessToken, getUserLevel } from './actions/index.js'
import Loading from './components/loading/Loading';

function App() {
  // Redux 관련
  const state = useSelector(state => state.userReducer)
  const { isLogin, accessToken, userLevel } = state
  const dispatch = useDispatch()

  const [isLoading, setIsLoading] = useState(true)

  useEffect (() => {
    setTimeout(()=> {
      setIsLoading(false)
    },1500)
  }, [])

  return (
    <Router>
      
        <div className="App">
          <video src={backgroundVideo} muted loop autoPlay/>
          <Switch>
            <Route exact path='/'>
              <LandingPage />
            </Route>
            <Route path='/mypage'>
              <MyPage />
            </Route>
            <Route path='/newsecret'>
              <NewSecret />
            </Route>
            <Route path='/viewsecret'>
              <ViewSecret />
            </Route>
          </Switch>
          { isLogin && <Nav/> }
        </div>
      
    </Router>
  );
}

export default App;
