import React from 'react';
import { Link, Box } from '@mui/material';

function SpotifyLogin() {
  const AUTH_URL =
    'https://accounts.spotify.com/authorize?client_id=925ae1cbc41f4b249e72dfe28b1146ca&response_type=code&redirect_uri=http://localhost:3000&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state%20playlist-modify-public%20playlist-modify-private%20user-top-read';

  return (
    <Box>
      <Link className="btn-spotify" href={AUTH_URL} sx={{}}>
        <Box
          component="img"
          sx={{
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
// textDecoration: 'none',
//           display: 'flex',
//           flexDirection: 'column',
//           alignItems: 'center',
//           justifyContent: 'center',
//           height: '100vh',
