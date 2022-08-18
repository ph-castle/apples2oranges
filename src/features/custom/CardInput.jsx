import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

export default function CardInput({ user }) {
  const [prompts, setPrompts] = useState('');
  const [answers, setAnswers] = useState('');
  const [NSFW, setNSFW] = useState(false);

  const navigate = useNavigate();

  const axiosInstance = axios.create({
    baseURL: `http://localhost:${process.env.REACT_APP_SERVER_PORT}`
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log('in submit', prompts.split('\n'), answers.split('\n'), user.id);
    if (prompt.length > 0) {
      await axiosInstance.put(`/cards/prompt/${user.id}`, {
        params: {
          cards: prompts.split('\n'),
          NSFW: false,
        }
      });
    }

    if (answers.length > 0) {
      await axiosInstance.put(`/cards/answers/${user.id}`, {
        params: {
          cards: answers.split('\n'),
          NSFW: false,
        }
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
        <FormGroup>
          <FormControlLabel control={
            <Checkbox
              checked={NSFW}
              onChange={(e) => setNSFW(e.target.checked)}
              inputProps={{ 'aria-label': 'controlled' }}
            />} label="NSFW" />
        </FormGroup>
        <TextField
          id="outlined-textarea"
          label="Prompt Cards"
          placeholder="Prompt Cards"
          maxRows={15}
          style={{width: '50%'}}
          onChange={(e) => setPrompts(e.target.value)}
          multiline
        />
        <TextField
          id="outlined-textarea"
          label="Answer Cards"
          placeholder="Answer Cards"
          maxRows={15}
          style={{width: '50%'}}
          onChange={(e) => setAnswers(e.target.value)}
          multiline
        />
        <Button type="submit">Submit</Button>
      </form>
    </Box>
  );
}