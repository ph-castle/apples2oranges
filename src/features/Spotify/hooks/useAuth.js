import { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setToken } from '../../../app/spotifySlice';

export default function useAuth(code) {
  const spotifyToken = useSelector((state) => state.spotify.spotifyToken);
  const [accessToken, setAccessToken] = useState();
  const [refreshToken, setRefreshToken] = useState();
  const [expiresIn, setExpiresIn] = useState();
  const dispatch = useDispatch();
  useEffect(() => {
    if (spotifyToken || !code) return;

    axios
      .post(`http://localhost:${process.env.REACT_APP_SERVER_PORT}/spotify/login`, {
        code,
      })
      .then((res) => {
        setAccessToken(res.data.accessToken);
        dispatch(setToken(res.data.accessToken));
        setRefreshToken(res.data.refreshToken);
        setExpiresIn(res.data.expiresIn);
        window.history.pushState({}, null, '/');
      })
      .catch((err) => {
        console.log('login error' + err);
      });
  }, [code, dispatch, spotifyToken]);

  useEffect(() => {
    if (!refreshToken || !expiresIn) return;
    const interval = setInterval(() => {
      axios
        .post(`http://localhost:${process.env.REACT_APP_SERVER_PORT}/spotify/refresh`, {
          refreshToken,
        })
        .then((res) => {
          setAccessToken(res.data.accessToken);
          dispatch(setToken(res.data.accessToken));
          setExpiresIn(res.data.expiresIn);
        })
        .catch((err) => {
          console.log(err);
        });
    }, (expiresIn - 60) * 1000);

    return () => clearInterval(interval);
  }, [refreshToken, expiresIn, dispatch]);

  return accessToken;
}
