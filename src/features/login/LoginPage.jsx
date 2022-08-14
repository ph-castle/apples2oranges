import React, { useState } from 'react';
import axios from 'axios';
import CreateUserPage from './CreateUserPage';

export default function LoginPage({ setUser }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [valid, setValid] = useState(true);
  const [firstTry, setFirstTry] = useState(true);

  const axiosInstance = axios.create({
    baseURL: `http://localhost:5050`
  });

  const handleLogin = (e) => {
    e.preventDefault();

    console.log('attempting login');
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
          // switch page to lobby?
        }
      })
      .catch((err) => {
        console.log('Error getting user');
      })
  };

  const createAccount = () => {
    // switch to createUserPage
    {/* <CreateUserPage setUser={setUser}/> */}
  }

  return (
    <div className="Login-page">
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
        <button type="submit">Login</button>
      </form>
      <button onClick={() => createAccount()}>Create new account</button>
    </div>
  )
}