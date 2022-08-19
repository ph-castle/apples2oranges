import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { StyledButton } from "../../styles/createGameStyles";
import { StyledTypography } from "../../styles/createGameStyles";
import { styled } from '@mui/material/styles';


export default function EditCards({ user }) {
  const [prompts, setPrompts] = useState('');
  const [answers, setAnswers] = useState('');
  const [NSFW, setNSFW] = useState(false);

  const navigate = useNavigate();

  const axiosInstance = axios.create({
    baseURL: `http://localhost:${process.env.REACT_APP_SERVER_PORT}`
  });

  useEffect(() => {
    const fetchData = async () => {
      // change to concurrent calls later in production
      const currentPrompts = await axiosInstance.get(`/cards/specific/prompt/${user.id}?NSFW=false`);
      const currentAnswers = await axiosInstance.get(`/cards/specific/answer/${user.id}?NSFW=false`);


      console.log(currentPrompts);
      console.log(currentAnswers);
      if (currentPrompts.data.rows.length > 0) {
        setPrompts(currentPrompts.data.rows.map((data) => data.body).join('\n'));
      }

      if (currentAnswers.data.rows.length > 0) {
        setAnswers(currentAnswers.data.rows.map((data) => data.body).join('\n'));
      }
    }

    fetchData();
  }, []);


  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log('in submit', prompts.split('\n'), answers.split('\n'), user.id);
    // add try and catch error checking later in production
    if (prompts.length > 0) {
      await axiosInstance.put(`/cards/prompt/${user.id}`, {
        cards: prompts.split('\n').filter(item => item),
        NSFW: false,
      });
    }

    if (answers.length > 0) {
      await axiosInstance.put(`/cards/answer/${user.id}`, {
        cards: answers.split('\n').filter(item => item),
        NSFW: false,
      });
    }
    navigate('/home');
  }

  console.log(NSFW, prompts, answers);

  return (
    <Box
      display="flex"
      flexDirection="column"
      height="100vh"
      margin="auto"
      width="50%"
      alignItems="center"
      justifyContent="center"
    >
      <form onSubmit={handleSubmit}>
        <TextField
          id="outlined-textarea"
          label="Prompt Cards"
          placeholder="Prompt Cards"
          InputLabelProps={{
            style: { color: 'white' },
          }}
          inputProps={{
            style: {
              color: "white",
            }
          }}
          sx={{
            fieldset: { borderColor: "white" }
          }}
          maxRows={15}
          value={prompts}
          style={{width: '50%'}}
          onChange={(e) => setPrompts(e.target.value)}
          multiline
        />
        <TextField
          id="outlined-textarea"
          label="Answer Cards"
          placeholder="Answer Cards"
          InputLabelProps={{
            style: { color: 'white' },
          }}
          inputProps={{
            style: {
              color: "white",
            }
          }}
          sx={{
            fieldset: { borderColor: "white" }
          }}
          maxRows={15}
          value={answers}
          style={{width: '50%'}}
          onChange={(e) => setAnswers(e.target.value)}
          multiline
        />
        <FormGroup>
          <FormControlLabel control={
            <Checkbox
              checked={NSFW}
              onChange={(e) => setNSFW(e.target.checked)}
              sx={{
                color: "white",
                '&.Mui-checked': {
                color: "white",
                  },
                pl: 2.5
                }}
          />} label={<StyledTypography color="white">NSFW</StyledTypography>} />
        </FormGroup>
        <StyledTypography>
          <StyledButton variant="contained" type="submit">Submit</StyledButton>
        </StyledTypography>
      </form>
    </Box>
  );
}