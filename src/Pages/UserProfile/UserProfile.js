import React, { useEffect, useState } from 'react';
import './UserProfile.css';
import { useResetName } from '../../Hooks/useResetName';
import Navbar from '../../Components/Navbar/Navbar';
import {useUserAuth} from '../../Context/AuthContext'
import { useResetPass } from '../../Hooks/useResetPass';
import '../../PagesCommonCSS/PagesCommonCSS.css';

const UserProfile = () => {
  // const user = JSON.parse(window.localStorage.getItem('user'));
  const [user,setUser] = useState()
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  
  const { resetName } = useResetName();
  const { resetP } = useResetPass();
  const [showResetPassword, setShowResetPassword] = useState(false);
  const [showResetName, setShowResetName] = useState(false);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newUsername, setNewUsername] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleResetName = async () => {
    try {
      await resetName(user.user._id, newUsername);
      console.log(user.user._id,newUsername);
      setUserName(newUsername)
      
    } catch (error) {
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setPasswordError("Passwords don't match");
    } else {
      resetP(userEmail,oldPassword,newPassword,confirmPassword)
    }
  };
  useEffect(() => {
    const storedUser = window.localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setUserName(parsedUser.user.name);
      setUserEmail(parsedUser.email);
    }
  }, []);
  

  return (
    <>
      <Navbar />
      <div className="page-layout-container" style={{display: "flex", width: "100%",  heigth: "1vh", justifyContent: "center", alignItems: "center"}}>
        <div className="page-layout-card">
          <div className="page-layout-header" id="purple-header">
            <h2>User Profile</h2>
          </div>

          <div className="page-layout-fields">

            <div className='user-details'>
              <p id='userName'><strong>Name :</strong> {userName} </p>
              <p id='userEmail'><strong>Email :</strong> {userEmail} </p>
            </div>

            <div>
              <button className='bordered-btn' id ="reset-buttons" onClick={() => setShowResetName(true)}>Reset Name</button>
              {showResetName && (
                <div>
                  <input
                    type="text"
                    placeholder="New Username"
                    className='user-field-input'
                    value={newUsername}
                    onChange={(e) => setNewUsername(e.target.value)}
                  />
                  <button className='small-submit-buttons' id="small-submit-btn-margin" onClick={handleResetName}>Submit</button>
                </div>
              )}
            </div>

            <button className='bordered-btn' id='resetPass-container' onClick={() => setShowResetPassword(true)}>Reset Password</button>

            {showResetPassword && (
              <div>
                <input
                  type="password"
                  placeholder="Old Password"
                  className='user-field-input'
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                />
                <input
                  type="password"
                  placeholder="New Password"
                  className='user-field-input'
                  id='newPass-field'
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
                <input
                  type="password"
                  placeholder="Confirm New Password"
                  className='user-field-input'
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <button className='small-submit-buttons' id="small-submit-btn-margin" onClick={handleResetPassword}>Submit</button>
                {passwordError && <p style={{ color: 'red' }}>{passwordError}</p>}
              </div>
            )}

          </div>
           
        </div>
      </div>
    </>
  );
};

export default UserProfile;
