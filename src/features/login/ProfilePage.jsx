import React from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import { StyledButton } from '../../styles/createUserPageStyles';
import { Heading } from '../../styles/globalStyles';
export default function ProfilePage({ user }) {
  let navigate = useNavigate();

  return (
    <Box
      sx={{
        width: '50%',
        margin: 'auto',
        mt: 4,
        zIndex: 1,
        textAlign: 'center',
        paddingBottom: '1rem',
      }}
    >
      <Heading variant="h4" sx={{ zIndex: 1, color: 'white' }}>
        Profile
      </Heading>
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
            Welcome {user.username}!
          </Typography>
          <br />
          <StyledButton
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
          </StyledButton>
          <br />
          <StyledButton
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
          </StyledButton>
        </div>
      ) : (
        <div>
          <Typography variant="h6" align="center">
            Please login to see your profile
          </Typography>
          <br />
          <StyledButton
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
          </StyledButton>
        </div>
      )}
    </Box>
  );
}
