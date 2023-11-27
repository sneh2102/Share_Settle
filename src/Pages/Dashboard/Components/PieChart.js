import React from 'react';
import { Pie } from 'react-chartjs-2';
import {Chart, CategoryScale} from 'chart.js'; 
Chart.register(CategoryScale);

const PieChart = ({ data }) => {
  return (
    <div>
      <h2>Expense Distribution by Category</h2>
      <Pie data={data} />
    </div>
  );
};

export default PieChart;