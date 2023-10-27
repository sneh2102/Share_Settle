import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './Pages/Login/Login';
import Main from './Pages/Main/Main'
import { useUserAuth } from './Context/AuthContext';
import ForgotPassword from './Components/ForgotPassword/ForgotPassword';
import ResetPassword from './Components/ResetPassword/ResetPassword';
import UserProfile from './Pages/UserProfile/UserProfile';
import ContactUs from './Pages/ContactUs/ContactUs';

function App() {
  const { user } = useUserAuth();
  return (
    <>
        <Routes>
          <Route path='/' element={!user ? <Login/> : <Navigate to='/home'/>} />
          <Route path='/home' element={user ? <Main/> : <Navigate to='/'/>} />
          <Route path='/forgotpass' element={<ForgotPassword/>}/>
          <Route path='/reset-password/:id/:token' element={<ResetPassword/>}/>
          <Route path='/profile' element={user ? <UserProfile/> : <Navigate to='/'/>} />
          <Route path='/contact' element={user ? <ContactUs/> : <Navigate to='/'/>} />
          {/* <Route path='/' element={<Login/>} />
          <Route path='/home' element={<Main/>}/> */}
          {/* <Route path='/signup' element={<SignUp/>}/> */}
        </Routes>
    </>
  );
}

export default App;
