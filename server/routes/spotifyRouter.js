require('dotenv').config();

const spotifyRouter = require('express').Router();
const SpotifyWebApi = require('spotify-web-api-node');

spotifyRouter.post('/refresh', (req, res) => {
  const refreshToken = req.body.refreshToken;

  const Spotify = new SpotifyWebApi({
    redirectUri: `http://localhost:${process.env.EXPRESS_PORT}`,
    clientId: `${process.env.S_CLIENT_ID}`,
    clientSecret: `${process.env.S_CLIENT_SECRET}`,
    refreshToken,
  });

  Spotify.refreshAccessToken()
    .then((data) => {
      res.json({
        accessToken: data.body.accessToken,
        expiresIn: data.body.expiresIn,
      });
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(400);
    });
});
spotifyRouter.post('/login', (req, res) => {
  const code = req.body.code;

  const Spotify = new SpotifyWebApi({
    redirectUri: `http://localhost:${process.env.SERVER_PORT}`,
    clientId: `${process.env.S_CLIENT_ID}`,
    clientSecret: `${process.env.S_CLIENT_SECRET}`,
  });

  Spotify.authorizationCodeGrant(code)
    .then((data) => {
      res.json({
        accessToken: data.body.access_token,
        refreshToken: data.body.refresh_token,
        expiresIn: data.body.expires_in,
      });
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(400);
    });
});

module.exports = spotifyRouter;
