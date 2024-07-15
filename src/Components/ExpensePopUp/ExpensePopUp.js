import React from "react";

const ExpensePopUp = ({ expense, onClose }) => {
  const user = window.localStorage.getItem('user')
  const isUserSettled = expense.settledby.includes(user.email);
    return (
      <div className="modal">
        <div className="modal-content">
          <h2>{expense.name}</h2>
          <p>Description: {expense.description}</p>
          <p>Amount: {expense.amount} {expense.expenseCurrency}</p>
          <p>Category: {expense.category}</p>
          <p>Owner: {expense.ownerOfExpense}</p>
          <p>Involved Members: {expense.involved.join(', ')}</p>
          <p>Settled By: {expense.settledby.join(', ')}</p>
          <p>Expense Distribution: {expense.expenseDistribution}</p>
          <p>Date: {new Date(expense.dateOfExpense).toLocaleString()}</p>
          <br/>
          {isUserSettled && (
          <p style={{color: "green"}}>
            This expense is settled by you.
          </p>
        )}

          <button onClick={onClose}>Close</button>
        </div>
      </div>
    );
  };

  export default ExpensePopUp;
  