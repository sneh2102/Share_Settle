import React from 'react';

import ExpenseList from './Components/ExpenseList.js';
import ExpenseSummary from './Components/ExpenseSummary.js';
import Chart from './Components/Chart.js';

const Dashboard = () => {
  return (
    <div>
      <h1>Sharesettle Dashboard</h1>
      
        <Chart/>
      
    </div>
  );
};

export default Dashboard;