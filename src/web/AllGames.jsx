import React, { useState, useEffect } from 'react';
import FetchData from './components/FetchData';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
function AllGames() {
  const storedPlayerId = localStorage.getItem('playerId');
  const [data, loading, error] = FetchData('/api/games');
  const [gamesData, setGamesData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (data) {
      setGamesData(data);
    }
  }, [data]);

  console.log(gamesData);

  const handleClick = async () => {
    try {
      const refreshedData = await axios.get('/api/games');
      setGamesData(refreshedData.data);
      navigate('/newgame');
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const handleClickAdd = async (gameId) => {
    console.log(gameId);
    try {
      const response = await axios.post(`/api/game/${gameId}/players`, { playerId: parseInt(storedPlayerId) });
      const refreshedData = await axios.get('/api/games');
      setGamesData(refreshedData.data);
      console.log(response);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const painTable = gamesData.map(data => (
    <tbody key={data.id}>
      <tr>
        <th rowSpan={data.gamePlayers.length + 1} scope="row">{data.id}</th>
        <td rowSpan={data.gamePlayers.length + 1}>{data.created}</td>
      </tr>
      {data.gamePlayers.map(datas => (// eslint-disable-next-line 
        <tr key={datas.id}>
          <td>{datas.players.userName}</td>
          <td>{/*eslint-disable-next-line */}
            {storedPlayerId == datas.players.id ? (
              <button className="btn btn-success" onClick={() => console.log(data.gamePlayers)}>
                Continue
              </button>
            ) : (// eslint-disable-next-line
              data.gamePlayers.length == 1 && storedPlayerId != data.gamePlayers[0].players.id && (
                <button className="btn btn-primary" onClick={() => handleClickAdd(data.id)}>Join</button>
              )
            )}
          </td>
        </tr>
      ))}
    </tbody>
  ));

  return (
    <div>
      <h1 className='display-1 border-bottom border-5 '>DATA</h1>
      {error && <div>Error: {error}</div>}
      {loading ? (
        <div className="spinner-grow " role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      ) : (
        <div>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">$</th>
                <th scope="col">Game timeline</th>
                <th scope="col">Players</th>
              </tr>
            </thead>
            {painTable}
          </table>
          <button onClick={handleClick}>
            {loading ? 'Creating game...' : 'Create new game'}
          </button>
        </div>
      )}
    </div>
  );
}

export default AllGames;
