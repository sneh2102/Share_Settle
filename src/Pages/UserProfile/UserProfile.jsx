import React, { useState } from 'react';
import './UserProfile.css'; 

function UserProfile() {
  
  const userData = {
    name: 'John Doe',
    username: 'johndoe',
    password: '********',
  
  };

  const [isEditing, setIsEditing] = useState(false);
  const [editedUsername, setEditedUsername] = useState(userData.username);
  const [editedPassword, setEditedPassword] = useState(userData.password);

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  const handleSaveClick = () => {
    userData.username = editedUsername;
    userData.password = editedPassword;

    setIsEditing(false);
  };

  return (
    <div className="container-page">
    <div className="user-profile">
      <div className="profile-header">
        <div className="profile-avatar">
          
          <img src="placeholder.jpg" alt="User Avatar" />
        </div>
        <div className="profile-info">
          <h2>{userData.name}</h2>
          {/* Display user name */}
          <p>{userData.name}</p>
        </div>
      </div>
      <div className="profile-section">
        <h3>Account Info</h3>
        <div className="account-info">
          <div className="info-item">
            <span>Username:</span>
            {isEditing ? (
              <input
                type="text"
                value={editedUsername}
                onChange={(e) => setEditedUsername(e.target.value)}
              />
            ) : (
              <span>{userData.username}</span>
            )}
            {isEditing && (
              <button className="edit-button" onClick={handleSaveClick}>
                Save
              </button>
            )}
            <button className="edit-button" onClick={handleEditClick}>
              {isEditing ? 'Cancel' : 'Edit'}
            </button>
          </div>
          <div className="info-item">
            <span>Password:</span>
            {isEditing ? (
              <input
                type="password"
                value={editedPassword}
                onChange={(e) => setEditedPassword(e.target.value)}
              />
            ) : (
              <span>{userData.password}</span>
            )}
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}

export default UserProfile;
