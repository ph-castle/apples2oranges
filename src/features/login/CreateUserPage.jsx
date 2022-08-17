import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import './Login.css';

export default function CreateUserPage({ setUser }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [photo, setPhoto] = useState('');
  const [usernameTaken, setUsernameTaken] = useState(false);
  const [passwordMatches, setPasswordMatches] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [userCreated, setUserCreated] = useState(false);

  let navigate = useNavigate();

  const axiosInstance = axios.create({
    baseURL: `http://localhost:${process.env.REACT_APP_SERVER_PORT}`
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
          // username not taken, check if passwords match
          setUsernameTaken(false);
          if (password === password2) {
            // password matches, can create a new account
            setPasswordMatches(true);
            setSubmitting(true);
            // uploads photo to cloudinary
            let photoPromise = new Promise((resolve, reject) => {
              if (photo !== '') {
                axiosInstance.post('/cloudinary', {img: photo})
                .then((photoURL) => {
                  resolve(photoURL.data);
                })
                .catch((err) => {
                  reject(err);
                });
              } else {
                resolve(null);
              }
            });
            photoPromise
              .then((photoURL) => {
                let data = {
                  'username': username,
                  'password': password,
                  'avatar': photoURL
                };
                // posts new user
                axiosInstance.post('/user', data)
                  .then((results) => {
                    // sets current user data
                    setUser(results.data);
                    // reset fields
                    setUsername('');
                    setPassword('');
                    setPassword2('');
                    setPhoto('');
                    setSubmitting(false);
                    setUserCreated(true);
                    setTimeout(() => {
                      setUserCreated(false);
                      // route back to main page
                      navigate('/home');
                    }, 1000)
                  })
                  .catch((err) => {
                    console.log('Error creating user: ', err);
                  });
              })
              .catch((err) => {
                console.log('Error uploading image: ', err);
              });
          } else {
            setPasswordMatches(false);
          }
        } else {
          setUsernameTaken(true);
        }
      })
  };

  const handleCancel = () => {
    // reset fields
    setUsername('');
    setPassword('');
    setPassword2('');
    setPhoto('');
    setUsernameTaken(false);
    setPasswordMatches(true);
    setSubmitting(false);
    setUserCreated(false);
    // route back to main page
    navigate('/home');
  };

  return (
    <div className="Login-create-user-page">
      <h3>Create an Account</h3>
      {userCreated &&
        <h4 className="success">Account Created!</h4>
      }
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
        <br/>
        {usernameTaken &&
          <div className="warning">Username already taken. Please input a different username</div>
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
        <br/>
        <label>Confirm Password: </label>
        <input
          type="password"
          required
          autoComplete="off"
          value={password2}
          placeholder="Enter password again"
          onChange={(e) => setPassword2(e.target.value)}
        />
        {!passwordMatches &&
          <div className="warning">Passwords must match!</div>
        }
        <br/>
        <label>Upload an avatar: </label>
        <input
          type="file"
          accept="image/png, image/jpeg"
          onChange={(e) => uploadImage(e)}
        />
        {photo.length > 0 && <img className="avatar-thumbnail" src={photo} alt="avatar"/>}
        <br/>
        <button type="submit" disabled={submitting}>Create account</button>
        <button onClick={() => {handleCancel()}}>Cancel</button>
      </form>
    </div>
  )
}