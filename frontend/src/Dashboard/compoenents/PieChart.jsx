import { useState,useEffect } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

import { getUserRatio } from '../../services/analytics';

const PieChart = () => {
  const [userRatio, setUserRatio] = useState({
    admin: null,
    user: null
  });
  useEffect(() => {
    const getData = async () => {
      const response = await getUserRatio();
      const { data } = response;
      if (data[0].role==='admin') {
        setUserRatio(prev => ({
          ...prev,
          admin: data[0].count,
          user: data[1].count
        }));
      } else {
        setUserRatio(prev => ({
          ...prev,
          admin: data[1].count,
          user: data[0].count
        }));
      }
    };
    getData();
  }, []);

  ChartJS.register(ArcElement, Tooltip, Legend);

  const totalUsers = userRatio.admin + userRatio.user;
  const adminPercentage = totalUsers !== 0 ? ((userRatio.admin / totalUsers) * 100).toFixed(2) : 0;
  const userPercentage = totalUsers !== 0 ? ((userRatio.user / totalUsers) * 100).toFixed(2) : 0;


  const data = {
    labels: [
      `admin (${ adminPercentage }%)`,
      `user (${ userPercentage }%)`
    ],
    datasets: [
      {
        label: 'No. of users',
        data: [userRatio?.admin,userRatio?.user],
        backgroundColor: [
          '#245c4f',
          '#71a89c'
        ],
        borderColor: [
          'white'
        ],
        borderWidth: 3
      }
    ]
  };
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top'
      },
      title: {
        display: true,
        text: 'User role ratio',
        font: { size: 24 }
      }
    }
  };
    
  return <>
    <Pie width={'700px'} height="500px" data={data} options={options} />
  </>;
};

export default PieChart;
