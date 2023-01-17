
import { useState, useEffect } from 'react';

export const useData = (path) => {

  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(path)
      .then(response => response.json())
      .then(data => {
        // const noNull = data._embedded.players.filter(function (val) { return val.userName !== '' })
        // console.log(noNull);
        setData(data);
        setLoading(false);
      })
  }, [path]);

  return [data, loading];
};

// export const addPerson = async (game) => {
//   document.getElementById("text-message").value="";
//   await fetch('/games', {
//     method: 'POST',
//     mode: 'cors',
//     cache: 'no-cache',
//     credentials: 'same-origin',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({ game })
//   });
//   return fetch('/games');
// };

function AllGames() {

  const [data, loading] = useData('/api/games');
  if (loading) {
    return <p>Loading...</p>;
  }
  console.log(data);

  // const getPlayerData = data.map(data => 

  //   )

  //   data.gamePlayers.map(data => data.id));
  // console.log(getPlayerData);

  // {data.gamePlayers.forEach(element => {
  //   console.log(element.id)

  // })}

  const painTable = data.map(data =>
    <tbody>
      <tr>
        <th  rowSpan={0} scope='row'>{data.id}</th>
        <td  rowSpan={0} >{data.created}</td>
      </tr>
      <tr>
        {data.gamePlayers.map(datas => {
          return (
            <tr>
              <td>{datas.players.userName}</td>
            </tr>
          )
        })}
      </tr>
    </tbody>)

  return (
    <div>
      <h1 className='display-1 border-bottom border-5 '>DATA</h1>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">$</th>
            <th scope="col">Game timeline</th>
            <th scope="col">Players</th>
          </tr>
        </thead>

        {
          painTable
        /* {
          data.map(data => {
            return (
              <tbody>
                <tr>
                  <tr>
                    <th rowSpan={0} scope='row'>{data.id}</th>
                    <td rowSpan={0} >{data.created}</td>
                    <th>$</th>
                  </tr>
                  {data.gamePlayers.map(datas => {
                    return (
                      <tr>
                        <tr>
                          <th scope='row'>{datas.id}</th>
                        </tr>
                        <tr>
                          <td>{datas.players.userName}</td>
                        </tr>
                      </tr>
                    )
                  })}
                </tr>
              </tbody>
            )
          })
        } */}
      </table>
    </div>
  );
}

export default AllGames;
