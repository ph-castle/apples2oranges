import React from 'react';
import { useNavigate } from "react-router-dom";
import './Login.css';

export default function ProfilePage({ user }) {
  let navigate = useNavigate();

  return (
    <div className="Profile">
      <h3>Profile</h3>
      {user.avatar !== null &&
        <img className="avatar-thumbnail" src={user.avatar} alt="avatar"/>
      }
      <br/>
      Username: {user.username}
      <br/>
      <button onClick={() => navigate('/user/edit')}>Edit profile</button>
      <button onClick={() => navigate('/home')}>Back to Home</button>
    </div>
  )
}