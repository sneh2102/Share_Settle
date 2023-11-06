import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './Pages/Login/Login';
import Main from './Pages/Main/Main'
import { useUserAuth } from './Context/AuthContext';
import ForgotPassword from './Components/ForgotPassword/ForgotPassword';
import ResetPassword from './Components/ResetPassword/ResetPassword';
import UserProfile from './Pages/UserProfile/UserProfile';
import ContactUs from './Pages/ContactUs/ContactUs';
import { useEffect } from 'react';

function App() {

  const { user } = useUserAuth();
  const token = window.localStorage.getItem('user');

  useEffect(()=>{

  })
  
  return (
    <>
        <Routes>
          <Route path='/' element={!user || !token ? <Login/> : <Navigate to='/home'/>} />
          <Route path='/login' element={!user || !token ? <Login/> : <Navigate to='/home'/>} />
          <Route path='/home' element={user || token ? <Main/> : <Navigate to='/'/>} />
          <Route path='/forgotpass' element={<ForgotPassword/>}/>
          <Route path='/reset-password/:id/:token' element={user || token ?<ResetPassword/> : <Navigate to='/'/>}/>
          <Route path='/profile' element={user || token ? <UserProfile/>  : <Navigate to='/'/>} />
      <Route path='/contact' element={user || token ? <ContactUs/> : <Navigate to='/'/>} />
          {/* <Route path='/' element={<Login/>} />
          <Route path='/home' element={<Main/>}/> */}
          {/* <Route path='/signup' element={<SignUp/>}/> */}
        </Routes>
    </>
  );
}

export default App;
