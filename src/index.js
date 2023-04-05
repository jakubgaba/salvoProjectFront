import React from 'react';
import ReactDOM from 'react-dom/client';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import './index.css';
import { BrowserRouter, Routes, Route} from "react-router-dom";
import App from './App';
import Games from './web/AllGames';
import Game from './web/Game';
import Login from './web/components/Login';
import Leaderboard from './web/LeaderBoard';
import reportWebVitals from './reportWebVitals';
import MainPage from './web/MainPage';
import NewGame from './web/NewGame';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<MainPage></MainPage>} />
      <Route path="/main" element={<App></App>} />
      <Route path="/AllGames" element={<Games />} />
      <Route path="/game/:id" element={<Game />} />
      <Route path="/leaderboard" element={<Leaderboard />} />
      <Route path="/login" element={<Login />} />
      <Route path="/newgame" element={<NewGame />} />
    </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
