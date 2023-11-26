// useForgotPass.js
import { useState } from 'react';

export const useContact = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false); 
  const [setMessage,contactMessage]=useState();

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
      setIsLoading(false); // Set loading back to false after the API call completes.
    }
  };

  return { contactUs, isLoading, error,contactMessage };
};
