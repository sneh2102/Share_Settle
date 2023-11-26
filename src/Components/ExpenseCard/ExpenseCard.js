import React from 'react';
import { Card, CardContent, Chip, Typography } from '@mui/material';

const ExpenseCard = ({ expense, onClick }) => {
  const {
    name,
    amount,
    expenseCurrency,
    expenseDistribution,
  } = expense;

  const cardStyle = {
    maxWidth: 200,
    margin: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    
  };

  return (
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

export default ExpenseCard;
