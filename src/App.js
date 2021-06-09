import { useState }  from 'react';
import './styles/App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import LandingPage from './pages/landingPage/LandingPage';
import MyPage from './pages/myPage/MyPage';
import NewSecret from './pages/newSecret/NewSecret';
import ViewSecret from './pages/viewSecret/ViewSecret';
import Nav from './components/nav/Nav';
import backgroundVideo from './assets/background.mp4'

function App() {
  //임시 상태: 스토어로 저장 변경 예정
  const [isLogedIn, setIsLogedIn] = useState(true)

  return (
    <Router>
      <div className="App">
        <video src={backgroundVideo} muted loop autoPlay />
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
        { isLogedIn && <Nav/> }
      </div>
    </Router>
  );
}

export default App;
