// useResetName.js

import { useState } from 'react';
import { useUserAuth } from '../Context/AuthContext';
import { toast } from 'react-toastify';

export const useResetName = () => {
  const [lerror, setError] = useState(null);
  const [islLoading, setIsLoading] = useState(false);
  const { dispatch, user } = useUserAuth();

  const resetName = async (id, name) => {
    setIsLoading(true);
   
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVER_LINK}/api/user/changeUsername`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, name }),
      });
      const json =  response.json();
      // dispatch({ type: "LOGIN", payload: json }); 
  
      window.localStorage.setItem('user', JSON.stringify(json));
      console.log(JSON.stringify(json));
      return json;
    } catch (error) {
      console.error("FetchError:",error)
      toast.error("Something Went Wrong")
    } finally {
      setIsLoading(false);
    }
  };

  return { resetName, islLoading, lerror };
};
