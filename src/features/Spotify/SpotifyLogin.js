import React from 'react';
import { Link, Box } from '@mui/material';

function SpotifyLogin({ isCollapsed }) {
  const authURL = `https://accounts.spotify.com/authorize?client_id=${process.env.REACT_APP_AUTH_URL}`;

  return (
    <Box>
      <Link className="btn-spotify" href={authURL} sx={{}}>
        <Box
          component="img"
          sx={{
            display: isCollapsed ? 'none' : 'flex',
            transform: 'scale(0.3)',
            borderRadius: '50%',
            boxShadow: '6px 6px 18px 18px rgba(249, 153, 0, 0.3)',
            '&:hover': {
              transform: 'scale(0.5)',
              outline: '5px solid orange',
            },
          }}
          alt="Spotify Logo"
          src="https://img.icons8.com/doodle/344/spotify.png"
        />
      </Link>
    </Box>
  );
}

export default SpotifyLogin;
