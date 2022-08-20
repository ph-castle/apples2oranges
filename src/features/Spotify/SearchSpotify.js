import React, { useState, useEffect } from 'react';
import SearchSpotifyItem from './SearchSpotifyItem';
import { TextField, Button, Box } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { SpotifyApi } from './SpotifyApi';
import { useSelector } from 'react-redux';
import MusicPlayer from './MusicPlayer';

const styles = (theme) => ({
  textField: {
    width: '90%',
    marginLeft: 'auto',
    marginRight: 'auto',
    paddingBottom: 0,
    marginTop: 0,
    fontWeight: 500,
  },
  input: {
    color: 'white',
  },
});

function SearchSpotify({ accessToken, isCollapsed }) {
  const isMusicPlayerOpen = useSelector(
    (state) => state.spotify.isMusicPlayerOpen
  );

  const { control } = useForm();
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const clear = () => {
    setSearch('');
    setSearchResults([]);
  };

  useEffect(() => {
    if (!accessToken) return;
    SpotifyApi.setAccessToken(accessToken);
  }, [accessToken]);

  useEffect(() => {
    if (!accessToken || !search) return;
    let cancel = false;
    SpotifyApi.searchTracks(search)
      .then((res) => {
        if (cancel) return;
        setSearchResults(
          res.body.tracks.items.map((track) => {
            return {
              artist: track.artists[0].name,
              title: track.name,
              uri: track.uri,
              albumUrl: track.album.images[1].url,
            };
          })
        );
      })
      .catch((err) => console.log(err));
    return () => {
      cancel = true;
    };
  }, [accessToken, search]);
  return (
    <Box
      sx={{
        display: isCollapsed ? 'none' : 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '1.2rem',
        maxWidth: '400px',
        width: '100%',
        boxShadow: '0px 0px 10px 10px white',
        padding: '1rem',
        paddingBottom: '2rem',
        borderRadius: '1rem',
        backgroundColor: 'rgba(0,0,0,0.8)',
      }}
    >
      <Box sx={{ overflow: 'scroll' }}>
        {searchResults.map((album) => (
          <SearchSpotifyItem key={album.uri} album={album} />
        ))}
      </Box>
      <form>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
          }}
        >
          <Controller
            name={'search'}
            control={control}
            sx={{ color: 'white' }}
            render={() => (
              <TextField
                onChange={(e) => setSearch(e.target.value)}
                value={search}
                label={'Search Spotify'}
                sx={{
                  backgroundColor: 'rgba(0,0,0,0.8)',
                  color: 'white',
                  outline: '1px solid white',
                  boxShadow: ' 0px 0px 10px 10px white',
                  '&label': {
                    color: 'white',
                  },
                  '&input': {
                    color: 'white',
                  },
                  '&hover': {
                    color: 'white',
                  },
                }}
                InputProps={{
                  style: {
                    color: 'white',
                  },
                }}
              />
            )}
          />
          <Button
            onClick={() => clear()}
            sx={{
              backgroundColor: 'rgba(255,0,0,0.4)',
              color: 'white',
              outline: '1px solid white',
            }}
            variant={'outlined'}
          >
            Reset
          </Button>
        </Box>
      </form>
      <MusicPlayer />
    </Box>
  );
}

export default SearchSpotify;
