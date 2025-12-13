import React, { useState, useEffect } from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';
import axios from 'axios';

const Statistics = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get('http://localhost:3001/items');
        setItems(response.data);
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    };
    fetchItems();
  }, []);

  const statusData = {
    labels: ['Lost', 'Found'],
    datasets: [
      {
        label: 'Items by Status',
        data: [
          items.filter(item => item.status === 'lost').length,
          items.filter(item => item.status === 'found').length,
        ],
        backgroundColor: ['#FF6384', '#36A2EB'],
      },
    ],
  };

  const categoryCounts = items.reduce((acc, item) => {
    acc[item.category] = (acc[item.category] || 0) + 1;
    return acc;
  }, {});

  const categoryData = {
    labels: Object.keys(categoryCounts),
    datasets: [
      {
        label: 'Items by Category',
        data: Object.values(categoryCounts),
        backgroundColor: '#4BC0C0',
      },
    ],
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Statistics</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h2 className="text-xl mb-2">Items by Status</h2>
          <Pie data={statusData} />
        </div>
        <div>
          <h2 className="text-xl mb-2">Items by Category</h2>
          <Bar data={categoryData} />
        </div>
      </div>
    </div>
  );
};

export default Statistics;
