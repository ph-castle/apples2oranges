import React, { useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";
import { lobbyClient } from "./utils/lobbyClient";
import createGameReducer, { initialCreateGameState } from "./createGameReducer";
import {
  StyledMenuItem,
  StyledSelect,
  // StyledComponentContainer,
  StyledFormGroup,
  StyledFormControl,
  StyledInputLabel,
  StyledTypography,
  StyledTextField,
  StyledCheckbox,
  StyledButton,
  StyledFormControlLabel,
  StyledContainer,
  StyledInnerBox,
  StyledCheckboxContainer,
} from "../styles/createGameStyles";
import { Box, Typography } from "@mui/material";
// import { StyledComponentContainer } from "../styles/globalStyles";
import axios from "axios";
export function CreateGame() {
  const navigate = useNavigate();

  const [NSFW, setNSFW] = useState(false);
  const [CreateGameState, dispatch] = useReducer(
    createGameReducer,
    initialCreateGameState
  );
  const { name, options, customCards } = CreateGameState;

  const createGameHandler = async () => {
    let { data } = await axios.get("http://localhost:5050/cards/prompt", {
      params: {
        NSFW: NSFW
      }
    });
    console.log(data)
    let result = await axios.get("http://localhost:5050/cards/answer", {
      params: {
        NSFW: NSFW
      }
    });
    console.log(result.data)
    dispatch({ name: "options1", value: data });
    dispatch({ name: "options2", value: result.data });
    console.log(CreateGameState)

    let matchTemp;
    lobbyClient
      .createMatch("Apples2Oranges", options)
      .catch((err) =>
        console.log("error creating match in CreateGame clickHandler", err)
      )
      .then((match) => {
        console.log("matchID from CreatGame", match);
        matchTemp = match.matchID;
        console.log("name", name);
        lobbyClient
          .joinMatch("Apples2Oranges", match.matchID, {
            playerName: name,
          })
          .catch((err) =>
            console.log("error joining match in CreateGame clickHandler", err)
          )
          .then((player) => {
            localStorage.setItem("matchID", matchTemp);
            localStorage.setItem("name", name);
            console.log('id', player.playerID);
            localStorage.setItem("id", player.playerID);
            localStorage.setItem("credentials", player.playerCredentials);
            // dispatch(setPlayerID(player.playerID));
            // dispatch(setPlayerCredentials(player.playerCredentials));
          });
      })
      .then(() => {
        console.log("matchTemp", matchTemp);
        navigate(`/waitingroom/${matchTemp}`);
      })
      .catch((err) => {
        console.log("catch all error in CreateGame clickHandler", err);
      });
  };

  return (
    <StyledContainer>
      <StyledTypography
        sx={{
          padding: "1rem",
          fontFamily: "roboto",
          textShadow: "0 0 10px white",
          fontWeight: "800",
          fontSize: {
            xs: "1rem",
            sm: "1.5rem",
            md: "1.8rem",
            lg: "2rem",
          },
          color: "white",
        }}
        variant="body2"
      >
        Create a Game
      </StyledTypography>
      <StyledInnerBox>
        <StyledFormGroup>
          <StyledFormControl required>
            <StyledTextField
              id="outlined-required"
              label="Nickname"
              name="nickname"
              onChange={(e) => dispatch(e.target)}
              required
            />
          </StyledFormControl>
          <StyledFormControl required>
            <StyledInputLabel id="demo-simple-select-required-label">
              Number of Players
            </StyledInputLabel>
            <StyledSelect
              id="demo-simple-select-required"
              label="Number of Players"
              name="numPlayers"
              labelId="demo-simple-select-required-label"
              onChange={(e) => dispatch(e.target)}
              value={options.numPlayers}
              required
            >
              <StyledMenuItem value="">None</StyledMenuItem>
              <StyledMenuItem value={3}>Three</StyledMenuItem>
              <StyledMenuItem value={4}>Four</StyledMenuItem>
              <StyledMenuItem value={5}>Five</StyledMenuItem>
              <StyledMenuItem value={6}>Six</StyledMenuItem>
              <StyledMenuItem value={7}>Seven</StyledMenuItem>
              <StyledMenuItem value={8}>Eight</StyledMenuItem>
            </StyledSelect>
          </StyledFormControl>
          <StyledFormControl required>
            <StyledInputLabel id="demo-simple-select-required-label">
              Number of Rounds
            </StyledInputLabel>
            <StyledSelect
              id="demo-simple-select-required"
              label="Number of Rounds"
              name="rounds"
              labelId="demo-simple-select-required-label"
              onChange={(e) => dispatch(e.target)}
              value={options.setupData.rounds}
              required
            >
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
          </StyledFormControl>
          <StyledCheckboxContainer>
            <StyledFormControlLabel
              control={<StyledCheckbox name="customCards" />}
              label="Allow custom cards"
            />
            <StyledFormControlLabel
              control={
                <StyledCheckbox
                  name="unlisted"
                  value={options.unlisted}
                  onChange={(e) => dispatch(e.target)}
                  required
                />
              }
              label="Make game public"
            />
            <StyledFormControlLabel
              control={
                <StyledCheckbox
                  name="NSFW"
                  checked={NSFW}
                  onChange={(e) => setNSFW(e.target.checked)}
                />
              }
              label="NSFW"
            />
          </StyledCheckboxContainer>
        </StyledFormGroup>
      </StyledInnerBox>
      <StyledButton variant="contained" onClick={createGameHandler}>
        Create Game
      </StyledButton>
    </StyledContainer>
  );
}