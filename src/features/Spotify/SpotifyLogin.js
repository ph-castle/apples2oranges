import React from "react";
import { Link, Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

// const Logo = styled(Typography)({
//   fontSize: {
//     sm: "1.5rem",
//     md: "2rem",
//   },
//   padding: "1rem",
//   borderRadius: "10px",
//   fontWeight: "bold",
//   textDecoration: "none",
//   "&:hover": {
//     color: "#f3f3f3",
//     outline: "1px solid #f3f3f3",
//   },
//   outline: "1px solid green",
// });

function SpotifyLogin() {
  const matchID = localStorage.getItem("matchID");
  const AUTH_URL = `https://accounts.spotify.com/authorize?client_id=925ae1cbc41f4b249e72dfe28b1146ca&response_type=code&redirect_uri=http://localhost:3000/waitingroom/${matchID}&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state%20playlist-modify-public%20playlist-modify-private%20user-top-read%20playlist-read-private`;

  return (
    <Box>
      <Link
        className="btn-spotify"
        href={AUTH_URL}
        sx={{
          textDecoration: "none",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
        }}
      >
        <Box
          component="img"
          sx={{
            "&:hover": {
              transform: "scale(1.2)",
              outline: "5px solid #f3f3f3",
              borderRadius: "50%",
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
