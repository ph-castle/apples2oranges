import { Box, Typography, Button } from '@mui/material';
import { styled } from '@mui/material/styles';

export const StyledComponentContainer = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
  gap: '1rem',
  width: '100%',
  maxWidth: '1200px',
  height: '100%',
  margin: 'auto',
  //   backgroundColor: "rgba(0,0,0, 0.7)",
  padding: '2rem',
});

export const StyledInnerBox = styled(Box)({
  mt: '2em',
  mb: '3em',
  ml: '0.75rem',
  display: 'flex',
  justifyContent: { xs: 'center', sm: 'flex-start' },
  gap: 1,
});

export const StyledTypography = styled(Typography)({
  padding: '1rem',
  fontFamily: 'roboto',
  textShadow: '0 0 10px white',
  fontWeight: '800',
  color: 'white',
});

export const StyledButton = styled(Button)({
  width: '25ch',
  outline: 'white solid 1px',
  boxShadow: '0 0 10px orange',
  '&:hover': {
    boxShadow: '0 0 20px orange',
  },
});
export const StyledDashButtons = styled(Button)({
  padding: '1rem',
  //   width: "25",
  outline: 'white 2px solid',

  '&:hover': {
    transform: 'scale(1.1)',
  },
  backgroundColor: 'black',
});

// export

export function Heading(props) {
  return (
    <StyledTypography
      sx={{
        padding: '1rem',
        textShadow: '0 0 10px white',
        fontWeight: '1000',
        fontSize: {
          xs: '1rem',
          sm: '1.5rem',
          md: '1.8rem',
          lg: '2rem',
        },
        color: 'white',
      }}
    >
      {props.children}
    </StyledTypography>
  );
}
