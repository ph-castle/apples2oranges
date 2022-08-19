import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

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
      const currentPrompts = await axiosInstance.get(`/cards/prompt/${user.id}`);
      const currentAnswers = await axiosInstance.get(`/cards/answer/${user.id}`);

      if (currentPrompts.length > 0) {
        setPrompts(currentPrompts.map((data) => data.body).join('\n'));
      }

      if (currentAnswers.length > 0) {
        setAnswers(currentAnswers.map((data) => data.body).join('\n'));
      }
    }

    fetchData();
  }, []);


  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log('in submit', prompts.split('\n'), answers.split('\n'), user.id);
    // add try and catch error checking later in production
    if (prompt.length > 0) {
      await axiosInstance.put(`/cards/prompt/${user.id}`, {
        cards: prompts.split('\n').filter(item => item),
        NSFW: false,
      });
    }

    if (answers.length > 0) {
      await axiosInstance.put(`/cards/answers/${user.id}`, {
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
          value={prompts}
          style={{width: '50%'}}
          onChange={(e) => setPrompts(e.target.value)}
          multiline
        />
        <TextField
          id="outlined-textarea"
          label="Answer Cards"
          placeholder="Answer Cards"
          maxRows={15}
          value={answers}
          style={{width: '50%'}}
          onChange={(e) => setAnswers(e.target.value)}
          multiline
        />
        <Button type="submit">Submit</Button>
      </form>
    </Box>
  );
}