import React, { useState } from 'react';
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


export default function CreateUserPage({ setUser }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [photo, setPhoto] = useState('');
  const [usernameTaken, setUsernameTaken] = useState(false);
  const [passwordMismatch, setPasswordMismatch] = useState(false);
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
            setPasswordMismatch(false);
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
            setPasswordMismatch(true);
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
    setPasswordMismatch(false);
    setSubmitting(false);
    setUserCreated(false);
    // route back to main page
    navigate('/home');
  };

  return (
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
      <Typography variant="h4">Create an Account</Typography>
      {userCreated &&
        <Typography variant="h6">Account Created!</Typography>
      }
      <form autoComplete="off" onSubmit={(e) => handleSubmit(e)}>
        <FormControl sx={{ width: '25ch', mt: '1rem' }}>
          <InputLabel size="small" required>Username</InputLabel>
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
        <FormControl sx={{ width: '25ch', mt:1 }}>
          <InputLabel size="small" required>Password</InputLabel>
          <OutlinedInput
            type="password"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
            label="Password"
            error={passwordMismatch}
            size="small"
          />
          <FormHelperText>&nbsp;</FormHelperText>
        </FormControl>
        <br/>
        <FormControl sx={{ width: '25ch', mt:1 }}>
          <InputLabel size="small" required>Confirm Password</InputLabel>
          <OutlinedInput
            type="password"
            value={password2}
            required
            onChange={(e) => setPassword2(e.target.value)}
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
        {photo.length > 0 && <img className="avatar-thumbnail" src={photo} alt="avatar"/>}
        <br/>
        <br/>
        <Button
          type="submit"
          variant="contained"
          sx={{ p: "sm", width: '26ch' }}
          disabled={submitting}
        >
          Create account
        </Button>
      </form>
      <Button
        variant="contained"
        sx={{ p: "sm", width: '26ch', mt: '1rem' }}
        onClick={(e) => {handleCancel()}}
      >
        Cancel
      </Button>
    </Box>
  )
}