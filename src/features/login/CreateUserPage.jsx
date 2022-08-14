import React, { useState } from 'react';
import axios from 'axios';

export default function CreateUserPage({ setUser }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [photo, setPhoto] = useState();
  const [usernameTaken, setUsernameTaken] = useState(false);

  const axiosInstance = axios.create({
    baseURL: `http://localhost:5050`
  });

  const uploadImage = (e) => {
    e.preventDefault();
    let reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onloadend = () => {
      setPhoto(reader.result);
    };
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // check if username exists first
    axiosInstance.get(`/user/${username}`)
      .then((results) => {
        if (results.data.id === undefined) {
          // username not taken, can create new user
          setUsernameTaken(false);
          // uploads photo to cloudinary
          axiosInstance.post('/cloudinary', {img: photo})
            .then((photoURL) => {
              let data = {
                'username': username,
                'password': password,
                'avatar': photoURL.data
              };
              // posts new user
              axiosInstance.post('/user', data)
                .then((results) => {
                  // sets current user data
                  setUser(results.data);
                })
                .catch((err) => {
                  console.log('Error creating user: ', err);
                })
            })
            .catch((err) => {
              console.log('Error uploading image: ', err);
            });
        } else {
          setUsernameTaken(true);
        }
      })

  };

  return (
    <div className="Login-create-user-page">
      <form onSubmit={(e) => handleSubmit(e)}>
        <label>Username: </label>
        <input
          type="text"
          required
          autoComplete="off"
          value={username}
          placeholder="Enter username"
          onChange={(e) => setUsername(e.target.value)}
        />
        {usernameTaken &&
          <div>Username already taken. Please input a different username</div>
        }
        <label>Password: </label>
        <input
          type="password"
          required
          autoComplete="off"
          value={password}
          placeholder="Enter password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <label>Upload an avatar: </label>
        <input
          type="file"
          accept="image/png, image/jpeg"
          onChange={(e) => uploadImage(e)}
        />
        {photo !== undefined && <img className="avatar-thumbnail" src={photo} alt="avatar"/>}
        <button type="submit">Create account</button>
      </form>
    </div>
  )
}