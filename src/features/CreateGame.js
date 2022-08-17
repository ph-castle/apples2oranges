import React, {useState} from "react";
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
import { lobbyClient } from "./utils/lobbyClient";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";

const StyledMenuItem = styled(MenuItem)({
  fontSize: {
    sm: "1.5rem",
    md: "2rem",
  },
  padding: "1rem",
  color: "black",
  backgroundColor: 'white'
});

const StyledSelect = styled(Select)({
  fontSize: {
    sm: "1.5rem",
    md: "2rem",
  },
  padding: "1rem",
  color: "black",
  backgroundColor: 'white'
})

export const CreateGame = () => {
  let navigate = useNavigate();

  const [options, setOptions] = useState({numPlayers: 3, unlisted: false});
  const [customCards, setCustomCards] = useState([]);
  const [name, setName] = useState();

 // localStorage.setItem("name", name);

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
    } else {
      setOptions({...options, [name]: value});
      localStorage.setItem('players', value);
    }

  }
  console.log(options);

  const clickHandler = () => {
    let matchTemp;
    console.log(options);
    lobbyClient
      .createMatch("Apples2Oranges", options)
      .then((match) => {
        console.log("matchID from CreateGame", match.matchID);
        matchTemp = match.matchID;
        localStorage.setItem("matchID", matchTemp);
        lobbyClient
          .joinMatch("Apples2Oranges", match.matchID, {
            playerName: name,
          })
          .then((player) => {

            localStorage.setItem("id", player.playerID);
            localStorage.setItem("credentials", player.playerCredentials);

          })
      })
      .catch((err) => {
        console.log("catch all error in CreateGame clickHandler", err);
      });
  };

  return (
    <Box
    display="flex"
    justifyContent="center"
    alignItems="center"
    height="100vh"
    gap="12px"
    flexDirection='column'

  >
    <Box backgroundColor='skyblue'>
     <Typography variant="h4">Create a Game</Typography>
      <FormGroup sx={{height: '18rem', justifyContent: 'space-evenly', mt: '1rem'}}>
      <TextField
          required
          id="outlined-required"
          label="Nickname"
          name='nickname'
          onChange={handleChange}
          sx={{ m: 1, minWidth: '2rem', mb: '1rem', color: 'black' }}
        />
      <Box
        sx={{display: 'flex', justifyContent:'space-between', flexDirection:'row'}}>
      <FormControl required sx={{ m: 1, minWidth: '2rem', mb: '1rem', width: '50%' }}>
        <InputLabel id="demo-simple-select-required-label">Number of Players</InputLabel>
        <StyledSelect
          labelId="demo-simple-select-required-label"
          id="demo-simple-select-required"
          name="numPlayers"
          value={options.numPlayers}
          label="Number of Players"
          onChange={handleChange}
          sx={{ }}
          required
        >
          <StyledMenuItem value="">
            <em>None</em>
          </StyledMenuItem>
          <StyledMenuItem value={3}>Three</StyledMenuItem>
          <StyledMenuItem value={4}>Four</StyledMenuItem>
          <StyledMenuItem value={5}>Five</StyledMenuItem>
          <StyledMenuItem value={6}>Six</StyledMenuItem>
          <StyledMenuItem value={7}>Seven</StyledMenuItem>
          <StyledMenuItem value={8}>Eight</StyledMenuItem>
        </StyledSelect>

      </FormControl>
      <FormControl required sx={{ m: 1, minWidth: '2rem', mb: '1rem', width: '50%' }}>
        <InputLabel id="demo-simple-select-required-label">Number of Rounds</InputLabel>
        <StyledSelect
          labelId="demo-simple-select-required-label"
          id="demo-simple-select-required"
          name="rounds"
          value={options.setupData.rounds}
          label="Number of Rounds"
          onChange={handleChange}
          required
        >
          <StyledMenuItem value="">
            <em>None</em>
          </StyledMenuItem>
          <StyledMenuItem value={1}>One</StyledMenuItem>
          <StyledMenuItem value={2}>Two</StyledMenuItem>
          <StyledMenuItem value={3}>Three</StyledMenuItem>
          <StyledMenuItem value={4}>Four</StyledMenuItem>
          <StyledMenuItem value={5}>Five</StyledMenuItem>
          <StyledMenuItem value={6}>Six</StyledMenuItem>
          <StyledMenuItem value={7}>Seven</StyledMenuItem>
          <StyledMenuItem value={8}>Eight</StyledMenuItem>
          <StyledMenuItem value={9}>Nine</StyledMenuItem>
          <StyledMenuItem value={10}>Ten</StyledMenuItem>
          <StyledMenuItem value={11}>Eleven</StyledMenuItem>
          <StyledMenuItem value={12}>Twelve</StyledMenuItem>
        </StyledSelect>

      </FormControl>
      </Box>
        <FormControlLabel control={<Checkbox name="customCards"/>} label="Allow custom cards" />
        <FormControlLabel control={<Checkbox name="unlisted" value={options.unlisted} onChange={handleChange} required/>} label="Make game public" />
      </FormGroup>

      <Button
        variant="contained"
        sx={{ width: "10rem", mt: "2rem" }}
        onClick={clickHandler}
      >
        Create Game
      </Button>
      </Box>
    </Box>
  );
};
