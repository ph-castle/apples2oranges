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

export default function EditCards({ user }) {
  const [prompts, setPrompts] = useState('');
  const [answers, setAnswers] = useState('');
  const [NSFW, setNSFW] = useState(false);
  const [error, setError] = useState(false);

  const navigate = useNavigate();

  const axiosInstance = axios.create({
    baseURL: `http://localhost:${process.env.REACT_APP_SERVER_PORT}`
  });

  useEffect(() => {
    const fetchData = async () => {
      const currentPrompts = await axiosInstance.get(`/cards/specific/prompt/${user.id}?NSFW=false`);
      const currentAnswers = await axiosInstance.get(`/cards/specific/answer/${user.id}?NSFW=false`);

      if (currentPrompts.data.rows.length > 0) {
        setPrompts(currentPrompts.data.rows.map((data) => data.body).join('\n'));
      }

      if (currentAnswers.data.rows.length > 0) {
        setAnswers(currentAnswers.data.rows.map((data) => data.body).join('\n'));
      }
    }

    fetchData();
  }, [user, axiosInstance]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (prompts.length > 0) {
        await axiosInstance.put(`/cards/prompt/${user.id}`, {
          cards: prompts.split('\n').filter(item => item),
          NSFW: false,
        });
        setPrompts('');
      }

      if (answers.length > 0) {
        await axiosInstance.put(`/cards/answer/${user.id}`, {
          cards: answers.split('\n').filter(item => item),
          NSFW: false,
        });
        setAnswers('');
      }
      navigate(-1);

    } catch (err) {
      console.log('error saving custom cards ', err);
      setError(true);
    };
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      height="100vh"
      margin="auto 2.5%"
      alignItems="center"
      justifyContent="center"
    >
       <Button
        onClick={(e) => navigate(-1)}
        variant="contained"
        sx={{ position: 'absolute', top: '5%', right: '5%', minWidth: '10px', height: '1.0em', width: '1.0em', fontSize: { xs: '1.5rem', md: '2.5rem', lg: '3rem', xl: '4rem' }, padding: '0.1em', borderRadius: '4px', color: 'white', '&:hover': { boxShadow: '0 0 20px orange', scale: '1.25', transition: 'scale 5ms ease' } }}
      >&times;</Button>
      {error && <h3 style={{position: 'absolute', top: '20%', positionSelf: 'center', fontStyle: 'italic', fontSize: '1.5rem', textAlign: 'center'}}>Error saving custom cards</h3>}
      <form onSubmit={handleSubmit}  style={{width: '100%', margin: 'auto', textAlign: 'center'}}>
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
          style={{margin: '2%'}}
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
              fontSize: {xs: '1.0rem', md: '1.5rem', lg: '2.0rem'},
            }
          }}
          sx={{
            fieldset: { borderColor: "white" }
          }}
          maxRows={15}
          value={answers}
          style={{margin: '2%'}}
          onChange={(e) => setAnswers(e.target.value)}
          multiline
        />
        <FormGroup sx={{ alignContent: 'center', paddingTop: '1em' }}>
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
        <StyledTypography sx={{padding: '0'}}>
          <StyledButton variant="contained" type="submit">Submit</StyledButton>
        </StyledTypography>
      </form>
    </Box>
  );
}