import React, { useState } from 'react';
import axios from 'axios';

export default function LoginPage({ setUser, setCurrentPage }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [valid, setValid] = useState(true);
  const [firstTry, setFirstTry] = useState(true);

  const axiosInstance = axios.create({
    baseURL: `http://localhost:${process.env.REACT_APP_SERVER_PORT}`
  });

  const handleLogin = (e) => {
    e.preventDefault();

    let options = {
      params: {
        'username': username,
        'password': password
      }
    }
    axiosInstance.get('/user', options)
      .then((results) => {
        console.log('results.data: ', results.data);
        if (results.data.id === undefined) {
          setValid(false);
          setFirstTry(false);
        } else {
          setValid(true);
          setFirstTry(false);
          setUsername('');
          setPassword('');
          // updates state of user
          setUser(results.data);
          setCurrentPage('');
          // switch page to lobby?
        }
      })
      .catch((err) => {
        console.log('Error getting user');
      })
  };

  const createAccount = () => {
    // switch to createUserPage
    setCurrentPage('Create User');
  }

  return (
    <div className="Login-page">
      <h3>Login</h3>
      <form onSubmit={(e) => handleLogin(e)}>
        <label>Username: </label>
        <input
          type="text"
          required
          autoComplete="off"
          value={username}
          placeholder="Enter username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <br/>
        <label>Password: </label>
        <input
          type="password"
          required
          autoComplete="off"
          value={password}
          placeholder="Enter password"
          onChange={(e) => setPassword(e.target.value)}
        />
        {!firstTry &&
          (valid ?
            <div>Success!</div>
            : <div>Incorrect password</div>
          )
        }
        <br/>
        <button type="submit">Login</button>
      </form>
      <button onClick={() => createAccount()}>Create new account</button>
    </div>
  )
}