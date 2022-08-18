import React, { useState } from "react";
import Header from "./features/Header";
import MainRoutes from "./MainRoutes";
import Hero from "./UI/Hero";

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
      <MainRoutes user={user} setUser={setUser} />
    </>
  );
}
