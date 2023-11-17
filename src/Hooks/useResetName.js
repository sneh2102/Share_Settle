
import { useState } from 'react';
import { useUserAuth } from '../Context/AuthContext';

export const useResetName = () => {
  const [lerror, setError] = useState(null);
  const [islLoading, setIsLoading] = useState(false);
  const { dispatch, user } = useUserAuth();

  const resetName = async (id , name) => {
    setIsLoading(true);

    
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVER_LINK}/api/user/changeUsername`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id , name }),
      });
      dispatch({type:"LOGIN"});
      const json = await response.json();
      console.log(json);
      window.localStorage.setItem('user',json)

      return json;
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
    
  };

  return { resetName, islLoading, lerror };
};
