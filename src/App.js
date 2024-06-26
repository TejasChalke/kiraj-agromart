import './App.css';
import Login from './comonents/login/Login';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import UserProfile from './comonents/user profile/UserProfile';
import AdminDashboard from './comonents/admin dashboard/AdminDashboard';
import {  useState } from 'react';
import { UserContext } from './contexts/Contexts';

function App() {
  const [user, setUser] = useState({});

  return (
    <div className="App">
      <UserContext.Provider value={{user, setUser}}>
      <BrowserRouter>
        <Routes>
          <Route index Component={Login} />
          <Route path='/profile' Component={UserProfile} />
          <Route path='/dashboard' Component={AdminDashboard} />
        </Routes>
      </BrowserRouter>
      </UserContext.Provider>
    </div>
  );
}

export default App;
