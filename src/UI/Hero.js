import { useState, useEffect } from "react";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import { red, orange } from "@mui/material/colors";
import {
  Button,
  Box,
  ButtonGroup,
  Paper,
  Card,
  CardContent,
  CardActions,
  Typography,
  CardMedia,
} from "@mui/material";
import axios from "axios";
import DecksAnimation from "./DecksAnimation";

const Item = styled(Paper)`
  text-align: center;
  height: 10rem;
  width: 100%;
  max-width: 16rems;
  line-height: 10rem;
`;

export default function Hero({ theme }) {
  const [cards, setCards] = useState([]);
  useEffect(() => {
    axios("http://52.8.0.28:45000/cards/prompt")
      .then((res) => {
        console.log(res.data);
        setCards(res.data);
      })
      .catch((err) => console.log(err.message));
  }, []);

  return (
    <div>
      <ThemeProvider theme={theme}>
        {/* <Button color="primary">Hello</Button> */}

        {cards.slice(0, 10).map((card) => (
          <Card sx={{ maxWidth: 345 }}>
            <CardContent>
              <Typography variant="body2">{card.body}</Typography>
            </CardContent>
          </Card>
        ))}
      </ThemeProvider>
    </div>
  );
}
