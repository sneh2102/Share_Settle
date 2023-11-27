/**
 * useExpense Module:
 * This module provides a custom hook for handling expense-related functionality.
 * It includes functions for adding expenses, fetching group expenses, fetching group balance sheets,
 * fetching user expenses, fetching user group expenses, and fetching a specific expense.
 * Utilizes the React-Toastify library for displaying toast notifications.
 */

// Importing necessary dependencies from React and React-Toastify.
import React from 'react';
import { toast } from 'react-toastify';

/**
 * useExpense Hook:
 * A custom hook to handle expense-related functionality.
 * @returns {Object} - An object containing functions for various expense operations.
 */
export const useExpense = () => {
  /**
   * addExpense Function:
   * Sends a POST request to the server to add a new expense.
   * Displays a success toast notification upon successful addition.
   * @param {string} groupId - The ID of the group to which the expense belongs.
   * @param {string} name - The name of the expense.
   * @param {string} description - The description of the expense.
   * @param {number} amount - The amount of the expense.
   * @param {string} expenseCurrency - The currency of the expense.
   * @param {string} category - The category of the expense.
   * @param {string} ownerOfExpense - The owner of the expense.
   * @param {Array} involved - An array of involved members in the expense.
   * @returns {Promise} - A promise that resolves to the server response data if successful, or rejects with an error.
   */
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
      // Sending a POST request to the server with expense details.
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
