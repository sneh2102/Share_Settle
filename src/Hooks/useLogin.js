/**
 * useLogin Module:
 * This module provides a custom hook for handling user login functionality.
 * It includes a function for user login, utilizing the useUserAuth context for dispatching login actions.
 */

// Importing necessary dependencies from React, custom context, and React-Toastify.
import { useState } from 'react'
import { useUserAuth } from '../Context/AuthContext' 
import { toast } from 'react-toastify';

/**
 * useLogin Hook:
 * A custom hook to handle user login functionality.
 * @returns {Object} - An object containing functions and states for user login.
 */
export const useLogin = () => {
  const [lerror, setError] = useState(null)
  const [islLoading, setIsLoading] = useState(null)
  const { dispatch } = useUserAuth()
  const link = process.env.REACT_APP_SERVER_LINK;

  /**
   * login Function:
   * Sends a POST request to the server for user login.
   * Sets appropriate states based on the server response.
   * @param {string} email - The user's email address.
   * @param {string} password - The user's password.
   */
  const login = async (email, password) => {
    setIsLoading(true)
    setError(null)
    
    const response = await fetch(`${process.env.REACT_APP_SERVER_LINK}/api/user/login`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ email, password })
    })
    const json = await response.json()
    console.log(json);

    if (!response.ok) {
      setIsLoading(false)
    }
    if (response.ok) {
      localStorage.setItem('user', JSON.stringify(json))
      window.localStorage.setItem('isLoggedIn', true)
      dispatch({type: 'LOGIN', payload: json})
      toast.success("Successfully Logged In")
      setIsLoading(false)
    }
  }
  
  // Returning the functions and states for user login.
  return { login, islLoading, lerror }
}