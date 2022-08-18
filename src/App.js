import React, { useState } from "react";
import Header from "./features/Header";
import MainRoutes from "./MainRoutes";
import Hero from "./UI/Hero";
import { StyledContainer } from "./styles/appStyles";

export default function App() {
  const [user, setUser] = useState({
    id: 0,
    username: "",
    avatar: null,
  });

  return (
    <>
      <Header user={user} setUser={setUser} />
      <Hero />
      <StyledContainer>
        <MainRoutes user={user} setUser={setUser} />
      </StyledContainer>
    </>
  );
}
