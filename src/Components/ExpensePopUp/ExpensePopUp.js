/**
 * ExpensePopUp Component:
 * This component represents a modal that displays detailed information about a specific expense.
 * It takes 'expense' and 'onClose' as props to display expense details and handle the close event.
 */
import React from "react";

/**
 * ExpensePopUp Functional Component:
 * @param {Object} props - The props for this component.
 *   @property {Object} expense - An object containing details of the expense to be displayed.
 *   @property {function} onClose - A callback function to handle the close event of the modal.
 */
const ExpensePopUp = ({ expense, onClose }) => {
    /**
     * Render Method:
     * Renders the JSX structure of the ExpensePopUp component.
     * @returns {JSX.Element} - The JSX structure representing the ExpensePopUp.
     */
    return (
      // Outer div representing the modal.
      <div className="modal">
        <div className="modal-content">
          <h2>{expense.name}</h2>
          <p>Description: {expense.description}</p>
          <p>Amount: {expense.amount} {expense.expenseCurrency}</p>
          <p>Category: {expense.category}</p>
          <p>Owner: {expense.ownerOfExpense}</p>
          <p>Involved Members: {expense.involved.join(', ')}</p>
          <p>Expense Distribution: {expense.expenseDistribution}</p>
          <p>Date: {new Date(expense.dateOfExpense).toLocaleString()}</p>
  
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    );
  };

  // Exporting the ExpensePopUp component as the default export.
  export default ExpensePopUp;