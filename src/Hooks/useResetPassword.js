// useForgotPass.js
import { useState } from 'react';
import { useUserAuth } from '../Context/AuthContext';

export const useResetPassword = () => {
  const [lerror, setError] = useState(null);
  const [islLoading, setIsLoading] = useState(false);
  const { dispatch } = useUserAuth();

  const resetPass = async (id, token, password) => {
    setIsLoading(true);
    const serverURL = 'http://localhost:5000';
    try {
      const response = await fetch(`${serverURL}/api/user/reset-password/${id}/${token}`, {
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

  return { resetPass, islLoading, lerror };
};
