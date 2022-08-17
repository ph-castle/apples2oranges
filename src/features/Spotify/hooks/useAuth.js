import { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setSpotifyToken } from "../../../app/mainSlice";

export default function useAuth(code) {
  const spotifyToken = useSelector((state) => state.main.spotifyToken);
  const [accessToken, setAccessToken] = useState();
  const [refreshToken, setRefreshToken] = useState();
  const [expiresIn, setExpiresIn] = useState();
  const dispatch = useDispatch();
  useEffect(() => {
    if (spotifyToken) return;
    axios
      .post("http://localhost:8000/spotify/login", {
        code,
      })
      .then((res) => {
        console.log("login", res.data);
        setAccessToken(res.data.accessToken);
        dispatch(setSpotifyToken(res.data.accessToken));
        setRefreshToken(res.data.refreshToken);
        setExpiresIn(res.data.expiresIn);
        window.history.pushState({}, null, "/");
      })
      .catch((err) => {
        console.log("login error" + err);
        // window.location = "/";
      });
  }, [code, dispatch, spotifyToken]);

  useEffect(() => {
    if (!refreshToken || !expiresIn) return;
    console.log("refreshToken" + refreshToken);
    const interval = setInterval(() => {
      axios
        .post("http://localhost:8000/spotify/refresh", {
          refreshToken,
        })
        .then((res) => {
          console.log("refresh", res.data);
          setAccessToken(res.data.accessToken);
          dispatch(setSpotifyToken(res.data.accessToken));
          setExpiresIn(res.data.expiresIn);
        })
        .catch((err) => {
          console.log(err);
          //   window.location = "/";
        });
    }, (expiresIn - 60) * 1000);

    return () => clearInterval(interval);
  }, [refreshToken, expiresIn, dispatch]);

  return accessToken;
}
