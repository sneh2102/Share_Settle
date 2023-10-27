import React from 'react';
import { Navigate } from 'react-router-dom';
import useLogout from '../../Hooks/useLogout';

function Navbar() {
  const { logout } = useLogout();

  const handleLogout = () => {
    logout();
    // You can use the `Navigate` component directly within your JSX.
    return <Navigate to="/" />;
  };

  return (
    <>
      <aside>
        <div className="head__section">
          <h2>CD</h2>
        </div>
        <div className="nav__links">
          <ul>
            <li><a href="#"><i className="fi-rr-magic-wand"></i><span>Profile</span></a></li>
            <li><a href="#"><i className="fi-rr-apps"></i><span>Dashboard</span></a></li>
            <li><a href="#"><i className="fi-rr-browser"></i><span>Groups</span></a></li>
            <li><a href="#"><i className="fi-rr-comment-alt"></i><span>Create Group</span></a></li>
            <li><a href="#"><i className="fi-rr-document-signed"></i><span>Notifications</span></a></li>
            <li><a href="#"><i className="fi-rr-magic-wand"></i><span>Chat</span></a></li>
            <li><a href="#" onClick={handleLogout}><i className="fi-rr-magic-wand"></i><span>Logout</span></a></li>
          </ul>
        </div>
      </aside>
    </>
  );
}

export default Navbar;
