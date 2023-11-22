// useResetName.js

import { useState } from 'react';
import { useUserAuth } from '../Context/AuthContext';

export const useResetName = () => {
  const [lerror, setError] = useState(null);
  const [islLoading, setIsLoading] = useState(false);
  const { dispatch, user } = useUserAuth();

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

  return { resetName, islLoading, lerror };
};
