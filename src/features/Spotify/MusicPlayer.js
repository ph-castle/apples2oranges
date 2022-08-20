import React, { useEffect } from 'react';
import SpotifyPlayer from 'react-spotify-web-playback';
import { useSelector, useDispatch } from 'react-redux';
import { setPlay } from '../../app/spotifySlice';

function MusicPlayer() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.spotify.token);
  const album = useSelector((state) => state.spotify.album);
  const play = useSelector((state) => state.spotify.play);

  useEffect(() => {
    dispatch(setPlay(true));
  }, [album, dispatch]);

  if (!token || !album) return null;

  return (
    <SpotifyPlayer
      token={token}
      showSaveIcon
      callback={(state) => {
        if (!play) dispatch(setPlay(false));
      }}
      play={true}
      uris={album ? [album.uri] : []}
      styles={{
        activeColor: '#fff',
        bgColor: 'rgba(0, 0, 0, 0.8)',
        color: '#fff',
        loaderColor: '#fff',
        sliderColor: '#1cb954',
        trackArtistColor: '#ccc',
        trackNameColor: '#fff',
        volumeSliderColor: '#1cb954',
      }}
    />
  );
}

export default MusicPlayer;
