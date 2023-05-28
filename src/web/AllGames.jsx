import React, { useState, useEffect } from 'react';
import FetchData from './components/FetchData';
import { useNavigate } from 'react-router-dom';

function AllGames() {
  const storedPlayerId = localStorage.getItem('playerId');
  const [refresh, setRefresh] = useState(false);
  const [data, loading, error] = FetchData('/api/games', refresh);
  const [gamesData, setGamesData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (data) {
      console.log(data);
      setGamesData(data);
    }
  }, [data]);


  const handleClick = () => {
    try {
      navigate('/newgame');
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const handleClickAdd = (id) => {
    navigate('/newgame', { state: { id } });
  };

  const handleClickContinue = (gameplayers, gameplayerID, actuallPlayer) => {
    setRefresh(!refresh);
    if (gameplayers === 2) {
      navigate(`/battle/${gameplayerID}`, { state: { actuallPlayer } });
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
              <button className="btn btn-success" onClick={() => handleClickContinue(data.gamePlayers.length, datas.id, storedPlayerId)}>
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
          <div className="container d-flex justify-content-center">
            <div className="col-md-3 mb-3">
              <button type="button" className="btn btn-warning w-100 d-flex justify-content-center" onClick={handleClick}>
                <div className="py-2 pr-3">
                  <h4>Create</h4>
                  <span>game</span>
                </div>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AllGames;
