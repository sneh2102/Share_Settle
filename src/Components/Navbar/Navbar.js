import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import useLogout from '../../Hooks/useLogout';
import { Link } from 'react-router-dom';

function Navbar() {
  const { logout } = useLogout();

  const handleLogout = () => {
      logout();
  };

  return (
    <>
      <aside>
        <div className="head__section" style={{display: 'flex', alignItems: 'centre', justifyContent: 'center'}}>
          <h2 style={{alignContent: 'center'}}>ShareSettle</h2>
        </div>
        <div className="nav__links">
          <ul>
          <li>
            <Link to="/profile">
            <i className="fi-rr-magic-wand"></i><span>Profile</span>
            </Link>

            </li>
            <li><a href="#"><i className="fi-rr-apps"></i><span>Dashboard</span></a></li>
            <li><a href="#"><i className="fi-rr-browser"></i><span>Groups</span></a></li>

            <li>
              <Link to="/create-group">
              <i className="fi-rr-comment-alt"></i><span>Create Group</span>
              </Link>
            </li>
            
            <li><a href="#"><i className="fi-rr-document-signed"></i><span>Notifications</span></a></li>
            <li>

            <Link to="/contact" className='contact'>
            <i className="fi-rr-magic-wand"></i><span>Contact Us</span>
            </Link>
            </li>

            <li><a href="#" onClick={handleLogout}><i className="fi-rr-magic-wand"></i><span>Logout</span></a></li>
          </ul>
        </div>
      </aside>
    </>
  );
}

export default Navbar;
