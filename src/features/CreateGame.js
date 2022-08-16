import React, {useState} from 'react';
import {
  Box,
  FormGroup,
  Checkbox,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  TextField,
  Button } from '@mui/material';
import { lobbyClient } from './utils/lobbyClient'
import { useNavigate } from 'react-router-dom';


export const CreateGame = () => {

  //states
  const [options, setOptions] = useState({numPlayers: '', unlisted: true});
  const [customCards, setCustomCards] = useState();
  const [name, setName] = useState();

  //navigate
  let navigate = useNavigate();


  //ClickHandler
  const clickHandler = async () => {
    const { matchID } = await lobbyClient.createMatch('Apples2Oranges', options);
    const { playerCredentials } = await lobbyClient.joinMatch(
      'Apples2Oranges',
      matchID,
      {
        playerName: name
      }
    )
    const match = await lobbyClient.getMatch('tic-tac-toe', matchID);
    console.log(match)
    navigate(`/waitingroom/${matchID}`);
  }

  const getPlayersfunc = async() => {
    const {matches} = await lobbyClient.listMatches('Apples2Orange');
    console.log(matches);
  }
  getPlayersfunc()
  //Handle Change
  const handleChange = (e) => {
    console.log(e.target.type);
    const {name, value, checked } = e.target;

    if (name === 'customCards') {
      setCustomCards(checked);
    } else if (name === 'nickname') {
      console.log(name, value);
      setName(value);
    } else if (name === 'unlisted') {
      setOptions({...options, [name]: checked});
      console.log(options);
    } else {
      setOptions({...options, [name]: value});
    }

  }

  return (
    <Box
      sx={{
        display:"flex",
        maxWidth: 400,
        height: 250,
        flexDirection: "column",
        justifyContent: "space-between",
        ml: {sm: '0rem', md: '4rem'},
        mt: '2rem',
      }}
  >
      <Typography variant="h4">Create a Game</Typography>
      <FormGroup sx={{height: '18rem', justifyContent: 'space-evenly', mt: '1rem'}}>
      <TextField
          required
          id="outlined-required"
          label="Nickname"
          name='nickname'
          onChange={handleChange}
          sx={{ m: 1, minWidth: '2rem', mb: '1rem' }}
        />
      <FormControl required sx={{ m: 1, minWidth: '2rem', mb: '1rem' }}>
        <InputLabel id="demo-simple-select-required-label">Number of Rounds</InputLabel>
        <Select
          labelId="demo-simple-select-required-label"
          id="demo-simple-select-required"
          name="numPlayers"
          label="Number of Rounds"
          onChange={handleChange}
          required
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={1}>One</MenuItem>
          <MenuItem value={2}>Two</MenuItem>
          <MenuItem value={3}>Three</MenuItem>
          <MenuItem value={4}>Four</MenuItem>
          <MenuItem value={5}>Five</MenuItem>
          <MenuItem value={6}>Six</MenuItem>
          <MenuItem value={7}>Seven</MenuItem>
          <MenuItem value={8}>Eight</MenuItem>
          <MenuItem value={9}>Nine</MenuItem>
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={11}>Eleven</MenuItem>
          <MenuItem value={12}>Twelve</MenuItem>
        </Select>

      </FormControl>
        <FormControlLabel control={<Checkbox name="customCards"/>} label="Allow custom cards" />
        <FormControlLabel control={<Checkbox name="unlisted" value={options.unlisted} onChange={handleChange} required/>} label="Make game public" />
      </FormGroup>

      <Button variant="contained" sx={{width: '10rem', mt: '2rem'}} onClick={clickHandler}>Create Game</Button>
    </Box>
  )
}