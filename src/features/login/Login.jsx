import React from 'react';
import LoginPage from './LoginPage';
import CreateUserPage from './CreateUserPage';

export default function Login({ setUser }) {

  const handleLogin = () => {
    // switch to Login page
    // <LoginPage setUser={setUser}/>
  }

  return (
    <div className="Login">
      <button onClick={() => handleLogin()}>Login</button>
      {/* <LoginPage setUser={setUser}/> */}
      {/* <CreateUserPage setUser={setUser}/> */}
    </div>
  )
}