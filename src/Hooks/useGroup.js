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
    
    const createGroup=(name , members)=>{
        const serverURL = 'http://localhost:5000';
        console.log(members);
    try {
      const response = fetch(`${serverURL}/api/user/createGroup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({name, members}),
      });
       return response;

    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
    }

    const fetchGroups = async (email) => {
      const serverURL = 'http://localhost:5000';
      const response = await fetch(`${serverURL}/api/user/fetchUserGroups`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({email}),
        });
        if (response.ok) {
          const data = await response.json();
          console.log(data);
          return data.groups;
        } else {
          throw new Error('Failed to fetch data');
        }
        
  }
    return {getUser,createGroup,fetchGroups,error,isLoading}
}


