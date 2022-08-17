import React from "react";
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
  Button,
} from "@mui/material";
import { lobbyClient } from "./utils/lobbyClient";
import { useDispatch, useSelector } from "react-redux";
import { setMatchID, setPlayerID } from "../app/mainSlice";

export const CreateGame = () => {
  const dispatch = useDispatch();
  const matchID = useSelector((state) => state.main.matchID);

  const clickHandler = () => {
    lobbyClient
      .createMatch("Apples2Oranges", {
        numPlayers: 2,
      })
      .then((match) => {
        console.log(match);
        dispatch(setMatchID(match.matchID));
        dispatch(setPlayerID(match.playerID));
        lobbyClient
          .joinMatch("Apples2Oranges", match.matchID, {
            playerName: "Heemo",
          })
          .then((res) => console.log(res));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Box
      sx={{
        display: "flex",
        maxWidth: 400,
        height: 250,
        flexDirection: "column",
        justifyContent: "space-between",
        ml: { sm: "0rem", md: "4rem" },
        mt: "2rem",
      }}
    >
      <Typography variant="h4">Create a Game</Typography>
      <FormGroup
        sx={{ height: "12.5rem", justifyContent: "space-evenly", mt: "1rem" }}
      >
        <FormControl required sx={{ m: 1, minWidth: "2rem", mb: "1rem" }}>
          <InputLabel id="demo-simple-select-required-label">
            Number of Rounds
          </InputLabel>
          <Select
            labelId="demo-simple-select-required-label"
            id="demo-simple-select-required"
            // value={age}
            label="Number of Rounds"
            // onChange={handleChange}
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
        <FormControlLabel control={<Checkbox />} label="Allow custom cards" />
        <FormControlLabel control={<Checkbox />} label="Make game public" />
      </FormGroup>

      <Button
        variant="contained"
        sx={{ width: "10rem", mt: "2rem" }}
        onClick={clickHandler}
      >
        Create Game
      </Button>
    </Box>
  );
};
