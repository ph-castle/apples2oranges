import React from 'react';
import { Button, Box, ButtonGroup } from '@mui/material';
import { Link } from 'react-router-dom';
import { toggleAnimation } from '../app/mainSlice';
import { useDispatch, useSelector } from 'react-redux';
import {
  StyledComponentContainer,
  StyledDashButtons,
} from '../styles/globalStyles';
import useSound from 'use-sound';
import ButtonEarCon from '../UI/Sound/zapsplat_foley_money_handful_coins_in_hand_open_fast_003_85337.mp3';

export const Dashboard = () => {
  const dispatch = useDispatch();
  const animationtoggle = useSelector((state) => state.main.animationtoggle);
  const [play] = useSound(ButtonEarCon);
  return (
    <StyledComponentContainer>
      <ButtonGroup
        variant="contained"
        onClick={() => dispatch(toggleAnimation())}
      >
        <Link to={'/joingame'} style={{ textDecoration: 'none' }}>
          <StyledDashButtons
            onClick={play}
            fontSize={{ xs: '0.5rem', sm: '1rem', md: '1.5rem' }}
            sx={{
              marginRight: '1rem',
              fontSize: {
                xs: '0.5rem',
                sm: '1rem',
                md: '1.5rem',
              },
              backgroundColor: '#212529',
              '&:hover': {
                backgroundColor: '#343a40',
              },
            }}
          >
            Join a Game
          </StyledDashButtons>
        </Link>
        <Link to={'/creategame'} style={{ textDecoration: 'none' }}>
          <StyledDashButtons
            onClick={play}
            sx={{
              // backgroundColor: "orange",
              fontSize: {
                xs: '0.5rem',
                sm: '1rem',
                md: '1.5rem',
              },
              backgroundColor: '#868e96',
              '&:hover': {
                backgroundColor: '#adb5bd',
              },
            }}
          >
            Create A Game
          </StyledDashButtons>
        </Link>
      </ButtonGroup>
    </StyledComponentContainer>
  );
};

export default Dashboard;
