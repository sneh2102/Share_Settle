/**
 * useGroup Module:
 * This module provides a custom hook for handling group-related functionality.
 * It includes functions for getting user details, creating a group, fetching user groups,
 * fetching a specific group, leaving a group, and making settlements within a group.
 */

// Importing necessary dependencies from React.
import React, { useState } from 'react'

/**
 * useGroup Hook:
 * A custom hook to handle group-related functionality.
 * @returns {Object} - An object containing functions for various group operations.
 */
export const useGroup = () => {
    const [error,setError]=useState()
    const [isLoading,setIsLoading]=useState()

    /**
   * getUser Function:
   * Sends a GET request to the server to retrieve user details.
   * @returns {Promise} - A promise that resolves to the user data if successful, or rejects with an error.
   */
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
            // Throwing an error if the request is not successful.
            throw new Error('Failed to fetch data');
          }
          
    }
    
    const createGroup=(name , members, settlePeriod)=>{
        
        console.log(members);
    try {
      const response = fetch(`${process.env.REACT_APP_SERVER_LINK}/api/group/createGroup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({name, members, settlePeriod}),
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
      throw new Error("Make settlement befor leaving group");
    }
    
}
const makeSettlement = async (id,From,To,Amount) => {
  
  const response = await fetch(`${process.env.REACT_APP_SERVER_LINK}/api/group/settle`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({id,From,To,Amount}),
    });
    if (response.ok) {
      const data = await response.json();
      console.log(data);
      return data.groups;
    } else {
      throw new Error("Something Went Wrong");
    }
}
    // Returning the functions for group operations.
    return {getUser,createGroup,fetchGroups,fetchGroup,leaveGroup,makeSettlement}
}


