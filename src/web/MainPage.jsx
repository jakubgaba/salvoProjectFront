import leaderboard from "../images/leaderboard.png";
import battle from "../images/battle.png";
import Logout from "./components/Logout";
import pirate from "../images/pirate.png"

export default function MainPage() {




    return (
        <div className="container-fluid bg-light ">
            <nav className="navbar navbar-expand-lg navbar-light .bg-white">
                <a className="navbar-brand" href="/">$</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="/navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item active">
                            <a className="nav-link disabled" href="/">Home</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link text-success" href="/login">Sign-in</a>
                        </li>
                        <Logout></Logout>
                    </ul>
                </div>
            </nav>

            <div className="jumbotron">
                <h1 className="display-4">Set Sail for Glory!</h1>
                <p className="lead">Join the battle on the high seas and command your ships to fire on an opponent.</p>
                <hr className="my-4" />
                <p>Take on enemy fleets and unleash devastating attacks.</p>
            </div>


            <div className="row">
                <div className="col-md-3">
                    <div className="card">
                        <img className="card-img-top" src={leaderboard} alt="leaderboard" />
                        <div className="card-body">
                            <h4 className="card-title">Compete with the Best and Climb the Ranks</h4>
                            <p className="card-text">Join the leaderboard and show off your skills to the world. Can you make it to the top and be recognized as the best?</p>
                            <a href="/leaderboard" className="btn btn-primary">Join the Leaderboard</a>
                        </div>
                    </div>
                </div>

                <div className="col-md-3">
                    <div className="card">
                        <img className="card-img-top" src={battle} alt="Some bild" />
                        <div className="card-body">
                            <h4 className="card-title">Engage in Epic Battles and Conquer New Realms</h4>
                            <p className="card-text">Step into a world of adventure and challenge with our collection of games. From naval battles to fantasy realms, there's something for everyone.</p>
                            <a href="/AllGames" className="btn btn-primary">All Games</a>
                        </div>
                    </div>
                </div>

                <div className="col-md-4 ">
                    <img
                        src={pirate}
                        class="img-fluid rounded-pill hover-shadow "
                        alt="Los Angeles Skyscrapers"
                    />
                </div>

            </div>


            <footer className="footer mt-auto py-3">
                <div className="container">
                    <span className="text-muted">Sail the High Seas and Rule the Waves with Our Fleet of Mighty Ships.</span>
                </div>
            </footer>

        </div>

    )
}
