import React from 'react';
import PropTypes from 'prop-types';
import { Typography, Button, Box } from '@mui/material';
import { selectAlbum, setPlay } from './app/mainSlice';
import { useDispatch } from 'react-redux';
import { styled } from '@mui/material/styles';

const Logo = styled(Typography)({
  // fontSize: {
  //   sm: "2rem",
  //   md: "3rem",
  // },
  // padding: "1rem",
  // borderRadius: "10px",
  fontWeight: 'bold',
  textDecoration: 'none',
  color: 'white',
});
function SearchListItem({ album }) {
  const dispatch = useDispatch();

  const handleMusicPlay = () => {
    dispatch(selectAlbum(album));
    dispatch(setPlay(true));
  };
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
        outline: 'grey solid 1px',
        marginBottom: '0.8rem',
        '&:hover': {
          color: 'green',
          border: 'solid 3px green',
        },
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
        <Typography color="white" variant="p">
          {album.artist}
        </Typography>
      </Box>
    </Box>
  );
}

export default SearchListItem;
