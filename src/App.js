
import './App.css';
import { useState, useEffect } from 'react';

export const useData = (path) => {
  
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(path)
      .then(response => response.json())
      .then(data => {
        const noNull = data._embedded.players.filter(function (val) { return val.userName !== '' })
        console.log(noNull);
        setData(noNull);
        setLoading(false);
      })
  }, [path, data]);

  return [data, loading];
};

export const addPerson = async (userName) => {
  document.getElementById("text-message").value="";
  await fetch('/players', {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ userName })
  });
  return fetch('/players');
};

function App() {

  const [players, loading] = useData('/players');
  if (loading) {
    return <p>Loading...</p>;
  }



  const names = players.map(player => <tr><td>{player.userName}</td></tr>);


  return (
    <div>

      <h1 className='display-1 border-bottom border-5 '>Player Roster</h1>
      <div>
        <div className='w-50 p-3 d-inline-flex rounded-pill border bg-secondary'>
          <div className="input-group flex-nowrap">
            <span className="input-group-text bg-light" id="addon-wrapping">New player:</span>
            <input type="text" className="form-control" placeholder="username" aria-label="Username" aria-describedby="addon-wrapping" id="text-message" />
            <button type="button" className="btn btn-primary" onClick={() => addPerson(document.getElementById("text-message").value)}> Add</button>
          </div>
        </div>
      </div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">Names:</th>
          </tr>
        </thead>
        <tbody>
          {names}
        </tbody>
      </table>


    </div>
  );
}

export default App;
