import axios from 'axios';


function Logout() {
    const handleLogout = () => {
        axios.post('/api/logout', {}, {
            headers: {
                'Cache-Control': 'no-cache, no-store, must-revalidate',
                'Pragma': 'no-cache',
                'Expires': 0
            }
        })
            .then(response => {
                if (response.status === 200) {
                    alert("You have been logged out")
                }
            })
            .catch(error => {
                alert(error.response.data.message);
            });
    }

    return (
        <li className="nav-item">
            <div className="nav-link text-danger" onClick={handleLogout} style={{ cursor: "pointer" }}>
                Sign-out
            </div>
        </li>
    );
}

export default Logout;
