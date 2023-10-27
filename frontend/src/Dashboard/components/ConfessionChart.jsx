import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { useState, useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

import { getConfessionApprovalRatio } from '../../services/analytics';

export default function ConfessionChart() {
  const [confessionRatio, setConfessionRatio] = useState({
    verified: null,
    notVerified: null
  });

  // get confession approval ratio
  const getData = async () => {
    try {
      const response = await getConfessionApprovalRatio();
      const { data: ratioData } = response;

      let notApprovedConfessionCount;
      let approvedConfessionCount;

      for (const ratio of ratioData) {
        if (ratio.is_approved === 1) {
          approvedConfessionCount = ratio.count;
        } else {
          notApprovedConfessionCount = ratio.count;
        }
      }

      setConfessionRatio(prev => ({
        ...prev,
        verified: approvedConfessionCount,
        notVerified: notApprovedConfessionCount || 0
      }));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const totalConfessions =
    confessionRatio.verified + confessionRatio.notVerified;
  const verifiedPercentage =
    totalConfessions !== 0
      ? ((confessionRatio.verified / totalConfessions) * 100).toFixed(2)
      : 0;
  const notVerifiedPercentage =
    totalConfessions !== 0
      ? ((confessionRatio.notVerified / totalConfessions) * 100).toFixed(2)
      : 0;

  const data = {
    labels: [
      `verified (${ verifiedPercentage }%)`,
      `not verified (${ notVerifiedPercentage }%)`
    ],
    datasets: [
      {
        label: 'confessions',
        data: [confessionRatio?.verified, confessionRatio?.notVerified],
        backgroundColor: ['#245c4f', '#71a89c'],
        borderColor: ['white'],
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
        text: 'Confession verification chart',
        font: { size: 24 }
      }
    }
  };

  return (
    <div className="min-h-[75vh] grid place-items-center">
      <Doughnut width={'700px'} height="500px" data={data} options={options} />
    </div>
  );
}
