import React, { useState, useEffect } from "react";

// import { SpotifyApi } from "./SpotifyApi";
import SearchListItem from "./SearchListItem";
import { TextField, Button, Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setToken } from "./app/mainSlice";
import { Controller, useForm } from "react-hook-form";

function SearchSpotify({ accessToken, albumName, SpotifyApi }) {
  const dispatch = useDispatch();
  const { handleSubmit, reset, control } = useForm();
  // const onSubmit = (data) => console.log(data);

  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const clear = () => {
    setSearch("");
    setSearchResults([]);
  };

  useEffect(() => {
    if (!accessToken) {
      dispatch(setToken(accessToken));
    }
  }, [accessToken, dispatch]);

  useEffect(() => {
    if (!accessToken) return;
    SpotifyApi.setAccessToken(accessToken);
  }, []);

  useEffect(() => {
    if (!albumName) return;
    setSearch(albumName);
  }, [albumName]);

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
  }, [accessToken, search, SpotifyApi]);
  return (
    <Box sx={{ width: "100%", height: "100%" }}>
      <form>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            gap: "1rem",
            margin: "1rem 0",
          }}
        >
          <Controller
            name={"search"}
            control={control}
            render={() => (
              <TextField
                onChange={(e) => setSearch(e.target.value)}
                value={search}
                label={"Search Spotify"}
                sx={{ flex: 1 }}
              />
            )}
          />
          <Button onClick={() => clear()} variant={"outlined"}>
            Reset
          </Button>
        </Box>
      </form>

      <Box sx={{ overflow: "scroll" }}>
        {searchResults.map((album) => (
          <SearchListItem key={album.uri} album={album} />
        ))}
      </Box>
    </Box>
    // );
    //   return (
    //     <>
    //       <div className="container">
    //         <div
    //           className="main-wrapper"
    //           style={{ display: "flex", gap: "0.5rem" }}
    //         >
    //           <form>
    //             <label>
    //               Search:
    //               <input
    //                 type="text"
    //                 onChange={(e) => setSearch(e.target.value)}
    //                 value={search}
    //               />
    //             </label>
    //           </form>
    //           <button onClick={() => setSearch("")}>Clear</button>
    //         </div>
    //
    //       </div>
    //     </>
  );
}

export default SearchSpotify;
