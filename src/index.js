import React from 'react';
import ReactDOM from 'react-dom/client';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import './index.css';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import App from './App';
import Games from './web/AllGames';
import Game from './web/Game';
import Login from './web/Login';
import Leaderboard from './web/LeaderBoard';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
        <Route path="/" element={<Navigate to="/login" replace />}  />
        <Route path="/AllGames" element={<Games />}  />
        <Route path="/game/:id" element={<Game />} />
        <Route path="/leaderboard" element={<Leaderboard />}  />
        <Route path="/login" element={<Login />} />
      </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
