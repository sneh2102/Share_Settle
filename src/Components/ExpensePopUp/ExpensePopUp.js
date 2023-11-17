import React from "react";

const ExpensePopUp = ({ expense, onClose }) => {
    return (
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

  export default ExpensePopUp;
  