import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import './Login.css';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormHelperText from '@mui/material/FormHelperText';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Avatar from '@mui/material/Avatar';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';


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

  return (
    // <Box
    //   sx={{
    //       width: '50%',
    //       margin: 'auto',
    //       mt: 4,
    //       display: 'block'
    //   }}>
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection='column'
      height="100vh"
      gap="12px"
      width='50%'
      margin='auto'
      mt={4}
      // display='block'
    >
      <Typography variant="h4">Edit Profile</Typography>
      <form autoComplete="off" onSubmit={(e) => handleSubmit(e)}>
        <Avatar
          src={photo}
          alt="avatar"
          sx={{ width: '4em', height: '4em'}}
        />
        <br/>
        <FormControl sx={{ width: '25ch' }}>
          <Button
            variant="contained"
            component="label"
            sx={{ p: "sm", width: '26ch'}}
          >
            <AddPhotoAlternateIcon />&nbsp;Upload avatar
            <input
              type="file"
              accept="image/png, image/jpeg"
              onChange={(e) => uploadImage(e)}
              hidden
            />
          </Button>
        </FormControl>
        <br/>
        <FormControl sx={{ width: '25ch', mt: '1rem' }}>
          <InputLabel size="small">Username</InputLabel>
          <OutlinedInput
            type="text"
            value={username}
            required
            onChange={(e) => setUsername(e.target.value)}
            label="Username"
            error={usernameTaken}
            size="small"
          />
          {
            usernameTaken ?
            (<FormHelperText>Username already taken</FormHelperText>)
            :
            (<FormHelperText>&nbsp;</FormHelperText>)
          }
        </FormControl>
        <br/>
        <FormControl sx={{ width: '25ch' }}>
          <InputLabel required size="small">Password</InputLabel>
          <OutlinedInput
            type="password"
            value={oldPassword}
            required
            onChange={(e) => setOldPassword(e.target.value)}
            label="Password"
            error={incorrectPassword}
            size="small"
          />
          {
            incorrectPassword ?
            (<FormHelperText>Incorrect password!</FormHelperText>)
            :
            (<FormHelperText>&nbsp;</FormHelperText>)
          }
        </FormControl>
        <br/>
        <FormControl sx={{ width: '25ch' }}>
          <InputLabel size="small">New Password</InputLabel>
          <OutlinedInput
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            label="Password"
            error={passwordMismatch}
            size="small"
          />
          <FormHelperText>&nbsp;</FormHelperText>
        </FormControl>
        <br/>
        <FormControl sx={{ width: '25ch' }}>
          <InputLabel size="small">Confirm New Password</InputLabel>
          <OutlinedInput
            type="password"
            value={newPassword2}
            onChange={(e) => setNewPassword2(e.target.value)}
            label="Password"
            error={passwordMismatch}
            size="small"
          />
          {
            passwordMismatch ?
            (<FormHelperText>Passwords must match!</FormHelperText>)
            :
            (<FormHelperText>&nbsp;</FormHelperText>)
          }
        </FormControl>
        <br/>
        <Button
            type="submit"
            variant="contained"
            sx={{ p: "sm", width: '26ch' }}
            disabled={submitting}
          >
            Submit
          </Button>
      </form>
      <Button
        variant="contained"
        sx={{ p: "sm", width: '26ch', mt: '1rem' }}
        onClick={(e) => navigate('/user/profile')}
      >
        Cancel
      </Button>
    </Box>
  )
}