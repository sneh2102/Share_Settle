import React, { useEffect, useState } from 'react';
import './UserProfile.css';
import { useResetName } from '../../Hooks/useResetName';
import Navbar from '../../Components/Navbar/Navbar';
import {useUserAuth} from '../../Context/AuthContext'
import { useResetPass } from '../../Hooks/useResetPass';

const UserProfile = () => {
  // const user = JSON.parse(window.localStorage.getItem('user'));
  const [user,setUser] = useState()
  const [userName,setUserName]=useState();
  const [userEmail,setUserEmail]=useState();
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
      <div className="user-container">
        <div className="user-con">
          <div className="user-profile">
            <h2>User Profile</h2>
            <div>
              <strong>Name:</strong> {userName}
            </div>
            <div>
              <strong>Email:</strong> {userEmail}
            </div>
            <button onClick={() => setShowResetName(true)}>Reset Name</button>

            <button onClick={() => setShowResetPassword(true)}>Reset Password</button>
            {showResetPassword && (
              <div>
                <input
                  type="password"
                  placeholder="Old Password"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                />
                <input
                  type="password"
                  placeholder="New Password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
                <input
                  type="password"
                  placeholder="Confirm New Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <button onClick={handleResetPassword}>Submit</button>
                {passwordError && <p style={{ color: 'red' }}>{passwordError}</p>}
              </div>
            )}
            {showResetName && (
              <div>
                <input
                  type="text"
                  placeholder="New Username"
                  value={newUsername}
                  onChange={(e) => setNewUsername(e.target.value)}
                />
                <button onClick={handleResetName}>Submit</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default UserProfile;
