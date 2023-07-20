import { useState, useEffect } from 'react';
import { Chart as ChartJS,CategoryScale,LinearScale,PointElement,LineElement,Title,Tooltip,Filler,Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';
import { getGrowthRate } from '../../services/analytics';
ChartJS.register( CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Filler, Legend);

const AreaChart = () => {
  const [data, setData] = useState({
    date: null,
    growthRate: null
  });
    // get data for user growth rate over 12 weeks
  const getData = async () => {
    try {
      const response = await getGrowthRate();
      setData(prev => ({
        ...prev,
        date: response.data.date,
        growthRate: response.data.growthRate
      }));
    } catch (error) {
      console.error(error);
    }
  };
  
  useEffect(() => {
    getData();
  }, []);
  
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top'
      },
      title: {
        display: true,
        text: 'Last 12 Weeks Users Growth',
        font: { size: 24 }
      }
    }
  };

  const labels = data?.date;

  const dataSet = {
    labels,
    datasets: [
      {
        fill: true,
        label: 'User Growth',
        data: data?.growthRate,
        borderColor: '#245c4f',
        backgroundColor: '#71a89c',
        hoverBackgroundColor: '#245c4f',
        hoverBorderColor: '#245c4f',
        hoverWidth: 5,
        hoverRadius: 5,
        pointHoverBackgroundColor: '#245c4f',
        pointHoverBorderColor: '#245c4f'
      }
    ]
  };

  return (
    <div className='min-h-[75vh] grid place-items-center'>
      <Line width={'700px'} height="500px" options={options} data={dataSet} />
    </div>
  );
};

export default AreaChart;