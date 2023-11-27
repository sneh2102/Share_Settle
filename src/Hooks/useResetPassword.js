/**
 * useResetPassword Module:
 * This module provides a custom hook for handling user password reset functionality.
 * It includes a function for resetting the user's password, utilizing the useUserAuth context for dispatching updates.
 */

// Importing necessary dependencies from React and custom context.
import { useState } from 'react';
import { useUserAuth } from '../Context/AuthContext';

/**
 * useResetPassword Hook:
 * A custom hook to handle user password reset functionality.
 * @returns {Object} - An object containing functions and states for resetting user password.
 */
export const useResetPassword = () => {
  const [lerror, setError] = useState(null);
  const [islLoading, setIsLoading] = useState(false);
  const { dispatch } = useUserAuth();

  /**
   * resetPass Function:
   * Sends a POST request to the server to reset the user's password.
   * @param {string} id - The user's ID.
   * @param {string} token - The token associated with the password reset request.
   * @param {string} password - The new password to be set for the user.
   */
  const resetPass = async (id, token, password) => {
    setIsLoading(true);
    
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVER_LINK}/api/user/reset-password/${id}/${token}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      const json = await response.json();
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Returning the functions and states for resetting user password.
  return { resetPass, islLoading, lerror };
};
