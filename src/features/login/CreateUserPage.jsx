import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import {
  StyledFormControl,
  StyledButton,
  StyledInputLabel,
  StyledOutlineInput,
  StyledFormHelperText,
} from "../../styles/createUserPageStyles";
import "./Login.css";
import { Heading, StyledComponentContainer } from "../../styles/globalStyles";

export default function CreateUserPage({ setUser }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [photo, setPhoto] = useState("");
  const [usernameTaken, setUsernameTaken] = useState(false);
  const [passwordMismatch, setPasswordMismatch] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [userCreated, setUserCreated] = useState(false);

  let navigate = useNavigate();

  const axiosInstance = axios.create({
    baseURL: `http://localhost:${process.env.REACT_APP_SERVER_PORT}`,
  });

  const uploadImage = (e) => {
    e.preventDefault();
    let reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onloadend = () => {
      setPhoto(reader.result);
    };
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // check if username exists first
    axiosInstance.get(`/user/${username}`).then((results) => {
      if (results.data.id !== undefined) return setUsernameTaken(true);
      // username not taken, check if passwords match
      setUsernameTaken(false);
      if (password !== password2) return setPasswordMismatch(true);
      // password matches, can create a new account
      setPasswordMismatch(false);
      setSubmitting(true);
      // uploads photo to cloudinary
      photo &&
        postCloudinary(photo)
          .then((photoURL) =>
            // posts new user
            postNewUser({
              username,
              password,
              avatar: photoURL,
            })
          )
          .catch((err) => console.log("Error uploading image: ", err));
    });
  };

  const postCloudinary = (photo) =>
    axiosInstance
      .post("/cloudinary", { img: photo })
      .then((photoURL) => photoURL.data)
      .catch((err) => err);

  const postNewUser = (data) =>
    axiosInstance
      .post("/user", data)
      .then((results) => handleUserData(results))
      .catch((err) => console.log("Error creating user: ", err));

  const handleResetInputs = () => {
    setUsername("");
    setPassword("");
    setPassword2("");
    setPhoto("");
    setSubmitting(false);
  };

  const handleUserData = ({ data }) => {
    // sets current user data
    setUser(data);
    // reset fields
    handleResetInputs();
    setUserCreated(true);
    setTimeout(() => {
      setUserCreated(false);
      // route back to main page
      navigate("/home");
    }, 1000);
  };

  const handleCancel = () => {
    // reset fields
    handleResetInputs();
    setUsernameTaken(false);
    setPasswordMismatch(false);
    setUserCreated(false);
    // route back to main page
    navigate("/home");
  };

  return (
    <StyledComponentContainer>
      <Heading>Create an Account</Heading>
      {userCreated && <Heading>Account Created!</Heading>}
      <form autoComplete="off" onSubmit={(e) => handleSubmit(e)}>
        <StyledFormControl>
          <StyledInputLabel required>Username</StyledInputLabel>
          <StyledOutlineInput
            type="text"
            value={username}
            required
            onChange={(e) => setUsername(e.target.value)}
            label="Username"
            error={usernameTaken}
          />
          {usernameTaken ? (
            <StyledFormHelperText>Username already taken</StyledFormHelperText>
          ) : (
            <StyledFormHelperText>&nbsp;</StyledFormHelperText>
          )}
        </StyledFormControl>
        <br />
        <StyledFormControl>
          <StyledInputLabel required>Password</StyledInputLabel>
          <StyledOutlineInput
            type="password"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
            label="Password"
            error={passwordMismatch}
          />
          <StyledFormHelperText>&nbsp;</StyledFormHelperText>
        </StyledFormControl>
        <br />
        <StyledFormControl>
          <StyledInputLabel required>Confirm Password</StyledInputLabel>
          <StyledOutlineInput
            type="password"
            value={password2}
            required
            onChange={(e) => setPassword2(e.target.value)}
            label="Password"
            error={passwordMismatch}
          />
          {passwordMismatch ? (
            <StyledFormHelperText>Passwords must match!</StyledFormHelperText>
          ) : (
            <StyledFormHelperText>&nbsp;</StyledFormHelperText>
          )}
        </StyledFormControl>
        <br />
        <StyledFormControl>
          <StyledButton variant="contained" component="label">
            <AddPhotoAlternateIcon />
            &nbsp;Upload avatar
            <input
              type="file"
              accept="image/png, image/jpeg"
              onChange={(e) => uploadImage(e)}
              hidden
            />
          </StyledButton>
        </StyledFormControl>
        {photo.length > 0 && (
          <img className="avatar-thumbnail" src={photo} alt="avatar" />
        )}
        <br />
        <br />
        <StyledButton type="submit" variant="contained" disabled={submitting}>
          Create account
        </StyledButton>
      </form>
      <StyledButton variant="contained" onClick={(e) => handleCancel()}>
        Cancel
      </StyledButton>
    </StyledComponentContainer>
  );
}
