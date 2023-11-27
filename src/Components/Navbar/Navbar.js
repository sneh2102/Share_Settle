import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import useLogout from '../../Hooks/useLogout';
import './Navbar.css';

function Navbar() {
  // State to manage the collapsed/expanded state of the sidebar
  const [isCollapsed, setIsCollapsed] = useState(false);
  
  // Custom hook to handle user logout
  const { logout } = useLogout();

  // Function to handle user logout
  const handleLogout = () => {
    logout();
  };

  // Function to toggle the collapsed/expanded state of the sidebar
  const toggleNavbar = () => {
    setIsCollapsed(!isCollapsed);
  };

  useEffect(() => {
    // Function to handle window resize and automatically collapse the sidebar when the window width is less than 768 pixels
    const handleResize = () => {
      // Automatically collapse the sidebar when the window width is less than 768 pixels
      setIsCollapsed(window.innerWidth < 768);
    };

    // Add event listener to handle window resize
    window.addEventListener('resize', handleResize);

    // Initial check on component mount
    handleResize();

    // Remove event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []); // Empty dependency array to ensure the effect runs only on mount and unmount

  /**
   * Render Method:
   * Renders the JSX structure of the Navbar component.
   * @returns {JSX.Element} - The JSX structure representing the Navbar.
   */
  return (
    <div className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>

      <div className="navbar-header">
        {/* <h2 className={`${isCollapsed ? 'hidden' : ''}`}>Share<i className='fa fa-dollar-sign'></i><span>ettle</span></h2> */}
        <h2 className={`${isCollapsed ? 'hidden' : 'logo-font'}`}>
          <span className="logo-share">Share</span>
          <i className='fa fa-dollar-sign logo-settle'></i>
          <span className="logo-settle">ettle</span>
        </h2>

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
              <a href="#" onClick={handleLogout}><i className="fi-rr-magic-wand"></i><span>Logout</span></a>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}

// Exporting the Navbar component as the default export.
export default Navbar;