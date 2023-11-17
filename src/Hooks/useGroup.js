import React, { useState } from 'react'

export const useGroup = () => {
    const [error,setError]=useState()
    const [isLoading,setIsLoading]=useState()

    const getUser = async () => {
        
        const response = await fetch(`${process.env.REACT_APP_SERVER_LINK}/api/user/getUser`, {
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
        
        console.log(members);
    try {
      const response = fetch(`${process.env.REACT_APP_SERVER_LINK}/api/group/createGroup`, {
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
      
      const response = await fetch(`${process.env.REACT_APP_SERVER_LINK}/api/group/fetchUserGroups`, {
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

  const fetchGroup = async (id) => {
    
    const response = await fetch(`${process.env.REACT_APP_SERVER_LINK}/api/group/view/${id}`, {
        method: 'get',
        headers: { 'Content-Type': 'application/json' },
      });
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        return data;
      } else {
        throw new Error('Failed to fetch data');
      }
      
}

const leaveGroup = async (email,id) => {
  console.log(email,id);
      
  const response = await fetch(`${process.env.REACT_APP_SERVER_LINK}/api/group/leave`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({email,id}),
    });
    if (response.ok) {
      const data = await response.json();
      console.log(data);
      return data.groups;
    } else {
      throw new Error('Failed to fetch data');
    }
    
}


    return {getUser,createGroup,fetchGroups,error,isLoading,fetchGroup,leaveGroup}
}


