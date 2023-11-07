import React, { useState } from 'react'

export const useGroup = () => {
    const [error,setError]=useState()
    const [isLoading,setIsLoading]=useState()

    const getUser = async () => {
        const serverURL = 'http://localhost:5000';
        const response = await fetch(`${serverURL}/api/user/getUser`, {
            method: 'get',
            headers: { 'Content-Type': 'application/json' },
          });
          
          if (response.ok) {
            const data = await response.json();
            console.log(data);
            return data.user;
          } else {
            throw new Error('Failed to fetch data');
          }
          
    }
    
    const createGroup=(allMember)=>{
        const serverURL = 'http://localhost:5000';
    try {
      const response = fetch(`${serverURL}/api/user/createGroup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({allMember}),
      });
       return response;

    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
    }

    const fetchGroup=(id)=>{
        const serverURL = 'http://localhost:5000';
    try {
      const response = fetch(`${serverURL}/api/user/createGroup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({id}),
      });
       return response;

    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
    }

    return {getUser,createGroup,fetchGroup,error,isLoading}
}


