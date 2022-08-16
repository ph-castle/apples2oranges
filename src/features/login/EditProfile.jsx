import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import './Login.css';

export default function EditProfile({ user, setUser }) {
  const [username, setUsername] = useState(user.username);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newPassword2, setNewPassword2] = useState('');
  const [photo, setPhoto] = useState(user.avatar);
  const [usernameTaken, setUsernameTaken] = useState(false);
  const [incorrectPassword, setIncorrectPassword] = useState(false);
  const [passwordMismatch, setPasswordMismatch] = useState(false);
  const [newPhoto, setNewPhoto] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  let navigate = useNavigate();

  useEffect(() => {
    // if user changes, resets fields
    setUsername(user.username);
    setOldPassword('');
    setNewPassword('');
    setNewPassword2('');
    setPhoto(user.avatar);
    setUsernameTaken(false);
    setIncorrectPassword(false);
    setPasswordMismatch(false);
    setNewPhoto(false);
    setSubmitting(false);
  }, [user])

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
    setNewPhoto(true);
  };

  const handleSubmit = async function(e) {
    e.preventDefault();
    // local variables
    let data = {};
    let mismatch;

    // check if passwords match
    if (newPassword === newPassword2) {
      setPasswordMismatch(false);
      mismatch = false;
    } else {
      setPasswordMismatch(true);
      mismatch = true;
    }

    // if changing username, check if username exists
    let userPromise = new Promise ((resolve, reject) => {
      if (username !== user.username) {
        axiosInstance.get(`/user/${username}`)
        .then((results) => {
          if (results.data.id === undefined) {
            // username not taken
            setUsernameTaken(false);
            resolve(false);
          } else {
            // username taken
            setUsernameTaken(true);
            resolve(true);
          }
        })
        .catch((err) => {
          reject(err);
        });
      } else {
        // username not changing
        setUsernameTaken(false);
        resolve(false);
      }
    });

    userPromise
      .then((userTaken) => {
        // password matches and username is not taken
        if (!mismatch && !userTaken) {
          // check if old password is correct
          let options = {
            params: {
              'username': user.username,
              'password': oldPassword
            }
          }
          axiosInstance.get('/user', options)
            .then((results) => {
              if (results.data.id !== undefined) {
                // password correct, update current user
                setIncorrectPassword(false);
                setSubmitting(true);
                // if there is new photo, uploads photo to cloudinary
                let avatarPromise = new Promise((resolve, reject) => {
                  if (newPhoto) {
                    axiosInstance.post('/cloudinary', {img: photo})
                    .then((photo) => {
                      resolve(photo.data);
                    })
                    .catch((err) => {
                      console.log()
                      reject(err);
                    })
                  } else {
                    // if no new photo, keep current photo
                    resolve(user.avatar);
                  }
                })
                avatarPromise
                  .then((avatar) => {
                    data.avatar = avatar;
                    // if there was new password
                    data.password = newPassword.length > 0 ? newPassword : oldPassword;
                    data.username = username;
                    // updates user
                    axiosInstance.put(`/user/${user.id}`, data)
                      .then(() => {
                        // sets current user to new data
                        let newUser = {
                          'id': user.id,
                          'username': username,
                          'avatar': data.avatar
                        }
                        setUser(newUser);
                        // switched back to user profile
                        navigate('/user/profile');
                      })
                      .catch((err) => {
                        console.log('Error updating user: ', err);
                      })
                  })
                  .catch((err) => {
                    console.log('Error uploading image: ', err);
                  });
              } else {
                setIncorrectPassword(true);
              }
            })
            .catch((err) => {
              console.log('Error getting user');
            });
        }
      })
      .catch((err) => {
        console.log('Error getting username: ', err);
      });

  };

  const handleCancel = () => {
    // route back to profile page
    navigate('/user/profile');
  };

  return (
    <div className="Login-edit-profile-page">
      <h3>Edit Profile</h3>
      <form onSubmit={(e) => handleSubmit(e)}>
        {photo !== null && <img className="avatar-thumbnail" src={photo} alt="avatar"/>}
        <br/>
        <label>Upload a new avatar: </label>
        <input
          type="file"
          accept="image/png, image/jpeg"
          onChange={(e) => uploadImage(e)}
        />
        <br/>
        <label>Username: </label>
        <input
          type="text"
          autoComplete="off"
          value={username}
          placeholder="Change username"
          onChange={(e) => setUsername(e.target.value)}
        />
        {usernameTaken &&
          <div className="warning">Username already taken. Please input a different username</div>
        }
        <br/>
        <label>Current Password: </label>
        <input
          type="password"
          required
          autoComplete="off"
          value={oldPassword}
          placeholder="Enter current password"
          onChange={(e) => setOldPassword(e.target.value)}
        />
        {incorrectPassword &&
          <div className="warning">Incorrect password!</div>
        }
        <br/>
        <label>New Password: </label>
        <input
          type="password"
          autoComplete="off"
          value={newPassword}
          placeholder="Enter new password"
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <br/>
        <label>Confirm New Password: </label>
        <input
          type="password"
          autoComplete="off"
          value={newPassword2}
          placeholder="Enter password again"
          onChange={(e) => setNewPassword2(e.target.value)}
        />
        {passwordMismatch &&
          <div className="warning">Passwords must match!</div>
        }
        <br/>
        <button type="submit" disabled={submitting}>Submit</button>
        <button onClick={() => {handleCancel()}}>Cancel</button>
      </form>
    </div>
  )
}