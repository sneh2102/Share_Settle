/**
 * useResetName Module:
 * This module provides a custom hook for handling user name reset functionality.
 * It includes a function for resetting the user's name, utilizing the useUserAuth context for dispatching updates.
 */

// Importing necessary dependencies from React and custom context.
import { useState } from 'react';
import { useUserAuth } from '../Context/AuthContext';

export const useResetName = () => {
  const [lerror, setError] = useState(null);
  const [islLoading, setIsLoading] = useState(false);
  const { dispatch, user } = useUserAuth();

  /**
   * resetName Function:
   * Sends a POST request to the server to reset the user's name.
   * Updates user data in local storage upon successful name reset.
   * @param {string} id - The user's ID.
   * @param {string} name - The new name to be set for the user.
   * @returns {Promise} - A promise that resolves to the updated user data if successful, or rejects with an error.
   */
  const resetName = async (id, name) => {
    setIsLoading(true);
    console.log("hiiiiiii");
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVER_LINK}/api/user/changeUsername`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, name }),
      });
      console.log("hiiiii");
      const json =  response.json();
      // dispatch({ type: "LOGIN", payload: json }); 
  
      window.localStorage.setItem('user', JSON.stringify(json));
      console.log(JSON.stringify(json));
      return json;
    } catch (error) {
      console.error("FetchError:",error)
    } finally {
      setIsLoading(false);
    }
  };

  // Returning the functions and states for resetting user name
  return { resetName, islLoading, lerror };
};
