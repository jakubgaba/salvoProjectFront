import React, { useState } from 'react';
import axios from 'axios';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('/api/login', { username, password }, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        if (response.status === 200) {
          localStorage.setItem('playerId', response.data);
          window.location.href = '/';
        }
      })
      .catch(error => {
        alert(error.response.data)
      });
  };

  return (
    <div className="d-flex align-items-center vh-100">
      <div className="container">
        <div className="row">
          <div className="col-md-6 mx-auto">
            <div className="card mt-5">
              <div className="card-header">
                <h3 className="text-center mb-0">Login</h3>
              </div>
              <div className="card-body">
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="username">Username:</label>
                    <input
                      type="username"
                      className="form-control"
                      id="username"
                      onChange={e => setUsername(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      onChange={e => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  <br></br>
                  <div className="text-center">
                    <button type="submit" className="btn btn-primary">
                      Login
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
