import React from 'react';
import LinearChart from './LinearChart';
import PieChart from './PieChart';

const Chart = () => {
  const linearChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Monthly Expenses',
        data: [100, 150, 120, 200, 180, 250],
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 2,
        fill: false,
      },
    ],
  };

  const pieChartData = {
    labels: ['Grocery', 'Home', 'Trip', 'Others'],
    datasets: [
      {
        data: [30, 20, 25, 25],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4CAF50'],
      },
    ],
  };

  return (
    <div>
    <LinearChart data={linearChartData} />
    <PieChart data={pieChartData} />
  </div>
);
};

export default Chart;