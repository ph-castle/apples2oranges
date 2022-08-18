import React, { useReducer } from "react";
import { useNavigate } from "react-router-dom";
import { FormControlLabel } from "@mui/material";
import { lobbyClient } from "./utils/lobbyClient";
import createGameReducer from "./createGameReducer";
import {
  StyledMenuItem,
  StyledSelect,
  StyledBox,
  StyledFormGroup,
  StyledFormControl,
  StyledInputLabel,
  StyledTypography,
  StyledTextField,
  StyledCheckbox,
  StyledButton,
} from "../styles/createGameStyles";
import { initialCreateGameState } from "./createGameReducer";

export const CreateGame = () => {
  const navigate = useNavigate();

  const [CreateGameState, dispatch] = useReducer(
    createGameReducer,
    initialCreateGameState
  );
  const { name, options, customCards } = CreateGameState;

  const clickHandler = () => {
    lobbyClient
      .createMatch("Apples2Oranges", options)
      .then((match) => {
        lobbyClient
          .joinMatch("Apples2Oranges", match.matchID, {
            playerName: name,
          })
          .catch((err) =>
            console.log("error joining match in CreateGame clickHandler", err)
          )
          .then((player) => {
            console.log(player);
            localStorage.setItem("name", name);
            localStorage.setItem("id", player.playerID);
            localStorage.setItem("credentials", player.playerCredentials);
          });
        return match.matchID;
      })
      .then((matchID) => {
        console.log("matchTemp", matchID);
        navigate(`/apples/:room/${matchID}`);
      })
      .catch((err) => {
        console.log("catch all error in Create Game clickHandler", err);
      });
  };

  return (
    <StyledBox>
      <StyledTypography>Create a Game</StyledTypography>
      <StyledFormGroup>
        <StyledTextField
          id="outlined-required"
          label="Nickname"
          name="nickname"
          onChange={(e) => dispatch(e.target)}
          required
        />

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
        </StyledFormControl>
        <StyledFormControl required>
          <StyledInputLabel id="demo-simple-select-required-label">
            Number of Rounds
          </StyledInputLabel>
          <StyledSelect
            labelId="demo-simple-select-required-label"
            id="demo-simple-select-required"
            name="rounds"
            value={options.setupData.rounds}
            label="Number of Rounds"
            onChange={(e) => dispatch(e.target)}
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
        <FormControlLabel
          control={<StyledCheckbox name="customCards" />}
          label="Allow custom cards"
        />
        <FormControlLabel
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
      </StyledFormGroup>

      <StyledButton variant="contained" onClick={clickHandler}>
        Create Game
      </StyledButton>
    </StyledBox>
  );
};
