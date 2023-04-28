import cruiser from "../images/cruiserShip2.png";
import cruiser0 from "../images/cruiser0.png";
import cruiser1 from "../images/cruiser1.png";
import cruiser2 from "../images/cruiser2.png";
import cruiser0horizon from "../images/cruiser0horizon.png";
import cruiser1horizon from "../images/cruiser1horizon.png";
import cruiser2horizon from "../images/cruiser2horizon.png";
import happy0horizon from "../images/happy0horizon.png";
import happy1horizon from "../images/happy1horizon.png";
import jackShip0horizon from "../images/jackShip0horizon.png";
import jackShip1horizon from "../images/jackShip1horizon.png";
import jackShip2horizon from "../images/jackShip2horizon.png";
import jackShip3horizon from "../images/jackShip3horizon.png";
import happyShip from "../images/HappyShip2.png";
import jackShip from "../images/jackShip.png";
import happy0 from "../images/happy0.png";
import happy1 from "../images/happy1.png";
import jackShip0 from "../images/jackShip0.png";
import jackShip1 from "../images/jackShip1.png";
import jackShip2 from "../images/jackShip2.png";
import jackShip3 from "../images/jackShip3.png";
import { useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
function NewGame() {
    var tableRows = [" ", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
    var tableColumns = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
  
 
    const [draggedShip, setDraggedShip] = useState(null);
    const [draggedShipName, setDraggedShipName] = useState(null);
    const [draggedShipStyle, setDraggedShipStyle] = useState({});
    const [cellIds, setCellIds] = useState([]);
    const navigate = useNavigate();
    const [cruiserState, setCruiser] = useState([]);
    const [happyState, setHappy] = useState([]);
    const [jackState, setJack] = useState([]);

    const [cruiserCount, setCruiserCount] = useState(1);
    const [happyCount, setHappyCount] = useState(1);
    const [jackCount, setJackCount] = useState(1);

    const cruiserSeparated = [];
    cruiserSeparated.push(cruiser0);
    cruiserSeparated.push(cruiser1);
    cruiserSeparated.push(cruiser2);

    const cruiserSeparatedVertical = [];
    cruiserSeparatedVertical.push(cruiser0horizon);
    cruiserSeparatedVertical.push(cruiser1horizon);
    cruiserSeparatedVertical.push(cruiser2horizon);


    const happySeparated = [];
    happySeparated.push(happy0);
    happySeparated.push(happy1);

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

    function displayShipLocation() {
        return <div className="p-4 bg-info"></div>;
    }


    function handleDragStart(event) {
        let draggedShipName = event.target.alt;
        let draggedShipCount = 0;

        switch (draggedShipName) {
            case 'cruiser':
                draggedShipCount = cruiserCount;
                break;
            case 'happyShip':
                draggedShipCount = happyCount;
                break;
            case 'jackShip':
                draggedShipCount = jackCount;
                break;
            default:
                break;
        }

        if (draggedShipCount === 0) {
            event.preventDefault();
        } else {
            setDraggedShip(event.target.src);
            setDraggedShipName(draggedShipName);
            event.dataTransfer.setDragImage(event.target, window.outerWidth, window.outerHeight);
        }
    }


    function handleDragEnd() {
        if (cellIds.length > 0 && !cellIds.some(item => item.charAt(0) === " " || item === undefined || item === null || item.includes("undefined"))) {
            const tds = cellIds.map((id) => document.getElementById(id));
            const isImageFound = tds.some(item => item.innerHTML.includes('<img'));
            if (isImageFound) {
                setDraggedShip(null);
                setDraggedShipStyle({});
                setCellIds([]);
                return;
            }
            tds.forEach((location, index) => {
                switch (draggedShipName) {
                    case "cruiser":
                        location.setAttribute('data-comment', 'cruiser');
                        location.setAttribute('alt', cellIds);
                        location.innerHTML = '<img src="' + cruiserSeparated[index] + '">';
                        setCruiserCount(0);
                        break;
                    case "happyShip":
                        location.setAttribute('data-comment', 'happyShip');
                        location.setAttribute('alt', cellIds);
                        location.innerHTML = '<img src="' + happySeparated[index] + '">';
                        setHappyCount(0);
                        break;
                    case "jackShip":
                        location.setAttribute('data-comment', 'jackShip');
                        location.setAttribute('alt', cellIds);
                        location.innerHTML = '<img src="' + jackSparrow[index] + '">';
                        setJackCount(0);
                        break;
                    default:
                        break;
                }
            });
        } else {
            setDraggedShip(null);
            setDraggedShipStyle({});
            setCellIds([]);
        }
        setDraggedShip(null);
        setDraggedShipStyle({});
        setCellIds([]);
    }




    function handleDrag(event) {
        if (draggedShip) {
            const elementWidth = 79;
            const elementHeight = 189;
            setDraggedShipStyle({
                backgroundImage: `url(${draggedShip})`,
                position: "absolute",
                top: event.clientY - elementHeight / 2,
                left: event.clientX - elementWidth / 2,
                width: `${elementWidth}px`,
                height: `${elementHeight}px`,
                pointerEvents: "none",
                backgroundRepeat: 'no-repeat',
            });
        }
    }

    const getCruiserLocations = (row, col) => [
        tableRows[row - 1] + col,
        tableRows[row] + col,
        tableRows[row + 1] + col
    ];

    const getHappyLocations = (row, col) => [
        tableRows[row] + col,
        tableRows[row + 1] + col
    ];

    const getJackLocations = (row, col) => [
        tableRows[row - 2] + col,
        tableRows[row - 1] + col,
        tableRows[row] + col,
        tableRows[row + 1] + col
    ];

    const getVerticalCruiserLocations = (row, col) => [
        tableRows[row] + (parseInt(col) - 1).toString(),
        tableRows[row] + col,
        tableRows[row] + (parseInt(col) + 1).toString()
    ];

    const getVerticalHappyLocations = (row, col) => [
        tableRows[row] + col,
        tableRows[row] + (parseInt(col) + 1).toString()
    ];

    const getVerticalJackLocations = (row, col) => [
        tableRows[row] + (parseInt(col) - 2).toString(),
        tableRows[row] + (parseInt(col) - 1).toString(),
        tableRows[row] + col,
        tableRows[row] + (parseInt(col) + 1).toString()
    ];


    function handleDragOver(event, cellId) {
        const row = tableRows.indexOf(cellId.charAt(0));
        const col = cellId.charAt(1) + cellId.charAt(2);
        let newCellIds = '';
        switch (draggedShipName) {
            case "cruiser":
                newCellIds = getCruiserLocations(row, col);
                setCruiser(newCellIds);
                break;
            case "jackShip":
                newCellIds = getJackLocations(row, col);
                setHappy(newCellIds);
                break;
            case "happyShip":
                newCellIds = getHappyLocations(row, col);
                setJack(newCellIds);
                break;
            default:
        }
        setCellIds(newCellIds);
    }

    function handleDoubleClick(event, cellId) {
        const element = document.getElementById(cellId);

        const dataAltValue = element.getAttribute("alt");
        const dataCommentValue = element.getAttribute("data-comment");

        const cellIndex = dataAltValue.split(",");
        const middleIndex = Math.floor((cellIndex.length - 1) / 2);
        const middleIndexPositiveInteger = Math.floor((cellIndex.length) / 2);
        const middleCellId = cellIndex[middleIndex];
        const middleCellIdPositive = cellIndex[middleIndexPositiveInteger];


        const row = tableRows.indexOf(middleCellId.charAt(0));
        const rowPositive = tableRows.indexOf(middleCellIdPositive.charAt(0));
        const col = middleCellId.charAt(1) + middleCellId.charAt(2);
        const colPositive = middleCellIdPositive.charAt(1) + middleCellIdPositive.charAt(2);

        let newCellIds = "";
        let oldCellIds = "";


        switch (dataCommentValue) {
            case "cruiser":
                newCellIds = getVerticalCruiserLocations(row, col);
                oldCellIds = getCruiserLocations(row, col);
                break;
            case "jackShip":
                newCellIds = getVerticalJackLocations(rowPositive, colPositive);
                oldCellIds = getJackLocations(rowPositive, colPositive);
                break;
            case "happyShip":
                newCellIds = getVerticalHappyLocations(row, col);
                oldCellIds = getHappyLocations(row, col);
                break;
            default:
                break;
        }

        const cellDatas = newCellIds.map(id => document.getElementById(id));
        const cellDatasOld = oldCellIds.map(id => document.getElementById(id));


        const hasNull = cellDatas.some(item => item === null);

        if (hasNull) {
            var isImageFound = true;
        } else {
            isImageFound = cellDatas.some(item => {
                if (item.id === middleCellId || (dataCommentValue && dataCommentValue.includes('jackShip') && item.id === middleCellIdPositive)) {
                    const customAttr = item.getAttribute('data-custom');
                    if (!(customAttr && customAttr.includes('moved'))) {
                        return false;
                    }
                }
                return item.innerHTML.includes('<img');
            });
        }
        const isImageFoundOld = cellDatasOld.some(item => {
            if (item.id === middleCellId || (dataCommentValue && dataCommentValue.includes('jackShip') && item.id === middleCellIdPositive)) {
                const customAttr = item.getAttribute('data-custom');
                if (customAttr && customAttr.includes('moved')) {
                    return false;
                }
            }
            return item.innerHTML.includes('<img');
        });

        if (!isImageFound || !isImageFoundOld) {
            newCellIds.forEach((location, index) => {
                const locations = document.getElementById(location);
                const locationsOldCells = document.getElementById(oldCellIds[index]);
                if ((!locations.hasAttribute("data-custom") || (locations.hasAttribute("data-custom") && !locations.getAttribute("data-custom").includes("moved")))) {
                    switch (dataCommentValue) {
                        case "cruiser":
                            locationsOldCells.innerHTML = '<div class="p-4 bg-info"></div>';
                            locationsOldCells.removeAttribute("alt");
                            locationsOldCells.removeAttribute("data-comment");
                            locationsOldCells.innerHTML = '<div class="p-4 bg-info"></div>';
                            locations.setAttribute("data-comment", "cruiser");
                            locations.setAttribute("alt", newCellIds);
                            locations.setAttribute("data-custom", "moved");
                            locations.innerHTML =
                                '<img src="' + cruiserSeparatedVertical[index] + '">';
                            setCruiser(newCellIds);
                            break;
                        case "happyShip":

                            locationsOldCells.removeAttribute("alt");
                            locationsOldCells.removeAttribute("data-comment");
                            locationsOldCells.innerHTML = '<div class="p-4 bg-info"></div>';
                            locations.setAttribute("data-comment", "happyShip");
                            locations.setAttribute("alt", newCellIds);
                            locations.setAttribute("data-custom", "moved");
                            locations.innerHTML =
                                '<img src="' + happyHorizon[index] + '">';
                            setHappy(newCellIds);
                            break;
                        case "jackShip":

                            locationsOldCells.removeAttribute("alt");
                            locationsOldCells.removeAttribute("data-comment");
                            locationsOldCells.innerHTML = '<div class="p-4 bg-info"></div>';
                            locations.setAttribute("data-comment", "jackShip");
                            locations.setAttribute("alt", newCellIds);
                            locations.setAttribute("data-custom", "moved");
                            locations.innerHTML =
                                '<img src="' + jackSparrowHorizon[index] + '">';
                            setJack(newCellIds);
                            break;
                        default:
                            break;
                    }
                } else {
                    switch (dataCommentValue) {
                        case "cruiser":
                            locations.removeAttribute("data-comment");
                            locations.removeAttribute("alt");
                            locations.removeAttribute("data-custom");
                            locations.innerHTML =
                                '<div class="p-4 bg-info"></div>';
                            locationsOldCells.setAttribute("alt", cellIndex);
                            locationsOldCells.setAttribute("data-comment", "cruiser");
                            locationsOldCells.innerHTML = '<img src="' + cruiserSeparated[index] + '">';
                            setCruiser(oldCellIds);
                            break;
                        case "happyShip":

                            locations.removeAttribute("data-comment");
                            locations.removeAttribute("alt");
                            locations.removeAttribute("data-custom");
                            locations.innerHTML =
                                '<div class="p-4 bg-info"></div>';
                            locationsOldCells.setAttribute("alt", cellIndex);
                            locationsOldCells.setAttribute("data-comment", "happyShip");
                            locationsOldCells.innerHTML = '<img src="' + happySeparated[index] + '">';
                            setHappy(oldCellIds);
                            break;
                        case "jackShip":
                            locations.removeAttribute("data-comment");
                            locations.removeAttribute("alt");
                            locations.removeAttribute("data-custom");
                            locations.innerHTML =
                                '<div class="p-4 bg-info"></div>';
                            locationsOldCells.setAttribute("alt", cellIndex);
                            locationsOldCells.setAttribute("data-comment", "jackShip");
                            locationsOldCells.innerHTML = '<img src="' + jackSparrow[index] + '">';
                            setJack(oldCellIds);
                            break;
                        default:
                            break;
                    }
                }
            });
        }
    }


    const handleButtonClickReset = () => {
        const all = [...cruiserState, ...happyState, ...jackState];
        all.forEach((location) => {
            const change = document.getElementById(location);
            change.removeAttribute("data-comment");
            change.removeAttribute("alt");
            change.removeAttribute("data-custom");
            change.innerHTML =
                '<div class="p-4 bg-info"></div>';
        });
        setCruiserCount(1);
        setJackCount(1);
        setHappyCount(1);
        setDraggedShip(null);
        setDraggedShipStyle({});
        setCellIds([]);
        setDraggedShipName(null);
    };

    const handleButtonClickSave = async () => {
        const all = [cruiserState, happyState, jackState];

        if (cruiserCount === 0 && jackCount === 0 && happyCount === 0) {
            try {
                const response = await axios.post(`/api/createGameShips`, all);
                navigate('/AllGames');
            } catch (error) {
                console.log(error.response.data);
            }
        } else {
            alert("Cannot save game data when there are not all ships placed.");
        }
    };



    return (
        <div>
            <h1 className="display-1 border-bottom border-5 text-center">
                Place a ships
            </h1>
            <table className="table caption-top">
                <tbody></tbody>
            </table>
            <br></br>
            <div className="table-container">
                <table className="myTable">
                    <thead>
                        <tr>
                            <th>SAIL YOUR SHIPS</th>
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
                                        onDragOver={(event) => handleDragOver(event, row + column)}
                                        onDoubleClick={(event) => handleDoubleClick(event, row + column)}
                                        style={
                                            cellIds.includes(row + column)
                                                ? { opacity: 0.1, transition: "1s" }
                                                : {}
                                        }
                                    >
                                        {indexRow === 0 ? column : displayShipLocation()}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="d-flex justify-content-center align-items-center">
                <button className="btn btn-danger m-3" onClick={handleButtonClickReset}>RESET</button>
                <div>
                    <img
                        src={cruiser}
                        alt="cruiser"
                        draggable="true"
                        onDragStart={handleDragStart}
                        onDrag={handleDrag}
                        onDragEnd={handleDragEnd}
                        style={{
                            cursor: draggedShip ? `url(${cruiser}), auto` : "",
                        }}
                    />
                    <span>{cruiserCount}</span>
                </div>
                <div>
                    <img
                        src={happyShip}
                        alt="happyShip"
                        draggable="true"
                        onDragStart={handleDragStart}
                        onDrag={handleDrag}
                        onDragEnd={handleDragEnd}
                        style={{
                            cursor: draggedShip ? `url(${happyShip}), auto` : "",
                        }}
                    />
                    <span>{happyCount}</span>
                </div>
                <div>
                    <img
                        src={jackShip}
                        alt="jackShip"
                        draggable="true"
                        onDragStart={handleDragStart}
                        onDrag={handleDrag}
                        onDragEnd={handleDragEnd}
                        style={{
                            cursor: draggedShip ? `url(${jackShip}), auto` : "",
                        }}
                    />
                    <span>{jackCount}</span>
                </div>
                <button className="btn btn-success m-3" onClick={handleButtonClickSave}>Save ships</button>
                {draggedShip && (
                    <div
                        className="ship-dragged"
                        style={draggedShipStyle}
                    ></div>
                )}
            </div>
        </div>
    );
}

export default NewGame;

