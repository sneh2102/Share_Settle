/**
 * ExpenseCard Component:
 * This component represents a card displaying information about an expense.
 * It takes 'expense' and 'onClick' as props to display and handle click events.
 */

import React from 'react';
import { Card, CardContent, Chip, Typography } from '@mui/material';

/**
 * ExpenseCard Functional Component:
 * @param {Object} props - The props for this component.
 *   @property {Object} expense - An object containing details of the expense.
 *   @property {function} onClick - A callback function to handle click events on the card.
 */

const ExpenseCard = ({ expense, onClick }) => {
  // Destructuring expense object for easier access to its properties.
  const {
    name,
    amount,
    expenseCurrency,
    expenseDistribution,
  } = expense;

  // Styling for the card component.
  const cardStyle = {
    maxWidth: 200,
    margin: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    
  };

  /**
   * Render Method:
   * Renders the JSX structure of the ExpenseCard component.
   * @returns {JSX.Element} - The JSX structure representing the ExpenseCard.
   */
  return (
    // Card component with styles and click event handler.
    <Card style={cardStyle} onClick={() => onClick(expense)}>
      <CardContent>
        <Typography variant="h6">{name}</Typography>
        <Typography color="text.secondary">Amount: {amount} {expenseCurrency}</Typography>
        <Typography color="text.secondary">Distribution: {expenseDistribution}</Typography>
        <Chip label="Details" color="primary" size="small" style={{ marginTop: '8px' }} />
      </CardContent>
    </Card>
  );
};

// Exporting the ExpenseCard component as the default export.
export default ExpenseCard;