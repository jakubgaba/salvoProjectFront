import React, { useState, useEffect } from 'react';
import cruiser0 from "../imagesAdding/cruiser0.png";
import cruiser1 from "../imagesAdding/cruiser1.png";
import cruiser2 from "../imagesAdding/cruiser2.png";
import cruiser0horizon from "../imagesAdding/cruiser0horizon.png";
import cruiser1horizon from "../imagesAdding/cruiser1horizon.png";
import cruiser2horizon from "../imagesAdding/cruiser2horizon.png";
import happy0horizon from "../imagesAdding/happy0horizon.png";
import happy1horizon from "../imagesAdding/happy1horizon.png";
import jackShip0horizon from "../imagesAdding/jackShip0horizon.png";
import jackShip1horizon from "../imagesAdding/jackShip1horizon.png";
import jackShip2horizon from "../imagesAdding/jackShip2horizon.png";
import jackShip3horizon from "../imagesAdding/jackShip3horizon.png";
import happy0 from "../imagesAdding/happy00.png";
import happy1 from "../imagesAdding/happy11.png";
import jackShip0 from "../imagesAdding/jackShip0.png";
import jackShip1 from "../imagesAdding/jackShip1.png";
import jackShip2 from "../imagesAdding/jackShip2.png";
import jackShip3 from "../imagesAdding/jackShip3.png";
import axios from "axios";
import { useParams, useLocation } from "react-router-dom";
function Battle() {
  var tableRows = [" ", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
  var tableColumns = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  // const storedPlayerId = localStorage.getItem('playerId');
  const [etag, setEtag] = useState(null);
  const { gameplayerID } = useParams();
  const [mouseMove, setMouseMove] = useState(null);
  const [shots, setShots] = useState([]);
  const location = useLocation();
  const actuallPlayer = location.state?.actuallPlayer;
  let enemyMergedLocations = [];


  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/api/game_view/${gameplayerID}`);
        setData(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [gameplayerID]);


  const sendShots = async () => {
    if (shots.length === 3) {
      try {
        const response = await axios.post(`/api/createShots/${gameplayerID}`, shots);
        console.log('Shots sent:', response.data);
        setShots([]);
      } catch (error) {
        console.error('Error sending shots:', error);
      }
    } else {
      alert('You need to select exactly 3 shots.');
    }
  };


  if (loading) {
    return <div>Loading...</div>;
  }

  if (!data) {
    return <div>Error fetching data</div>;
  }


  const cruiser = [];
  cruiser.push(cruiser0);
  cruiser.push(cruiser1);
  cruiser.push(cruiser2);

  const cruiserHorizon = [];
  cruiserHorizon.push(cruiser0horizon);
  cruiserHorizon.push(cruiser1horizon);
  cruiserHorizon.push(cruiser2horizon);

  const happy = [];
  happy.push(happy0);
  happy.push(happy1);

  const happyHorizon = [];
  happyHorizon.push(happy0horizon);
  happyHorizon.push(happy1horizon);

  const jackSparrow = [];
  jackSparrow.push(jackShip0);
  jackSparrow.push(jackShip1);
  jackSparrow.push(jackShip2);
  jackSparrow.push(jackShip3);

  const jackSparrowHorizon = [];
  jackSparrowHorizon.push(jackShip0horizon);
  jackSparrowHorizon.push(jackShip1horizon);
  jackSparrowHorizon.push(jackShip2horizon);
  jackSparrowHorizon.push(jackShip3horizon);


  var shipLocations = data.ships.map((element) => {
    return element.locations;
  });

  data.gamePlayers.forEach((element) => {
    if (actuallPlayer != element.Id) {
      element.enemyShipLocations.forEach((location, index) => {
        enemyMergedLocations = [...enemyMergedLocations, ...location];
      });
    }
  });


  var mappingImages = new Map();
  data.ships.forEach(element => {
    switch (element.locations.length) {
      case 2:
        !(element.locations[0].charAt(0) === element.locations[1].charAt(0))
          ?
          element.locations.forEach((data, index) => {
            mappingImages.set(data, <img src={happy[index]} alt={element.locations.type} ></img>)
          })
          :
          element.locations.forEach((data, index) => {
            mappingImages.set(data, <img src={happyHorizon[index]} alt={element.locations.type} ></img>)
          })
        break;
      case 3:
        !(element.locations[0].charAt(0) === element.locations[1].charAt(0))
          ?
          element.locations.forEach((data, index) => {
            mappingImages.set(data, <img src={cruiser[index]} alt={element.locations.type}></img>)
          })
          :
          element.locations.forEach((data, index) => {
            mappingImages.set(data, <img src={cruiserHorizon[index]} alt={element.locations.type}></img>)
          })
        break;
      case 4:
        !(element.locations[0].charAt(0) === element.locations[1].charAt(0))
          ?
          element.locations.forEach((data, index) => {
            mappingImages.set(data, <img src={jackSparrow[index]} alt={element.locations.type}></img>)
          })
          :
          element.locations.forEach((data, index) => {
            mappingImages.set(data, <img src={jackSparrowHorizon[index]} alt={element.locations.type}></img>)
          })
        break;
      default:
        break;

    }
  });

  let myShotsString = '';

  data.gamePlayers.forEach((element) => {
    if (actuallPlayer == element.Id) {
      element.enemySalvoes.forEach((location, index) => {
        for (const key in location) {
          if (myShotsString.length > 0) {
            myShotsString += ',';
          }
          myShotsString += location[key].replace(/[\[\]\s]/g, '');
        }
      });
    }
  });

  function displayShipLocation(row, column) {
    if (shipLocations.toString().includes(row + column)) {
      return mappingImages.get(row + column);
    }
    else {
      return <div className="p-4 bg-info"></div>

    }
  }

  const handleCellClick = (cellId) => {

    if (shots.length < 3) {
      setShots((prevShots) => {
        if (prevShots.includes(cellId)) {
          return prevShots;
        }
        return [...prevShots, cellId];
      });
    } else {
      alert('You have reached the maximum limit of 3 shots.');
    }
  };

  const handleButtonClickReset = () => {
    setShots([]);
  };



  return (
    <div>
      <h1 className="display-1 border-bottom border-5 text-center">
      </h1>
      <div className="table-container">
        <table className="myTable">
          <thead>
            <tr>
              <th>YOUR SHIPS</th>
            </tr>
          </thead>
          <tbody>
            {tableRows.map((row, indexRow) => (
              <tr>
                <td>
                  {row}
                </td>
                {tableColumns.map((column, indexColumn) => (
                  <td id={row + column} style={{ padding: "0.5px" }}>
                    {indexRow === 0 ? column : displayShipLocation(row, column)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>

        </table>
      </div>
      <div>
        <div className="table-container">
          <table className="myTable">
            <thead>
              <tr>
                <th>SHOOT AREA</th>
              </tr>
            </thead>
            <tbody>
              {tableRows.map((row, indexRow) => (
                <tr key={row}>
                  <td>{row}</td>
                  {tableColumns.map((column, indexColumn) => (
                    <td
                      key={column}
                      id={row + column}
                      onMouseOver={() => setMouseMove(row + column)}
                      onClick={() => handleCellClick(row + column)}
                      style={
                        mouseMove === row + column
                          ? { opacity: 0.1, transition: "1s", padding: 0.5 }
                          : { padding: 0.5 }
                      }
                    >
                      {indexRow === 0 ? column : <div
                        className={
                          myShotsString.includes(row + column)
                            ? "p-4 bg-danger"
                            : shots.includes(row + column)
                              ? "p-4 bg-danger"
                              : "p-4 bg-info"
                        }
                      ></div>}

                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <button className="btn btn-danger m-3" onClick={handleButtonClickReset}>RESET</button>
        <button className="btn btn-success m-3" onClick={sendShots}>Shoot</button>

      </div>
    </div>

  );
}

export default Battle;
