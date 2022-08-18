import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import FormHelperText from "@mui/material/FormHelperText";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

export default function LoginPage({ setUser }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // username-password combo is valid
  const [valid, setValid] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  // disables login button when attempting login
  const [attemptingLogin, setAttemptingLogin] = useState(false);
  let navigate = useNavigate();

  const axiosInstance = axios.create({
    baseURL: `http://localhost:${process.env.REACT_APP_SERVER_PORT}`,
  });

  const handleLogin = (e) => {
    e.preventDefault();
    setAttemptingLogin(true);

    let options = {
      params: {
        username: username,
        password: password,
      },
    };
    axiosInstance
      .get("/user", options)
      .then((results) => {
        if (results.data.id === undefined) {
          setValid(false);
          setAttemptingLogin(false);
        } else {
          setValid(true);
          setUsername("");
          setPassword("");
          // updates state of user
          setUser(results.data);
          // switch page to home
          navigate("/home");
          setAttemptingLogin(false);
        }
      })
      .catch((err) => {
        console.log("Error getting user");
      });
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  return (
    // <Box
    //   sx={{
    // width: '50%',
    // margin: 'auto',
    // mt: 4,
    // display: 'block'
    //   }}>
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      gap="12px"
    >
      <Typography variant="h4">Login</Typography>
      <form autoComplete="off" onSubmit={(e) => handleLogin(e)}>
        <FormGroup sx={{ mt: "1rem" }}>
          <FormControl sx={{ width: "25ch", mt: "1rem" }}>
            <InputLabel required>Username</InputLabel>
            <OutlinedInput
              type="text"
              value={username}
              required
              onChange={(e) => setUsername(e.target.value)}
              label="Username"
            />
          </FormControl>
          <br />
          <FormControl sx={{ width: "25ch", mt: "1rem" }}>
            <InputLabel required>Password</InputLabel>
            <OutlinedInput
              type={showPassword ? "text" : "password"}
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
              label="Password"
              error={!valid}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => {
                      setShowPassword(!showPassword);
                    }}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
            {!valid ? (
              <FormHelperText>Incorrect password</FormHelperText>
            ) : (
              <FormHelperText>&nbsp;</FormHelperText>
            )}
          </FormControl>
          <FormControl sx={{ width: "25ch", mt: "1rem" }}>
            <Button
              type="submit"
              variant="contained"
              sx={{ p: "sm" }}
              disabled={attemptingLogin}
            >
              Login
            </Button>
          </FormControl>
        </FormGroup>
      </form>
      <Button
        variant="contained"
        sx={{ p: "sm", width: "26ch", mt: "2rem" }}
        onClick={(e) => navigate("/user/create")}
      >
        Create account
      </Button>
    </Box>
  );
}
