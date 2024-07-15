import './App.css';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Login from './Pages/Login/Login';
// import Main from './Pages/Main/Main'
import { useUserAuth } from './Context/AuthContext';
import ForgotPassword from './Components/ForgotPassword/ForgotPassword';
import ResetPassword from './Components/ResetPassword/ResetPassword';
import UserProfile from './Pages/UserProfile/UserProfile';
import ContactUs from './Pages/ContactUs/ContactUs';

import { useEffect } from 'react';

import Navbar from './Components/Navbar/Navbar';
import GroupCreation from './Pages/GroupCreation/GroupCreation';
import Groups from './Pages/Groups/Groups';
import GroupView from './Pages/Groups/GroupView';
import CardDetails from './Pages/CardDetails/CardDetails';
import Dashboard from './Pages/Dashboard/Dashboard';


function App() {
  const { user } = useUserAuth();
  console.log(user);
  const token = window.localStorage.getItem('user');

  useEffect(()=>{

  })
  
  return (
    <>
   
      <div>
        <Routes>
          <Route path='/' element={!user || !token ? <Login/> : <Navigate to='/dashboard'/>} />
          <Route path='/login' element={!user || !token ? <Login/> : <Navigate to='/dashboard'/>} />
          {/* <Route path='/home' element={!user || token ? <Groups/> : <Navigate to='/'/>} /> */}
          <Route path='/card-details' element={user || token ? <CardDetails/> : <Navigate to='/'/>} />
          <Route path='/dashboard' element={token ? <Dashboard/> : <Navigate to='/login'/>} />
          <Route path='/create-group' element={user || token? <GroupCreation /> : <Navigate to='/' />} /> 
          <Route path='/forgotpass' element={<ForgotPassword/>}/>
          <Route path='/reset-password/:id/:token' element={<ResetPassword/> }/>
          <Route path='/profile' element={user || token ? <UserProfile/>  : <Navigate to='/'/>} />
          <Route path='/contact' element={user || token ? <ContactUs/> : <Navigate to='/'/>} />
          <Route path='/groups' element={user || token ? <Groups/> : <Navigate to='/'/>} />
          <Route path='/groups/view/:id' element={user || token ? <GroupView/> : <Navigate to='/'/>}/>
          <Route path='/groups/view/:id' element={user || token ? <GroupView/> : <Navigate to='/'/>}/>
          {/* <Route path='/' element={<Login/>} />
          <Route path='/home' element={<Main/>}/> */}
          {/* <Route path='/signup' element={<SignUp/>}/> */}
        </Routes>
        </div>
    </>
  );
}

export default App;