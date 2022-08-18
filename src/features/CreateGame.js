import React, { useState } from "react";
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
  Button,
} from "@mui/material";
import { lobbyClient } from "./utils/lobbyClient";
import { useNavigate } from "react-router-dom";

export const CreateGame = () => {
  let navigate = useNavigate();

  const [options, setOptions] = useState({
    numPlayers: "",
    setupData: {},
    unlisted: false,
  });
  const [customCards, setCustomCards] = useState();
  const [name, setName] = useState();

  const handleChange = (e) => {
    console.log(e.target.type);
    const { name, value, checked } = e.target;

    if (name === "customCards") {
      setCustomCards(checked);
    } else if (name === "nickname") {
      console.log(name, value);
      setName(value);
    } else if (name === "rounds") {
      setOptions({ ...options, setupData: { rounds: value } });
    } else if (name === "unlisted") {
      setOptions({ ...options, [name]: checked });
    } else {
      setOptions({ ...options, [name]: value });
      localStorage.setItem("players", value);
    }
  };
  console.log(options);

  const clickHandler = () => {
    let matchTemp;
    lobbyClient
      .createMatch("Apples2Oranges", options)
      .catch((err) =>
        console.log("error creating match in CreateGame clickHandler", err)
      )
      .then((match) => {
        console.log("matchID from CreatGame", match);
        matchTemp = match.matchID;
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
        console.log("catch all error in CreateGamee clickHandler", err);
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
        sx={{ height: "18rem", justifyContent: "space-evenly", mt: "1rem" }}
      >
        <TextField
          required
          id="outlined-required"
          label="Nickname"
          name="nickname"
          onChange={handleChange}
          sx={{ m: 1, minWidth: "2rem", mb: "1rem" }}
        />
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "row",
          }}
        >
          <FormControl
            required
            sx={{ m: 1, minWidth: "2rem", mb: "1rem", width: "50%" }}
          >
            <InputLabel id="demo-simple-select-required-label">
              Number of Players
            </InputLabel>
            <Select
              labelId="demo-simple-select-required-label"
              id="demo-simple-select-required"
              name="numPlayers"
              value={options.numPlayers}
              label="Number of Players"
              onChange={handleChange}
              required
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
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
          <FormControl
            required
            sx={{ m: 1, minWidth: "2rem", mb: "1rem", width: "50%" }}
          >
            <InputLabel id="demo-simple-select-required-label">
              Number of Rounds
            </InputLabel>
            <Select
              labelId="demo-simple-select-required-label"
              id="demo-simple-select-required"
              name="rounds"
              value={options.setupData.rounds}
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
        </Box>
        <FormControlLabel
          control={<Checkbox name="customCards" />}
          label="Allow custom cards"
        />
        <FormControlLabel
          control={
            <Checkbox
              name="unlisted"
              value={options.unlisted}
              onChange={handleChange}
              required
            />
          }
          label="Make game public"
        />
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

// export default function CreateGame() {
//   const navigate = useNavigate();

//   const [CreateGameState, dispatch] = useReducer(
//     createGameReducer,
//     initialCreateGameState
//   );
//   const { name, options, customCards } = CreateGameState;

//   const createGameHandler = () => {
//     lobbyClient
//       .createMatch("Apples2Oranges", options)
//       .then((match) => {
//         lobbyClient
//           .joinMatch("Apples2Oranges", match.matchID, {
//             playerName: name,
//           })
//           .catch((err) =>
//             console.log("error joining match in CreateGame clickHandler", err)
//           )
//           .then((player) => {
//             console.log(player);
//             localStorage.setItem("name", name);
//             localStorage.setItem("id", player.playerID);
//             localStorage.setItem("credentials", player.playerCredentials);
//           });
//         return match.matchID;
//       })
//       .then((matchID) => {
//         console.log("matchTemp", matchID);
//         navigate(`/apples/:room/${matchID}`);
//       })
//       .catch((err) => {
//         console.log("catch all error in Create Game clickHandler", err);
//       });
//   };

//   return (
//     <StyledBox>
//       <StyledTypography>Create a Game</StyledTypography>
//       <StyledFormGroup>
//         <StyledTextField
//           id="outlined-required"
//           label="Nickname"
//           name="nickname"
//           onChange={(e) => dispatch(e.target)}
//           required
//         />
//         <StyledFormControl required>
//           <StyledInputLabel id="demo-simple-select-required-label">
//             Number of Players
//           </StyledInputLabel>
//           <StyledSelect
//             id="demo-simple-select-required"
//             label="Number of Players"
//             name="numPlayers"
//             labelId="demo-simple-select-required-label"
//             onChange={(e) => dispatch(e.target)}
//             value={options.numPlayers}
//             required
//           >
//             <StyledMenuItem value="">None</StyledMenuItem>
//             <StyledMenuItem value={3}>Three</StyledMenuItem>
//             <StyledMenuItem value={4}>Four</StyledMenuItem>
//             <StyledMenuItem value={5}>Five</StyledMenuItem>
//             <StyledMenuItem value={6}>Six</StyledMenuItem>
//             <StyledMenuItem value={7}>Seven</StyledMenuItem>
//             <StyledMenuItem value={8}>Eight</StyledMenuItem>
//           </StyledSelect>
//         </StyledFormControl>
//         <StyledFormControl required>
//           <StyledInputLabel id="demo-simple-select-required-label">
//             Number of Rounds
//           </StyledInputLabel>
//           <StyledSelect
//             id="demo-simple-select-required"
//             label="Number of Rounds"
//             name="rounds"
//             labelId="demo-simple-select-required-label"
//             onChange={(e) => dispatch(e.target)}
//             value={options.setupData.rounds}
//             required
//           >
//             <StyledMenuItem value={1}>One</StyledMenuItem>
//             <StyledMenuItem value={2}>Two</StyledMenuItem>
//             <StyledMenuItem value={3}>Three</StyledMenuItem>
//             <StyledMenuItem value={4}>Four</StyledMenuItem>
//             <StyledMenuItem value={5}>Five</StyledMenuItem>
//             <StyledMenuItem value={6}>Six</StyledMenuItem>
//             <StyledMenuItem value={7}>Seven</StyledMenuItem>
//             <StyledMenuItem value={8}>Eight</StyledMenuItem>
//             <StyledMenuItem value={9}>Nine</StyledMenuItem>
//             <StyledMenuItem value={10}>Ten</StyledMenuItem>
//             <StyledMenuItem value={11}>Eleven</StyledMenuItem>
//             <StyledMenuItem value={12}>Twelve</StyledMenuItem>
//           </StyledSelect>
//         </StyledFormControl>
//         <StyledFormControlLabel
//           control={<StyledCheckbox name="customCards" />}
//           label="Allow custom cards"
//         />
//         <StyledFormControlLabel
//           control={
//             <StyledCheckbox
//               name="unlisted"
//               value={options.unlisted}
//               onChange={(e) => dispatch(e.target)}
//               required
//             />
//           }
//           label="Make game public"
//         />
//       </StyledFormGroup>
//       <StyledButton variant="contained" onClick={createGameHandler}>
//         Create Game
//       </StyledButton>
//     </StyledBox>
//   );
// }
