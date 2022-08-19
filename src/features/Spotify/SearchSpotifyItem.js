import React from 'react';
import PropTypes from 'prop-types';
import { Typography, Button, Box } from '@mui/material';
import {
  selectAlbum,
  setPlay,
  setIsMusicPlayerOpen,
} from '../../app/spotifySlice';
import { useDispatch } from 'react-redux';
import { styled } from '@mui/material/styles';

const Logo = styled(Typography)({
  fontWeight: 'bold',
  textDecoration: 'none',
  color: 'white',
  fontSize: '1rem',
  noWrap: true,
  overflow: 'hidden',
});
function SearchSpotifyItem({ album }) {
  const dispatch = useDispatch();

  const handleMusicPlay = () => {
    console.log('handleMusicPlay');
    dispatch(selectAlbum(album));
    dispatch(setPlay(true));
    dispatch(setIsMusicPlayerOpen(true));
  };
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
        border: 'grey solid 1px',
        marginTop: '2rem',
        marginBottom: '0.8rem',
        '&:hover': {
          color: 'green',
          border: 'solid 3px rgba(0, 128, 0, 0.5)',
        },
        // backgroundColor: 'rgba(0,0,0,0.8)',
        height: '3.5em',
      }}
      onClick={handleMusicPlay}
    >
      <img
        src={album.albumUrl}
        alt={album.title}
        style={{ height: '100px', width: '100px' }}
      />
      <Box>
        <Logo>{album.title}</Logo>
        <Typography
          color="white"
          variant="p"
          sx={{
            fontSize: '0.8rem',
          }}
        >
          {album.artist}
        </Typography>
      </Box>
    </Box>
  );
}

export default SearchSpotifyItem;
