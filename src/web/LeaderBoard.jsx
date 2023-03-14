import FetchData from "./components/FetchData";
import notfound from "../images/notfound.png";
import "../App.css"

function LeaderBoard() {
    const [data, loading] = FetchData(`/api/leaderboard`);


    if (loading) {
        return (
            <div className="spinner-grow " role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        )
    }

    let animationFrameId;

    const numRows = data.Scores.length;
    const rows = Array.from({ length: numRows }, (_, index) => {
        return (
            <tbody key={index} className="box" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
                <tr>
                    <td>
                        <div className="d-flex align-items-center">
                            <img src={notfound} alt="User not found" className="rounded-circle" />
                            <div className="ms-3">
                                <p className="fw-bold mb-1">{data.PlayersByScore[index]}</p>
                                <p className="text-muted mb-0">Not found</p>
                            </div>
                        </div>
                    </td>
                    <td>
                        <p className="fw-normal mb-1">{data.Scores[index]}</p>
                    </td>
                    <td>Player</td>
                    <td>
                        <button type="button" className="btn btn-link btn-sm btn-rounded">
                            Something
                        </button>
                    </td>
                </tr>
            </tbody>
        )
    });

    function handleMouseLeave(event) {
        const currentTarget = event.currentTarget;

        setTimeout(() => {
            currentTarget.style.boxShadow = `0px 0px 0px rgba(128, 128, 128,0.2), 0px 0px 0px rgba(128, 128, 128,0.3)`;
            currentTarget.style.transform = `none`;
        }, 2000);
    }


    function handleMouseMove(event) {
        cancelAnimationFrame(animationFrameId);
        const { clientY, currentTarget } = event;
        const { top, height } = currentTarget.getBoundingClientRect();

        animationFrameId = requestAnimationFrame(() => {
            const distanceFromCenter = clientY - top - height / 2;
            const maxDistance = height / 2;
            const percent = Math.abs(distanceFromCenter / maxDistance) * 100;

            switch (distanceFromCenter > 0) {
                case true:  //bottom

                    if (percent <= 20) {
                        currentTarget.style.boxShadow = `0px ${percent * 0.05}px 3px rgba(128, 128, 128,0.2), 0px ${-percent * 0.2}px 3px rgba(128, 128, 128,0.3)`;
                        currentTarget.style.transform = `perspective(2000px) rotate3d(2, 0, 0, -5deg) translate3d(0, 0, 5px)`;
                        currentTarget.style.transition = 'transform 0.5s ease-in-out, box-shadow 0.5s ease-in-out';
                    } else if (percent <= 40) {
                        currentTarget.style.boxShadow = `0px ${percent * 0.05}px 3px rgba(128, 128, 128,0.3), 0px ${-percent * 0.2}px 3px rgba(128, 128, 128,0.4)`;
                        currentTarget.style.transform = `perspective(2000px) rotate3d(2, 0, 0, -10deg) translate3d(0, 0, 5px)`;
                        currentTarget.style.transition = 'transform 0.5s ease-in-out, box-shadow 0.5s ease-in-out';
                    } else if (percent <= 60) {
                        currentTarget.style.boxShadow = `0px ${percent * 0.05}px 3px rgba(128, 128, 128,0.4), 0px ${-percent * 0.2}px 3px rgba(128, 128, 128,0.5)`;
                        currentTarget.style.transform = `perspective(2000px) rotate3d(2, 0, 0, -15deg) translate3d(0, 0, 5px)`;
                        currentTarget.style.transition = 'transform 0.5s ease-in-out, box-shadow 0.5s ease-in-out';
                    } else if (percent <= 80) {
                        currentTarget.style.boxShadow = `0px ${percent * 0.05}px 3px rgba(128, 128, 128,1), 0px ${-percent * 0.2}px 3px rgba(128, 128, 128,1)`;
                        currentTarget.style.transform = `perspective(2000px) rotate3d(2, 0, 0, -20deg) translate3d(0, 0, 5px)`;
                        currentTarget.style.transition = 'transform 0.5s ease-in-out, box-shadow 0.5s ease-in-out';
                    } else {
                        currentTarget.style.boxShadow = `0px ${percent * 0.05}px 3px rgba(128, 128, 128,1), 0px ${-percent * 0.2}px 3px rgba(128, 128, 128,1)`;
                        currentTarget.style.transform = `perspective(2000px) rotate3d(2, 0, 0, -30deg) translate3d(0, 0, 5px)`;
                        currentTarget.style.transition = 'transform 0.5s ease-in-out, box-shadow 0.5s ease-in-out';
                    }
                    break;
                case false:  //top
                    if (percent <= 20) {
                        currentTarget.style.boxShadow = `0px ${-percent * 0.05}px 5px rgba(128, 128, 128,0.2), 0px ${percent * 0.2}px 5px rgba(128, 128, 128,0.3)`;
                        currentTarget.style.transform = `perspective(2000px) rotate3d(2, 0, 0, 5deg) translate3d(0, 0, 5px)`;
                        currentTarget.style.transition = 'transform 0.5s ease-in-out, box-shadow 0.5s ease-in-out';
                    } else if (percent <= 40) {
                        currentTarget.style.boxShadow = `0px ${-percent * 0.05}px 5px rgba(128, 128, 128,0.3), 0px ${percent * 0.2}px 5px rgba(128, 128, 128,0.4)`;
                        currentTarget.style.transform = `perspective(2000px) rotate3d(2, 0, 0, 10deg) translate3d(0, 0, 5px)`;
                        currentTarget.style.transition = 'transform 0.5s ease-in-out, box-shadow 0.5s ease-in-out';
                    } else if (percent <= 60) {
                        currentTarget.style.boxShadow = `0px ${-percent * 0.05}px 5px rgba(128, 128, 128,0.4), 0px ${percent * 0.2}px 5px rgba(128, 128, 128,0.5)`;
                        currentTarget.style.transform = `perspective(2000px) rotate3d(2, 0, 0, 15deg) translate3d(0, 0, 5px)`;
                        currentTarget.style.transition = 'transform 0.5s ease-in-out, box-shadow 0.5s ease-in-out';
                    } else if (percent <= 80) {
                        currentTarget.style.boxShadow = `0px ${-percent * 0.05}px 5px rgba(128, 128, 128,1), 0px ${percent * 0.2}px 5px rgba(128, 128, 128,1)`;
                        currentTarget.style.transform = `perspective(2000px) rotate3d(2, 0, 0, 20deg) translate3d(0, 0, 5px)`;
                        currentTarget.style.transition = 'transform 0.5s ease-in-out, box-shadow 0.5s ease-in-out';
                    } else {
                        currentTarget.style.boxShadow = `0px ${-percent * 0.05}px 5px rgba(128, 128, 128,1), 0px ${percent * 0.2}px 5px rgba(128, 128, 128,1)`;
                        currentTarget.style.transform = `perspective(2000px) rotate3d(2, 0, 0, 30deg) translate3d(0, 0, 5px)`;
                        currentTarget.style.transition = 'transform 0.5s ease-in-out, box-shadow 0.5s ease-in-out';
                    }
                    break;
                default:
                    currentTarget.style.boxShadow = "none";
                    break;
            }
        });
    }


    return (
        <div>
            <table className="table align-middle mb-0 bg-white w-75 mx-auto">
                <thead className="bg-light">
                    <tr>
                        <th style={{ width: "10%" }}>Name</th>
                        <th style={{ width: "30%" }}>Score</th>
                        <th style={{ width: "30%" }}>Title</th>
                        <th style={{ width: "30%" }}>something</th>
                    </tr>
                </thead>
                {rows}
            </table>
            <div>
            </div>
            <br></br>
        </div>
    )
}
export default LeaderBoard;