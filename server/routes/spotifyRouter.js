require('dotenv').config();

const spotifyRouter = require('express').Router();
const SpotifyWebApi = require('spotify-web-api-node');

spotifyRouter.post('/refresh', (req, res) => {
  const refreshToken = req.body.refreshToken;

  console.log('refresh');
  console.log(process.env.S_CLIENT_ID);

  const Spotify = new SpotifyWebApi({
    redirectUri: 'http://localhost:3000',
    clientId: process.env.S_CLIENT_ID,
    clientSecret: process.env.S_CLIENT_SECRET,
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
//localhost:5050/login
spotifyRouter.post('/login', (req, res) => {
  const code = req.body.code;
  console.log('login');

  const Spotify = new SpotifyWebApi({
    redirectUri: 'http://localhost:3000',
    clientId: process.env.S_CLIENT_ID,
    clientSecret: process.env.S_CLIENT_SECRET,
  });

  Spotify.authorizationCodeGrant(code)
    .then((data) => {
      console.log(data);
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
