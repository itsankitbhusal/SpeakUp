import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { useState,useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

import { getVerificationDistribution } from '../../services/analytics'; 

export default function DoughnutChart() {
  const [userRatio, setUserRatio] = useState({
    verified: null,
    notVerified: null
  });

  // get user verified/not verified ratio
  const getData = async () => {
    const response = await getVerificationDistribution();
    const { data: ratioData } = response;
    if (ratioData[0].is_verified === 1) {
      setUserRatio(prev => ({
        ...prev,
        verified: ratioData[0].count,
        notVerified: ratioData[1].count
      }));
    } else {
      setUserRatio(prev => ({
        ...prev,
        verified: ratioData[1].count,
        notVerified: ratioData[0].count
      }));
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const totalUsers = userRatio.verified + userRatio.notVerified;
  const verifiedPercentage = totalUsers !== 0 ? ((userRatio.verified / totalUsers) * 100).toFixed(2) : 0;
  const notVerifiedPercentage = totalUsers !== 0 ? ((userRatio.notVerified / totalUsers) * 100).toFixed(2) : 0;

  const data = {
    labels: [
      `verified (${ verifiedPercentage }%)`,
      `not verified (${ notVerifiedPercentage }%)`
    ],
    datasets: [
      {
        label: 'No. of users',
        data: [userRatio?.verified,userRatio?.notVerified],
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
        text: 'User verified ratio',
        font: { size: 24 }
      }
    }
  };

  return (
    <div className='min-h-[75vh] grid place-items-center'>
      <Doughnut width={'700px'} height="500px" data={data} options={options} />
    </div>
  );
}
