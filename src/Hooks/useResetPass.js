
import { useState } from 'react';
import { useUserAuth } from '../Context/AuthContext';

export const useResetPass = () => {
  const [lerror, setError] = useState(null);
  const [islLoading, setIsLoading] = useState(false);
  const { dispatch, user } = useUserAuth();

  const resetP = async (email, oldPassword, newPassword, newConfirmPassword) => {
    setIsLoading(true);
    console.log(email,oldPassword,newPassword,newConfirmPassword);

    
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVER_LINK}/api/user/changePassword`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, oldPassword, newPassword, newConfirmPassword }),
      });

      const json = await response.json();
      return json;
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
    
  };

  return { resetP, islLoading, lerror };
};
