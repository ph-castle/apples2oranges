import React from 'react';
import Draggable from 'react-draggable';
import { Box } from '@mui/material';
import SpotifyLogin from './SpotifyLogin';
import SearchSpotify from './SearchSpotify';

import useAuth from './hooks/useAuth';

export default function BoomBox({ code }) {
  const accessToken = useAuth(code);
  const [isCollapsed, setIsCollapsed] = React.useState(false);
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
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '1rem',
        }}
      >
        {accessToken ? (
          <SearchSpotify accessToken={accessToken} isCollapsed={isCollapsed} />
        ) : (
          <SpotifyLogin isCollapsed={isCollapsed} />
        )}
        <Box
          id="handle"
          sx={{
            fontSize: '2rem',
            backgroundColor: isCollapsed ? 'orange' : 'red',
            fontFamily: 'sans-serif',
            boxShadow: '0 0 10px 10px white',
            width: '50px',
            height: '50px',
            borderRadius: '50%',
            cursor: 'pointer',
            '&:active': {
              boxShadow: '0 0 20px 10px white',
              backgroundColor: 'rgb(250, 71, 21)',
            },
          }}
          onDoubleClick={() => {
            setIsCollapsed((isCollapsed) => !isCollapsed);
          }}
        />
      </Box>
    </Draggable>
  );
}
