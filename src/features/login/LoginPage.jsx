import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormHelperText from '@mui/material/FormHelperText';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Heading, StyledComponentContainer, StyledButton } from '../../styles/globalStyles';
import { StyledOutlineInput, StyledInputLabel } from '../../styles/createUserPageStyles';

export default function LoginPage({ setUser }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  // username-password combo is valid
  const [valid, setValid] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  // disables login button when attempting login
  const [attemptingLogin, setAttemptingLogin] = useState(false);
  let navigate = useNavigate();

  const axiosInstance = axios.create({
    baseURL: `http://localhost:${process.env.REACT_APP_SERVER_PORT}`,
  });

  const handleLogin = (e) => {
    e.preventDefault();
    setAttemptingLogin(true);

    let options = {
      params: {
        username: username,
        password: password,
      },
    };
    axiosInstance
      .get('/user', options)
      .then((results) => {
        if (results.data.id === undefined) {
          setValid(false);
          setAttemptingLogin(false);
        } else {
          setValid(true);
          setUsername('');
          setPassword('');
          // updates state of user
          setUser(results.data);
          // switch page to home
          // or switch back one page
          navigate('/');
          setAttemptingLogin(false);
        }
      })
      .catch((err) => {
        console.log('Error getting user');
      });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <StyledComponentContainer>
      <Heading>Login</Heading>
      <Button
        onClick={(e) => navigate(-1)}
        variant="contained"
        sx={{ position: 'absolute', top: '5%', right: '5%', minWidth: '10px', height: '1.0em', width: '1.0em', fontSize: { xs: '1.5rem', md: '2.5rem', lg: '3rem', xl: '4rem' }, padding: '0.1em', borderRadius: '4px', color: 'white', '&:hover': { boxShadow: '0 0 20px orange', scale: '1.25', transition: 'scale 5ms ease' } }}
      >&times;</Button>
      <form autoComplete="off" onSubmit={(e) => handleLogin(e)}>
        <FormGroup>
          <FormControl sx={{ width: '25ch' }}>
            <StyledInputLabel required>Username</StyledInputLabel>
            <StyledOutlineInput
              type="text"
              value={username}
              required
              onChange={(e) => setUsername(e.target.value)}
              label="Username"
            />
          </FormControl>
          <br />
          <FormControl sx={{ width: '25ch', mb: '0.3em' }}>
            <StyledInputLabel required>Password</StyledInputLabel>
            <StyledOutlineInput
              type={showPassword ? 'text' : 'password'}
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
              label="Password"
              error={!valid}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => {
                      setShowPassword(!showPassword);
                    }}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
            {!valid ? (
              <FormHelperText>Incorrect password</FormHelperText>
            ) : (
              <FormHelperText>&nbsp;</FormHelperText>
            )}
          </FormControl>
          <FormControl>
            <StyledButton
              type="submit"
              variant="contained"
              disabled={attemptingLogin}
            >
              Login
            </StyledButton>
          </FormControl>
        </FormGroup>
      </form>
      <StyledButton
        variant="contained"
        onClick={(e) => navigate('/user/create')}
      >
        Create account
      </StyledButton>
    </StyledComponentContainer>
  );
}
