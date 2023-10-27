// useForgotPass.js
import { useState } from 'react';
import { useUserAuth } from '../Context/AuthContext';

export const useForgotPass = () => {
  const [lerror, setError] = useState(null);
  const [islLoading, setIsLoading] = useState(false); // Initialize with false
  const { dispatch } = useUserAuth();

  const forgotPass = async (email) => {
    setIsLoading(true); // Set loading to true when the API call starts.
    const serverURL = 'http://localhost:5000';
    try {
      const response = await fetch(`${serverURL}/api/user/forgotpass`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const json = await response.json();
      console.log(json);
    } catch (error) {
      setError(error.message); // Handle the error appropriately (e.g., display an error message).
    } finally {
      setIsLoading(false); // Set loading back to false after the API call completes.
    }
  };

  return { forgotPass, islLoading, lerror };
};
