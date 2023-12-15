/* eslint-disable jsx-a11y/click-events-have-key-events */

import useStore from '@/store/store';
import { useAuth0 } from '@auth0/auth0-react';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

export const LogoutButton = ({ isCollapsed }) => {
  const { logout } = useAuth0();
  const { setEmail, setAvatar, setUserRole } = useStore(); // Import the Zustand store

  const handleLogout = () => {
    // Clear the Zustand store
    setEmail('');
    setAvatar('');
    setUserRole('');
    if (typeof window !== 'undefined') {
      // Clear localStorage when logging out
      localStorage.removeItem('email');
      localStorage.removeItem('avatar');
      localStorage.removeItem('userRole');
    }
    logout({
      logoutParams: {
        returnTo: window.location.origin,
      },
    });
  };

  return (
    <>
      <FontAwesomeIcon
        style={{
          color: 'white',
          fontFamily: 'Source Sans Pro, sans-serif',
          textTransform: 'uppercase',
          cursor: 'pointer',
          fontSize: '16.8px',
          fontWeight: '700',
        }}
        tabIndex={0} // Make the element focusable
        role="button" // Add a role for accessibility
        icon={faSignOutAlt}
        onClick={handleLogout}
      />
      {!isCollapsed && (
        <span
          className="icon-button-label ml-2"
          style={{
            color: 'white',
            fontFamily: 'Source Sans Pro, sans-serif',
            textTransform: 'uppercase',
            cursor: 'pointer',
            fontSize: '11.2px',
            fontWeight: '700',
          }}
          // onKeyPress={handleKeyPress}
          tabIndex={0}
          role="button"
          onClick={handleLogout}
        >
          Log out
        </span>
      )}
    </>
  );
};
