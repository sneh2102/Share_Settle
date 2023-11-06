
import { useState } from 'react';
import { useUserAuth } from '../Context/AuthContext';

export const useResetPass = () => {
  const [lerror, setError] = useState(null);
  const [islLoading, setIsLoading] = useState(false);
  const { dispatch, user } = useUserAuth();

  const resetP = async (email, oldPassword, newPassword, newConfirmPassword) => {
    setIsLoading(true);
    console.log(email,oldPassword,newPassword,newConfirmPassword);

    const serverURL = 'http://localhost:5000';
    try {
      const response = await fetch(`${serverURL}/api/user/changePassword`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, oldPassword, newPassword, newConfirmPassword }),
      });
    //   dispatch({type:"LOGOUT"});
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
