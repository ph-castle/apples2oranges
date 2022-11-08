import SpotifyWebApi from 'spotify-web-api-node';

export const SpotifyApi = new SpotifyWebApi({
  // this is public => anything in react is
  clientId: `${process.env.REACT_APP_CLIENT_ID}`,
});
