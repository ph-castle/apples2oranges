import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';

export default function ProfilePage({ user }) {
  let navigate = useNavigate();

  return (
    <Box
      sx={{
        width: '50%',
        margin: 'auto',
        mt: 4,
      }}
    >
      <Typography variant="h4">Profile</Typography>
      <br />
      {user.id !== 0 ? (
        <div>
          <Avatar
            src={user.avatar}
            alt="avatar"
            sx={{ width: '4em', height: '4em', margin: 'auto' }}
          />
          <br />
          <Typography variant="h6" align="center">
            Username: {user.username}
          </Typography>
          <br />
          <Button
            variant="contained"
            sx={{
              p: 'sm',
              width: '20ch',
              mt: '2rem',
              display: 'block',
              margin: 'auto',
            }}
            onClick={() => navigate('/user/edit')}
          >
            Edit profile
          </Button>
          <br />
          <Button
            variant="contained"
            sx={{
              p: 'sm',
              width: '20ch',
              mt: '2rem',
              display: 'block',
              margin: 'auto',
            }}
            onClick={() => navigate('/home')}
          >
            Back to Home
          </Button>
        </div>
      ) : (
        <div>
          <Typography variant="h6" align="center">
            Please login to see your profile
          </Typography>
          <br />
          <Button
            variant="contained"
            sx={{
              p: 'sm',
              width: '20ch',
              mt: '2rem',
              display: 'block',
              margin: 'auto',
            }}
            onClick={() => navigate('/user/login')}
          >
            Login
          </Button>
        </div>
      )}
    </Box>
  );
}
