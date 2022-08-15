import React from 'react';

export default function ProfilePage({ user, setUser, setCurrentPage }) {

  const handleEdit = () => {
    // switch to EditProfile page
    setCurrentPage('Edit Profile');
  }

  return (
    <div className="Profile">
      <h3>Profile</h3>
      {user.avatar !== null &&
        <img className="avatar-thumbnail" src={user.avatar} alt="avatar"/>
      }
      <br/>
      Username: {user.username}
      <br/>
      <button onClick={() => handleEdit()}>Edit profile</button>
    </div>
  )
}