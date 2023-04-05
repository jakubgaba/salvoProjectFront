import cruiser from "../images/cruiserShip2.png";
import cruiser0 from "../images/cruiser0.png";
import cruiser1 from "../images/cruiser1.png";
import cruiser2 from "../images/cruiser2.png";
import happyShip from "../images/HappyShip2.png";
import jackShip from "../images/jackShip.png";
import happy0 from "../images/happy0.png";
import happy1 from "../images/happy1.png";
import jackShip0 from "../images/jackShip0.png";
import jackShip1 from "../images/jackShip1.png";
import jackShip2 from "../images/jackShip2.png";
import jackShip3 from "../images/jackShip3.png";
import { useState } from "react";

function NewGame() {
    var tableRows = [" ", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
    var tableColumns = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
    const [draggedShip, setDraggedShip] = useState(null);
    const [draggedShipName, setDraggedShipName] = useState(null);
    const [draggedShipStyle, setDraggedShipStyle] = useState({});
    const [cellIds, setCellIds] = useState([]);
    const [droppedCruiser, setCruiser] = useState([]);
    const [droppedHappy, setHappy] = useState([]);
    const [droppedJack, setJack] = useState([]);

    const cruiserSeparated = [];
    cruiserSeparated.push(cruiser0);
    cruiserSeparated.push(cruiser1);
    cruiserSeparated.push(cruiser2);

    const happySeparated = [];
    happySeparated.push(happy0);
    happySeparated.push(happy1);

    const jackSparrow = [];
    jackSparrow.push(jackShip0);
    jackSparrow.push(jackShip1);
    jackSparrow.push(jackShip2);
    jackSparrow.push(jackShip3);

    function displayShipLocation() {
        return <div className="p-4 bg-info"></div>;
    }


    function handleDragStart(event) {
        setDraggedShip(event.target.src);
        setDraggedShipName(event.target.alt);
        event.dataTransfer.setDragImage(event.target, window.outerWidth, window.outerHeight);
    }

    function handleDragEnd() {
        if (cellIds.length > 0 && !cellIds.some(item => item.charAt(0) === " " || item === undefined || item === null || item.includes("undefined"))) {
            const tds = cellIds.map((id) => document.getElementById(id));
            const cruiserIndexes = [];
            const happyIndexes = [];
            const jackIndexes = [];
            tds.forEach((location, index) => {
                switch (draggedShipName) {
                    case "cruiser":
                        location.setAttribute('data-comment', 'cruiser');
                        location.setAttribute('alt', 'cruiser');
                        location.innerHTML = '<img src="' + cruiserSeparated[index] + '">';
                        cruiserIndexes.push(location);
                        break;
                    case "happyShip":
                        location.setAttribute('data-comment', 'happyShip');
                        location.setAttribute('alt', 'happyShip');
                        location.innerHTML = '<img src="' + happySeparated[index] + '">';
                        happyIndexes.push(location);
                        break;
                    case "jackShip":
                        location.setAttribute('data-comment', 'jackShip');
                        location.setAttribute('alt', 'jackShip');
                        location.innerHTML = '<img src="' + jackSparrow[index] + '">';
                        jackIndexes.push(location);
                        break;
                    default:
                        break;
                }
            });
            if (cruiserIndexes.length > 0) {
                setCruiser(cruiserIndexes);
            }
            if (happyIndexes.length > 0) {
                setHappy(happyIndexes);
            }
            if (jackIndexes.length > 0) {
                setJack(jackIndexes);
            }
        } else {
            setDraggedShip(null);
            setDraggedShipName(null);
            setDraggedShipStyle({});
            setCellIds([]);
        }
        setDraggedShip(null);
        setDraggedShipName(null);
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

    function handleDragOver(event, cellId) {
        const row = tableRows.indexOf(cellId.charAt(0));
        const col = cellId.charAt(1) + cellId.charAt(2);
        let newCellIds = '';
        switch (draggedShipName) {
            case "cruiser":
                newCellIds = getCruiserLocations(row, col);
                break;
            case "jackShip":
                newCellIds = getJackLocations(row, col);
                break;
            case "happyShip":
                newCellIds = getHappyLocations(row, col);
                break;
            default:
        }
        setCellIds(newCellIds);
    }

    function handleDoubleClick(event, row, column) {
        const element = document.getElementById(row + column);
        const dataCommentValue = element.getAttribute('data-comment');
        console.log(dataCommentValue);
    }

    function handleDragStartCells(event) {
        console.log(event);
    }


    return (
        <div>
            <h1 className="display-1 border-bottom border-5 text-center">
                Create a game
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
                                        onDoubleClick={(event) => handleDoubleClick(event, row, column)}
                                        onDragStart={handleDragStartCells}
                                        // onDrag={handleDragCells}
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
            {draggedShip && (
                <div
                    className="ship-dragged"
                    style={draggedShipStyle}
                ></div>
            )}
        </div>
    );
}

export default NewGame;

