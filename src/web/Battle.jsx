import React, { useState, useEffect, useCallback } from 'react';
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
import "../styling/style.css";

import { useParams, useLocation } from "react-router-dom";
function Battle() {
  var tableRows = [" ", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
  var tableColumns = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  // const storedPlayerId = localStorage.getItem('playerId');
  const { gameplayerID } = useParams();
  const [mouseMove, setMouseMove] = useState(null);
  const [shots, setShots] = useState([]);
  const [shipTypes, setShipTypes] = useState({ C: [], H: [], J: [] });
  const location = useLocation();
  const actuallPlayer = location.state?.actuallPlayer;
  let hits = [];
  let sinks = [];
  let enemyShotsString = '';
  const [successShot, setSuccessShot] = useState([]);
  const [unSuccessShot, setUnSuccessShot] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/api/game_view/${gameplayerID}`);
      setData(response.data);
      console.log(response.data);

      if (response.data) {
        let newShipTypes = { C: [], H: [], J: [] };
        response.data.gamePlayers.forEach((element) => {
          if (actuallPlayer == element.Id) {
            const updatedSuccessShot = [];
            const updatedUnsuccessShot = [];
            element.enemySalvoes.forEach((location) => {
              const locationsArray = location.replace(/[[\]\s]/g, '').split(',');
              locationsArray.forEach(location => {
                const shipType = location.charAt(location.length - 2);
                if (location.endsWith('T')) {
                  updatedSuccessShot.push(location.slice(0, -2));
                  if (['C', 'H', 'J'].includes(shipType)) {
                    newShipTypes[shipType].push(shipType);
                  }
                } else if (location.endsWith('F')) {
                  updatedUnsuccessShot.push(location.slice(0, -1));
                }
              });
            });
            setSuccessShot(updatedSuccessShot);
            setUnSuccessShot(updatedUnsuccessShot);
          }
        });
        setShipTypes(newShipTypes);

      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  }, [gameplayerID]);


  useEffect(() => {
    fetchData();
  }, [gameplayerID, fetchData]);



  const sendShots = async () => {
    if (shots.length === 3) {
      try {
        const response = await axios.post(`/api/createShots/${gameplayerID}`, shots);
        setShots([]);
        fetchData();
      } catch (error) {
        if (error.response && error.response.status === 409) {
          handleButtonClickReset();
          displayErrorMessage("Wait for your opponent");
        } else {
          alert(error);
        }
      }
    } else {
      alert('You need to select exactly 3 shots.');
    }
  };

  const clearErrorMessage = () => {
    setErrorMessage('');
  };

  const displayErrorMessage = (message) => {
    setErrorMessage(message);
    setTimeout(clearErrorMessage, 2000);
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


  var shipLocations = [];
  data.ships.forEach((element) => {
    shipLocations.push(...element.locations);
  });


  data.gamePlayers.forEach((element) => {
    // eslint-disable-next-line 
    if (actuallPlayer != element.Id) {
      element.enemySalvoes.forEach((location, index) => {
        if (enemyShotsString.length > 0) {
          enemyShotsString += ',';
        }
        enemyShotsString += location.replace(/[{}\s]/g, '');
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











  function displayShipLocation(row, column) {
    const cellId = row + column;
    if (shipLocations.includes(cellId)) {
      if (enemyShotsString.includes(cellId)) {
        hits.push(cellId);
        return <div className="p-4 bg-success"></div>;
      } else {
        return mappingImages.get(cellId);
      }
    } else if (enemyShotsString.includes(cellId)) {
      sinks.push(cellId);
      return <div className="p-4 bg-danger"></div>;
    } else {
      return <div className="p-4 bg-info"></div>;
    }
  }



  const handleCellClick = (cellId) => {
    console.log(cellId);
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
      <div className='container2'>
        <div className="table-container">
          <table className="myTable">
            <thead>
              <tr>
                <th>YOUR SHIPS</th>
              </tr>
            </thead>
            <tbody>
              {tableRows.map((row, indexRow) => (
                <tr key={row}>
                  <td>{row}</td>
                  {tableColumns.map((column, indexColumn) => (
                    <td key={row + column} id={row + column} style={{ padding: "0.5px" }}>
                      {indexRow === 0 ? column : displayShipLocation(row, column)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          <div > Sinks: {sinks.length}</div>
          <div > Hits: {hits.length}</div>
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
                        {indexRow === 0 ? column :
                          <div className={
                            successShot.includes(row + column)
                              ? "p-4 bg-success"
                              : unSuccessShot.includes(row + column)
                                ? "p-4 bg-danger"
                                : shots.includes(row + column)
                                  ? "p-4 bg-warning"
                                  : "p-4 bg-info"
                          }></div>
                        }
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
            <div > Success shots: {successShot.length}</div>
            <div > Sinks: {unSuccessShot.length}</div>
          </div>
        </div>
      </div>
      <div>
        <h1 className="display-1 border-bottom border-5 text-center">
          <div>
            <div className='errorMessage'>{errorMessage}</div>
          </div>
          <div >
            <button className="btn btn-danger m-3" onClick={handleButtonClickReset}>RESET</button>
            <button className="btn btn-success m-3" onClick={sendShots}>Shoot</button>
          </div>
          <div>
            Battle
          </div>
        </h1>
        <div className='score'>
          <table id='score'>
            <thead>
              <tr>
                <th className="special-th">Cruiser Ship</th>
                <th className="special-th">Happy Ship</th>
                <th className="special-th">Jack Ship</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="special-td">{shipTypes.C.length === 3 ? "Destroyed" : `Hits: ${shipTypes.C.length}`}</td>
                <td className="special-td">{shipTypes.H.length === 2 ? "Destroyed" : `Hits: ${shipTypes.H.length}`}</td>
                <td className="special-td">{shipTypes.J.length === 4 ? "Destroyed" : `Hits: ${shipTypes.J.length}`}</td>
              </tr>
            </tbody>
          </table>

        </div>
      </div>
    </div>
  );
}

export default Battle;
