import Header from '../features/Header';
import Hero from './Hero';
import { Outlet } from 'react-router-dom';
import { StyledContainer } from '../styles/appStyles.js';

export default function Layout({ user, setUser }) {
  return(
    <>
      <Header user={user} setUser={setUser} />
      <Hero />
      {/* <StyledContainer> */}
        <Outlet />
      {/* </StyledContainer> */}
    </>
  )
};