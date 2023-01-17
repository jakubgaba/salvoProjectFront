import { useParams } from "react-router-dom";
import FetchData from "./components/FetchData";
import image from "../images/eye.gif";
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
// export const useData = (path) => {

//     const [data, setData] = useState();
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         fetch(path)
//             .then(response => response.json())
//             .then(data => {
//                 setData(data);
//                 setLoading(false);
//             })
//     }, [path]);

//     return [data, loading];
// };

export default function Game() {
    const { id } = useParams();
    const [data, loading] = FetchData("/api/game_view/" + id);

    if (loading) {
        return (
            <div className="spinner-grow " role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        )
    }

    const rivalNames = data.gamePlayers.map((element, index) => {
        return (
            <tr key={index}>
                <th scope="row">{element.Id}</th>
                <td>{element.Player}</td>
                <td>{element.WhatGPAmI == id ? <img src={image} alt="looking eyes"></img> : ""}</td>
            </tr>
        );
    });

    
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

    var tableRows = [" ", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
    var tableColumns = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];

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

    var shipLocations = data.ships.map((element, index) => {
        return element.locations;
    });


    function shipLocation(row, column) {
        if (shipLocations.toString().includes(row + column)) {
            return <div>{mappingImages.get(row + column)}</div>
        }
        else {
            return <div className="p-3 bg-info rounded"></div>
        }
    }


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
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    {rivalNames}
                </tbody>
            </table>
            <br></br>
            <h2 className="d-flex justify-content-center h-1">
                Ships
            </h2>
            <div>
                <table className="myTable">
                    <thead>
                    </thead>
                    <tbody>
                        {tableRows.map((row, indexRow) =>
                            <tr className="tableRows">
                                <td>
                                    {row}
                                </td>
                                {tableColumns.map((column, indexColumn) =>
                                    <td id={row + column}>
                                        {indexRow == 0 ? column : shipLocation(row, column)}
                                    </td>
                                )}
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

// to spot which one is horizontal element.locations[0].charAt(0) == element.locations[1].charAt(0)
        // console.log(element.type);
        // if (element.locations.length == 3) {
        //     if (!(element.locations[0].charAt(0) == element.locations[1].charAt(0))) {
        //         element.locations.forEach((data, index) => {
        //             mappingImages.set(data, <img src={cruiser[index]} alt="ShipTop"></img>)
        //         })
        //     }
        //     else {
        //         element.locations.forEach((data, index) => {
        //             mappingImages.set(data, <img src={cruiserHorizon[index]} alt="ShipTop"></img>)
        //         })
        //     }
        // }
        // else if (element.locations.length == 4) {
        //     if (!(element.locations[0].charAt(0) == element.locations[1].charAt(0))) {
        //         element.locations.forEach((data, index) => {
        //             mappingImages.set(data, <img src={happyShip[index]} alt="ShipTop"></img>)
        //         })
        //     }
        //     else {
        //         element.locations.forEach((data, index) => {
        //             mappingImages.set(data, <img src={happyShip[index]} alt="ShipTop"></img>)
        //         })
        //     }
        // }