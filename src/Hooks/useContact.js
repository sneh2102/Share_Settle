/**
 * useContact Module:
 * This module provides a custom hook for handling contact form functionality.
 * It includes state management for error handling, loading status, and contact form messages.
 */

// Importing necessary dependencies from React.
import { useState } from 'react';

/**
 * useContact Hook:
 * A custom hook to handle contact form functionality.
 * @returns {Object} - An object containing functions and states for contact form handling.
 */
export const useContact = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false); 
  const [setMessage,contactMessage]=useState();

  /**
   * contactUs Function:
   * Handles the submission of the contact form, sending a request to the server.
   * Updates the loading status, processes the server response, and sets appropriate states.
   * @param {string} name - The name of the person submitting the contact form.
   * @param {string} email - The email address of the person submitting the contact form.
   * @param {string} subject - The subject of the contact form message.
   * @param {string} message - The content of the contact form message.
   */
  const contactUs = async (name, email, subject, message) => {
    setIsLoading(true); 
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVER_LINK}/api/user/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, subject, message }),
      });
      const json = await response.json();
      setMessage("Email Sent");
      console.log(contactMessage);
      console.log(json);
    } catch (error) {
      setError(error.message); // Handle the error appropriately (e.g., display an error message).
    } finally {
      // Setting loading status back to false after the API call completes.
      setIsLoading(false);
    }
  };

  // Returning the functions and states for contact form handling.
  return { contactUs, isLoading, error,contactMessage };
};
