import React, { lazy, Suspense, useState } from 'react';
const LoginPage = lazy(() => import('./LoginPage'));
const CreateUserPage = lazy(() => import('./CreateUserPage'));
const EditProfile = lazy(() => import('./EditProfile'));
const ProfilePage = lazy(() => import('./ProfilePage'));

export default function Login({ user, setUser }) {
  const [currentPage, setCurrentPage] = useState('');

  const renderView = () => {
    switch (currentPage) {
      case '':
        return null;
      case 'Create User':
        return <CreateUserPage setUser={setUser} setCurrentPage={setCurrentPage}/>;
      case 'Login':
        return <LoginPage setUser={setUser} setCurrentPage={setCurrentPage}/>;
      case 'Profile':
        return <ProfilePage user={user} setUser={setUser} setCurrentPage={setCurrentPage}/>
      case 'Edit Profile':
        return <EditProfile user={user} setUser={setUser} setCurrentPage={setCurrentPage}/>
      default:
        return <div>Page not found</div>
    }
  };

  return (
    <div className="Login">
      {user.id === 0 ?
        <button onClick={() => setCurrentPage('Login')}>Login</button>
        :
        <button onClick={() => setCurrentPage('Profile')}>View Profile</button>
      }
      <Suspense fallback={<p>Loading...</p>}>
        {renderView()}
      </Suspense>
    </div>
  )
}
