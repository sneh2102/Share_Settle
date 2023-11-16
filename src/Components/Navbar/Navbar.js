import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import useLogout from '../../Hooks/useLogout';
import './Navbar.css';

function Navbar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { logout } = useLogout();

  const handleLogout = () => {
    logout();
  };

  const toggleNavbar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <aside className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>

      <div className="navbar-header">
        {!isCollapsed && <h2>ShareSettle</h2>}
        <span onClick={toggleNavbar} className="navbar-toggle">
          <i className={`fa ${isCollapsed ? 'fa-arrow-right' : 'fa-arrow-left'}`}></i>
        </span>   
      </div>

      <div className={`nav__links ${isCollapsed ? 'hidden' : ''}`}>
        <ul>
          <li>
            <Link to="/profile">
              <i className="fi-rr-magic-wand"></i><span>Profile</span>
            </Link>
          </li>
          <li>
            <Link to="/dashboard">
              <i className="fi-rr-apps"></i><span>Dashboard</span>
            </Link>
          </li>
          <li>
            <Link to="/groups">
              <i className="fi-rr-browser"></i><span>Groups</span>
            </Link>
          </li>
          <li>
            <Link to="/create-group">
              <i className="fi-rr-comment-alt"></i><span>Create Group</span>
            </Link>
          </li>
          <li>
            <Link to="/notifications">
              <i className="fi-rr-document-signed"></i><span>Notifications</span>
            </Link>
          </li>
          <li>
            <Link to="/contact">
              <i className="fi-rr-magic-wand"></i><span>Contact Us</span>
            </Link>
          </li>
          <li>
            <div onClick={handleLogout}>
              <i className="fi-rr-magic-wand"></i><span>Logout</span>
            </div>
          </li>
        </ul>
      </div>
    </aside>
  );
}

export default Navbar;
