import React from 'react';
import Draggable from 'react-draggable';
import { Box } from '@mui/material';
import SpotifyLogin from './SpotifyLogin';
import SearchSpotify from './SearchSpotify';

import { useDispatch, useSelector } from 'react-redux';
import useAuth from './hooks/useAuth';

export default function BoomBox({ code }) {
  const accessToken = useAuth(code);

  return (
    <Draggable handle="#handle">
      <Box
        sx={{
          position: 'absolute',
          cursor: 'move',
          userSelect: 'none',
          right: '2%',
          bottom: '2%',
          transform: 'translate(-50%, -50%)',
        }}
      >
        {accessToken ? (
          <SearchSpotify accessToken={accessToken} />
        ) : (
          <SpotifyLogin />
        )}
        <Box
          id="handle"
          sx={{
            fontSize: '2rem',
            backgroundColor: 'orange',
            width: '50px',
            height: '50px',
            borderRadius: '50%',
          }}
        ></Box>
      </Box>
    </Draggable>
  );
}
