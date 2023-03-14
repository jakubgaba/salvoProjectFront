
import Logout from './components/Logout';
import FetchData from './components/FetchData';



function AllGames() {

  const [data, loading] = FetchData('/api/games');

  if (loading) {
    return (
      <div className="spinner-grow " role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    )
  }


  const painTable = data.map(data =>
    <tbody>
      <tr>
        <th rowSpan={0} scope='row'>{data.id}</th>
        <td rowSpan={0} >{data.created}</td>
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
        }
      </table>
    </div>
  );
}

export default AllGames;
