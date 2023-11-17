import React from 'react';
import { toast } from 'react-toastify';

export const useExpense = () => {
  const addExpense = async (
    groupId,
    name,
    description,
    amount,
    expenseCurrency,
    category,
    ownerOfExpense,
    involved
  ) => {
    
    console.log(groupId, name, description, amount, expenseCurrency, category, ownerOfExpense, involved);

    try {
      const response = await fetch(`${process.env.REACT_APP_SERVER_LINK}/api/expense/add`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          groupId,
          name,
          description,
          amount,
          expenseCurrency,
          category,
          ownerOfExpense,
          involved
        }),
      });
      toast.success("Expense Added")
      const data = await response.json(); // Assuming the response is JSON

      return data; // Return the parsed data or handle it as needed
    } catch (error) {
      console.error('Error:', error);
      toast.error(error)
      // Handle the error appropriately (logging, notifying the user, etc.)
    } finally {
      // Code to run regardless of success or failure
    }
  };

  const fetchGroupExpense = async (
    id
  ) => {
    

    try {
      const response = await fetch(`${process.env.REACT_APP_SERVER_LINK}/api/expense/groupexpense`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id
        }),
      });
     
      const data = await response.json(); 
    

      return data; 
    } catch (error) {
      console.error('Error:', error);
      toast.error(error)
      // Handle the error appropriately (logging, notifying the user, etc.)
    } finally {
      // Code to run regardless of success or failure
    }
  };

  const groupBalanceSheet = async (
    id
  ) => {
    

    try {
      const response = await fetch(`${process.env.REACT_APP_SERVER_LINK}/api/group/balancesheet`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id
        }),
      });
     
      const data = await response.json(); 
      

      return data; 
    } catch (error) {
      console.error('Error:', error);
      toast.error(error)
      // Handle the error appropriately (logging, notifying the user, etc.)
    } finally {
      // Code to run regardless of success or failure
    }
  };

  const getUserExpenses = async (
    email
  ) => {
    
    console.log(email);
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVER_LINK}/api/expense/userexpense`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email
        }),
      });
     
      const data = await response.json(); 

      return data; 
    } catch (error) {
      console.error('Error:', error);
      toast.error(error)
      // Handle the error appropriately (logging, notifying the user, etc.)
    } finally {
      // Code to run regardless of success or failure
    }
    
  };

  const getUserGroupExpenses = async (
    email,id
  ) => {
    
    console.log(email);
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVER_LINK}/api/expense/view/usergroupexpense`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          id
        }),
      });
     
      const data = await response.json(); 

      return data; 
    } catch (error) {
      console.error('Error:', error);
      toast.error(error)
    } finally {
     
    }
}
const getExpense = async (
   id
  ) => {
    
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVER_LINK}/api/expense/view/usergroupexpense`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id
        }),
      });
     
      const data = await response.json(); 

      return data; 
    } catch (error) {
      console.error('Error:', error);
      toast.error(error)
    } finally {
     
    }
}

  return {
    addExpense,
    fetchGroupExpense,
    groupBalanceSheet,
    getUserExpenses,
    getUserGroupExpenses,
    getExpense,
  };
};
