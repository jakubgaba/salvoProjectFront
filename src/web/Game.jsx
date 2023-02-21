import { useParams } from "react-router-dom";
import FetchData from "./components/FetchData";
import cruiser0 from "../images/cruiser0.png";
import cruiser1 from "../images/cruiser1.png";
import cruiser2 from "../images/cruiser2.png";
import cruiser0horizon from "../images/cruiser0horizon.png";
import cruiser1horizon from "../images/cruiser1horizon.png";
import cruiser2horizon from "../images/cruiser2horizon.png";
import happy0 from "../images/happy0.png";
import happy1 from "../images/happy1.png";
import happy0horizon from "../images/happy0horizon.png";
import happy1horizon from "../images/happy1horizon.png";
import jackShip0 from "../images/jackShip0.png";
import jackShip1 from "../images/jackShip1.png";
import jackShip2 from "../images/jackShip2.png";
import jackShip3 from "../images/jackShip3.png";
import jackShip0horizon from "../images/jackShip0horizon.png";
import jackShip1horizon from "../images/jackShip1horizon.png";
import jackShip2horizon from "../images/jackShip2horizon.png";
import jackShip3horizon from "../images/jackShip3horizon.png";
import "../App.css"

export default function Game() {

    const { id } = useParams();
    const [data, loading] = FetchData(`/api/game_view/${id}`);
    var tableRows = [" ", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
    var tableColumns = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
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

    if (loading) {
        return (
            <div className="spinner-grow " role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        )
    }
    const mySalvoes = data.salvoes;
    let enemyShots;
    let enemyLocation;
    const rivalNames = data.gamePlayers.map((element, index) => {
        return (
            <tr key={index}>
                <th scope="row">{element.Id}</th>
                {element.Id == data.gamePlayerId ? <td className="text-success">{element.Player}</td> : <td>{element.Player}</td>}
            </tr>
        );
    });


    var mappingImages = new Map();
    data.ships.forEach(element => {
        switch (element.locations.length) {
            case 2:
                !(element.locations[0].charAt(0) === element.locations[1].charAt(0))
                    ?
                    element.locations.forEach((data, index) => {
                        mappingImages.set(data, <img src={happy[index]} alt={element.locations.type}></img>)
                    })
                    :
                    element.locations.forEach((data, index) => {
                        mappingImages.set(data, <img src={happyHorizon[index]} alt={element.locations.type}></img>)
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

    var shipLocations = data.ships.map((element) => {
        return element.locations;
    });

    data.gamePlayers.forEach(element => {
        if (element.Id !== data.gamePlayerId) {
            enemyShots = element.enemySalvoes[0];
            enemyLocation = element.enemyShipLocations;
        }
    });

    function detectEnemyShot(shotFired, row, column) {
        let isShotFound = false;
        let round;
        for (const [index, salvo] of Object.entries(shotFired)) {
            if (salvo.includes(row + column)) {
                isShotFound = true;
                round = index;
                break;
            }
        }
        return [isShotFound, round];
    }

    function displayShipLocation(row, column) {
        if (shipLocations.toString().includes(row + column)) {
            if (detectEnemyShot(enemyShots, row, column)[0]) {
                return <div className="EnemySalvoShotMatch">{detectEnemyShot(enemyShots, row, column)[1]}</div>;
            }
            else {
                return mappingImages.get(row + column);
            }
        }
        else {
            if (detectEnemyShot(enemyShots, row, column)[0]) {
                return <div className="EnemySalvoShots">{detectEnemyShot(enemyShots, row, column)[1]}</div>;
            }
            else {
                return <div className="p-4 bg-info"></div>
            }
        }
    }


    function displayMyShots(row, column) {
        if (detectEnemyShot(mySalvoes, row, column)[0]) {
            if (enemyLocation.toString().includes(row + column)) {
                return <div className="mySalvoMatch">{detectEnemyShot(mySalvoes, row, column)[1]}</div>;
            }
            else {
                return <div className="mySalvoShots">{detectEnemyShot(mySalvoes, row, column)[1]}</div>;
            }
        }
        else {
            return <div className="p-4 bg-info"></div>
        }
    }


    const whoWon = data.gamePlayers.map((element) => {
        if (element.Score.toString() == 1) {
            return (
                <div className="display-5 p-3 mb-2 bg-success bg-gradient text-white">The winner is {element.Player}</div>
            );
        }
        else {
            return (
                <div className="p-3 mb-2 bg-danger bg-gradient text-white">The loser is {element.Player}</div>
            );
        }

    });

    return (
        <div>
            <h1 className='display-1 border-bottom border-5 text-center'>Gameplayer {data.gamePlayerId}</h1>
            <table className="table caption-top">
                <caption>
                    List of players
                </caption>
                <thead className="table-dark">
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">NAMES</th>
                    </tr>
                </thead>
                <tbody>
                    {rivalNames}
                </tbody>
            </table>
            <br></br>
            <div className="table-container">
                <table className="myTable">
                    <thead>
                        <tr>
                            <th>MY SHIPS</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tableRows.map((row, indexRow) =>
                            <tr>
                                <td>
                                    {row}
                                </td>
                                {tableColumns.map((column, indexColumn) =>
                                    <td id={row + column}>
                                        {indexRow == 0 ? column : displayShipLocation(row, column)}
                                    </td>
                                )}
                            </tr>
                        )}
                    </tbody>
                </table>
                <table className="myTable">
                    <thead>
                        <tr>
                            <th>MY SHOTS</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tableRows.map((row, indexRow) =>
                            <tr>
                                <td>
                                    {row}
                                </td>
                                {tableColumns.map((column, indexColumn) =>
                                    <td id={row + column}>
                                        {indexRow == 0 ? column : displayMyShots(row, column)}
                                    </td>
                                )}
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            <div className="text-center">{whoWon}</div>
        </div>
    );
}

